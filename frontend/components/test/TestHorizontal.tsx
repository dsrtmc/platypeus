"use client";

import { Word } from "@/components/test/Word";
import { useEffect, useRef, useState } from "react";
import { Caret } from "@/components/test/Caret";
import styles from "./Test.module.css";
import { generateWord, generateWords } from "@/utils/generateWords";
import { useMutation } from "@apollo/client";
import { CreateScoreDocument } from "@/graphql/generated/graphql";
import { useRouter } from "next/navigation";
import { nextStart } from "next/dist/cli/next-start";

interface Props {
  active: boolean;
  running: boolean;
  finished: boolean;
  handleStart: () => void;
}

export function TestHorizontal({ active, running, finished, handleStart }: Props) {
  const [createScore] = useMutation(CreateScoreDocument);
  const router = useRouter();

  // TODO: CLEAN UP CLEAN UP CLEAN UP CLEAN UP CLEAN UP CLEAN UP CLEAN UP
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  // does not account for the funny situation if someone goes down and then back up
  // const [timeRemaining, setTimeRemaining] = useState(5);
  const [caretPosition, setCaretPosition] = useState({ x: -999, y: -999 });

  const [previousWords, setPreviousWords] = useState<Array<string>>([""]);
  const [currentWord, setCurrentWord] = useState("");
  const [nextWords, setNextWords] = useState<Array<string>>([""]);

  const wordsRef = useRef<Array<HTMLDivElement>>([]);
  const currentWordRef = useRef<HTMLDivElement | null>(null);
  const caretRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    setNextWords(generateWords(4));
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (finished) {
      // submit score and redirect to the url of created score
      // (async () => {
      //   const response = await createScore({ variables: { input: { time: 5, averageWpm: 200, rawWpm: 200 } } });
      //   console.log("data:", response);
      //   const id = response.data?.createScore.score?.id;
      //   if (id) await router.push(`/score/${id}`);
      // })();
    }
  }, [finished]);

  // maybe no need for this function
  function moveCaret(x: number, y: number) {
    setCaretPosition({ x, y });
  }

  function moveForwardOneLetter(input: string) {
    const nextWord = nextWords[0];
    const nextLetter = nextWord[0];
    if (!nextLetter) return;
    setCurrentWord(currentWord.concat(nextLetter));
    setNextWords([nextWord.slice(1), ...nextWords.slice(1)]);
  }

  function moveForwardOneWord() {
    if (!currentWord) return;
    if (previousWords.length <= 3) {
      setPreviousWords([...previousWords, currentWord]);
    } else {
      setPreviousWords([...previousWords.slice(1), currentWord]);
    }
    setNextWords([...nextWords.slice(1), generateWord()]);
    setCurrentWord("");
  }

  function moveBackOneLetter() {
    const nextWord = nextWords[0];
    const currentLetter = currentWord[currentWord.length - 1];
    if (!currentLetter) return;
    if (currentWord.length >= 1) setCurrentWord(currentWord.slice(0, currentWord.length - 1));
    setNextWords([currentLetter.concat(nextWord), ...nextWords.slice(1)]);
  }

  function moveBackOneWord() {
    if (!previousWords.length) return;
    if (previousWords.length >= 1) setPreviousWords([...previousWords.slice(0, previousWords.length - 1)]);

    setCurrentWord(previousWords[previousWords.length - 1]);
    setNextWords([currentWord, ...nextWords.slice(0, nextWords.length - 1)]);
  }

  function clearWord() {
    const nextWord = nextWords[0];
    setCurrentWord("");
    setNextWords([currentWord.concat(nextWord), ...nextWords.slice(1)]);
  }

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (active) {
      if (!running) handleStart();
      if (e.key.length == 1) {
        e.preventDefault();
        if (e.key == " ") {
          moveForwardOneWord();
        } else {
          moveForwardOneLetter(e.key);
        }
      } else {
        if (e.key == "Backspace") {
          if (e.ctrlKey) {
            if (currentWord) {
              clearWord();
            } else {
              moveBackOneWord();
            }
          } else {
            moveBackOneLetter();
          }
        }
      }
    }
  }
  return (
    <>
      <div className={styles.main}>
        <div className={`${styles.words} ${styles.previous}`}>
          {previousWords.map((word, index) => (
            <Word word={word} key={index} />
          ))}
        </div>
        <div className={`${styles.words} ${styles.current}`}>
          <Word word={currentWord} ref={currentWordRef} />
        </div>
        <div className={`${styles.words} ${styles.next}`}>
          {nextWords.map((word, index) => (
            <Word word={word} key={index} />
          ))}
        </div>
      </div>
      <Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
    </>
  );
}
