"use client";

import { Word } from "@/components/test/Word";
import { useCallback, useEffect, useRef, useState } from "react";
import { Caret } from "@/components/test/Caret";
import styles from "./Test.module.css";
import { generateWords } from "@/utils/generateWords";
import { MouseEvent } from "react";
import { useInterval } from "@/utils/useInterval";
import { TimeSettingButton } from "@/components/test/TimeSettingButton";
import { ResetButton } from "@/components/test/ResetButton";

interface Props {
  active: boolean;
  running: boolean;
  finished: boolean;
  handleStart: () => void;
}

export function Test({ active, running, finished, handleStart }: Props) {
  // TODO: CLEAN UP CLEAN UP CLEAN UP CLEAN UP CLEAN UP CLEAN UP CLEAN UP
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  // does not account for the funny situation if someone goes down and then back up
  const [skipLine, setSkipLine] = useState(true);
  // const [timeRemaining, setTimeRemaining] = useState(5);
  const [caretPosition, setCaretPosition] = useState({ x: -999, y: -999 });

  const [wordPool, setWordPool] = useState<Array<string>>([""]);

  const wordsRef = useRef<Array<HTMLDivElement>>([]);
  const caretRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    // Move caret to the beginning
    const firstWord = wordsRef.current[0];
    if (!firstWord) return;
    const { left, top } = firstWord.getBoundingClientRect();
    moveCaret(left, top);

    setWordPool(generateWords(50));
  }, []);

  useEffect(() => {
    // Handle line change
    const { left, top } = wordsRef.current[wordIndex].getBoundingClientRect();
    moveCaret(left, top);
  }, [wordPool]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (finished) {
      // submit score and redirect to the url of created score
      console.log("[TODO] redirecting to url of score...");
    }
  }, [finished]);

  // maybe no need for this function
  function moveCaret(x: number, y: number) {
    setCaretPosition({ x, y });
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

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
      if (!running) handleStart();
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
    </>
  );
}
