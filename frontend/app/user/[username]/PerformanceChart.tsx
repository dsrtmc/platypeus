"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { GetScoresQuery } from "@/graphql/generated/graphql";
import { ChartData, LineProps } from "chart.js";
import styles from "./User.module.css";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

interface Props {
  scoresData: GetScoresQuery;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const PerformanceChart: React.FC<Props> = ({ scoresData }) => {
  const options: LineProps["options"] = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
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
  const data: ChartData<"line"> = {
    labels: scoresData.scores?.edges?.map((edge) => edge.node.createdAt),
    datasets: [
      {
        label: "wpm",
        data: scoresData.scores?.edges?.map((edge) => edge.node.wpm),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "raw",
      //   data: scoresData.scores?.edges?.map((edge) => edge.node.raw),
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };
  return (
    <div className={styles.chart}>
      <Line data={data} options={options} />
    </div>
  );
};
