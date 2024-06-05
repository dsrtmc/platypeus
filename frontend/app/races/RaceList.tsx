"use client";

import React, { startTransition, useCallback } from "react";
import { RaceList_GetRacesDocument, RaceList_GetRacesQueryVariables, SortEnumType } from "@/graphql/generated/graphql";
import styles from "./Races.module.css";
import { gql, useSuspenseQuery } from "@apollo/client";
import { RaceListItem } from "@/app/races/RaceListItem";
import { RaceListRefreshButton } from "@/app/races/RaceListRefreshButton";
import { RaceListEmptyMessage } from "@/app/races/RaceListEmptyMessage";

interface Props {}

const GetRaces = gql`
  query RaceList_GetRaces(
    $after: String
    $before: String
    $racesFirst: Int
    $racesLast: Int
    $order: [RaceSortInput!]
    $where: RaceFilterInput
    $racersFirst: Int
  ) {
    races(after: $after, before: $before, first: $racesFirst, last: $racesLast, order: $order, where: $where) {
      edges {
        node {
          id
          createdAt
          racers(first: $racersFirst) {
            edges {
              node {
                user {
                  username
                }
                wpm
              }
            }
          }
          mode
          modeSetting
          host {
            username
          }
          unlisted
          slug
          finished
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export function RaceList({}) {
  const variables: RaceList_GetRacesQueryVariables = {
    where: { and: [{ running: { eq: false } }, { finished: { eq: false } }, { unlisted: { eq: false } }] },
    order: { createdAt: SortEnumType.Desc, id: SortEnumType.Desc },
    racesFirst: 10,
    racersFirst: 10,
  };

  const { data, error, refetch, fetchMore } = useSuspenseQuery(RaceList_GetRacesDocument, {
    variables,
  });
  async function handleRefetch() {
    startTransition(() => {
      refetch();
    });
  }

  async function handleFetchMore() {
    if (!data.races?.pageInfo.hasNextPage) return;

    startTransition(() => {
      fetchMore({
        variables: { ...variables, after: data?.races?.pageInfo.endCursor } as RaceList_GetRacesQueryVariables,
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousQueryResult;

          const prevEdges = previousQueryResult.races!.edges ?? [];
          const nextEdges = fetchMoreResult.races!.edges ?? [];

          return {
            races: {
              ...previousQueryResult.races,
              edges: [...prevEdges, ...nextEdges],
              pageInfo: fetchMoreResult.races!.pageInfo,
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
          // uncomment for infinite scroll
          await handleFetchMore();
        }
      });
    });

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [data, handleFetchMore]);

  console.log("The data we got:", data);
  if (!data?.races) return <div>no data</div>;
  return (
    <div className={styles.box}>
      <RaceListRefreshButton handleRefetch={handleRefetch} />
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr className={styles.tr}>
              <th className={`${styles.left} ${styles.th}`}>
                <p>author</p>
              </th>
              <th className={`${styles.right} ${styles.th}`}>
                <p>mode</p>
              </th>
              <th className={`${styles.right} ${styles.th}`}>
                <p>racers</p>
              </th>
              <th className={`${styles.right} ${styles.th} ${styles.date}`}>
                <p>created</p>
              </th>
              <th className={`${styles.right} ${styles.th}`} />
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
