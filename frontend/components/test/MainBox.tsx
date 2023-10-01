"use client";

import { FC, useState } from "react";
import styles from "./Test.module.css";
import { Score as ScoreType } from "@/graphql/generated/graphql";
import { ScoreBox } from "@/components/test/ScoreBox";
import { TestBox } from "@/components/test/TestBox";

interface Props {}

export const MainBox: FC<Props> = ({}) => {
  const [scoreData, setScoreData] = useState<ScoreType | null>(null);
  const [showScore, setShowScore] = useState(false);

  function handleSaveScore(score: ScoreType) {
    setShowScore(true);
    setScoreData(score);
  }

  function handleStartNextTest() {
    setShowScore(false);
  }

  return (
    <div className={styles.box}>
      {showScore ? (
        <ScoreBox score={scoreData} handleStartNextTest={handleStartNextTest} />
      ) : (
        <TestBox handleSaveScore={handleSaveScore} />
      )}
    </div>
  );
};
