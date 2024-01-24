import React from "react";
import styles from "./Race.module.css";
import { OnRaceEventSubscription } from "@/graphql/generated/graphql";
import { RacerScoreCard } from "@/app/races/[id]/RacerScoreCard";

interface Props {
  racers: OnRaceEventSubscription["onRaceEvent"]["racers"];
  modeSetting: number;
  timePassed: number;
}

export const RaceScoreboard: React.FC<Props> = ({ racers, modeSetting, timePassed }) => {
  return (
    <div className={styles.scoreboard}>
      <h1>racer stats:</h1>
      {racers.map((racer) => {
        // 120wpm in 1st second
        // return Math.round((characters / 5) * (60 / time));
        // 200wpm in 5seconds means that we should do 60 / 5 and divide wpm by this right?
        const progress = racer.wordsTyped / modeSetting;
        return <RacerScoreCard racer={racer} progress={progress} />;
      })}
    </div>
  );
};
