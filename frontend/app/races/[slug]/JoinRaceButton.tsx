"use client";

import React from "react";

interface Props {
  handleJoinRace: () => void;
}

export const JoinRaceButton: React.FC<Props> = ({ handleJoinRace }) => {
  return <button onClick={handleJoinRace}>Join race</button>;
};
