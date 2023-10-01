import { FC } from "react";
import { RestartButton } from "@/components/test/RestartButton";
import { Score as ScoreType } from "@/graphql/generated/graphql";
import { Score } from "@/components/test/Score";

interface Props {
  score: ScoreType;
  handleStartNextTest: () => void;
}

export const ScoreBox: FC<Props> = ({ score, handleStartNextTest }) => {
  return (
    <>
      <Score score={score} />
      <RestartButton handleReset={handleStartNextTest} />
    </>
  );
};
