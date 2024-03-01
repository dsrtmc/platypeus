"use client";

import React from "react";
import { useMutation } from "@apollo/client";
import { JoinRaceDocument } from "@/graphql/generated/graphql";

interface Props {
  handleJoinRace: () => void;
}

export const JoinRaceButton: React.FC<Props> = ({ handleJoinRace }) => {
  return <button onClick={handleJoinRace}>Join race</button>;
};
