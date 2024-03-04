import React, { useEffect, useState } from "react";
import styles from "@/components/test/Score.module.css";
import { Line } from "react-chartjs-2";
import { Score } from "@/graphql/generated/graphql";
import { LineProps } from "chart.js";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineProps {
  options: ChartOptions<"line">;
  data: ChartData<"line">;
}

export const ScoreChart: React.FC<Props> = ({ score }) => {
  const [subColor, setSubColor] = useState("white");
  const [subAltColor, setSubAltColor] = useState("white");
  const options: LineProps["options"] = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: subColor },
        grid: {
          color: subAltColor,
        },
      },
      x: {
        ticks: { color: subColor },
        grid: {
          color: subAltColor,
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    animation: false,
  };

  // funny squiggly lines despite it being correct 😐
  const data = {
    labels: score.wpmStats.map((_, index) => index + 1),
    datasets: [
      {
        label: "wpm",
        data: score.wpmStats,
        borderColor: subColor,
      },
      {
        label: "raw",
        data: score.rawStats,
        borderColor: subAltColor,
      },
    ],
  };
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
