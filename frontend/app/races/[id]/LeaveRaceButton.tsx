"use client";

import React from "react";
import { useMutation } from "@apollo/client";
import { LeaveRaceDocument } from "@/graphql/generated/graphql";

interface Props {
  raceId: string;
  userId: string;
}

export const LeaveRaceButton: React.FC<Props> = ({ raceId, userId }) => {
  const [leaveRace, {}] = useMutation(LeaveRaceDocument);
  async function handleLeaveRace() {
    await leaveRace({ variables: { input: { raceId, userId } } });
  }
  return <button onClick={handleLeaveRace}>Leave race</button>;
};
