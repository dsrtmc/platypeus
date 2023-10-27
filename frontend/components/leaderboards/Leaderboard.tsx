"use client";

import React, { startTransition, useEffect, useRef } from "react";
import { GetScoresDocument, GetScoresQueryVariables } from "@/graphql/generated/graphql";
import { useReactiveVar, useSuspenseQuery } from "@apollo/client";
import styles from "@/components/leaderboards/Leaderboards.module.css";
import { BsSignIntersectionT } from "react-icons/bs";

interface Props {}

export function Leaderboard({}) {
  // TODO: stupid fucking types
  // TODO: also for some reason there's this funny duplication error, I have a hard time believing it's my fault (backend too)
  const { data, fetchMore } = useSuspenseQuery(GetScoresDocument, {
    variables: { first: 25, order: [{ wpm: "DESC", user: { username: "DESC" } }] },
  });
  async function handleRefetch() {
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
            return {
              scores: {
                pageInfo: fetchMoreResult?.scores?.pageInfo,
                edges: [...previousQueryResult?.scores?.edges, ...fetchMoreResult?.scores?.edges],
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
    <>
      {data?.scores?.pageInfo?.hasNextPage && <button onClick={handleRefetch}> fetch more </button>}
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th className={styles.cell}>
                <p className="main-data numeric">#</p>
              </th>
              <th className={styles.cell}>
                <p className="main-data">name</p>
                <p className="secondary-data">user</p>
              </th>
              <th className={styles.cell}>
                <p className="main-data numeric">wpm</p>
                <p className="secondary-data numeric">cpm</p>
              </th>
              <th className={styles.cell}>
                <p className="main-data numeric">raw</p>
                <p className="secondary-data numeric">acc</p>
              </th>
              <th className={styles.cell}>
                <p className="main-data numeric">test</p>
                <p className="secondary-data numeric">mode</p>
              </th>
              <th className={styles.cell}>
                <p className="main-data">date</p>
                <p className="secondary-data">time</p>
              </th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {data?.scores?.edges.map((edge, index) => (
              <tr className={styles.row} key={edge.node.id}>
                <td className={styles.cell}>
                  <p className="main-data numeric">{index + 1}</p>
                </td>
                <td className={styles.cell}>
                  <p className="secondary-data">{edge.node.user?.username}</p>
                </td>
                <td className={styles.cell}>
                  <p className="main-data numeric">{edge.node.wpm}</p>
                  <p className="secondary-data numeric">{edge.node.wpm * 5}</p>
                </td>
                <td className={styles.cell}>
                  <p className="main-data numeric">{edge.node.rawWpm}</p>
                  <p className="secondary-data numeric">acc%</p>
                </td>
                <td className={styles.cell}>
                  <p className="main-data numeric">{edge.node.mode}</p>
                  <p className="secondary-data numeric">{edge.node.modeSetting}</p>
                </td>
                <td className={styles.cell}>
                  <p className="main-data">{new Date(edge.node.createdAt).toLocaleDateString()}</p>
                  <p className="secondary-data">{new Date(edge.node.createdAt).toLocaleTimeString()}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={observerRef}></div>
      </div>
    </>
  );
}
