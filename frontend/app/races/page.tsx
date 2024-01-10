import React from "react";
import { CreateRaceForm } from "@/app/races/CreateRaceForm";
import { RaceList } from "@/app/races/RaceList";

interface Props {}

export default function RacesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* TODO: RaceList */}
      <RaceList />
      <CreateRaceForm />
    </div>
  );
}
