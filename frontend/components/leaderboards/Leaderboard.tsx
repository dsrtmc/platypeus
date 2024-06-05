"use client";

import React, { startTransition, useCallback } from "react";
import {
  Leaderboard_GetScoresForLeaderboardDocument,
  Leaderboard_GetScoresForLeaderboardQueryVariables,
  SortEnumType,
} from "@/graphql/generated/graphql";
import { gql, useSuspenseQuery } from "@apollo/client";
import styles from "@/components/leaderboards/Leaderboards.module.css";
import Link from "next/link";

const GetScoresForLeaderboard = gql`
  query Leaderboard_GetScoresForLeaderboard(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $mode: String!
    $modeSetting: Int!
  ) {
    scoresForLeaderboard(
      after: $after
      before: $before
      first: $first
      last: $last
      mode: $mode
      modeSetting: $modeSetting
    ) {
      edges {
        node {
          id
          wpm
          rawWpm
          accuracy
          user {
            username
          }
          mode
          modeSetting
          content
          createdAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

interface Props {
  mode: string;
  modeSetting: number;
}

// TODO: Lmao for some reason i got this hydration error
// Warning: Text content did not match. Server: "24:52:19" Client: "00:52:19"
export function Leaderboard({ mode, modeSetting }: Props) {
  const variables: Leaderboard_GetScoresForLeaderboardQueryVariables = {
    first: 25,
    mode,
    modeSetting,
  };

  const { data, error, fetchMore } = useSuspenseQuery(Leaderboard_GetScoresForLeaderboardDocument, {
    variables,
  });

  function handleFetchMore() {
    if (!data.scoresForLeaderboard?.pageInfo.hasNextPage) return;

    startTransition(() => {
      // why squiggly?
      fetchMore({
        variables: { ...variables, after: data.scoresForLeaderboard?.pageInfo.endCursor },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousQueryResult;

          const prevEdges = previousQueryResult.scoresForLeaderboard!.edges ?? [];
          const nextEdges = fetchMoreResult.scoresForLeaderboard!.edges ?? [];

          return {
            scoresForLeaderboard: {
              ...previousQueryResult.scoresForLeaderboard,
              edges: [...prevEdges, ...nextEdges],
              pageInfo: fetchMoreResult.scoresForLeaderboard!.pageInfo,
            },
          };
        },
      });
    });
  }

  /* prettier-ignore */
  const observerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          await handleFetchMore();
        }
      });
    });

    observer.observe(node);

    return () => observer.unobserve(node);
  }, [handleFetchMore]);

  if (!data?.scoresForLeaderboard) {
    // TODO: throw an error?
    throw new Error("we didnt get data");
  }
  return (
    <div className={styles.box}>
      <label>
        {mode} {modeSetting}
      </label>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr className={styles.tr}>
              <th className={`${styles.left} ${styles.th}`}>
                <p>#</p>
              </th>
              <th className={`${styles.left} ${styles.th}`}>
                <p>user</p>
                <p className={styles.sub}>name</p>
              </th>
              <th className={`${styles.right} ${styles.th}`}>
                <p>wpm</p>
                <p className={styles.sub}>cpm</p>
              </th>
              <th className={`${styles.right} ${styles.th}`}>
                <p>raw</p>
                <p className={styles.sub}>acc</p>
              </th>
              <th className={`${styles.right} ${styles.th}`}>
                <p>test</p>
                <p className={styles.sub}>mode</p>
              </th>
              <th className={`${styles.right} ${styles.th}`}>
                <p>date</p>
                <p className={styles.sub}>time</p>
              </th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {!data.scoresForLeaderboard.edges?.length && (
              <tr className={styles.tr}>
                {/* @ts-ignore // pretty sure it's correct but JSX doesn't expect a string */}
                <td className={styles.emptyMessage} colSpan={"100%"}>
                  uh oh, look like there's no scores yet!
                </td>
              </tr>
            )}
            {data.scoresForLeaderboard.edges!.map((edge, index) => (
              <tr className={styles.tr} key={edge.node.id}>
                <td className={`${styles.left} ${styles.td}`}>
                  <p>{index + 1}</p>
                </td>
                <td className={`${styles.left} ${styles.td}`}>
                  <Link href={`/user/${edge.node.user?.username}`} className={styles.user}>
                    {edge.node.user?.username}
                  </Link>
                </td>
                <td className={`${styles.right} ${styles.td}`}>
                  <p>{edge.node.wpm}</p>
                  <p className={styles.sub}>{edge.node.wpm * 5}</p>
                </td>
                <td className={`${styles.right} ${styles.td}`}>
                  <p>{edge.node.rawWpm}</p>
                  <p className={styles.sub}>{Math.round(edge.node.accuracy * 100)}%</p>
                </td>
                <td className={`${styles.right} ${styles.td}`}>
                  <p>{edge.node.mode}</p>
                  <p className={styles.sub}>{edge.node.modeSetting}</p>
                </td>
                <td className={`${styles.right} ${styles.td}`}>
                  <p>{new Date(edge.node.createdAt).toLocaleDateString()}</p>
                  <p className={styles.sub}>
                    {new Date(edge.node.createdAt).toLocaleTimeString([], { hourCycle: "h23" })}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={observerRef} />
      </div>
    </div>
  );
}
