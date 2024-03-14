"use client";

import React from "react";
import styles from "./Race.module.css";

interface Props {
  handleLeaveRace: () => void;
}

export const LeaveRaceButton: React.FC<Props> = ({ handleLeaveRace }) => {
  return (
    <button onClick={handleLeaveRace} className={styles.raceButton}>
      leave race
    </button>
  );
};
