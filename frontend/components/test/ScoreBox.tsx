import { FC } from "react";
import { RestartButton } from "@/components/test/RestartButton";
import { Score as ScoreType } from "@/graphql/generated/graphql";
import { Score } from "@/components/test/Score";

interface Props {
  score: ScoreType | null; // TODO: idk if it should accept null we'll see maybe some funny fallback lol
  handleStartNextTest: () => void;
}

export const ScoreBox: FC<Props> = ({ score, handleStartNextTest }) => {
  return (
    <>
      <Score
        score={{
          rawWpm: 10,
          averageWpm: 10,
          time: 10,
          __typename: "Score",
          createdAt: new Date(),
          updatedAt: new Date(),
          id: "GUID?XD",
          ...score,
        }}
      />
      <RestartButton handleReset={handleStartNextTest} />
    </>
  );
};
