import { FC } from "react";
import styles from "./Test.module.css";

interface Props {
  handleReset: () => void;
}

export const RestartButton: FC<Props> = ({ handleReset }) => {
  return (
    <button onClick={handleReset} className={styles.restart}>
      RESTART
    </button>
  );
};
