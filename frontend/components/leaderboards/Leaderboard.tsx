"use client";

import React, { startTransition, useEffect, useRef } from "react";
import {
  GetScoresForLeaderboardDocument,
  GetScoresForLeaderboardQuery,
  GetScoresForLeaderboardQueryVariables,
} from "@/graphql/generated/graphql";
import { SuspenseQueryHookOptions, useQuery } from "@apollo/client";
import styles from "@/components/leaderboards/Leaderboards.module.css";
import Link from "next/link";

interface Props {
  mode: string;
  modeSetting: number;
}

// Unnecessary, I'll keep it in for now only so I can look at great-looking HOC code.
const LeaderboardWithLabel = withLabel(Leaderboard);
export function withLabel(Component) {
  return ({ children, ...rest }) => {
    return (
      <div className={styles.box}>
        <label>{children}</label>
        <Component {...rest} />
      </div>
    );
  };
}

export function Leaderboard({ mode, modeSetting }: Props) {
  const { data, fetchMore } = useQuery(GetScoresForLeaderboardDocument, {
    variables: {
      first: 25,
      mode,
      modeSetting,
    },
  } as SuspenseQueryHookOptions<GetScoresForLeaderboardQuery, GetScoresForLeaderboardQueryVariables>);
  async function handleFetchMore() {
    console.log("The next cursor:", data?.scoresForLeaderboard?.pageInfo?.endCursor);
    if (data?.scoresForLeaderboard?.pageInfo?.hasNextPage) {
      const variables: GetScoresForLeaderboardQueryVariables = {
        first: 10,
        after: data?.scoresForLeaderboard?.pageInfo?.endCursor,
        mode,
        modeSetting,
      };
      startTransition(() => {
        fetchMore({
          query: GetScoresForLeaderboardDocument,
          variables,
          updateQuery: (previousQueryResult, { fetchMoreResult }) => {
            if (!fetchMoreResult?.scoresForLeaderboard || !previousQueryResult?.scoresForLeaderboard) {
              return {
                scores: {
                  pageInfo: { hasNextPage: false },
                  edges: [],
                },
              };
            }
            return {
              scoresForLeaderboard: {
                pageInfo: fetchMoreResult.scoresForLeaderboard.pageInfo,
                edges: [
                  ...previousQueryResult.scoresForLeaderboard.edges,
                  ...fetchMoreResult.scoresForLeaderboard.edges,
                ],
              },
            };
          },
        });
      });
    }
  }

  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          // TODO: uncomment for infinite scroll
          // await handleRefetch();
        }
      });
    });

    if (observerRef.current) {
      observer.observe(observerRef.current as HTMLDivElement);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current as HTMLDivElement);
      }
    };
  }, [observerRef]);
  if (!data?.scoresForLeaderboard) return <div>no data</div>;
  return (
    <div className={styles.box}>
      <label>
        {mode} {modeSetting}
      </label>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.head}>
            {/* TODO: fix opacity on those lol */}
            <tr>
              <th className={styles.left}>
                <p>#</p>
              </th>
              <th className={styles.left}>
                <p>name</p>
                <p className={styles.sub}>user</p>
              </th>
              <th className={styles.right}>
                <p>wpm</p>
                <p className={styles.sub}>cpm</p>
              </th>
              <th className={styles.right}>
                <p>raw</p>
                <p className={styles.sub}>acc</p>
              </th>
              <th className={styles.right}>
                <p>test</p>
                <p className={styles.sub}>mode</p>
              </th>
              <th className={styles.right}>
                <p>date</p>
                <p className={styles.sub}>time</p>
              </th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {data.scoresForLeaderboard.edges!.map((edge, index) => (
              <tr className={styles.row} key={edge.node.id}>
                <td className={styles.left}>
                  <p>{index + 1}</p>
                </td>
                <td className={styles.left}>
                  <Link href={`/user/${edge.node.user?.username}`} className={styles.user}>
                    {edge.node.user?.username}
                  </Link>
                </td>
                <td className={styles.right}>
                  <p>{edge.node.wpm}</p>
                  <p className={styles.sub}>{edge.node.wpm * 5}</p>
                </td>
                <td className={styles.right}>
                  <p>{edge.node.rawWpm}</p>
                  <p className={styles.sub}>{edge.node.accuracy.toFixed(2) * 100}%</p>
                </td>
                <td className={styles.right}>
                  <p>{edge.node.mode}</p>
                  <p className={styles.sub}>{edge.node.modeSetting}</p>
                </td>
                <td className={styles.right}>
                  <p>{new Date(edge.node.createdAt).toLocaleDateString()}</p>
                  <p className={styles.sub}>{new Date(edge.node.createdAt).toLocaleTimeString()}</p>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className={styles.foot}>
            <tr className={styles.row}>
              <td className={styles.cell} colSpan={"100%" as any}>
                {data?.scoresForLeaderboard?.pageInfo?.hasNextPage && (
                  <button onClick={handleFetchMore}>fetch more</button>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
        <div ref={observerRef} />
      </div>
    </div>
  );
}
