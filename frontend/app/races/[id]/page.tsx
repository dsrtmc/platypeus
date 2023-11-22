import React from "react";
import { RaceBox } from "@/app/races/[id]/RaceBox";

interface Props {}

export default async function RacePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <RaceBox raceId={params.id} />
      hello you are on a particular race's <code>page</code>
    </div>
  );
}
