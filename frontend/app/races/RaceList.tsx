"use client";

import React, { useCallback, useState } from "react";
import { GetRacesDocument, GetRacesQueryVariables, RaceSortInput } from "@/graphql/generated/graphql";
import styles from "./Races.module.css";
import { useQuery } from "@apollo/client";
import { RaceListItem } from "@/app/races/RaceListItem";
import { RaceListRefreshButton } from "@/app/races/RaceListRefreshButton";
import { RaceListEmptyMessage } from "@/app/races/RaceListEmptyMessage";

interface Props {}

export function RaceList({}) {
  const variables: GetRacesQueryVariables = {
    where: { and: [{ running: { eq: false } }, { finished: { eq: false } }] },
    order: [{ createdAt: "DESC" }] as RaceSortInput,
    racesFirst: 10,
    racersFirst: 10,
  };
  const { data, loading, error, refetch, fetchMore } = useQuery(GetRacesDocument, {
    variables,
  });
  async function handleRefetch() {
    await refetch();
  }

  async function handleFetchMore() {
    const response = await fetchMore({
      variables: { ...variables, after: data?.races?.pageInfo.endCursor } as GetRacesQueryVariables,
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        if (!data?.races?.pageInfo.hasNextPage) return;

        if (!fetchMoreResult.races || !previousQueryResult?.races) {
          console.log("we got cancer");
          return {
            scores: {
              pageInfo: { hasNextPage: false },
              edges: [],
            },
          };
        }
        return {
          races: {
            pageInfo: fetchMoreResult.races.pageInfo,
            edges: [...previousQueryResult.races.edges, ...fetchMoreResult.races.edges],
          },
        };
      },
    });
    console.log("REsponse:", response);
  }

  /* prettier-ignore */
  const observerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          // uncomment for infinite scroll
          await handleFetchMore();
        }
      });
    });

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [handleFetchMore]);

  console.log("The data we got:", data);
  if (!data?.races) return <div>no data</div>;
  return (
    <div className={styles.box}>
      <RaceListRefreshButton handleRefetch={handleRefetch} />
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th className={styles.left}>
                <p>author</p>
              </th>
              <th className={styles.right}>
                <p>racers</p>
              </th>
              <th className={`${styles.right} ${styles.date}`}>
                <p>created</p>
              </th>
              <th className={styles.right} />
            </tr>
          </thead>
          <tbody className={styles.body}>
            {!data.races.edges?.length ? (
              <RaceListEmptyMessage />
            ) : (
              data.races.edges!.map((edge) => <RaceListItem race={edge.node} key={edge.node.id} />)
            )}
          </tbody>
        </table>
        <div ref={observerRef} />
      </div>
    </div>
    // </div>
  );
}
