"use client";

import { FC, useState } from "react";
import styles from "./Test.module.css";
import { CreateScoreDocument, Score as ScoreType } from "@/graphql/generated/graphql";
import { ScoreBox } from "@/components/test/ScoreBox";
import { TestBox } from "@/components/test/TestBox";
import { useMutation } from "@apollo/client";

interface Props {}

const initialScore: ScoreType = {
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
  const [scoreData, setScoreData] = useState<ScoreType>(initialScore);
  const [showScore, setShowScore] = useState(false);

  const [createScore] = useMutation(CreateScoreDocument);

  async function handleSaveScore(score: ScoreType) {
    // TODO: some validation of course, anti-cheat (LONG SHOT)
    // TODO: Probably use a GraphQL fragment so I can do { input: { ...score } } or something alike
    // TODO: ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
