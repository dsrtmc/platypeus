"use client";

import { ChangeEvent } from "react";
import styles from "./Test.module.css";

interface Props {
  letter: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Letter({ letter, handleChange }: Props) {
  return <div className={styles.letter}>{letter}</div>;
}
