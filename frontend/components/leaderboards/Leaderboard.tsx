"use client";

import React, { startTransition } from "react";
import { GetScoreQuery, GetScoresDocument, GetScoresQuery, GetScoresQueryVariables } from "@/graphql/generated/graphql";
import { NoInfer, SuspenseQueryHookOptions, useSuspenseQuery } from "@apollo/client";

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
      {data?.scores?.edges.map((edge) => (
        <div key={edge.node.id}>
          {edge.node.averageWpm} by {edge.node.user?.username}
        </div>
      ))}
      <p>data: {JSON.stringify(data)}</p>
    </>
  );
}
