"use client";

import { FC, Ref, useEffect, useRef } from "react";
import { RestartButton } from "@/components/test/RestartButton";
import { CreateScoreInput as ScoreType } from "@/graphql/generated/graphql";
import { Score } from "@/components/test/Score";
import styles from "./Score.module.css";
import { CSSTransition } from "react-transition-group";

interface Props {
  score: ScoreType;
  handleStartNextTest: () => void;
}

export const ScoreBox: FC<Props> = ({ score, handleStartNextTest }) => {
  const restartButtonRef = useRef<HTMLButtonElement | null>(null);

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (e.key === "Tab") {
      e.preventDefault();
      if (restartButtonRef && restartButtonRef.current) {
        restartButtonRef.current!.focus();
      }
    } else if (e.key !== "Enter") {
      if (restartButtonRef && restartButtonRef.current) {
        restartButtonRef.current!.blur();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <CSSTransition
      nodeRef={ref as Ref<HTMLDivElement | undefined>}
      in={true}
      appear={true}
      timeout={300}
      classNames={{
        appear: styles.scoreWrapperAppear,
        appearActive: styles.scoreWrapperAppearActive,
        appearDone: styles.scoreWrapperAppearDone,
      }}
    >
      <div className={styles.scoreWrapper} ref={ref}>
        <Score score={score} />
        <RestartButton onReset={handleStartNextTest} ref={restartButtonRef} />
      </div>
    </CSSTransition>
  );
};
