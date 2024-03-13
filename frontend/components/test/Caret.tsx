import styles from "./Test.module.css";
import { forwardRef } from "react";

interface Props {
  x: number;
  y: number;
  blinking: boolean;
  hidden: boolean;
}

export const Caret = forwardRef<HTMLDivElement, Props>(({ x, y, blinking, hidden }, ref) => {
  return (
    <div
      className={`${styles.caret} ${!blinking && styles.blinking} ${!hidden && styles.hidden}`}
      style={{ left: x, top: y }}
      ref={ref}
    />
  );
});
