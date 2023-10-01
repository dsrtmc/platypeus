"use client";

import { FC, useEffect, useRef } from "react";
import { RestartButton } from "@/components/test/RestartButton";
import { Score as ScoreType } from "@/graphql/generated/graphql";
import { Score } from "@/components/test/Score";

interface Props {
  score: ScoreType;
  handleStartNextTest: () => void;
}

export const ScoreBox: FC<Props> = ({ score, handleStartNextTest }) => {
  const restartButtonRef = useRef<HTMLButtonElement | null>(null);

  function handleKeyDown(e: globalThis.MouseEvent) {
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

  return (
    <>
      <Score score={score} />
      <RestartButton onReset={handleStartNextTest} ref={restartButtonRef} />
    </>
  );
};
