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
      <h3>mode: {score.mode}</h3>
      <h3>modeSetting: {score.modeSetting}</h3>
      <h3>wpm chart: {score.wpmStats.join("|")}</h3>
      <h3>raw wpm chart: {score.rawStats.join("|")}</h3>
      <h3>accuracy: {score.accuracy}</h3>
      <h3>average wpm: {score.wpm}</h3>
      <h3>raw wpm: {score.rawWpm}</h3>
      <h3>mode: {score.mode}</h3>
      <h3>language: {score.language}</h3>
    </div>
  );
};
