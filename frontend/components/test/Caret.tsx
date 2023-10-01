import styles from "./Test.module.css";
import { forwardRef } from "react";

interface Props {
  x: number;
  y: number;
  running: boolean;
}

export const Caret = forwardRef<HTMLDivElement, Props>(({ x, y, running }, ref) => {
  return <div className={`${styles.caret} ${!running && styles.blinking}`} style={{ left: x, top: y }} ref={ref} />;
});
