import styles from "@/components/leaderboards/Leaderboards.module.css";
import { Leaderboard } from "@/components/leaderboards/Leaderboard";

/*
 * might not be the worst idea to just have a query here that will fetch both.
 * or, instead of that, I just make a separate spinner for every leaderboard, because right now I'm
 * making 2 queries and waiting for BOTH of them to finish, which doesn't really make sense.
 *
 * this would be OK if not for the fact that i don't know whether we can do it like so:
 * - initial fetch on the server
 * - then enable pagination with the initial server data and supply further data on the client
 * if so, sure, that's a nice idea. but then again,
 * it's just unnecessary complexity so as to adhere to the SINGLE RESPONSIBILITY principle 🥸
 */
export default function LeaderboardsPage() {
  return (
    <div className={styles.tables}>
      <Leaderboard mode={"time"} modeSetting={5} />
      <Leaderboard mode={"time"} modeSetting={15} />
    </div>
  );
}
