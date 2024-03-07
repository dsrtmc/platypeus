import React from "react";
import { CreateRaceForm } from "@/app/races/CreateRaceForm";
import { RaceList } from "@/app/races/RaceList";
import styles from "./Races.module.css";

interface Props {}

export default function RacesPage() {
  return (
    <div className={styles.main}>
      <CreateRaceForm />
      <RaceList />
    </div>
  );
}
