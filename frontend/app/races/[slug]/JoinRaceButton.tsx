"use client";

import React from "react";
import styles from "./Race.module.css";

interface Props {
  handleJoinRace: () => void;
}

export const JoinRaceButton: React.FC<Props> = ({ handleJoinRace }) => {
  return (
    <button onClick={handleJoinRace} className={styles.raceButton}>
      join race
    </button>
  );
};
