"use client";

import React from "react";
import { getClient } from "@/lib/client";
import {
  Exact,
  GetRacesDocument,
  GetRacesQuery,
  GetRacesQueryVariables,
  RaceSortInput,
} from "@/graphql/generated/graphql";
import { RaceCard } from "@/app/races/RaceCard";
import styles from "./Races.module.css";
import { useQuery } from "@apollo/client";

interface Props {}

export function RaceList({}) {
  const variables: GetRacesQueryVariables = {
    where: { and: [{ running: { eq: false } }, { finished: { eq: false } }] },
    order: [{ createdAt: "DESC" }] as RaceSortInput,
    racesFirst: 5,
    racersFirst: 5,
  };
  const { data, loading, error, refetch } = useQuery(GetRacesDocument, {
    variables,
  });
  console.log("The data we got:", data);
  if (!data?.races) return <div>no data</div>;
  return (
    <div className={styles.list}>
      <button onClick={() => refetch()}>refresh list</button>
      {data.races.edges?.map((edge) => (
        <RaceCard race={edge.node} />
      ))}
    </div>
  );
}
