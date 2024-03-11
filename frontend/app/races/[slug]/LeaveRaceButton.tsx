"use client";

import React from "react";

interface Props {
  handleLeaveRace: () => void;
}

export const LeaveRaceButton: React.FC<Props> = ({ handleLeaveRace }) => {
  return <button onClick={handleLeaveRace}>Leave race</button>;
};
