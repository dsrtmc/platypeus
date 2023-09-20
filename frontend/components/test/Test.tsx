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

  function moveCaret(x: number, y: number) {
    setCaretPosition({ x, y });
  }

  const [index, setIndex] = useState(0);
  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
      if (!running) handleStart();
      if (e.key.length == 1) {
        e.preventDefault();
        moveCaret(wordsRef.current[index].getBoundingClientRect().x, wordsRef.current[index].getBoundingClientRect().y);
        setIndex(index + 1);
        console.log("word:", wordsRef.current[index]);
        console.log("uwu");
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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [index]);

  return (
    <>
      <div className={styles.words}>{wordPool.map((word) => word)}</div>
      <button
        onClick={() => {
          setWordPool([
            ...wordPool,
            createElement(Word as FunctionComponent<Word>, { word: generateWord(), ref: addToRefs }),
          ]);
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
