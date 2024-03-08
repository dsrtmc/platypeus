import React from "react";
import { CreateRaceForm } from "@/app/races/CreateRaceForm";
import { RaceList } from "@/app/races/RaceList";
import styles from "./Races.module.css";
import { getClient } from "@/lib/client";
import { MeDocument } from "@/graphql/generated/graphql";
import { LoginRequiredMessage } from "@/app/races/LoginRequiredMessage";

interface Props {}

export default async function RacesPage() {
  const { data } = await getClient().query({ query: MeDocument });
  if (!data?.me)
    return (
      <div className={styles.main}>
        {data?.me ? <CreateRaceForm /> : <LoginRequiredMessage />}
        <RaceList />
      </div>
    );
}
