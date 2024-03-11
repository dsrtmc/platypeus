import React, { FC } from "react";
import type { CreateScoreInput as CreateScoreInputType } from "@/graphql/generated/graphql";
import styles from "./Score.module.css";
import { ScoreChart } from "@/components/test/ScoreChart";

interface Props {
  score: CreateScoreInputType;
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
            {score.mode} {score.modeSetting}
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.top}>raw</div>
          <div className={styles.bottom}>{score.rawWpm}</div>
        </div>
        <div className={styles.group}>
          {/* depends on the test mode */}
          <div className={styles.top}>language</div>
          <div className={styles.bottom}>{score.language}</div>
        </div>
        <div className={styles.group}>
          {/* depends on the test mode */}
          <div className={styles.top}>cpm</div>
          <div className={styles.bottom}>{score.wpm * 5}</div>
        </div>
        <div className={`${styles.group} ${styles.last}`}>
          <div className={styles.top}>content</div>
          {/* TODO: xd fix ^  IH :) I HATE CSS I HATE CSS */}
          <div className={`${styles.bottom} ${styles.content}`}>{score.content}</div>
        </div>
      </div>
    </div>
  );
};
