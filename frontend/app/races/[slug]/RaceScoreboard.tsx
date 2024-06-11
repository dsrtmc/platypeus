import React, { useEffect, useState } from "react";
import styles from "./Race.module.css";
import { MeDocument, RaceBox_OnRaceEventSubscription } from "@/graphql/generated/graphql";
import { RacerScoreCard } from "@/app/races/[slug]/RacerScoreCard";
import { useQuery } from "@apollo/client";
import { sort } from "next/dist/build/webpack/loaders/css-loader/src/utils";

interface Props {
  edges: NonNullable<RaceBox_OnRaceEventSubscription["onRaceEvent"]["racers"]>["edges"];
  mode: string;
  modeSetting: number;
}

export const RaceScoreboard: React.FC<Props> = ({ edges, mode, modeSetting }) => {
  const { data: meData } = useQuery(MeDocument);
  const [sortedData, setSortedData] = useState(edges);
  useEffect(() => {
    if (!edges) return;
    const data = edges.slice(0);
    data.sort((a, b) => a.node.user.username.localeCompare(b.node.user.username));
    setSortedData(data);
  }, [edges]);
  if (!sortedData) return <div>no racers xd</div>;
  return (
    <div className={styles.scoreboard}>
      {!sortedData.length ? (
        <div className={styles.emptyScoreboardMessage}>
          [ ._.] <i className={styles.italic}>the race is empty...</i>
        </div>
      ) : (
        sortedData.map((edge) => {
          let divisor = modeSetting;
          if (mode === "time") divisor *= 6;
          const progress = edge.node.wordsTyped / divisor;
          return (
            <RacerScoreCard
              racer={edge.node}
              progress={progress}
              isMe={meData?.me?.username === edge.node.user.username}
              key={edge.node.id}
            />
          );
        })
      )}
    </div>
  );
};
