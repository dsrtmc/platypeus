import React, { FC } from "react";
import { Score } from "@/graphql/generated/graphql";
import styles from "./Test.module.css";

interface Props {
  score: Score;
}

export const Score: FC<Props> = ({ score }) => {
  return (
    <div className={styles.score}>
      <h1>score</h1>
      <h3>time: {score.time}</h3>
      <h3>average wpm: {score.averageWpm}</h3>
      <h3>raw wpm: {score.rawWpm}</h3>
      <h3>mode: {score.mode}</h3>
      <h3>language: {score.language}</h3>
    </div>
  );
};
