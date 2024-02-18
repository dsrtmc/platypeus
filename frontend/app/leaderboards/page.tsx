"use client";

import { NoInfer, SuspenseQueryHookOptions, useSuspenseQuery } from "@apollo/client";
import {
  GetScoresDocument,
  GetScoresForLeaderboardDocument,
  GetScoresQuery,
  GetScoresQueryVariables,
} from "@/graphql/generated/graphql";
import styles from "@/components/leaderboards/Leaderboards.module.css";
import { Leaderboard } from "@/components/leaderboards/Leaderboard";

const LeaderboardWithLabel = withLabel(Leaderboard);

function withLabel(Component) {
  return ({ children, ...rest }) => {
    return (
      <div className={styles.box}>
        <label>{children}</label>
        <Component {...rest} />
      </div>
    );
  };
}

export default function LeaderboardsPage() {
  const queryResult5 = useSuspenseQuery(GetScoresForLeaderboardDocument, {
    variables: {
      first: 25,
      where: { and: [{ mode: { eq: "time" } }, { modeSetting: { eq: 5 } }] },
      order: [{ wpm: "DESC" }],
    },
    fetchPolicy: "network-only",
  } as SuspenseQueryHookOptions<GetScoresQuery, GetScoresQueryVariables>);
  const queryResult15 = useSuspenseQuery(GetScoresForLeaderboardDocument, {
    variables: {
      first: 25,
      where: { and: [{ mode: { eq: "time" } }, { modeSetting: { eq: 15 } }] },
      order: [{ wpm: "DESC" }],
    },
    fetchPolicy: "network-only",
  } as SuspenseQueryHookOptions<GetScoresQuery, GetScoresQueryVariables>);
  return (
    <div className={styles.tables}>
      <LeaderboardWithLabel queryResult={queryResult5}>Time 5</LeaderboardWithLabel>
      <LeaderboardWithLabel queryResult={queryResult15}>Time 15</LeaderboardWithLabel>
    </div>
  );
}
