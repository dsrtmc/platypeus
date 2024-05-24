import React from "react";
import { RaceBox } from "@/app/races/[slug]/RaceBox";
import { getClient } from "@/lib/client";
import { RacePage_GetRaceDocument } from "@/graphql/generated/graphql";
import { notFound } from "next/navigation";
import { ApolloError, gql } from "@apollo/client";
import styles from "./Race.module.css";
import { FadeTransition } from "@/app/FadeTransition";

interface Props {}

const GetRace = gql`
  query RacePage_GetRace($where: RaceFilterInput, $racersFirst: Int!) {
    race(where: $where) {
      id
      startTime
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
      host {
        username
      }
      content
      unlisted
      running
      finished
    }
  }
`;

export default async function RacePage({ params }: { params: { slug: string } }) {
  const { data, error } = await getClient().query({
    query: RacePage_GetRaceDocument,
    variables: {
      where: {
        slug: {
          eq: params.slug,
        },
      },
      racersFirst: 0,
    },
  });
  if (!data?.race) {
    notFound();
  }
  return (
    <div className={styles.mainBox}>
      <RaceBox race={data.race} />
    </div>
  );
}
