"use client";

import { Word } from "@/components/test/Word";
import { CreateScoreInput, CreateScoreInput as CreateScoreInputType } from "@/graphql/generated/graphql";
import React, {
  createElement,
  FC,
  FunctionComponentElement,
  MutableRefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import styles from "./Test.module.css";
import { Caret } from "@/components/test/Caret";
import { calculateWpm } from "@/utils/calculateWpm";
import { generateRandomString } from "@/utils/generateRandomString";

const MAX_TEST_DURATION = 60;

export type FinishConditionsType = {
  maxWordCount?: number;
  maxDuration?: number;
};

export type TestScoreType = Omit<CreateScoreInputType, "mode" | "modeSetting" | "language">;

interface Props {
  focused: boolean;
  running: boolean;
  finished: boolean;
  setFinished: () => void;

  timePassed: number;
  // modeSetting: number;
  startTime: number;

  finishConditions: FinishConditionsType;

  // mode: string;
  // language: string;

  onKeyDown: (e: globalThis.KeyboardEvent) => void;
  preventInput: boolean;
  onPoolUpdate: (count: number) => string[];
  handleFinish: () => void;
  handleChangeWpm: (wpm: number) => void;
  handleSaveScore: (score: TestScoreType) => void;
  setWordCount: (value: ((prevState: number) => number) | number) => void;
  showCaret: boolean;

  innerRef?: MutableRefObject<HTMLDivElement | null>;

  initialContent: string[];
}

export type TestMethods = {
  reset: () => void;
};

type State = {
  correctCharacters: number;
  nonEmptyCharacters: number;
  allWordsLength: number;
  accuracy: number;
  content: string[];
  wpmStats: number[];
  rawStats: number[];
};

type Action = Partial<State>;

const reducer = (current: State, update: Action): State => ({ ...current, ...update });

const initialState: State = {
  correctCharacters: 0,
  nonEmptyCharacters: 0,
  allWordsLength: 0,
  accuracy: 0,
  content: [],
  wpmStats: [],
  rawStats: [],
};

export const Test: FC<Props> = ({
  focused,
  running,
  finished,
  timePassed,
  startTime,
  finishConditions,
  setFinished,
  onKeyDown,
  preventInput,
  onPoolUpdate,
  handleFinish,
  handleChangeWpm,
  handleSaveScore,
  setWordCount,
  showCaret,
  innerRef,
  initialContent,
}) => {
  const wordsRef = useRef<Array<HTMLDivElement>>([]);
  const wordsDivRef = useRef<HTMLDivElement | null>(null);

  const [wordIndex, setWordIndex] = useState(-1);
  const [letterIndex, setLetterIndex] = useState(-1);
  const [lineSkip, setLineSkip] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [wordPool, setWordPool] = useState<Array<FunctionComponentElement<typeof Word>>>([]);
  const [caretPosition, setCaretPosition] = useState({ x: 500, y: 500 });
  const [lastLayoutShiftTime, setLastLayoutShiftTime] = useState(0);

  // funniest type ever, gives a squiggly but passes the build stage? xD whereas if there's no squiggly, the build breaks? XD
  const [{ correctCharacters, nonEmptyCharacters, allWordsLength, accuracy, content, wpmStats, rawStats }, dispatch] =
    useReducer(reducer, initialState);

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
        const newWordPool = wordPool.slice();
        const newWords = onPoolUpdate(wordIndex);
        newWordPool.push(...createWordElements(newWords));

        setWordPool(newWordPool);

        dispatch({ content: content.concat(newWords) });

        setLineSkip(false);
      } else {
        let numberOfWordsToAddToPool = 0;
        let i = 0;
        while (wordsRef.current[i].getBoundingClientRect().y < currentWord.getBoundingClientRect().y && i < wordIndex) {
          numberOfWordsToAddToPool++;
          i++;
        }

        wordsRef.current.splice(0, numberOfWordsToAddToPool);

        const newWordPool = wordPool.slice(numberOfWordsToAddToPool);
        const newWords = onPoolUpdate(numberOfWordsToAddToPool);
        newWordPool.push(...createWordElements(newWords));

        setWordPool(newWordPool);
        const newIndex = wordIndex - numberOfWordsToAddToPool + 1;
        setWordIndex(newIndex);

        dispatch({ content: content.concat(newWords) });
      }
    }
  }

  function updateStats(delta: number) {
    const currentWord = wordsRef.current[wordIndex];
    if (!currentWord) return;

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
    dispatch({ accuracy: newCorrectCount / (newNonEmptyCount ?? 1) });

    handleChangeWpm(wpm);
  }

  function createWordElements(words: string[]) {
    return words.map(
      (word, index) =>
        createElement(Word, {
          word,
          wordIndex: index,
          ref: addToRefs,
          key: `${word}-${generateRandomString(7)}`, // TODO: stop using random
        }) as unknown as FunctionComponentElement<typeof Word>
    );
  }

  function reset() {
    setWordIndex(0);
    setLetterIndex(0);
    setLineSkip(true);
    wordsRef.current = [];
    setWordPool(createWordElements(initialContent));
    dispatch({ ...initialState, content: initialContent });
    if (wordsDivRef?.current) wordsDivRef.current!.focus();
  }

  // Not sure if this is better than keeping the dependencies in useEffect(), I'll keep it for now
  /* prettier-ignore */
  const handleKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === " ") e.preventDefault();
    if (preventInput) {
      console.log("We just prevented input!");
      return;
    };
    onKeyDown(e);
    // TODO: maybe name it better xd (name what? xd)
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
        } else if (!letterIndex) {
          moveBackOneWord();
        } else {
          moveBackOneLetter();
        }
      }
    }
  }, [wordIndex, letterIndex, focused, running, finished, preventInput]);

  useEffect(() => {
    reset();
  }, []);

  function shouldFinish(): boolean {
    if (finished) return false;

    const currentWord = wordsRef.current[wordIndex];
    if (!currentWord) return true;

    const nextWord = wordsRef.current[wordIndex + 1];
    let result = false;
    result ||= letterIndex > currentWord.children.length - 1 && !nextWord;
    if (finishConditions.maxWordCount) result ||= wordIndex >= finishConditions.maxWordCount;
    if (finishConditions.maxDuration) {
      result ||= timePassed >= finishConditions.maxDuration;
    }
    result ||= timePassed >= MAX_TEST_DURATION;
    return result;
  }

  function onFinish() {
    handleFinish();

    const currentWord = wordsRef.current[wordIndex];
    if (!currentWord) return;

    const { correctCount, nonEmptyCount } = calculateCurrentWord(currentWord);

    const newCorrectCount = correctCharacters + correctCount;
    const newNonEmptyCount = nonEmptyCharacters + nonEmptyCount;

    const testDuration = (new Date().getTime() - new Date(startTime).getTime()) / 1000;

    const wpm = calculateWpm(newCorrectCount, testDuration);
    const rawWpm = calculateWpm(newNonEmptyCount, testDuration);

    // Prevent division by 0
    let acc = newCorrectCount / newNonEmptyCount;
    if (!Number.isFinite(acc)) acc = 0;

    const score: TestScoreType = {
      wpm,
      rawWpm,
      accuracy: acc,
      wpmStats: [...wpmStats, wpm],
      rawStats: [...rawStats, rawWpm],
      content: content.join(" "),
    };
    console.log("WE just called onfinish");
    handleSaveScore(score);
  }

  useEffect(() => {
    const currentWord = wordsRef.current[wordIndex];
    if (!currentWord) return;

    if (shouldFinish()) {
      setFinished();
    }

    // Caret movement
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
  }, [wordIndex, letterIndex, wordPool, windowSize, lastLayoutShiftTime]);

  useEffect(() => {
    if (running && !finished) {
      updateStats(timePassed);

      if (shouldFinish()) {
        setFinished();
      }
    }
  }, [timePassed]);

  useEffect(() => {
    if (finished) {
      onFinish();
    }
  }, [finished]);

  const handleResize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, [windowSize]);

  useEffect(() => {
    if (wordsDivRef?.current) wordsDivRef.current!.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      if (wordsDivRef?.current) wordsDivRef.current!.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleKeyDown, handleResize]);

  // Makes sure the caret will follow the text on the event of layout shifts
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "layout-shift") {
        // @ts-ignore // `.lastInputTime` exists on entry if `.entryType === "layout-shift"`
        setLastLayoutShiftTime(entry.lastInputTime);
      }
    }
  });

  useEffect(() => {
    observer.observe({ type: "layout-shift", buffered: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wordsWrapper} ref={innerRef}>
      <div className={styles.words} ref={wordsDivRef} tabIndex={-1}>
        {wordPool.map((word) => word)}
      </div>
      <Caret x={caretPosition.x} y={caretPosition.y} blinking={running} hidden={showCaret && focused} />
    </div>
  );
};
