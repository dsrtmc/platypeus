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
  averageWpm: 0,
  rawWpm: 0,
  mode: "",
  modeSetting: 0,
  language: "",
  createdAt: undefined,
  updatedAt: undefined,
};

export const MainBox: FC<Props> = ({}) => {
  const [scoreData, setScoreData] = useState<ScoreType>(initialScore);
  const [showScore, setShowScore] = useState(false);

  const [createScore] = useMutation(CreateScoreDocument);

  async function handleSaveScore(score: ScoreType) {
    setShowScore(true);
    setScoreData(score);
    // TODO: some validation of course
    // TODO: Probably use a GraphQL fragment so I can do { input: { ...score } } or something alike
    // for some reason after changing that my graphql server doesnt work through http lol sick
    const result = await createScore({
      variables: {
        input: {
          averageWpm: Math.round(score.averageWpm), // since there's no way to enforce `int`, we round here just to be sure
          rawWpm: Math.round(score.rawWpm), // up
          mode: score.mode,
          modeSetting: score.modeSetting,
          language: score.language,
        },
      },
    });
    console.log("Result:", result);
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
