"use client";

import React from "react";
import { useFragment, useMutation, useQuery, useSubscription } from "@apollo/client";
import { CreateRaceDocument, JoinRaceDocument, MeDocument, OnRaceJoinLeaveDocument } from "@/graphql/generated/graphql";
import { useRouter } from "next/navigation";

interface Props {}

export default function RacesPage() {
  const [createRace, { data }] = useMutation(CreateRaceDocument);
  const [joinRace, { data: joinData }] = useMutation(JoinRaceDocument);
  const router = useRouter();
  async function handleCreateRace() {
    const response = await createRace();
    const raceId = response.data?.createRace.race?.id;
    router.push(`/races/${data?.createRace.race?.id}`);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <button onClick={handleCreateRace}>create race</button>
    </div>
  );
}
