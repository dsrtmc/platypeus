"use client";

import styles from "./Test.module.css";
import { ChangeEvent, FC, forwardRef, Fragment } from "react";
import { Letter } from "@/components/test/Letter";

interface Props {
  id: string;
  word: string;
}

export const Word = forwardRef<HTMLDivElement, Props>(({ id, word }, ref) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {}
  return (
    <div className={styles.word} ref={ref} id={id}>
      {Array.from(word, (letter, index) => (
        <Letter letter={letter} handleChange={handleChange} key={index} /> // bad but there's some funny bug idk
      ))}
    </div>
  );
});
