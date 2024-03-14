import React from "react";
import styles from "./Race.module.css";
import { RaceBox_OnRaceEventSubscription } from "@/graphql/generated/graphql";
import { RacerScoreCard } from "@/app/races/[slug]/RacerScoreCard";

interface Props {
  edges: NonNullable<RaceBox_OnRaceEventSubscription["onRaceEvent"]["racers"]>["edges"];
  mode: string;
  modeSetting: number;
}

export const RaceScoreboard: React.FC<Props> = ({ edges, mode, modeSetting }) => {
  if (!edges) return <div>no racers xd</div>;
  return (
    <div className={styles.scoreboard}>
      {!edges.length ? (
        <div className={styles.emptyScoreboardMessage}>
          [ ._.] <i className={styles.italic}>the race is empty...</i>
        </div>
      ) : (
        edges.map((edge) => {
          let divisor = modeSetting;
          if (mode === "time") divisor *= 6;
          const progress = edge.node.wordsTyped / divisor;
          return <RacerScoreCard racer={edge.node} progress={progress} key={edge.node.id} />;
        })
      )}
    </div>
  );
};
