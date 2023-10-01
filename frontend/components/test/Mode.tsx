import React, { PropsWithChildren } from "react";
import styles from "./Test.module.css";

interface Props {}

export const Mode: React.FC<Props> = ({ children }: PropsWithChildren<Props>) => {
  return <div className={styles.mode}>{children}</div>;
};
