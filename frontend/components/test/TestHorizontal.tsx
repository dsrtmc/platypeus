"use client";

import { Word } from "@/components/test/Word";
import { useEffect, useRef, useState } from "react";
import { Caret } from "@/components/test/Caret";
import styles from "./Test.module.css";
import { generateWord, generateWords } from "@/utils/generateWords";
import { useMutation } from "@apollo/client";
import { CreateScoreDocument } from "@/graphql/generated/graphql";
import { useRouter } from "next/navigation";

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
  const currentWordRef = useRef<HTMLDivElement | null>(null):
  const caretRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    // Move caret to the beginning
    // const firstWord = wordsRef.current[0];
    // if (!firstWord) return;
    // const { left, top } = firstWord.getBoundingClientRect();
    // moveCaret(left, top);

    setCurrentWord(generateWord());
    setNextWords(generateWords(4));
  }, []);

  useEffect(() => {
    // Handle line change
    // const { left, top } = wordsRef.current[wordIndex].getBoundingClientRect();
    // moveCaret(left, top);
  }, [currentWord]);

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
    // const currentWord = wordsRef.current[wordIndex];
    // const letters = currentWord.children;
    // const nextLetter = letters[letterIndex + 1] as HTMLElement;
    // const currentLetter = letters[letterIndex] as HTMLElement;
    //
    // if (!currentLetter) return;
    // const correct = currentLetter.textContent == input;
    // currentLetter.classList.add(correct ? styles.correct : styles.incorrect);
    //
    // if (!nextLetter) {
    //   const { right, top } = currentLetter.getBoundingClientRect();
    //   moveCaret(right, top);
    //   setLetterIndex(letterIndex + 1);
    //   return;
    // }
    // // go to next word
    // setLetterIndex(letterIndex + 1);
    // const { left, top } = nextLetter.getBoundingClientRect();
    // moveCaret(left, top);
  }

  function moveForwardOneWord() {
    if (previousWords.length <= 3) {
      setPreviousWords([...previousWords, currentWord]);
    } else {
      setPreviousWords([...previousWords.slice(1), currentWord]);
    }
    setCurrentWord(nextWords[0]);
    setNextWords([...nextWords.slice(1), generateWord()]);
  }

  function moveBackOneLetter() {
    // const currentWord = wordsRef.current[wordIndex];
    // const letters = currentWord.children;
    // const previousLetter = letters[letterIndex - 1] as HTMLElement | undefined;
    //
    // if (!previousLetter) return;
    //
    // previousLetter.classList.remove(styles.correct, styles.incorrect);
    // setLetterIndex(letterIndex - 1);
    // const { left, top } = previousLetter.getBoundingClientRect();
    // moveCaret(left, top);
  }

  function moveBackOneWord() {
    if (previousWords.length >= 1)
    setPreviousWords([...previousWords.slice(0, previousWords.length - 1)]);
    setCurrentWord(previousWords[previousWords.length - 1]);
    setNextWords([currentWord, ...nextWords.slice(0, nextWords.length - 1)]);
  }

  function clearWord() {
    // const currentWord = wordsRef.current[wordIndex];
    // if (!currentWord) return;
    // currentWord.classList.remove(styles.correct, styles.incorrect);
    //
    // for (const letter of currentWord.children) {
    //   letter.classList.remove(styles.correct, styles.incorrect);
    // }
    //
    // if (!currentWord) return;
    //
    // setLetterIndex(0);
    // const { left, top } = currentWord.getBoundingClientRect();
    // moveCaret(left, top);
  }

  function moveToNextLine() {
    // const nextWord = wordsRef.current[wordIndex + 1];
    // if (!nextWord) return;
    // const currentWord = wordsRef.current[wordIndex];
    // const { top: currentTop } = currentWord.getBoundingClientRect();
    // const { top: nextTop } = nextWord.getBoundingClientRect();
    // let numberOfWordsToAddToPool = 0;
    // if (nextTop !== currentTop) {
    //   if (skipLine) {
    //     setSkipLine(false);
    //     return;
    //   }
    //   for (const word of wordsRef.current) {
    //     if (word.getBoundingClientRect().top < currentTop) {
    //       numberOfWordsToAddToPool++;
    //     }
    //   }
    //   const newWordPool = [...wordPool];
    //   for (let i = numberOfWordsToAddToPool; i < newWordPool.length; i++) {
    //     newWordPool[i - numberOfWordsToAddToPool] = newWordPool[i];
    //     // clear the previous row's word and assign the correct class
    //     wordsRef.current[i - numberOfWordsToAddToPool].classList.remove(styles.correct, styles.incorrect);
    //     if (wordsRef.current[i].classList.contains(styles.correct)) {
    //       wordsRef.current[i - numberOfWordsToAddToPool].classList.add(styles.correct);
    //     } else if (wordsRef.current[i].classList.contains(styles.incorrect)) {
    //       wordsRef.current[i - numberOfWordsToAddToPool].classList.add(styles.incorrect);
    //     }
    //
    //     wordsRef.current[i].classList.remove(styles.correct, styles.incorrect);
    //   }
    //   const newWords = generateWords(numberOfWordsToAddToPool);
    //   let index = 0;
    //   for (let i = newWordPool.length - numberOfWordsToAddToPool; i < newWordPool.length; i++) {
    //     newWordPool[i] = newWords[index++];
    //   }
    //   setWordPool(newWordPool);
    //   setWordIndex(wordIndex + 1 - numberOfWordsToAddToPool);
    // }
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
          moveBackOneWord();
        }
      }
    }
  }
  return (
    <>
      <div className={styles.words}>
        <div className={`${styles.words} ${styles.previous}`}>
        {previousWords.map((word, index) => (<Word word={word} key={index} />))}
        </div>
        {<Word word={currentWord} ref={currentWordRef} />}
        <div className={`${styles.words} ${styles.next}`}>
        {nextWords.map((word, index) => (<Word word={word} key={index} />))}
        </div>
      </div>
      <Caret x={caretPosition.x} y={caretPosition.y} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
    </>
  );
}
