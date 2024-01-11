import styles from "./Test.module.css";
import { forwardRef } from "react";

interface Props {
  x: number;
  y: number;
  running: boolean;
  focused: boolean;
}

export const Caret = forwardRef<HTMLDivElement, Props>(({ x, y, running, focused }, ref) => {
  return (
    <div
      className={`${styles.caret} ${!running && styles.blinking} ${!focused && styles.hidden}`}
      style={{ left: x, top: y }}
      ref={ref}
    />
  );
});
