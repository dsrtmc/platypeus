"use client";

import styles from "./Test.module.css";
import { ChangeEvent, forwardRef } from "react";
import { Letter } from "@/components/test/Letter";

interface Props {
  word: string;
}

export const Word = forwardRef<HTMLDivElement, Props>(({ word }, ref) => {
  // TODO: ?
  function handleChange(e: ChangeEvent<HTMLInputElement>) {}
  return (
    <div className={styles.word} ref={ref}>
      {Array.from(word, (letter, index) => (
        <Letter letter={letter} handleChange={handleChange} key={index} /> // bad but there's some funny bug idk
      ))}
    </div>
  );
});
