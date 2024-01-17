import { FC, MouseEvent, useState } from "react";
import styles from "./Race.module.css";

interface Props {
  handleStart: (e?: MouseEvent<HTMLButtonElement>) => void;
}

export const StartRaceButton: FC<Props> = ({ handleStart }) => {
  const [disabled, setDisabled] = useState(false);
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
