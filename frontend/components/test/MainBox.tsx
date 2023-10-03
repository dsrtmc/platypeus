"use client";

import { FC, useState } from "react";
import styles from "./Test.module.css";
import { CreateScoreDocument, Score as ScoreType } from "@/graphql/generated/graphql";
import { ScoreBox } from "@/components/test/ScoreBox";
import { TestBox } from "@/components/test/TestBox";
import { useMutation } from "@apollo/client";

interface Props {}

const initialScore: ScoreType = {
  averageWpm: 0,
  createdAt: undefined,
  id: undefined,
  rawWpm: 0,
  time: 0,
  updatedAt: undefined,
  language: "",
  mode: "",
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
          time: score.time,
          mode: score.mode,
          averageWpm: score.averageWpm,
          language: score.language,
          rawWpm: score.rawWpm,
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
