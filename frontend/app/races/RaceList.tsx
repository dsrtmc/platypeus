import React from "react";
import { getClient } from "@/lib/client";
import { GetRacesDocument, GetRacesQueryVariables } from "@/graphql/generated/graphql";
import { RaceCard } from "@/app/races/RaceCard";
import styles from "./Races.module.css";

interface Props {}

export async function RaceList({}) {
  const response = await getClient().query({
    query: GetRacesDocument,
    variables: {
      where: { and: [{ running: { eq: false } }, { finished: { eq: false } }] },
      order: [{ createdAt: "DESC" }],
      racesFirst: 5,
      racersFirst: 5,
    } as GetRacesQueryVariables,
  });
  console.log("The response we got:", response);
  return (
    <div className={styles.list}>
      {response.data.races?.edges?.map((edge) => (
        <RaceCard node={edge.node} />
      ))}
    </div>
  );
}
