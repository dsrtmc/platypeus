import styles from "./Test.module.css";
import { forwardRef } from "react";

interface Props {
  x: number;
  y: number;
}

export const Caret = forwardRef<HTMLDivElement, Props>(({ x, y }, ref) => {
  return <div className={styles.caret} ref={ref} />;
});
