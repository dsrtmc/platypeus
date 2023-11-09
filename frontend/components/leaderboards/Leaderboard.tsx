"use client";

import React, { startTransition, useEffect, useRef } from "react";
import { GetScoresDocument, GetScoresQuery, GetScoresQueryVariables } from "@/graphql/generated/graphql";
import { UseSuspenseQueryResult } from "@apollo/client";
import styles from "@/components/leaderboards/Leaderboards.module.css";

interface Props {
  queryResult: UseSuspenseQueryResult<GetScoresQuery, GetScoresQueryVariables>;
}

export function Leaderboard({ queryResult }: Props) {
  // TODO: stupid fucking types
  // TODO: also for some reason there's this funny duplication error, I have a hard time believing it's my fault (backend too)
  const { data, fetchMore } = queryResult;
  async function handleFetchMore() {
    console.log("The next cursor:", data?.scores?.pageInfo?.endCursor);
    if (data?.scores?.pageInfo?.hasNextPage) {
      startTransition(() => {
        fetchMore({
          query: GetScoresDocument,
          variables: {
            first: 10,
            after: data?.scores?.pageInfo?.endCursor,
            order: [{ wpm: "DESC" }],
          } as Partial<GetScoresQueryVariables>,
          updateQuery: (previousQueryResult, { fetchMoreResult }) => {
            console.log("Previous query result:", previousQueryResult);
            console.log("Fetch more result:", fetchMoreResult);
            //  NOT SURE IF THAT MAKES SENSE BUT LOL W/E
            if (!fetchMoreResult || !fetchMoreResult.scores || !previousQueryResult || !previousQueryResult.scores) {
              return {
                scores: {
                  pageInfo: { hasNextPage: false },
                  edges: [],
                },
              };
            }
            return {
              scores: {
                pageInfo: fetchMoreResult.scores.pageInfo,
                edges: [...previousQueryResult.scores.edges, ...fetchMoreResult.scores.edges],
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
          // uncomment for infinite scroll
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
  return (
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
          {data?.scores?.edges.map((edge, index) => (
            <tr className={styles.row} key={edge.node.id}>
              <td className={styles.left}>
                <p>{index + 1}</p>
              </td>
              <td className={styles.left}>
                <p>{edge.node.user?.username}</p>
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
              {data?.scores?.pageInfo?.hasNextPage && <button onClick={handleFetchMore}>fetch more</button>}
            </td>
          </tr>
        </tfoot>
      </table>
      <div ref={observerRef} />
    </div>
  );
}
