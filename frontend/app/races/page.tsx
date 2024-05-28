import React from "react";
import { CreateRaceForm } from "@/app/races/CreateRaceForm";
import { RaceList } from "@/app/races/RaceList";
import styles from "./Races.module.css";
import { getClient } from "@/lib/client";
import { LoginRequiredMessage } from "@/app/races/LoginRequiredMessage";
import { gql } from "@apollo/client";
import { MeDocument, RacesPage_MeDocument } from "@/graphql/generated/graphql";

interface Props {}

const Me = gql`
  query RacesPage_Me {
    me {
      id
      ...UserInfo
    }
  }
`;

export default async function RacesPage() {
  const { data } = await getClient().query({ query: MeDocument });
  return (
    <div className={styles.main}>
      {data?.me ? <CreateRaceForm /> : <LoginRequiredMessage />}
      <RaceList />
    </div>
  );
}
