"use client";

import { Word } from "@/components/test/Word";
import { useCallback, useEffect, useRef, useState } from "react";
import { Caret } from "@/components/test/Caret";
import styles from "./Test.module.css";
import { generateWords } from "@/utils/generateWords";

interface Props {
  active: boolean;
}

export function Test({ active }: Props) {
  // TODO: CLEAN UP CLEAN UP CLEAN UP CLEAN UP CLEAN UP CLEAN UP CLEAN UP
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  // does not account for the funny situation if someone goes down and then back up
  const [skipLine, setSkipLine] = useState(true);
  const [running, setRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const [wordPool, setWordPool] = useState<Array<string>>([""]);

  const wordsRef = useRef<Array<HTMLDivElement>>([]);
  const caretRef = useRef<HTMLDivElement | null>(null);

  // maybe no need for this function
  function moveCaret(x: number, y: number) {
    setCaretPosition({ x, y });
  }
  const [caretPosition, setCaretPosition] = useState({ x: -999, y: -999 });

  function startTest(time: number) {
    setTimeRemaining(time);
    setRunning(true);
  }

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

    const currentWord = wordsRef.current[wordIndex] as HTMLElement | undefined;
    if (!currentWord) return;

    let correct = false;
    for (const letter of currentWord.children) {
      if (letter.classList.contains(styles.incorrect)) {
        correct = false;
        break;
      } else {
        correct = letter.classList.contains(styles.correct);
      }
      letter.classList.remove(styles.correct, styles.incorrect);
    }
    currentWord.classList.add(correct ? styles.correct : styles.incorrect);

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
    if (!currentWord) return;
    currentWord.classList.remove(styles.correct, styles.incorrect);

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
    previousWord.classList.remove(styles.correct, styles.incorrect);

    setLetterIndex(previousWord.children.length);
    setWordIndex(wordIndex - 1);
    const { right, top } = previousWord.getBoundingClientRect();
    moveCaret(right, top);
  }

  function clearWord() {
    const currentWord = wordsRef.current[wordIndex];
    if (!currentWord) return;
    currentWord.classList.remove(styles.correct, styles.incorrect);

    for (const letter of currentWord.children) {
      letter.classList.remove(styles.correct, styles.incorrect);
    }

    if (!currentWord) return;

    setLetterIndex(0);
    const { left, top } = currentWord.getBoundingClientRect();
    moveCaret(left, top);
  }

  function moveToNextLine() {
    const nextWord = wordsRef.current[wordIndex + 1];
    if (!nextWord) return;
    const currentWord = wordsRef.current[wordIndex];
    const { top: currentTop } = currentWord.getBoundingClientRect();
    const { top: nextTop } = nextWord.getBoundingClientRect();
    let numberOfWordsToAddToPool = 0;
    if (nextTop !== currentTop) {
      if (skipLine) {
        setSkipLine(false);
        return;
      }
      for (const word of wordsRef.current) {
        if (word.getBoundingClientRect().top < currentTop) {
          numberOfWordsToAddToPool++;
        }
      }
      const newWordPool = [...wordPool];
      for (let i = numberOfWordsToAddToPool; i < newWordPool.length; i++) {
        newWordPool[i - numberOfWordsToAddToPool] = newWordPool[i];
        // clear the previous row's word and assign the correct class
        wordsRef.current[i - numberOfWordsToAddToPool].classList.remove(styles.correct, styles.incorrect);
        if (wordsRef.current[i].classList.contains(styles.correct)) {
          wordsRef.current[i - numberOfWordsToAddToPool].classList.add(styles.correct);
        } else if (wordsRef.current[i].classList.contains(styles.incorrect)) {
          wordsRef.current[i - numberOfWordsToAddToPool].classList.add(styles.incorrect);
        }

        wordsRef.current[i].classList.remove(styles.correct, styles.incorrect);
      }
      const newWords = generateWords(numberOfWordsToAddToPool);
      let index = 0;
      for (let i = newWordPool.length - numberOfWordsToAddToPool; i < newWordPool.length; i++) {
        newWordPool[i] = newWords[index++];
      }
      setWordPool(newWordPool);
      setWordIndex(wordIndex + 1 - numberOfWordsToAddToPool);
    }
  }

  // Handle line change
  useEffect(() => {
    const { left, top } = wordsRef.current[wordIndex].getBoundingClientRect();
    moveCaret(left, top);
  }, [wordPool]);

  // doesnt work lol temp!
  useEffect(() => {
    if (running) {
      const id = setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => {
        clearInterval(id);
        setRunning(false);
      };
    }
  }, [running]);

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
      if (e.key.length == 1) {
        e.preventDefault();
        if (e.key == " ") {
          moveForwardOneWord();
          moveToNextLine();
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
    }
  }

  // Move caret to the beginning
  useEffect(() => {
    const firstWord = wordsRef.current[0];
    if (!firstWord) return;
    const { left, top } = firstWord.getBoundingClientRect();
    moveCaret(left, top);
  }, []);
  // could probably be inside a single useEffect
  useEffect(() => {
    setWordPool(generateWords(50));
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
          <Word
            word={word}
            key={index} // idk xd
            ref={(el: HTMLDivElement) => el && (wordsRef.current[index] = el)}
          />
        ))}
      </div>
      <Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
      <code>TIME REMAINING: {timeRemaining}</code>
      <button
        onClick={() => {
          startTest(5);
        }}
      >
        start test
      </button>
    </>
  );
}
