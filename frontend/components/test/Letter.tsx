"use client";

import { ChangeEvent } from "react";
import styles from "./Test.module.css";

interface Props {
  letter: string;
}

export function Letter({ letter }: Props) {
  return <div className={styles.letter}>{letter}</div>;
}
