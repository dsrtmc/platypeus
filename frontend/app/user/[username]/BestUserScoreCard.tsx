import React, { MutableRefObject, Ref, useEffect, useRef, useState } from "react";
import { UserPage_GetUsersBestScoresQuery } from "@/graphql/generated/graphql";
import styles from "./User.module.css";
import { CSSTransition } from "react-transition-group";

interface Props {
  score: NonNullable<UserPage_GetUsersBestScoresQuery["usersBestScores"]>[number] | undefined;
  mode: string;
  modeSetting: number;
}

export const BestUserScoreCard: React.FC<Props> = ({ score, mode, modeSetting }) => {
  const [showDetails, setShowDetails] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  function handleMouseEnter() {
    if (score) setShowDetails(true);
  }
  function handleMouseLeave() {
    if (score) setShowDetails(false);
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
  const regularCardRef = useRef<HTMLDivElement | null>(null);
  const detailedCardRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className={styles.cardWrapper} ref={ref}>
      <CSSTransition
        nodeRef={detailedCardRef as Ref<HTMLElement | undefined>}
        in={showDetails}
        timeout={150}
        classNames={{
          enter: styles.cardEnter,
          enterActive: styles.cardEnterActive,
          exit: styles.cardExit,
          exitActive: styles.cardExitActive,
        }}
        unmountOnExit
        mountOnEnter
      >
        <div className={styles.card} ref={detailedCardRef}>
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
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={regularCardRef as Ref<HTMLDivElement | undefined>}
        in={!showDetails}
        timeout={150}
        classNames={{
          enter: styles.cardEnter,
          enterActive: styles.cardEnterActive,
          exit: styles.cardExit,
          exitActive: styles.cardExitActive,
        }}
        unmountOnExit
        mountOnEnter
      >
        <div className={styles.card} ref={regularCardRef}>
          <div className={styles.top}>
            {mode} {modeSetting}
          </div>
          <div className={styles.center}>{score ? score.wpm : "-"}</div>
          <div className={styles.bottom}>{score ? Math.round(score.accuracy * 100) + "%" : "-"}</div>
        </div>
      </CSSTransition>
    </div>
  );
};
