"use client";

import { FC, useState } from "react";
import styles from "./Test.module.css";
import {
  CreateScoreInput as CreateScoreInputType,
  MainBox_CreateScoreDocument,
  MainBox_CreateScoreMutation,
} from "@/graphql/generated/graphql";
import { ScoreBox } from "@/components/test/ScoreBox";
import { TestBox } from "@/components/test/TestBox";
import { FetchResult, gql, useMutation } from "@apollo/client";

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

  async function onSaveScore(result: FetchResult<MainBox_CreateScoreMutation>) {
    // TODO: some validation of course, anti-cheat (LONG SHOT)
    if (!result.data?.createScore.score) return; // TODO: better error handling here
    setShowScore(true);
    setScoreId(result.data.createScore.score.id);
  }

  function handleStartNextTest() {
    setShowScore(false);
  }

  return (
    <div className={styles.mainBox}>
      {showScore ? (
        <ScoreBox scoreId={scoreId} handleStartNextTest={handleStartNextTest} />
      ) : (
        <TestBox onSaveScore={onSaveScore} />
      )}
    </div>
  );
};
