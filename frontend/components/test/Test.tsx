"use client";

import { Word } from "@/components/test/Word";
import { Score } from "@/graphql/generated/graphql";
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

interface Props {
  focused: boolean;
  running: boolean;
  finished: boolean;
  time: number;
  timeSetting: number;
  handleChangeWpm: (wpm: number) => void;
  handleStart: () => void;
  onDataUpdate: (score: Score) => void; // danger zone
}

interface TestMethods {
  reset: () => void;
}

type State = {
  correctCharacters: number;
  nonEmptyCharacters: number; // correct && incorrect, used for calculating raw
  allWordsLength: number;
  // type: string; // test type TODO
};

const reducer = (current: State, update: Partial<State>) => ({ ...current, ...update });

const initialState: State = {
  correctCharacters: 0,
  nonEmptyCharacters: 0,
  allWordsLength: 0,
};

export const Test = forwardRef<TestMethods, Props>(
  ({ focused, running, finished, time, timeSetting, handleChangeWpm, handleStart, onDataUpdate }: Props, ref) => {
    const [wordIndex, setWordIndex] = useState(-1);
    const [letterIndex, setLetterIndex] = useState(-1);
    const [lineSkip, setLineSkip] = useState(true);

    // A funny type, but I think correct nonetheless
    const [wordPool, setWordPool] = useState<Array<ReactElement<Word>>>([]);
    const [caretPosition, setCaretPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const [{ correctCharacters, nonEmptyCharacters, allWordsLength }, dispatch] = useReducer(
      reducer,
      initialState as ReducerState<State>
    );

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

      if (correct) {
        dispatch({ correctCharacters: correctCharacters + letters.length });
      }
      dispatch({ nonEmptyCharacters: nonEmptyCharacters + nonEmptyCount });
      dispatch({ allWordsLength: allWordsLength + letters.length });
    }

    /* Returns the index which the cursor should be moved to.
     * Not a good idea to have it here I think, but can't think of any other way
     * to avoid duplicating the loop. */
    function subtractWordFromCount(word: Element): number {
      const letters = word.children;
      let correct = true;
      let nonEmptyCount = 0;
      let index = letters.length;
      for (let i = letters.length - 1; i >= 0; i--) {
        if (isEmpty(letters[i])) {
          correct = false;
          index = i;
        } else {
          if (isIncorrect(letters[i])) {
            correct = false;
          }
          nonEmptyCount++;
        }
      }
      if (correct) {
        dispatch({ correctCharacters: correctCharacters - letters.length });
      }
      dispatch({ nonEmptyCharacters: nonEmptyCharacters - nonEmptyCount });
      dispatch({ allWordsLength: allWordsLength - letters.length });
      return index;
    }

    function moveForwardOneWord() {
      // if `wordsRef.current[wordIndex + 1]` is undefined then we're in trouble, so I keep it in for now to find bugs
      // TODO: good to check assuming i have a test that doesnt involve a pool, like just a simple sentence
      const currentWord = wordsRef.current[wordIndex];
      if (!currentWord) return;

      addWordToCount(currentWord);

      setWordIndex(wordIndex + 1);
      setLetterIndex(0);
    }

    function moveForwardOneLetter(key: string) {
      const currentWord = wordsRef.current[wordIndex];
      if (!currentWord) return;
      const currentLetter = currentWord.children[letterIndex];
      if (!currentLetter) return;

      if (key == currentLetter.textContent) {
        currentLetter.classList.add(styles.correct);
      } else {
        currentLetter.classList.add(styles.incorrect);
      }

      setLetterIndex(letterIndex + 1);
    }

    function moveBackOneWord() {
      const previousWord = wordsRef.current[wordIndex - 1];
      if (!previousWord) return;

      previousWord.classList.remove(styles.error);

      let index = subtractWordFromCount(previousWord);

      setWordIndex(wordIndex - 1);
      setLetterIndex(index);
    }

    function moveBackOneLetter() {
      const currentWord = wordsRef.current[wordIndex];
      const previousLetter = currentWord.children[letterIndex - 1];
      if (!previousLetter) return;

      clearLetter(previousLetter);
      setLetterIndex(letterIndex - 1);
    }

    // TODO: Figure out a better name for the function that reflects its purpose more clearly
    function deletePreviousWord() {
      // if we're at letter index 0, then we clear all the way back to the previous word's front
      let newWordIndex = !letterIndex ? wordIndex - 1 : wordIndex;
      let word = wordsRef.current[newWordIndex];
      if (!word) return;
      clearWord(word);

      setWordIndex(newWordIndex);
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
        // There might be a better way to do this line skip but oh well
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
        const newWordPool = wordPool.slice(numberOfWordsToAddToPool);
        for (let i = 0; i < numberOfWordsToAddToPool; i++) {
          wordsRef.current.shift();
          newWordPool.push(createWordElement());
        }

        setWordPool(newWordPool);
        const newIndex = wordIndex - numberOfWordsToAddToPool + 1;
        setWordIndex(newIndex);
      }
    }

    function createWordElement() {
      // funny type idk if correct
      return createElement(Word as FunctionComponent<Word>, {
        word: generateWord(),
        ref: addToRefs,
        key: `word-${generateRandomString(5)}`,
      });
    }

    function reset() {
      setWordIndex(0);
      setLetterIndex(0);
      setLineSkip(true);
      let words = [];
      wordsRef.current = [];
      for (let i = 0; i < 20; i++) {
        words.push(createWordElement());
      }
      setWordPool(words);
      // TODO: i likely dont need to do n lines like that
      dispatch({ correctCharacters: 0 });
      dispatch({ nonEmptyCharacters: 0 });
      dispatch({ allWordsLength: 0 });
    }

    // Not sure if this is better than keeping the dependencies in useEffect(), I'll keep it for now
    const handleKeyDown = useCallback(
      (e: globalThis.KeyboardEvent) => {
        if (finished || !focused) return;
        if (!running) handleStart();
        if (e.key.length == 1) {
          e.preventDefault();
          if (e.key == " ") {
            if (letterIndex) {
              moveForwardOneWord();
            }
            handleLineChange();
          } else {
            moveForwardOneLetter(e.key);
          }
        } else {
          if (e.key == "Backspace") {
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
    useEffect(() => {
      let words = [];
      for (let i = 0; i < 20; i++) {
        words.push(createWordElement());
      }
      setWordPool(words);
      setWordIndex(0);
      setLetterIndex(0);
    }, []);

    // Caret movement
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
    }, [wordIndex, letterIndex]);

    function handleUpdateData(data: any) {
      onDataUpdate(data);
    }

    useEffect(() => {
      if (finished) {
        const currentWord = wordsRef.current[wordIndex];
        const letters = currentWord.children;
        let correct = 0;
        for (const letter of letters) {
          if (isEmpty(letter)) break;
          if (isIncorrect(letter)) return;
          if (isCorrect(letter)) correct++;
        }
        dispatch({ correctCharacters: correctCharacters + correct });
        // cant believe this shit actually works lol TODO: CLEAN THIS CODE UP IT'S TRAGIC AND TEMPORARY
        // danger zone
        const score: Partial<Score> = {
          time: timeSetting,
          rawWpm: (nonEmptyCharacters / 5) * (60 / timeSetting),
          averageWpm: (correctCharacters / 5) * (60 / timeSetting),
        };
        handleUpdateData(score);
      }
    }, [finished]);

    useEffect(() => {
      // TODO: something's funky with the formula idk
      const delta = timeSetting - time;
      // Every time tick, we re-measure the WPM accounting for the current word (which has not been counted yet)
      if (delta > 0) {
        const currentWord = wordsRef.current[wordIndex];
        const letters = currentWord.children;
        let correct = true;
        let correctCount = 0;
        for (const letter of letters) {
          if (isIncorrect(letter)) {
            correct = false;
            break;
          } else if (isCorrect(letter)) {
            correctCount++;
          }
        }
        let n = correctCharacters;
        if (correct) {
          n += correctCount;
        }
        handleChangeWpm((n / 5) * (60 / delta));
      }
    }, [time]);

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    useImperativeHandle(ref, () => ({
      reset,
    }));

    return (
      <>
        <div className={styles.words}>{wordPool.map((word) => word)}</div>
        <Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
        {finished && <h1>FINISHED</h1>}
      </>
    );
  }
);
