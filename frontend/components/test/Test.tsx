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
  ];
  const [active, setActive] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Array<HTMLDivElement>>([]);
  const caretRef = useRef<HTMLDivElement | null>(null);
  function handleClick(e: globalThis.MouseEvent) {
    // uncomment when debugging not that useful
    // setActive(ref.current?.contains(e.target));
    if (ref.current?.contains(e.target)) {
      setActive(true);
      console.log("active");
    } else {
      setActive(false);
      console.log("not active");
    }
  }

  function goForwardOneLetter() {
    const currentWord = itemsRef.current[wordIndex];
    const letters = currentWord.children;
    const nextLetter = letters[letterIndex + 1] as HTMLElement | undefined;
    const currentLetter = letters[letterIndex] as HTMLElement;
    if (!currentLetter) return;
    if (!nextLetter) {
      if (caretRef.current) caretRef.current.style.left = `${currentLetter.offsetLeft + currentLetter.offsetWidth}px`;
      setLetterIndex(letterIndex + 1);
      return;
    }
    // go to next word
    setLetterIndex(letterIndex + 1);
    if (caretRef.current) caretRef.current.style.left = `${nextLetter.offsetLeft}px`;
  }

  function goForwardOneWord() {
    const currentWord = itemsRef.current[wordIndex];
    const nextWord = itemsRef.current[wordIndex + 1] as HTMLElement | undefined;
    if (!nextWord) return;
    setLetterIndex(0);
    setWordIndex(wordIndex + 1);
    if (caretRef.current) caretRef.current.style.left = `${nextWord.offsetLeft}px`;
  }

  function goBackOneLetter() {
    const currentWord = itemsRef.current[wordIndex];
    const letters = currentWord.children;
    const previousLetter = letters[letterIndex - 1] as HTMLElement | undefined;
    const nextLetter = letters[letterIndex + 1] as HTMLElement | undefined;
    if (!previousLetter) return;
    setLetterIndex(letterIndex - 1);
    if (caretRef.current) caretRef.current.style.left = `${previousLetter.offsetLeft}px`;
  }

  function goBackOneWord() {
    const currentWord = itemsRef.current[wordIndex];
    const previousWord = itemsRef.current[wordIndex - 1] as HTMLElement | undefined;
    if (!previousWord) return;
    setLetterIndex(previousWord.children.length - 1);
    setWordIndex(wordIndex - 1);
    if (caretRef.current) caretRef.current.style.left = `${previousWord.offsetLeft + previousWord.offsetWidth}px`;
  }

  function focusNext(e: globalThis.KeyboardEvent) {
    // TODO: make sure some funny stuff isn't undefined
    const currentWord = itemsRef.current[wordIndex];
    const letters = currentWord.children;
    console.log("letter index:", letterIndex);
    console.log("letters length:", letters?.length);
    // const newWordIndex = wordIndex + 1;
    // const newLetterIndex = letterIndex + 1;
    // const currentLetter = letters[letterIndex] as HTMLDivElement;
    // why does it show up as invalid lhs assignment if it's not read only lol?
    const currentLetter = letters[letterIndex] as HTMLDivElement;
    console.log("key:", e.key);
    switch (e.key) {
      case " ": {
        // if (newLetterIndex >= letters?.length) {
        //   setLetterIndex(0);
        //   setWordIndex(wordIndex + 1);
        //   caretRef.current?.style.left = `${itemsRef.current?.[wordIndex + 1].offsetLeft}px`;
        // }
        goForwardOneWord();
        break;
      }
      case "Backspace": {
        // const previousLetter = letters[letterIndex - 1] as HTMLElement;
        // setLetterIndex(letterIndex - 1);
        // caretRef.current?.style.left = `${previousLetter?.offsetLeft + previousLetter?.offsetWidth}px`;
        goBackOneLetter();
        break;
      }
      default: {
        // coloring
        // if (e.key == currentLetter.textContent) {
        //   currentLetter.classList.toggle(styles.correct);
        // } else {
        //   currentLetter.classList.toggle(styles.incorrect);
        // }
        // caretRef.current?.style.left = `${currentLetter?.offsetLeft + currentLetter?.offsetWidth}px`;
        goForwardOneLetter();
      }
    }
    console.log("current letter:", currentLetter);
  }

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
      console.log("clicked when test is active");
      focusNext(e);
    } else {
      console.log("clicked when test is not active");
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, wordIndex, letterIndex]);
  return (
    <div style={{ display: "flex", gap: "1rem" }} ref={ref}>
      {words.map((word, index) => (
        <Word
          word={word}
          key={index}
          id={`word-${index}`}
          ref={(el: HTMLDivElement) => el && (itemsRef.current[index] = el)}
        />
        // might consider putting <Letter />s in word's children props
        // can't think of a good way to loop over them
        // ---
        // actually u could just loop over word's children from via javascript
        // by not putting it into children props i can ensure there's not going to be any non-letters in word
      ))}
      <p>{active ? "ACTIVE" : "INACTIVE"}</p>
      <Caret x={10} y={10} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
      letter position: {letterIndex}
      word position: {wordIndex}
    </div>
  );
}
