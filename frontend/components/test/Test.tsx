"use client";

import { Word } from "@/components/test/Word";
import { createElement, useEffect, useRef, useState } from "react";
import styles from "./Test.module.css";
import { generateWord } from "@/utils/generateWords";

interface Props {
  active: boolean;
  running: boolean;
  finished: boolean;
  handleStart: () => void;
}

// IGNORE EVERY CHANGES IN THIS FILE IT'S ONLY FOR FUN, TESTING AND "LEGACY" PURPOSES
export function Test({ active, running, finished, handleStart }: Props) {
  const [wordPool, setWordPool] = useState<Array<any>>([]);
  const [caretPosition, setCaretPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const wordsRef = useRef<any>([]);
  function addToRefs(el: any) {
    // if (el && !wordsRef.current.includes(el)) {
    wordsRef.current.push(el);
    // }
  }

  useEffect(() => {
    // setCaretPosition(wordPool[0]);
    let words = [];
    for (let i = 0; i < 6; i++) {
      words.push(createElement(Word, { word: generateWord(), ref: addToRefs, key: `word-${i}` }));
    }
    setWordPool([...wordPool, ...words]);
  }, []);

  function moveCaret(x: number, y: number) {
    setCaretPosition({ x, y });
  }

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
      if (!running) handleStart();
      if (e.key.length == 1) {
        e.preventDefault();
        // if (e.key == " ") {
        //   moveForwardOneWord();
        //   moveToNextLine();
        // } else {
        //   moveForwardOneLetter(e.key);
        // }
      } else {
        if (e.key == "Backspace") {
          // if (!letterIndex) {
          //   clearWord();
          //   moveBackOneWord();
          // } else {
          //   if (e.ctrlKey) {
          //     clearWord();
          //   } else {
          //     moveBackOneLetter();
          //   }
          // }
        }
      }
    }
  }

  return (
    <>
      <div className={styles.words}>{wordPool.map((word) => word)}</div>
      <button
        onClick={() => {
          setWordPool([...wordPool, createElement(Word, { word: generateWord(), ref: addToRefs })]);
        }}
      >
        add random word
      </button>
      <button
        onClick={() => {
          wordsRef.current.shift();
          setWordPool(wordPool.slice(1, wordPool.length));
        }}
      >
        remove first word
      </button>
      <button
        onClick={() => {
          for (const ref of wordsRef.current) {
            console.log(ref);
          }
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
      {/*<Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />*/}
    </>
  );
}
