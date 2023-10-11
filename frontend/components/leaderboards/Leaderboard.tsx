"use client";

import React, { startTransition } from "react";
import { GetScoresDocument, GetScoresQueryVariables } from "@/graphql/generated/graphql";
import { useSuspenseQuery } from "@apollo/client";
import styles from "@/components/leaderboards/Leaderboards.module.css";

interface Props {}

export function Leaderboard({}) {
  // TODO: stupid fucking types
  // TODO: also for some reason there's this funny duplication error, I have a hard time believing it's my fault
  const { data, fetchMore } = useSuspenseQuery(GetScoresDocument, {
    variables: { first: 1, order: [{ averageWpm: "DESC" }] },
  });
  async function handleRefetch() {
    if (data?.scores?.pageInfo?.hasNextPage) {
      startTransition(() => {
        fetchMore({
          query: GetScoresDocument,
          variables: {
            first: 10,
            after: data?.scores?.pageInfo?.endCursor,
            order: [{ averageWpm: "DESC" }],
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
  return (
    <>
      {data?.scores?.pageInfo?.hasNextPage && <button onClick={handleRefetch}> fetch more </button>}
      <table className={styles.leaderboard}>
        <caption className="scores-caption">caption</caption>
        <thead>
          <tr>
            <th>
              <p className="main-data numeric">#</p>
            </th>
            <th className="username">
              <p className="main-data">name</p>
              <p className="secondary-data">user</p>
            </th>
            <th>
              <p className="main-data numeric">wpm</p>
              <p className="secondary-data numeric">cpm</p>
            </th>
            <th>
              <p className="main-data numeric">raw</p>
              <p className="secondary-data numeric">acc</p>
            </th>
            <th>
              <p className="main-data numeric">test</p>
              <p className="secondary-data numeric">mode</p>
            </th>
            <th className="datetime">
              <p className="main-data">date</p>
              <p className="secondary-data">time</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.scores?.edges.map((edge, index) => (
            <tr className="fade-in" key={edge.node.id}>
              <td>
                <p className="main-data numeric">{index + 1}</p>
              </td>
              <td className="username">
                <p className="secondary-data">{edge.node.user.username}</p>
              </td>
              <td>
                <p className="main-data numeric">{edge.node.averageWpm}</p>
                <p className="secondary-data numeric">{edge.node.averageWpm * 5}</p>
              </td>
              <td>
                <p className="main-data numeric">{edge.node.rawWpm}</p>
                <p className="secondary-data numeric">acc%</p>
              </td>
              <td>
                <p className="main-data numeric">{edge.node.mode}</p>
                <p className="secondary-data numeric">{edge.node.modeSetting}</p>
              </td>
              <td className="datetime">
                <p className="main-data">{new Date(edge.node.createdAt).toLocaleDateString()}</p>
                <p className="secondary-data">{new Date(edge.node.createdAt).toLocaleTimeString()}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
