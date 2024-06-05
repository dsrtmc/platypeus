"use client";

import { FC, useContext, useState } from "react";
import styles from "./Test.module.css";
import {
  CreateScoreInput as CreateScoreInputType,
  MainBox_CreateScoreDocument,
  MainBox_CreateScoreMutation,
} from "@/graphql/generated/graphql";
import { ScoreBox } from "@/components/test/ScoreBox";
import { TestBox } from "@/components/test/TestBox";
import { FetchResult, gql, useMutation } from "@apollo/client";
import { ErrorContext, ErrorType } from "@/app/ErrorProvider";

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
      errors {
        code: __typename
        ... on Error {
          message
        }
      }
    }
  }
`;

interface Props {}

export const MainBox: FC<Props> = ({}) => {
  const { setError } = useContext(ErrorContext)!;

  const [scoreId, setScoreId] = useState("");
  const [showScore, setShowScore] = useState(false);

  async function onSaveScore(result: FetchResult<MainBox_CreateScoreMutation>) {
    // TODO: some validation of course, anti-cheat (LONG SHOT)
    if (!result.data?.createScore.score) {
      const firstError = result.data?.createScore.errors?.[0];
      const error: ErrorType = {
        code: firstError ? firstError.code : "ERROR_CREATING_SCORE",
        message: firstError ? firstError.message : "Unable to create score. See the console for more details.",
      };
      console.error("Errors:", result?.data?.createScore?.errors);
      setError(error);
      return;
    }
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
