"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { GetScoresQuery, UserPage_GetUserMonthlyScoreSummariesQuery } from "@/graphql/generated/graphql";
import { LineProps } from "chart.js";
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
  scores: UserPage_GetUserMonthlyScoreSummariesQuery["userMonthlyScoreSummaries"];
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const PerformanceChart: React.FC<Props> = ({ scores }) => {
  const [subColor, setSubColor] = useState("white");
  const [subAltColor, setSubAltColor] = useState("white");

  const options: LineProps["options"] = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: subColor,
        },
      },
      x: {
        ticks: {
          color: subColor,
        },
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

  const data = {
    labels: scores.map((score) => new Date(score!.date).getUTCMonth() + 1),
    datasets: [
      {
        label: "wpm",
        data: scores.map((score) => score!.wpm),
        borderColor: subColor,
        backgroundColor: subAltColor,
      },
    ],
  };

  // really don't know whether I should be doing it like that, it seems very very very error-prone but oh well
  // TODO: use global variables as an enum?
  useEffect(() => {
    let style = getComputedStyle(document.body);
    setSubColor(style.getPropertyValue("--sub-color"));
    setSubAltColor(style.getPropertyValue("--sub-alt-color"));
  }, []);
  return (
    <div className={styles.chart}>
      <Line data={data} options={options} />
    </div>
  );
};
