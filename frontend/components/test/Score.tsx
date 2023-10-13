import React, { FC } from "react";
import { Score } from "@/graphql/generated/graphql";
import styles from "./Test.module.css";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

interface Props {
  score: Score;
}

interface LineProps {
  options: ChartOptions<"line">;
  data: ChartData<"line">;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Score: FC<Props> = ({ score }) => {
  const options: LineProps["options"] = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "wpm chart",
      },
    },
  };

  // funny squiggly lines despite it being correct 😐
  const data: ChartData<"line"> = {
    labels: score.wpmStats.map((_, index) => index + 1),
    datasets: [
      {
        label: "wpm",
        data: score.wpmStats,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "raw",
        data: score.rawStats,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
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
      <Line data={data} options={options} />
    </div>
  );
};
