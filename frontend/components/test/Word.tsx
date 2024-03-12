"use client";

import styles from "./Test.module.css";
import { forwardRef } from "react";
import { Letter } from "@/components/test/Letter";
import { generateRandomString } from "@/utils/generateRandomString";

interface Props {
  word: string;
  wordIndex: number; // used for generating nice, unique keys
}

export const Word = forwardRef<HTMLDivElement, Props>(({ word, wordIndex }, ref) => {
  return (
    <div className={styles.word} ref={ref}>
      {Array.from(word, (letter) => (
        <Letter letter={letter} key={`${letter}-${generateRandomString(7)}`} /> // TODO: stop using random
      ))}
    </div>
  );
});
