"use client";

import { FC, Ref, useEffect, useRef } from "react";
import { RestartButton } from "@/components/test/RestartButton";
import { ScoreInfoFragmentDoc } from "@/graphql/generated/graphql";
import { Score } from "@/components/test/Score";
import styles from "./Score.module.css";
import { CSSTransition } from "react-transition-group";
import { useFragment } from "@apollo/client";

interface Props {
  scoreId: string;
  handleStartNextTest: () => void;
}

export const ScoreBox: FC<Props> = ({ scoreId, handleStartNextTest }) => {
  const { complete, data } = useFragment({
    fragment: ScoreInfoFragmentDoc,
    from: {
      __typename: "Score",
      id: scoreId,
    },
  });
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

  if (!complete) return null;
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
        <Score score={data} />
        <RestartButton onReset={handleStartNextTest} ref={restartButtonRef} />
      </div>
    </CSSTransition>
  );
};
