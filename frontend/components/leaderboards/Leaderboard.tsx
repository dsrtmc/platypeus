"use client";

import React, { startTransition, useEffect, useState } from "react";
import { GetScoresDocument } from "@/graphql/generated/graphql";
import { useLazyQuery, useSuspenseQuery } from "@apollo/client";

interface Props {}

export function Leaderboard({}) {
  // no idea why funny types cause funny squiggly types if everything's correct
  const { data, fetchMore } = useSuspenseQuery(GetScoresDocument, { variables: { first: 1 } });
  async function handleRefetch() {
    startTransition(() => {
      const a = fetchMore({
        query: GetScoresDocument,
        variables: { first: 1, after: data?.scores?.pageInfo?.endCursor },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          return {
            scores: {
              pageInfo: fetchMoreResult?.scores?.pageInfo,
              edges: [...previousQueryResult?.scores?.edges, ...fetchMoreResult?.scores?.edges],
            },
          };
        },
      });
      a.then((x) => console.log(x));
    });
  }
  return (
    <>
      {data?.scores?.edges.map((edge) => (
        <div key={edge.node.id}>
          {edge.node.averageWpm} by {edge.node.user?.username}
        </div>
      ))}
      <p>data: {JSON.stringify(data)}</p>
      <button onClick={handleRefetch}> fetch more </button>
    </>
  );
}
