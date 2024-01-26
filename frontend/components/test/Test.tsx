"use client";

import { Word } from "@/components/test/Word";
import { Score as ScoreType } from "@/graphql/generated/graphql";
import {
  createElement,
  forwardRef,
  FunctionComponent,
  ReactElement,
  ReducerState,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from "react";
import styles from "./Test.module.css";
import { generateWord } from "@/utils/generateWords";
import { generateRandomString } from "@/utils/generateRandomString";
import { Caret } from "@/components/test/Caret";
import { calculateWpm } from "@/utils/calculateWpm";
import { setContext } from "@apollo/client/link/context";

interface Props {
  focused: boolean;
  running: boolean;
  finished: boolean;
  timePassed: number;
  mode: string; // "words" | "time"
  modeSetting: number;
  startTime: number;
  handleChangeWpm: (wpm: number) => void;
  setWordCount: (value: ((prevState: number) => number) | number) => void;
  handleFinish: () => void;
  /**
   * Returns 0 if we're free to continue with our input handling;
   * if we should prevent reading further inputs, returns a non-zero value.
   * @param {KeyboardEvent} e - the global mouse event
   * @returns {number} 0 if all OK, non-0 value if we should stop handling inputs
   */
  onKeyDown: (e: globalThis.KeyboardEvent) => number;
  handleSaveScore: (score: Partial<ScoreType>) => void; // danger zone // TODO: probably rename like handle finish Idk?
  initialContent: string[];
  // Supposed to return the elements by which to expand the pool
  onPoolUpdate: (count: number, index?: number) => string[];
}

export interface TestMethods {
  reset: () => void;
}

type State = {
  correctCharacters: number;
  nonEmptyCharacters: number;
  allWordsLength: number;
  accuracy: number;
  content: string[];
  wpmStats: number[];
  rawStats: number[];
};

const reducer = (current: State, update: Partial<State>) => ({ ...current, ...update });

const initialState: State = {
  correctCharacters: 0,
  nonEmptyCharacters: 0,
  allWordsLength: 0,
  accuracy: 0,
  content: [],
  wpmStats: [],
  rawStats: [],
};

export const Test = forwardRef<TestMethods, Props>(
  (
    {
      focused,
      running,
      finished,
      timePassed,
      handleFinish,
      modeSetting,
      mode,
      startTime,
      setWordCount,
      handleChangeWpm,
      onKeyDown,
      handleSaveScore,
      initialContent,
      onPoolUpdate,
    }: Props,
    ref
  ) => {
    // TODO: for some reason raw seems weird on 30s test || NOTE: could not replicate, it all seems fine.
    const [wordIndex, setWordIndex] = useState(-1);
    const [letterIndex, setLetterIndex] = useState(-1);
    const [lineSkip, setLineSkip] = useState(true);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    const [wordPool, setWordPool] = useState<Array<ReactElement<Word>>>([]);
    const [caretPosition, setCaretPosition] = useState({ x: 0, y: 0 });

    const [{ correctCharacters, nonEmptyCharacters, allWordsLength, accuracy, content, wpmStats, rawStats }, dispatch] =
      useReducer(reducer, initialState as ReducerState<State>);

    const caretRef = useRef<HTMLDivElement | null>(null);
    const wordsRef = useRef<Array<HTMLDivElement>>([]);

    function addToRefs(el: (typeof wordsRef.current)[number]) {
      if (el) {
        wordsRef.current.push(el);
      }
    }

    function moveCaret(x: number, y: number) {
      setCaretPosition({ x, y });
    }

    function isCorrect(letter: Element) {
      return letter.classList.contains(styles.correct);
    }

    function isIncorrect(letter: Element) {
      return letter.classList.contains(styles.incorrect);
    }

    function isEmpty(letter: Element) {
      return !isCorrect(letter) && !isIncorrect(letter);
    }

    function addWordToCount(word: Element) {
      const letters = word.children;
      let correct = true;
      let nonEmptyCount = 0;
      for (const letter of letters) {
        if (!isEmpty(letter)) nonEmptyCount++;
        if (isEmpty(letter) || isIncorrect(letter)) {
          word.classList.add(styles.error);
          correct = false;
        }
      }

      // We add 1 everywhere because our formula is supposed to account for spaces
      if (correct) {
        dispatch({ correctCharacters: correctCharacters + letters.length + 1 });
      }
      dispatch({ nonEmptyCharacters: nonEmptyCharacters + nonEmptyCount + 1 });
      dispatch({ allWordsLength: allWordsLength + letters.length + 1 });
    }

    function subtractWordFromCount(word: Element) {
      const letters = word.children;
      let correct = true;
      let nonEmptyCount = 0;
      for (let i = letters.length - 1; i >= 0; i--) {
        if (isEmpty(letters[i])) {
          correct = false;
        } else {
          if (isIncorrect(letters[i])) {
            correct = false;
          }
          nonEmptyCount++;
        }
      }

      // Analogically to our addition logic, we subtract 1 everywhere to account for spaces
      if (correct) {
        dispatch({ correctCharacters: correctCharacters - letters.length - 1 });
      }
      dispatch({ nonEmptyCharacters: nonEmptyCharacters - nonEmptyCount - 1 });
      dispatch({ allWordsLength: allWordsLength - letters.length - 1 });
    }

    // If the word is incorrect, the `correctCount` will return 0
    function calculateCurrentWord(word: Element) {
      let correctCount = 0;
      let nonEmptyCount = 0;
      let wordLength = 0;
      const letters = word.children;
      let correct = true;
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        if (isIncorrect(letter)) {
          correct = false;
          nonEmptyCount++;
        }
        if (isCorrect(letter)) {
          correctCount++;
          nonEmptyCount++;
        }
        if (isEmpty(letter)) {
          wordLength = i;
          break;
        }
      }
      if (!correct) correctCount = 0;
      return { correctCount, nonEmptyCount, wordLength };
    }

    function moveForwardOneWord() {
      const currentWord = wordsRef.current[wordIndex];
      if (!currentWord || !wordsRef.current[wordIndex + 1]) return;

      addWordToCount(currentWord);

      setWordIndex(wordIndex + 1);
      setWordCount((wc) => wc + 1);
      setLetterIndex(0);
    }

    function moveForwardOneLetter(key: string) {
      const currentWord = wordsRef.current[wordIndex];
      if (!currentWord) return;
      const currentLetter = currentWord.children[letterIndex];
      if (!currentLetter) return;

      if (key === currentLetter.textContent) {
        currentLetter.classList.add(styles.correct);
      } else {
        currentLetter.classList.add(styles.incorrect);
      }

      setLetterIndex(letterIndex + 1);

      // TODO: find a better spot for this? seems really really really really really really out of place
      // could technically remove the `if` because it's never supposed to happen on a time-based test
      if (mode === "words") {
        const nextWord = wordsRef.current[wordIndex + 1];
        if (letterIndex >= currentWord.children.length - 1 && !nextWord) {
          onFinished();
        }
      }
    }

    function moveBackOneWord() {
      const previousWord = wordsRef.current[wordIndex - 1];
      if (!previousWord) return;

      subtractWordFromCount(previousWord);
      previousWord.classList.remove(styles.error);

      const letters = previousWord.children;
      let index = letters.length;
      for (let i = letters.length - 1; i >= 0; i--) {
        if (isEmpty(letters[i])) {
          index = i;
        }
      }

      setWordIndex(wordIndex - 1);
      setWordCount((wc) => wc - 1);
      setLetterIndex(index);
    }

    function moveBackOneLetter() {
      const currentWord = wordsRef.current[wordIndex];
      const previousLetter = currentWord.children[letterIndex - 1];
      if (!previousLetter) return;

      clearLetter(previousLetter);
      setLetterIndex(letterIndex - 1);
    }

    function deletePreviousWord() {
      // If we're at letter index 0, then we clear all the way back to the previous word's front
      let newWordIndex = !letterIndex ? wordIndex - 1 : wordIndex;

      let word = wordsRef.current[newWordIndex];
      if (!word) return;

      if (newWordIndex < wordIndex) {
        subtractWordFromCount(word);
      }
      clearWord(word);

      setWordIndex(newWordIndex);
      setWordCount((wc) => (!letterIndex ? wc - 1 : wc));
      setLetterIndex(0);
    }

    function clearWord(el: Element) {
      el.classList.remove(styles.error);
      const letters = el.children;
      for (const child of letters) {
        clearLetter(child);
      }
    }

    function clearLetter(el: Element) {
      el.classList.remove(styles.correct, styles.incorrect);
    }

    function handleLineChange() {
      const currentWord = wordsRef.current[wordIndex];
      const nextWord = wordsRef.current[wordIndex + 1];
      if (!nextWord) return;
      if (currentWord.getBoundingClientRect().y < nextWord.getBoundingClientRect().y) {
        if (lineSkip) {
          setLineSkip(false);
          return;
        }
        let numberOfWordsToAddToPool = 0;
        let i = 0;
        while (wordsRef.current[i].getBoundingClientRect().y < currentWord.getBoundingClientRect().y && i < wordIndex) {
          numberOfWordsToAddToPool++;
          i++;
        }

        wordsRef.current.splice(0, numberOfWordsToAddToPool);

        const newWordPool = wordPool.slice(numberOfWordsToAddToPool);
        const newWords = onPoolUpdate(numberOfWordsToAddToPool, wordIndex);
        newWordPool.push(...createWordElements(newWords));

        setWordPool(newWordPool);
        const newIndex = wordIndex - numberOfWordsToAddToPool + 1;
        setWordIndex(newIndex);

        // TODO: FIX ACTUALLY UPDATING THE CONTENT
        dispatch({ content: content.concat(newWords) });
      }
    }

    function updateStats(delta: number) {
      const currentWord = wordsRef.current[wordIndex];
      if (!currentWord) return;

      // const { correctCount, nonEmptyCount } = calculateCurrentWord(currentWord);

      const newCorrectCount = correctCharacters;
      const newNonEmptyCount = nonEmptyCharacters;

      const wpm = calculateWpm(newCorrectCount, delta);
      const rawWpm = calculateWpm(newNonEmptyCount, delta);

      dispatch({ wpmStats: [...wpmStats, wpm] });
      dispatch({ rawStats: [...rawStats, rawWpm] });

      dispatch({ correctCharacters: newCorrectCount });
      dispatch({ nonEmptyCharacters: newNonEmptyCount });
      dispatch({ allWordsLength: allWordsLength });

      // if we ever somehow divide by 0 here we're in bigger trouble
      dispatch({ accuracy: newCorrectCount / newNonEmptyCount });

      handleChangeWpm(wpm);
    }

    function createWordElement() {
      // funny type idk if correct
      return createElement(Word as FunctionComponent<Word>, {
        word: generateWord(),
        ref: addToRefs,
        key: `word-${generateRandomString(7)}`,
      });
    }

    function createWordElements(words: string[]) {
      return words.map((word) =>
        createElement(Word as FunctionComponent<Word>, {
          word: word,
          ref: addToRefs,
          key: `word-${generateRandomString(7)}`,
        })
      );
    }

    function reset() {
      setWordIndex(0);
      setLetterIndex(0);
      setLineSkip(true);
      wordsRef.current = [];
      dispatch(initialState);
      setWordPool(createWordElements(initialContent));
      dispatch({ content: initialContent });
    }

    // Not sure if this is better than keeping the dependencies in useEffect(), I'll keep it for now
    const handleKeyDown = useCallback(
      (e: globalThis.KeyboardEvent) => {
        // TODO: maybe name it better xd
        if (e.key === "Space") e.preventDefault();
        const result = onKeyDown(e);
        if (result) return;
        if (e.key.length === 1) {
          if (e.ctrlKey && e.key !== "a") return;
          e.preventDefault();
          if (e.key === " ") {
            if (letterIndex) {
              moveForwardOneWord();
            }
            handleLineChange();
          } else {
            moveForwardOneLetter(e.key);
          }
        } else {
          if (e.key === "Backspace") {
            if (e.ctrlKey) {
              deletePreviousWord();
            } else {
              if (!letterIndex) {
                moveBackOneWord();
              } else {
                moveBackOneLetter();
              }
            }
          }
        }
      },
      [wordIndex, letterIndex, focused, running]
    );

    // Initialize the pool
    // TODO: code duplication? initialization is the same as resetting the test
    useEffect(() => {
      reset();
    }, []);

    useEffect(() => {
      const currentWord = wordsRef.current[wordIndex];
      if (!currentWord) return;

      const currentLetter = currentWord.children[letterIndex];
      if (currentLetter) {
        const { left, top } = currentLetter.getBoundingClientRect();
        moveCaret(left, top);
      } else {
        const previousLetter = currentWord.children[letterIndex - 1];
        if (!previousLetter) return;
        const { right, top } = previousLetter.getBoundingClientRect();
        moveCaret(right, top);
      }
    }, [wordIndex, letterIndex, windowSize, wordPool]);

    // NOTE: WPM only affects the visual real-time WPM counter, it does not change our state.
    // WpmStats and RawStats are affected, though - keep that in mind.
    // TODO: THIS ENTIRE FILE HAS TO BE CLEANED UP ONE DAY HOLY KAPPA CHUNGUS

    function onFinished() {
      handleFinish();
      console.log("We just called handleFinish()");
      console.log("Do we call it before the crash?");
      const currentWord = wordsRef.current[wordIndex];
      const { correctCount, nonEmptyCount } = calculateCurrentWord(currentWord);

      const newCorrectCount = correctCharacters + correctCount;
      const newNonEmptyCount = nonEmptyCharacters + nonEmptyCount;

      const testDuration = (new Date().getTime() - startTime) / 1000;
      console.log("Test duration at the end:", testDuration);
      const wpm = calculateWpm(newCorrectCount, testDuration);
      const rawWpm = calculateWpm(newNonEmptyCount, testDuration);

      // Prevent dividing by 0
      console.log("new correct count:", newCorrectCount);
      let acc = newCorrectCount / newNonEmptyCount;
      if (!Number.isFinite(acc)) acc = 0;
      console.log("ACC:", acc);
      const score: Partial<ScoreType> = {
        wpm,
        rawWpm,
        mode: mode,
        modeSetting: modeSetting,
        accuracy: acc,
        wpmStats: [...wpmStats, wpm],
        rawStats: [...rawStats, rawWpm],
        content: content.join(" "),
        language: "english",
      };
      console.log("The content we're saving:", score.content);
      handleSaveScore(score);
    }

    useEffect(() => {
      if (running && !finished) {
        console.log("Correct chars:", correctCharacters);
        updateStats(timePassed);
        if (mode === "time" && timePassed >= modeSetting) {
          onFinished();
        }
        // TODO: (if mode === "words" && timePassed > 60) or something like that
      }
    }, [timePassed]);

    // TODO: I think it keeps getting called if you re-enter the race.
    // TODO: Also, it seems to run for people that haven't even joined the race, lol. not good.
    // TODO: mayhaps unnecessary? :D
    useEffect(() => {
      if (finished) {
        // console.log("Do we call it before the crash?");
        // const currentWord = wordsRef.current[wordIndex];
        // const { correctCount, nonEmptyCount } = calculateCurrentWord(currentWord);
        //
        // const newCorrectCount = correctCharacters + correctCount;
        // const newNonEmptyCount = nonEmptyCharacters + nonEmptyCount;
        //
        // const testDuration = (new Date().getTime() - startTime) / 1000;
        // console.log("Test duration at the end:", testDuration);
        // const wpm = calculateWpm(newCorrectCount, testDuration);
        // const rawWpm = calculateWpm(newNonEmptyCount, testDuration);
        //
        // const score: Partial<ScoreType> = {
        //   wpm,
        //   rawWpm,
        //   mode: mode,
        //   modeSetting: modeSetting,
        //   accuracy: newCorrectCount / newNonEmptyCount,
        //   wpmStats: [...wpmStats, wpm],
        //   rawStats: [...rawStats, rawWpm],
        //   content:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        //   language: "english",
        // };
        // handleSaveScore(score);
      }
    }, [finished]);

    const handleResize = useCallback(() => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, [windowSize]);

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("resize", handleResize);
      };
    }, [handleKeyDown, handleResize]);

    useImperativeHandle(ref, () => ({
      reset,
    }));

    return (
      <>
        <div className={styles.words}>{wordPool.map((word) => word)}</div>
        <Caret x={caretPosition.x} y={caretPosition.y} running={running} focused={focused} ref={caretRef} />
      </>
    );
  }
);
