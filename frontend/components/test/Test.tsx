"use client";

import { Word } from "@/components/test/Word";
import { useCallback, useEffect, useRef, useState } from "react";
import { Caret } from "@/components/test/Caret";
import styles from "./Test.module.css";

interface Props {
  active: boolean;
}

export function Test({ active }: Props) {
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

  function moveForwardOneLetter(input: string) {
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

  function moveForwardOneWord() {
    const nextWord = wordsRef.current[wordIndex + 1] as HTMLElement | undefined;

    if (!nextWord) return;

    setLetterIndex(0);
    setWordIndex(wordIndex + 1);
    const { left, top } = nextWord.getBoundingClientRect();
    moveCaret(left, top);
  }

  function moveBackOneLetter() {
    const currentWord = wordsRef.current[wordIndex];
    const letters = currentWord.children;
    const previousLetter = letters[letterIndex - 1] as HTMLElement | undefined;

    if (!previousLetter) return;

    previousLetter.classList.remove(styles.correct, styles.incorrect);
    setLetterIndex(letterIndex - 1);
    const { left, top } = previousLetter.getBoundingClientRect();
    moveCaret(left, top);
  }

  function moveBackOneWord() {
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
    let numberOfWordsToAddToPool = 0;
    if (currentTop !== previousTop) {
      for (const word of wordsRef.current) {
        if (word.getBoundingClientRect().top < currentTop) {
          numberOfWordsToAddToPool++;
        }
        // word.style.transform = `translateY(-100%)`;
      }
      const copy = wordPool;
      for (let i = 0; i < numberOfWordsToAddToPool; i++) {
        const letters = wordsRef.current[i].children;
        for (const letter of letters) {
          letter.classList.remove(styles.correct, styles.incorrect);
          // hmm idk if thats the play
        }
        copy.shift();
        console.log(`We should be removing ${numberOfWordsToAddToPool} words`);
        copy.push(String.fromCharCode(97 + Math.random() * 20)); // random word here
        // copy.push("a"); // random word here
      }
      setWordPool(copy);
      setWordIndex(0);
      const { left, top } = wordsRef.current[0].getBoundingClientRect();
      moveCaret(left, top);
    }
    // TODO: implement re-adding to pool
    console.log(`we should add ${numberOfWordsToAddToPool} words to pool.`);
  }

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
      if (e.key.length == 1) {
        e.preventDefault();
        if (e.key == " ") {
          moveForwardOneWord();
        } else {
          moveForwardOneLetter(e.key);
        }
      } else {
        if (e.key == "Backspace") {
          if (!letterIndex) {
            clearWord();
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
      moveToNextLine();
    }
  }

  // Move caret to the beginning
  useEffect(() => {
    const firstWord = wordsRef.current[0];
    if (!firstWord) return;
    const { left, top } = firstWord.getBoundingClientRect();
    moveCaret(left, top);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <>
      <div className={styles.words}>
        {wordPool.map((word, index) => (
          <Word word={word} key={index} ref={(el: HTMLDivElement) => el && (wordsRef.current[index] = el)} />
        ))}
      </div>
      <Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
      <button onClick={() => console.log("Word index:", wordIndex)}>log word index</button>
    </>
  );
}
