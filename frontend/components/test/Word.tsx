"use client";

import styles from "./Test.module.css";
import { ChangeEvent, Fragment } from "react";
import { Letter } from "@/components/test/Letter";

interface Props {
  word: string;
}

export function Word({ word }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {}
  return (
    <div className={styles.word}>
      {Array.from(word, (letter, index) => (
        <Letter letter={letter} handleChange={handleChange} key={index} /> // bad but there's some funny bug idk
      ))}
    </div>
  );
}
