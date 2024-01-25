import React from "react";
import styles from "./Race.module.css";
import { OnRaceEventSubscription } from "@/graphql/generated/graphql";
import { RacerScoreCard } from "@/app/races/[id]/RacerScoreCard";

interface Props {
  racers: OnRaceEventSubscription["onRaceEvent"]["racers"];
  mode: string;
  modeSetting: number;
}

export const RaceScoreboard: React.FC<Props> = ({ racers, mode, modeSetting }) => {
  return (
    <div className={styles.scoreboard}>
      <h1>racer stats:</h1>
      {racers.map((racer) => {
        let divisor = modeSetting;
        if (mode === "time") divisor *= 6;
        const progress = racer.wordsTyped / divisor;
        return <RacerScoreCard racer={racer} progress={progress} key={racer.id} />;
      })}
    </div>
  );
};
