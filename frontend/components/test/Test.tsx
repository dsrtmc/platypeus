"use client";

import { Word } from "@/components/test/Word";
import { useCallback, useEffect, useRef, useState } from "react";
import { Caret } from "@/components/test/Caret";
import { Letter } from "@/components/test/Letter";
import styles from "./Test.module.css";

export function Test() {
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
  ];
  const [active, setActive] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<Array<HTMLDivElement>>([]);
  const caretRef = useRef<HTMLDivElement | null>(null);

  function moveCaret(x: number, y: number) {
    if (!caretRef.current) return;
    caretRef.current!.style.left = `${x}px`;
    caretRef.current!.style.top = `${y}px`;
  }

  function goForwardOneLetter(input: string) {
    const currentWord = wordsRef.current[wordIndex];
    const letters = currentWord.children;
    const nextLetter = letters[letterIndex + 1] as HTMLElement;
    const currentLetter = letters[letterIndex] as HTMLElement;

    if (!currentLetter) return;
    const correct = currentLetter.textContent == input;
    currentLetter.classList.add(correct ? styles.correct : styles.incorrect);

    if (!nextLetter) {
      moveCaret(currentLetter.offsetLeft + currentLetter.offsetWidth, currentLetter.offsetTop);
      setLetterIndex(letterIndex + 1);
      return;
    }
    // go to next word
    setLetterIndex(letterIndex + 1);
    moveCaret(nextLetter.offsetLeft, nextLetter.offsetTop);
  }

  function goForwardOneWord() {
    const nextWord = wordsRef.current[wordIndex + 1] as HTMLElement | undefined;
    if (!nextWord) return;
    setLetterIndex(0);
    setWordIndex(wordIndex + 1);
    moveCaret(nextWord.offsetLeft, nextWord.offsetTop);
  }

  function goBackOneLetter() {
    const currentWord = wordsRef.current[wordIndex];
    const letters = currentWord.children;
    const previousLetter = letters[letterIndex - 1] as HTMLElement | undefined;
    if (!previousLetter) return;
    previousLetter.classList.remove(styles.correct, styles.incorrect);
    setLetterIndex(letterIndex - 1);
    moveCaret(previousLetter.offsetLeft, previousLetter.offsetTop);
  }

  function goBackOneWord() {
    const currentWord = wordsRef.current[wordIndex];
    for (const letter of currentWord.children) {
      letter.classList.remove(styles.correct, styles.incorrect);
    }
    const previousWord = wordsRef.current[wordIndex - 1] as HTMLElement | undefined;
    if (!previousWord) {
      setLetterIndex(0);
      moveCaret(currentWord.offsetLeft, currentWord.offsetTop);
      return;
    }
    setLetterIndex(previousWord.children.length);
    setWordIndex(wordIndex - 1);
    moveCaret(previousWord.offsetLeft + previousWord.offsetWidth, previousWord.offsetTop);
  }

  function clearWord() {
    const currentWord = wordsRef.current[wordIndex];
    for (const letter of currentWord.children) {
      letter.classList.remove(styles.correct, styles.incorrect);
    }
    if (!currentWord) return;
    setLetterIndex(0);
    moveCaret(currentWord.offsetLeft, currentWord.offsetTop);
  }

  function handleClick(e: globalThis.MouseEvent) {
    setActive(ref.current?.contains(e.target));
  }

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
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
        {words.map((word, index) => (
          <Word
            word={word}
            key={index}
            id={`word-${index}`}
            ref={(el: HTMLDivElement) => el && (wordsRef.current[index] = el)}
          />
        ))}
      </div>
      <p>{active ? "ACTIVE" : "INACTIVE"}</p>
      <Caret x={10} y={10} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
      <p>
        letter position: {letterIndex}
        word position: {wordIndex}
      </p>
    </div>
  );
}
