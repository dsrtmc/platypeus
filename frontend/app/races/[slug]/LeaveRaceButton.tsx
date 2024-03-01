"use client";

import React from "react";
import { useMutation } from "@apollo/client";
import { LeaveRaceDocument } from "@/graphql/generated/graphql";

interface Props {
  handleLeaveRace: () => void;
}

export const LeaveRaceButton: React.FC<Props> = ({ handleLeaveRace }) => {
  return <button onClick={handleLeaveRace}>Leave race</button>;
};
