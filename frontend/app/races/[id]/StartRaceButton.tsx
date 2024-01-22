import { FC, MouseEvent, useState } from "react";
import styles from "./Race.module.css";

interface Props {
  hasError: boolean;
  handleStart: (e?: MouseEvent<HTMLButtonElement>) => void;
}

// TODO: actually pass in error with message, so if someone clicks he gets feedback like `can't start race with < 2 people`
export const StartRaceButton: FC<Props> = ({ hasError, handleStart }) => {
  const [disabled, setDisabled] = useState(hasError);
  function onStart() {
    handleStart();
    setDisabled(true);
  }
  return (
    <button onClick={onStart} disabled={disabled} className={styles.startRaceButton}>
      Start race
    </button>
  );
};
