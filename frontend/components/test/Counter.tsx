import React from "react";
import styles from "./Test.module.css";

interface Props {
  count: number;
}

export const Counter: React.FC<Props> = ({ count }) => {
  return (
    <p style={{ marginRight: "auto" }} className={styles.counter}>
      {count}
    </p>
  );
};
