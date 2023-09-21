"use client";

import { Word } from "@/components/test/Word";
import {
  createElement,
  FunctionComponent,
  FunctionComponentElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Test.module.css";
import { generateWord, generateWords } from "@/utils/generateWords";
import { generateRandomString } from "@/utils/generateRandomString";
import { Caret } from "@/components/test/Caret";

interface Props {
  active: boolean;
  running: boolean;
  finished: boolean;
  handleStart: () => void;
}

export function Test({ active, running, finished, handleStart }: Props) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  // A funny type, but I think correct nonetheless
  const [wordPool, setWordPool] = useState<Array<ReactElement<Word>>>([]);
  const [caretPosition, setCaretPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Useful for skipping the first line during our line change
  const [lineSkip, setLineSkip] = useState(true);

  const caretRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<Array<HTMLDivElement>>([]);

  // likely very unnecessary
  function addToRefs(el: (typeof wordsRef.current)[number]) {
    wordsRef.current.push(el);
  }

  function moveCaret(x: number, y: number) {
    setCaretPosition({ x, y });
  }

  function moveForwardOneWord() {
    // `wordsRef.current[wordIndex + 1]` can be undefined because our refs array is fucked and has nulls for some reason
    if (!wordsRef.current[wordIndex] || !wordsRef.current[wordIndex + 1]) return;
    const { left, top } = wordsRef.current[wordIndex + 1].getBoundingClientRect();
    moveCaret(left, top);
    setWordIndex(wordIndex + 1);
    setLetterIndex(0);
  }

  function moveForwardOneLetter(key: string) {
    const currentWord = wordsRef.current[wordIndex];
    if (!currentWord) return;
    const currentLetter = currentWord.children[letterIndex];
    if (!currentLetter) return;
    const nextLetter = currentWord.children[letterIndex + 1];

    // coloring TODO: a function for coloring?
    if (key == currentLetter.textContent) {
      currentLetter.classList.add(styles.correct);
    } else {
      currentLetter.classList.add(styles.incorrect);
    }

    if (!nextLetter) {
      // Shouldn't ever be undefined; if it is, it means we increased the letter index
      // where we shouldn't have or forgot to reset it while changing words.
      const { right, top } = currentLetter.getBoundingClientRect();
      moveCaret(right, top);
    } else {
      const { left, top } = nextLetter.getBoundingClientRect();
      moveCaret(left, top);
    }
    setLetterIndex(letterIndex + 1);
  }

  function moveBackOneWord() {
    const previousWord = wordsRef.current[wordIndex - 1];
    if (!previousWord) return;
    const { right, top } = previousWord.getBoundingClientRect();
    moveCaret(right, top);
    setWordIndex(wordIndex - 1);
    setLetterIndex(previousWord.children.length);
  }

  function moveBackOneLetter() {
    const currentWord = wordsRef.current[wordIndex];
    const previousLetter = currentWord.children[letterIndex - 1];
    if (!previousLetter) return;
    const { left, top } = previousLetter.getBoundingClientRect();
    moveCaret(left, top);
    clearLetter(previousLetter);
    setLetterIndex(letterIndex - 1);
  }

  // Not too great of a function considering it deals with more than just "clearing" the word per se, but it's fine for now.
  function clearWord() {
    const currentWord = wordsRef.current[wordIndex];
    const letters = currentWord.children;
    const firstLetter = letters[0];
    if (!firstLetter) return; // not sure if that ever happens
    for (const child of letters) {
      clearLetter(child);
    }
    const { left, top } = firstLetter.getBoundingClientRect();
    moveCaret(left, top);
    setLetterIndex(0);
  }

  function clearLetter(el: Element) {
    el.classList.remove(styles.correct, styles.incorrect);
  }

  function handleLineChange() {
    const currentWord = wordsRef.current[wordIndex];
    const nextWord = wordsRef.current[wordIndex + 1];
    if (!nextWord) return; // happens because the array of refs has nulls for a funny reason
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
        newWordPool.push(
          createElement(Word as FunctionComponent<Word>, {
            word: generateWord(),
            ref: addToRefs,
            key: `word-${generateRandomString(5)}`,
          })
        );
      }
      setWordPool(newWordPool);
      const newIndex = wordIndex - numberOfWordsToAddToPool + 1;
      setWordIndex(newIndex);
      const { left, top } = wordsRef.current[newIndex].getBoundingClientRect();
      moveCaret(left, top);
    }
  }

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
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
          if (!letterIndex) {
            moveBackOneWord();
          } else {
            if (e.ctrlKey) {
              clearWord();
            } else {
              moveBackOneLetter();
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    let words = [];
    for (let i = 0; i < 20; i++) {
      words.push(
        // Again, a very funny type but lol maybe it's correct
        createElement(Word as FunctionComponent<Word>, {
          word: generateWord(),
          ref: addToRefs,
          key: `word-${generateRandomString(5)}`,
        })
      );
    }
    setWordPool(words);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [wordIndex, letterIndex]);

  return (
    <>
      <div className={styles.words}>{wordPool.map((word) => word)}</div>
      <button
        onClick={() => {
          setWordPool([
            ...wordPool,
            createElement(Word as FunctionComponent<Word>, {
              word: generateWord(),
              ref: addToRefs,
              key: `word-${generateRandomString(5)}`,
            }),
          ]);
        }}
      >
        add random word
      </button>
      <button
        onClick={() => {
          console.log("pre:", wordsRef.current);
          wordsRef.current.shift();
          console.log("post:", wordsRef.current);
          setWordPool(wordPool.slice(1, wordPool.length));
        }}
      >
        remove first word
      </button>
      <button
        onClick={() => {
          console.log(wordsRef.current);
        }}
      >
        log refs
      </button>
      <button
        onClick={() => {
          for (const el of wordPool) {
            console.log(el);
          }
        }}
      >
        log elements
      </button>
      <button
        onClick={() => {
          console.log("Current word:", wordsRef.current[wordIndex]);
        }}
      >
        log current button
      </button>
      <Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
    </>
  );
}
