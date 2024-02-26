import styles from "@/components/leaderboards/Leaderboards.module.css";
import { Leaderboard } from "@/components/leaderboards/Leaderboard";
import React from "react";

export default function LeaderboardsPage() {
  return (
    <div className={styles.tables}>
      <Leaderboard mode={"time"} modeSetting={5} />
      <Leaderboard mode={"time"} modeSetting={15} />
    </div>
  );
}
