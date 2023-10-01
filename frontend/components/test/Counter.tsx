import React from "react";
import styles from "./Test.module.css";

interface Props {
  count: number;
}

export const Counter: React.FC<Props> = ({ count }) => {
  return <div className={styles.counter}>{count}</div>;
};
