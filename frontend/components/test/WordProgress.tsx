import React from "react";
import styles from "@/components/test/Test.module.css";

interface Props {
  count: number;
  setting: number;
}

export const WordProgress: React.FC<Props> = ({ count, setting }) => {
  return (
    <div className={styles.wordProgress}>
      {count}/{setting}
    </div>
  );
};
