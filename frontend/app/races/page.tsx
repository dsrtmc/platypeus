import React from "react";
import { CreateRaceForm } from "@/app/races/CreateRaceForm";

interface Props {}

export default function RacesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <CreateRaceForm />
    </div>
  );
}
