"use client";

import { FC, MouseEvent } from "react";
import styles from "./Race.module.css";

interface Props {
  disabled: boolean;
  handleStart: (e?: MouseEvent<HTMLButtonElement>) => void;
}

export const StartRaceButton: FC<Props> = ({ disabled, handleStart }) => {
  function onStart() {
    handleStart();
  }
  return (
    <button onClick={onStart} disabled={disabled} className={styles.raceButton}>
      start race
    </button>
  );
};
