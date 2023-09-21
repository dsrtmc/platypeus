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
import { generateWord } from "@/utils/generateWords";
import { generateRandomString } from "@/utils/generateRandomString";
import { Caret } from "@/components/test/Caret";

interface Props {
  active: boolean;
  running: boolean;
  finished: boolean;
  handleStart: () => void;
}

// IGNORE EVERY CHANGES IN THIS FILE IT'S ONLY FOR FUN, TESTING AND "LEGACY" PURPOSES
export function Test({ active, running, finished, handleStart }: Props) {
  // A funny type, but I think correct nonetheless
  const [wordPool, setWordPool] = useState<Array<ReactElement<Word>>>([]);
  const [caretPosition, setCaretPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const wordsRef = useRef<any>([]);
  const caretRef = useRef<any>(null);
  function addToRefs(el: any) {
    // if (el && !wordsRef.current.includes(el)) {
    wordsRef.current.push(el);
    // }
  }

  useEffect(() => {
    let words = [];
    for (let i = 0; i < 6; i++) {
      words.push(
        // again, a very funny type but lol maybe it's correct
        createElement(Word as FunctionComponent<Word>, {
          word: generateWord(),
          ref: addToRefs,
          key: `word-${generateRandomString(5)}`,
        })
      );
    }
    setWordPool([...wordPool, ...words]);
    //moveCaret(wordsRef.current[0].getBoundingClientRect().x, wordsRef.current[0].getBoundingClientRect().y);
  }, []);

  useEffect(() => {
    console.log("nig:", wordsRef.current);
  }, []);

  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  function moveCaret(x: number, y: number) {
    setCaretPosition({ x, y });
  }

  function moveForwardOneWord() {
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
    if (!nextLetter) {
      // Shouldn't ever be undefined; if it is, it means we increased the letter index
      // where we shouldn't have or forgot to reset it while changing words.
      const { right, top } = currentLetter.getBoundingClientRect();
      moveCaret(right, top);
      setLetterIndex(letterIndex + 1);
    } else {
      const { left, top } = nextLetter.getBoundingClientRect();
      moveCaret(left, top);
      setLetterIndex(letterIndex + 1);
    }
  }

  function moveBackOneWord() {
    const previousWord = wordsRef.current[wordIndex - 1];
    if (!previousWord) return;
    const { right, top } = previousWord.getBoundingClientRect();
    moveCaret(right, top);
    setWordIndex(wordIndex - 1);
    setLetterIndex(previousWord.children.length - 1);
  }

  function moveBackOneLetter() {
    const currentWord = wordsRef.current[wordIndex];
    const previousLetter = currentWord.children[letterIndex - 1];
    if (!previousLetter) return;
    const { left, top } = previousLetter.getBoundingClientRect();
    moveCaret(left, top);
    setLetterIndex(letterIndex - 1);
  }

  function clearWord() {
    const currentWord = wordsRef.current[wordIndex];
    const firstLetter = currentWord.children[0];
    if (!firstLetter) return; // not sure if that ever happens
    const { left, top } = firstLetter.getBoundingClientRect();
    moveCaret(left, top);
    setLetterIndex(0);
  }

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
      if (!running) handleStart();
      if (e.key.length == 1) {
        e.preventDefault();
        if (e.key == " ") {
          moveForwardOneWord();
          // moveToNextLine();
        } else {
          moveForwardOneLetter(e.key);
        }
      } else {
        if (e.key == "Backspace") {
          if (!letterIndex) {
            // clearWord(); // unnecessary as of rn since I'm not using css
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
      <Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
    </>
  );
}
