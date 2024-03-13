"use client";

import { FC, useState } from "react";
import styles from "./Test.module.css";
import { CreateScoreInput as CreateScoreInputType, MainBox_CreateScoreDocument } from "@/graphql/generated/graphql";
import { ScoreBox } from "@/components/test/ScoreBox";
import { TestBox } from "@/components/test/TestBox";
import { gql, useMutation } from "@apollo/client";

const CreateScoreFragment = gql`
  fragment ScoreInfo on Score {
    wpm
    rawWpm
    mode
    modeSetting
    content
    language
    accuracy
    wpmStats
    rawStats
    user {
      username
    }
  }
`;

const CreateScoreMutation = gql`
  mutation MainBox_CreateScore($input: CreateScoreInput!) {
    createScore(input: $input) {
      score {
        id
        ...ScoreInfo
      }
    }
  }
`;

interface Props {}

export const MainBox: FC<Props> = ({}) => {
  const [scoreId, setScoreId] = useState("");
  const [showScore, setShowScore] = useState(false);

  const [createScore] = useMutation(MainBox_CreateScoreDocument);

  async function handleSaveScore(score: CreateScoreInputType) {
    // TODO: some validation of course, anti-cheat (LONG SHOT)
    const { data } = await createScore({
      variables: {
        input: {
          wpm: Math.round(score.wpm), // since there's no way to enforce an `int`, we round here just to be sure
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
    if (!data?.createScore.score) return; // TODO: better error handling here
    setShowScore(true);
    setScoreId(data.createScore.score?.id);
  }

  function handleStartNextTest() {
    setShowScore(false);
  }

  return (
    <div className={styles.box}>
      {showScore ? (
        <ScoreBox scoreId={scoreId} handleStartNextTest={handleStartNextTest} />
      ) : (
        <TestBox handleSaveScore={handleSaveScore} />
      )}
    </div>
  );
};
