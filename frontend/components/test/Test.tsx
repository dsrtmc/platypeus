"use client";

import { Word } from "@/components/test/Word";
import {
  createElement,
  FunctionComponent,
  ReactElement,
  ReducerState,
  useCallback,
  useEffect,
  useMemo,
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
  handleStart: () => void;
}

type State = {
  correctCharacters: number;
  nonEmptyCharacters: number; // correct && incorrect, used for calculating raw
  allWordsLength: number;
  // type: string; // test type TODO
};

type Action =
  | { type: "ADD-CORRECT-CHARACTERS"; payload: { count: number } }
  | { type: "ADD-NON-EMPTY-CHARACTERS"; payload: { count: number } }
  | { type: "SUBTRACT-CORRECT-CHARACTERS"; payload: { count: number } }
  | { type: "SUBTRACT-NON-EMPTY-CHARACTERS"; payload: { count: number } }
  | { type: "INCREMENT-WORDS-LENGTH"; payload: { count: number } }
  | { type: "DECREMENT-WORDS-LENGTH"; payload: { count: number } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD-CORRECT-CHARACTERS":
      return { ...state, correctCharacters: state.correctCharacters + action.payload.count };
    case "SUBTRACT-CORRECT-CHARACTERS":
      return { ...state, correctCharacters: state.correctCharacters - action.payload.count };
    case "ADD-NON-EMPTY-CHARACTERS":
      return { ...state, nonEmptyCharacters: state.nonEmptyCharacters + action.payload.count };
    case "SUBTRACT-NON-EMPTY-CHARACTERS":
      return { ...state, nonEmptyCharacters: state.nonEmptyCharacters - action.payload.count };
    case "INCREMENT-WORDS-LENGTH":
      return { ...state, allWordsLength: state.allWordsLength + action.payload.count };
    case "DECREMENT-WORDS-LENGTH":
      return { ...state, allWordsLength: state.allWordsLength - action.payload.count };
    default:
      return state;
  }
};

const initialState: State = {
  correctCharacters: 0,
  nonEmptyCharacters: 0,
  allWordsLength: 0,
};

export function Test({ focused, running, finished, time, timeSetting, handleStart }: Props) {
  const [wordIndex, setWordIndex] = useState(-1);
  const [letterIndex, setLetterIndex] = useState(-1);
  const [lineSkip, setLineSkip] = useState(true);

  // A funny type, but I think correct nonetheless
  const [wordPool, setWordPool] = useState<Array<ReactElement<Word>>>([]);
  const [caretPosition, setCaretPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [wpm, setWpm] = useState(0);
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

  // TODO: maybe move caret in a separate useEffect? basically just move caret based on word/letter indices?
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

  function moveForwardOneWord() {
    // if `wordsRef.current[wordIndex + 1]` is undefined then we're in trouble, so I keep it in for now to find bugs
    // NOTE: good to check assuming i have a test that doesnt involve a pool, like just a simple sentence
    const currentWord = wordsRef.current[wordIndex];
    if (!currentWord) return;

    let correct = true;
    let nonEmptyCount = 0;
    const letters = wordsRef.current[wordIndex].children;
    // TODO: my head hurts I can't be thinking about improving this if right now but it can be better
    for (const letter of letters) {
      if (!isEmpty(letter)) nonEmptyCount++;
      if (isEmpty(letter) || isIncorrect(letter)) {
        currentWord.classList.add(styles.error);
        correct = false;
      }
    }

    console.log("NON EMPTY COUNT:", nonEmptyCount);
    // danger zone
    if (correct) {
      dispatch({ type: "ADD-CORRECT-CHARACTERS", payload: { count: letters.length } });
    }
    dispatch({ type: "ADD-NON-EMPTY-CHARACTERS", payload: { count: nonEmptyCount } });
    dispatch({ type: "INCREMENT-WORDS-LENGTH", payload: { count: letters.length } });
    // danger zone

    setWordIndex(wordIndex + 1);
    setLetterIndex(0);
  }

  function moveForwardOneLetter(key: string) {
    const currentWord = wordsRef.current[wordIndex];
    if (!currentWord) return;
    const currentLetter = currentWord.children[letterIndex];
    if (!currentLetter) return;

    // coloring TODO: a function for coloring?
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

    const letters = previousWord.children;
    let correct = true;
    let nonEmptyCount = 0;
    let index = previousWord.children.length;
    for (let i = letters.length - 1; i >= 0; i--) {
      const letter = letters[i];
      // TODO: again, think about this if lol
      if (isIncorrect(letter)) {
        correct = false;
      }
      if (isEmpty(letter)) {
        correct = false;
        index = i;
      } else {
        nonEmptyCount++;
      }
    }
    if (correct) {
      dispatch({ type: "SUBTRACT-CORRECT-CHARACTERS", payload: { count: letters.length } });
    }
    dispatch({ type: "SUBTRACT-NON-EMPTY-CHARACTERS", payload: { count: nonEmptyCount } });
    dispatch({ type: "DECREMENT-WORDS-LENGTH", payload: { count: letters.length } });

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

  // figure out a better name for the function that reflects its purpose more clearly
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

  // Not sure if this is better than keeping the dependencies in useEffect(), I'll keep it for now
  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (!focused) return;
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

  // danger zone
  // THIS ONE DOESN'T EVEN WORK IT'S RNG WHETHER IT LOGS IT BEFORE UNMOUNTING OR NOT
  useEffect(() => {
    if (finished) {
      const currentWord = wordsRef.current[wordIndex];
      const letters = currentWord.children;
      let correct = 0;
      for (const letter of letters) {
        if (isIncorrect(letter)) {
          return;
        }
        if (isCorrect(letter)) correct++;
      }
      dispatch({ type: "ADD-CORRECT-CHARACTERS", payload: { count: correct } });
      console.log("The correct letters we were supposed to add to count:", correct);
      console.info("ENDING WPM", wpm);
    }
  }, [finished]);

  useEffect(() => {
    console.log("Characters:", correctCharacters);
    // TODO: something's funky with the formula idk
    const delta = timeSetting - time;
    if (delta > 0) {
      // XDD
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
      console.log("Current word is correct:", correct);
      console.log("Current word's correct letters:", correctCount);
      setWpm((n / 5) * (60 / delta));
    }
  }, [time]);
  // danger zone

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <div className={styles.words}>{wordPool.map((word) => word)}</div>
      {/* not sure if it's good but it makes sure that we don't draw the caret at { x: 0, y: 0 } before word/letter indices are initialized */}
      {wordIndex >= 0 && (
        <Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
      )}
      <h5>current wpm: {wpm}</h5>
    </>
  );
}
