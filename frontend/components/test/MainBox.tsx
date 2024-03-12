"use client";

import { FC, useState } from "react";
import styles from "./Test.module.css";
import {
  CreateScoreDocument,
  Score as ScoreType,
  CreateScoreInput as CreateScoreInputType,
} from "@/graphql/generated/graphql";
import { ScoreBox } from "@/components/test/ScoreBox";
import { TestBox } from "@/components/test/TestBox";
import { useMutation } from "@apollo/client";

interface Props {}

const initialScoreInput: ScoreType = {
  id: undefined,
  wpm: 0,
  rawWpm: 0,
  accuracy: 0,
  mode: "",
  modeSetting: 0,
  content: "",
  wpmStats: [],
  rawStats: [],
  language: "",
  createdAt: undefined,
  updatedAt: undefined,
};

export const MainBox: FC<Props> = ({}) => {
  const [scoreData, setScoreData] = useState<ScoreType>(initialScoreInput);
  const [showScore, setShowScore] = useState(false);

  const [createScore] = useMutation(CreateScoreDocument);

  async function handleSaveScore(score: CreateScoreInputType) {
    // TODO: some validation of course, anti-cheat (LONG SHOT)
    const response = await createScore({
      variables: {
        input: {
          wpm: Math.round(score.wpm), // since there's no way to enforce `int`, we round here just to be sure
          rawWpm: Math.round(score.rawWpm),
          accuracy: score.accuracy,
          wpmStats: score.wpmStats,
          rawStats: score.rawStats,
          mode: score.mode,
          modeSetting: score.modeSetting,
          content: score.content,
          language: score.language,
        },
      },
    });
    // setScoreData(response.data?.createScore.score);
    // TODO: ↑↑↑↑↑↑↑↑↑↑↑↑
    setShowScore(true);
    setScoreData(response.data?.createScore.score);
  }

  function handleStartNextTest() {
    setShowScore(false);
    setScoreData(initialScoreInput);
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
