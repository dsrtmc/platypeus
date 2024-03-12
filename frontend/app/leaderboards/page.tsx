import styles from "@/components/leaderboards/Leaderboards.module.css";
import { Leaderboard } from "@/components/leaderboards/Leaderboard";

// TODO: might not be the worst idea to just have a query here that will fetch both.
// or, instead of that, I just make a separate spinner for every leaderboard, because right now I'm
// making 2 queries and waiting for BOTH of them to finish, which doesn't really make sense.
export default function LeaderboardsPage() {
  return (
    <div className={styles.tables}>
      <Leaderboard mode={"time"} modeSetting={5} />
      <Leaderboard mode={"time"} modeSetting={15} />
    </div>
  );
}
