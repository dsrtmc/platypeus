"use client";

import React from "react";
import { useMutation } from "@apollo/client";
import { JoinRaceDocument } from "@/graphql/generated/graphql";

interface Props {
  raceId: string;
  userId: string;
}

export const JoinRaceButton: React.FC<Props> = ({ raceId, userId }) => {
  const [joinRace, {}] = useMutation(JoinRaceDocument);
  async function handleJoinRace() {
    await joinRace({ variables: { input: { raceId, userId } } });
  }
  return <button onClick={handleJoinRace}>Join race</button>;
};
