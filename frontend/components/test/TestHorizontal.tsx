"use client";

import { Word } from "@/components/test/Word";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Caret } from "@/components/test/Caret";
import styles from "./Test.module.css";
import { generateWord, generateWords } from "@/utils/generateWords";
import { useMutation } from "@apollo/client";
import { CreateScoreDocument } from "@/graphql/generated/graphql";
import { useRouter } from "next/navigation";
import { Letter } from "@/components/test/Letter";
import { TimeSettingButton } from "@/components/test/TimeSettingButton";
import { Timer } from "@/components/test/Timer";
import { ResetButton } from "@/components/test/ResetButton";
import { TimeSettingSelection } from "@/components/test/TimeSettingSelection";

interface Props {
  active: boolean;
}

export function TestHorizontal({ active }: Props) {
  const [createScore] = useMutation(CreateScoreDocument);
  const router = useRouter();

  const [caretPosition, setCaretPosition] = useState({ x: -999, y: -999 });
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [running, setRunning] = useState(true);
  const [timeSetting, setTimeSetting] = useState(0);
  const [correct, setCorrect] = useState(true);
  const [correctWords, setCorrectWords] = useState(0);

  const [previousWords, setPreviousWords] = useState<Array<string>>([""]);
  const [currentWord, setCurrentWord] = useState("");
  const [nextWords, setNextWords] = useState<Array<string>>([""]);

  const currentWordRef = useRef<HTMLDivElement | null>(null);
  const caretRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    setNextWords(generateWords(4));
    const { left, top } = currentWordRef.current!.getBoundingClientRect();
    moveCaret(left, top);
  }, []);

  useEffect(() => {}, [currentWord]);

  useEffect(() => {
    // We finished
    if (timeRemaining <= 0) {
      setRunning(false);
      clearInterval(intervalRef.current!);
      // Submit score and redirect to the url of created score
      // (async () => {
      //   const response = await createScore({ variables: { input: { time: 5, averageWpm: 200, rawWpm: 200 } } });
      //   console.log("data:", response);
      //   const id = response.data?.createScore.score?.id;
      //   if (id) await router.push(`/score/${id}`);
      // })();
    }
  }, [timeRemaining]);

  // maybe no need for this function
  function moveCaret(x: number, y: number) {
    setCaretPosition({ x, y });
  }

  function moveForwardOneLetter(input: string) {
    const nextWord = nextWords[0];
    const nextLetter = nextWord[0];
    if (!nextLetter) return;
    if (input != nextLetter) {
      setCorrect(false);
    }
    setCurrentWord(currentWord.concat(nextLetter));
    setNextWords([nextWord.slice(1), ...nextWords.slice(1)]);
  }

  function moveForwardOneWord() {
    if (!currentWord) return;
    const word = currentWord.concat(nextWords[0]);
    if (previousWords.length <= 3) {
      setPreviousWords([...previousWords, word]);
    } else {
      setPreviousWords([...previousWords.slice(1), word]);
    }
    if (correct) {
      setCorrectWords((cw) => cw + 1);
    }
    setNextWords([...nextWords.slice(1), generateWord()]);
    setCorrect(true);
    setCurrentWord("");
  }

  useEffect(() => {
    console.log("Correct words:", correctWords);
  }, [correctWords]);

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

  function handleSelect(time: number) {
    return (e: MouseEvent<HTMLButtonElement>) => {
      localStorage.setItem("time-setting", time.toString());
      setTimeSetting(time);
      setTimeRemaining(time);
    };
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    setRunning(false);
    setTimeRemaining(timeSetting);
    clearInterval(intervalRef.current!);
  }

  function handleStart() {
    setRunning(true);
    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => {
      setTimeRemaining((t) => t - 1);
    }, 1000);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <div className={styles.top}>
        <Timer time={timeRemaining} />
        correct: {correct ? "true" : "false"}
        <TimeSettingSelection timeSettings={[1, 5, 10]} handleSelect={handleSelect} />
      </div>
      <div className={styles.main}>
        <div className={`${styles.words} ${styles.previous}`}>
          {previousWords.map((word, index) => (
            <Word word={word} key={index} />
          ))}
          <Word word={currentWord} ref={currentWordRef} />
        </div>
        <Caret x={caretPosition.x} y={caretPosition.y} ref={caretRef} />
        <div className={`${styles.words} ${styles.next}`}>
          {nextWords.map((word, index) => (
            <Word word={word} key={index} />
          ))}
        </div>
      </div>
      <ResetButton handleReset={handleReset} />
    </>
  );
}
