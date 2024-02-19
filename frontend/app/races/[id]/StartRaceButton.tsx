import { FC, MouseEvent, useState } from "react";
import styles from "./Race.module.css";

interface Props {
  disabled: boolean;
  handleStart: (e?: MouseEvent<HTMLButtonElement>) => void;
}

// TODO: actually pass in error with message, so if someone clicks he gets feedback like `can't start race with < 2 people`
export const StartRaceButton: FC<Props> = ({ disabled, handleStart }) => {
  function onStart() {
    handleStart();
  }
  return (
    // TODO: wtf? why does it work with `hasError || disabled`? hasError comes from `finally` in parent and `finally` is state so it should work?
    <button onClick={onStart} disabled={disabled} className={styles.startRaceButton}>
      Start race
    </button>
  );
};
