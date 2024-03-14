import styles from "@/app/races/[slug]/Race.module.css";
import React from "react";

interface Props {
  countdown: number;
}

export function Countdown({ countdown }: Props) {
  return (
    <div className={styles.countdownSection}>
      get ready to race! <div className={styles.countdownNumber}>:{countdown}</div>
    </div>
  );
}
