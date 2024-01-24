import React, { useEffect, useRef, useState } from "react";
import styles from "./Race.module.css";
import { OnRaceEventSubscription } from "@/graphql/generated/graphql";

interface Props {
  racer: OnRaceEventSubscription["onRaceEvent"]["racers"][number];
  progress: number;
}

export const RacerScoreCard: React.FC<Props> = ({ racer, progress }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const parentWidth = ref.current?.parentElement?.clientWidth;
  useEffect(() => {
    setOffset((parentWidth - 250) * progress);
  }, [racer]);
  return (
    // {racer.user.username}: {racer.wpm}wpm {racer.finished ? "☑️" : "❎"} finished
    <div key={racer.user.username} className={styles.racerCard} ref={ref}>
      <div className={styles.left}>
        <div style={{ position: "absolute", left: `${offset}px`, top: -0.5 + "rem" }}>{racer.user.username}</div>
        {/*<div style={{ marginLeft: `max(calc(${offset}px - 8ch), 0)px` }}>{racer.user.username}</div>*/}
        <div className={styles.progressBar} />
      </div>
      <h2>{(progress * 100).toFixed(2)}%</h2>
      <div className={styles.right}>
        <div>{racer.finished && "finished"}</div>
        <div>{racer.wpm}wpm</div>
      </div>
    </div>
  );
};
