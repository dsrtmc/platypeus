import React, { useEffect, useRef, useState } from "react";
import {
  UserPage_GetUsersBestScoresQuery,
  UserPage_GetUsersBestScoresQueryVariables,
} from "@/graphql/generated/graphql";
import styles from "./User.module.css";

interface Props {
  score: NonNullable<UserPage_GetUsersBestScoresQuery["usersBestScores"]>[number];
  mode: string;
  modeSetting: number;
}

export const BestUserScoreCard: React.FC<Props> = ({ score, mode, modeSetting }) => {
  const [showDetails, setShowDetails] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  function handleMouseEnter() {
    setShowDetails(true);
  }
  function handleMouseLeave() {
    setShowDetails(false);
  }
  useEffect(() => {
    if (ref?.current) {
      ref.current!.addEventListener("mouseenter", handleMouseEnter);
      ref.current!.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (ref?.current) {
        ref.current!.removeEventListener("mouseenter", handleMouseEnter);
        ref.current!.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);
  return (
    <div className={styles.bestUserScoreCard} ref={ref}>
      {showDetails ? (
        <>
          <div className={`${styles.top} ${styles.detail}`}>
            {mode} {modeSetting}
          </div>
          <div className={`${styles.center} ${styles.detail}`}>{score ? score.wpm : "-"} wpm</div>
          <div className={`${styles.center} ${styles.detail}`}>{score ? score.rawWpm : "-"} raw</div>
          <div className={`${styles.center} ${styles.detail}`}>
            {score ? Math.round(score.accuracy * 100) + "%" : "-"} acc
          </div>
          <div className={`${styles.bottom} ${styles.detail}`}>
            {score
              ? new Date(score.createdAt).toLocaleDateString("en-UK", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-"}
          </div>
        </>
      ) : (
        <>
          <div className={styles.top}>
            {mode} {modeSetting}
          </div>
          <div className={styles.center}>{score ? score.wpm : "-"}</div>
          <div className={styles.bottom}>{score ? Math.round(score.accuracy * 100) + "%" : "-"}</div>
        </>
      )}
    </div>
  );
};
