import React, { FC } from "react";
import { Score } from "@/graphql/generated/graphql";
import styles from "./Score.module.css";
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
      <div className={styles.stats}>
        <div className={styles.group}>
          <div className={styles.top}>wpm</div>
          <div className={`${styles.bottom} ${styles.big}`}>{score.wpm}</div>
        </div>
        <div className={styles.group}>
          <div className={styles.top}>acc</div>
          <div className={`${styles.bottom} ${styles.big}`}>{Math.round(score.accuracy * 100)}%</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Line data={data} options={options} />
      </div>
      <div className={styles.stats2}>
        <div className={styles.group}>
          <div className={styles.top}>mode</div>
          <div className={styles.bottom}>
            {score.mode} {score.language}
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.top}>raw</div>
          <div className={styles.bottom}>{score.rawWpm}</div>
        </div>
        <div className={styles.group}>
          {/* depends on the test mode */}
          <div className={styles.top}>time</div>
          <div className={styles.bottom}>{score.modeSetting}</div>
        </div>
      </div>
    </div>
  );
};
