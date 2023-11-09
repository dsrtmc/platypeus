import React, { FC } from "react";
import { Score } from "@/graphql/generated/graphql";
import styles from "./Score.module.css";
import { ScoreChart } from "@/components/test/ScoreChart";

interface Props {
  score: Score;
}

export const Score: FC<Props> = ({ score }) => {
  return (
    <div className={styles.score}>
      <div className={styles.stats}>
        <div className={styles.group}>
          <div className={styles.top}>wpm</div>
          <div className={`${styles.bottom} ${styles.big}`}>{score.wpm}</div>
        </div>
        <div className={styles.group}>
          <div className={styles.top}>acc</div>
          <div className={`${styles.bottom} ${styles.big}`}>{Math.round(score.accuracy * 100)}%</div>
        </div>
      </div>
      <ScoreChart score={score} />
      <div className={styles.stats2}>
        <div className={styles.group}>
          <div className={styles.top}>mode</div>
          <div className={styles.bottom}>
            {score.mode} {score.language}
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.top}>raw</div>
          <div className={styles.bottom}>{score.rawWpm}</div>
        </div>
        <div className={styles.group}>
          {/* depends on the test mode */}
          <div className={styles.top}>time</div>
          <div className={styles.bottom}>{score.modeSetting}</div>
        </div>
      </div>
    </div>
  );
};
