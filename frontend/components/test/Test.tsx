"use client";

import { Word } from "@/components/test/Word";
import { useCallback, useEffect, useRef, useState } from "react";
import { Caret } from "@/components/test/Caret";
import styles from "./Test.module.css";

const words: string[] = [
  "after",
  "how",
  "thing",
  "right",
  "against",
  "of",
  "both",
  "day",
  "those",
  "most",
  "what",
  "give",
  "present",
  "under",
  "after",
  "how",
  "thing",
  "right",
  "against",
  "of",
  "both",
  "day",
  "those",
  "most",
  "what",
  "give",
  "present",
  "under",
  "most",
  "what",
  "give",
  "present",
  "under",
  "after",
];

export function Test() {
  const [active, setActive] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  const [wordPool, setWordPool] = useState<Array<string>>([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
  ]);

  const ref = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<Array<HTMLDivElement>>([]);
  const caretRef = useRef<HTMLDivElement | null>(null);

  // maybe no need for this function
  function moveCaret(x: number, y: number) {
    setCaretPosition({ x, y });
  }
  const [caretPosition, setCaretPosition] = useState({ x: -999, y: -999 });

  function goForwardOneLetter(input: string) {
    const currentWord = wordsRef.current[wordIndex];
    const letters = currentWord.children;
    const nextLetter = letters[letterIndex + 1] as HTMLElement;
    const currentLetter = letters[letterIndex] as HTMLElement;

    if (!currentLetter) return;
    const correct = currentLetter.textContent == input;
    currentLetter.classList.add(correct ? styles.correct : styles.incorrect);

    if (!nextLetter) {
      const { right, top } = currentLetter.getBoundingClientRect();
      moveCaret(right, top);
      setLetterIndex(letterIndex + 1);
      return;
    }
    // go to next word
    setLetterIndex(letterIndex + 1);
    const { left, top } = nextLetter.getBoundingClientRect();
    moveCaret(left, top);
  }

  function goForwardOneWord() {
    const nextWord = wordsRef.current[wordIndex + 1] as HTMLElement | undefined;

    if (!nextWord) return;

    setLetterIndex(0);
    setWordIndex(wordIndex + 1);
    const { left, top } = nextWord.getBoundingClientRect();
    moveCaret(left, top);
  }

  function goBackOneLetter() {
    const currentWord = wordsRef.current[wordIndex];
    const letters = currentWord.children;
    const previousLetter = letters[letterIndex - 1] as HTMLElement | undefined;

    if (!previousLetter) return;

    previousLetter.classList.remove(styles.correct, styles.incorrect);
    setLetterIndex(letterIndex - 1);
    const { left, top } = previousLetter.getBoundingClientRect();
    moveCaret(left, top);
  }

  function goBackOneWord() {
    const currentWord = wordsRef.current[wordIndex];
    const previousWord = wordsRef.current[wordIndex - 1] as HTMLElement | undefined;

    for (const letter of currentWord.children) {
      letter.classList.remove(styles.correct, styles.incorrect);
    }

    if (!previousWord) {
      setLetterIndex(0);
      const { left, top } = currentWord.getBoundingClientRect();
      moveCaret(left, top);
      return;
    }

    setLetterIndex(previousWord.children.length);
    setWordIndex(wordIndex - 1);
    const { right, top } = previousWord.getBoundingClientRect();
    moveCaret(right, top);
  }

  function clearWord() {
    const currentWord = wordsRef.current[wordIndex];

    for (const letter of currentWord.children) {
      letter.classList.remove(styles.correct, styles.incorrect);
    }

    if (!currentWord) return;

    setLetterIndex(0);
    const { left, top } = currentWord.getBoundingClientRect();
    moveCaret(left, top);
  }

  function moveToNextLine() {
    const previousWord = wordsRef.current[wordIndex - 1];
    if (!previousWord) return;
    const currentWord = wordsRef.current[wordIndex];
    const { top: previousTop } = previousWord.getBoundingClientRect();
    const { top: currentTop } = currentWord.getBoundingClientRect();
    if (currentTop !== previousTop) {
      for (const word of wordsRef.current) {
        word.style.transform = `translateY(-100%)`;
      }
    }
  }

  function handleClick(e: globalThis.MouseEvent) {
    setActive(ref.current?.contains(e.target));
  }

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
      if (e.key == "[") {
        return;
      }
      moveToNextLine();
      if (e.key.length == 1) {
        if (e.key == " ") {
          goForwardOneWord();
        } else {
          goForwardOneLetter(e.key);
        }
      } else {
        if (e.key == "Backspace") {
          if (!letterIndex) {
            clearWord();
            goBackOneWord();
          } else {
            if (e.ctrlKey) {
              clearWord();
            } else {
              goBackOneLetter();
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    const firstWord = wordsRef.current[0];
    if (!firstWord) return;
    const { left, top } = firstWord.getBoundingClientRect();
    moveCaret(left, top);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClick, handleKeyDown]);
  return (
    <div className={styles.box} ref={ref}>
      <div className={styles.words}>
        {wordPool.map((word, index) => (
          <Word
            word={word}
            key={index}
            id={`word-${index}`}
            ref={(el: HTMLDivElement) => el && (wordsRef.current[index] = el)}
          />
        ))}
      </div>
      <Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
      <p>{active ? "ACTIVE" : "INACTIVE"}</p>
    </div>
  );
}
