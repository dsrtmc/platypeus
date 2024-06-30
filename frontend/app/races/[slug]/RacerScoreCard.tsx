import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Race.module.css";
import { RaceBox_OnRaceEventSubscription } from "@/graphql/generated/graphql";
import { FaCheck } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IconBase } from "react-icons";

interface Props {
  racer: NonNullable<NonNullable<RaceBox_OnRaceEventSubscription["onRaceEvent"]["racers"]>["edges"]>[number]["node"];
  progress: number;
  isMe: boolean;
}

export const RacerScoreCard: React.FC<Props> = ({ racer, progress, isMe }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const parentWidth = ref.current?.parentElement?.clientWidth;
    if (!parentWidth) return;
    setOffset((parentWidth - 250 ?? 1) * progress);
    console.log("Racer:", JSON.stringify(racer));
  }, [racer]);

  return (
    <div key={racer.user.username} className={styles.racerCard} ref={ref}>
      <div className={styles.left}>
        <div
          style={{ position: "absolute", left: `${offset}px`, top: -0.5 + "rem" }}
          className={`${styles.user} ${isMe && styles.isMe}`}
        >
          {racer.user.username}
        </div>
        <div className={styles.progressBar} />
      </div>
      <div className={styles.accuracy}>{Math.round(progress * 100)}%</div>
      <div className={styles.right}>
        <div className={styles.wpm}>{racer.wpm} wpm</div>
        {/*<div className={styles.finished}>{racer.finished && <FaCheck style={{ fontSize: "0.8rem" }} />}</div>*/}
        <div className={styles.finished}>{racer.finished && "hello xd"}</div>
      </div>
    </div>
  );
};
