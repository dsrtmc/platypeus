"use client";

import React, { useEffect, useState } from "react";
import styles from "@/components/test/Score.module.css";
import { Line } from "react-chartjs-2";
import { Score } from "@/graphql/generated/graphql";
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
  LineProps,
  ChartDataset,
  Chart,
  Filler,
  FontSpec,
  LinearScaleOptions,
  GridLineOptions,
} from "chart.js";

interface Props {
  score: Score;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface LineProps {
  options: ChartOptions<"line">;
  data: ChartData<"line">;
}

export const ScoreChart: React.FC<Props> = ({ score }) => {
  const [fontFamily, setFontFamily] = useState("monospace");
  const [mainColor, setMainColor] = useState("#00000000");
  const [subColor, setSubColor] = useState("#00000000");
  const [subAltColor, setSubAltColor] = useState("#00000000");

  const font: Partial<FontSpec> = {
    family: fontFamily,
  };

  const ticks: Partial<LinearScaleOptions["ticks"]> = {
    padding: 15,
    font,
  };

  const grid: Partial<GridLineOptions> = {
    color: subAltColor,
    drawTicks: false,
  };

  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          ...ticks,
          color: subColor,
        },
        title: {
          display: true,
          text: "wpm",
          color: subColor,
          font,
        },
        grid,
      },
      x: {
        ticks: {
          ...ticks,
          color: subColor,
        },
        title: {
          display: true,
          text: "minute",
          color: subColor,
          font,
        },
        grid,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: false,
  };

  // worst library I've ever seen when it comes to dealing with types
  const data: ChartData<"line"> = {
    labels: score.wpmStats.map((_, index) => index + 1),
    datasets: [
      {
        label: "wpm",
        data: score.wpmStats,
        borderColor: mainColor,
        pointBackgroundColor: mainColor,
        pointRadius: 2,
      },
      {
        label: "raw",
        data: score.rawStats,
        borderColor: subColor,
        pointBackgroundColor: subColor,
        pointRadius: 2,
        fill: true,
      },
    ] as ChartDataset<"line">[],
  };

  useEffect(() => {
    let style = getComputedStyle(document.body);
    setFontFamily(style.getPropertyValue("font-family"));
    setMainColor(style.getPropertyValue("--main-color"));
    setSubColor(style.getPropertyValue("--sub-color"));
    setSubAltColor(style.getPropertyValue("--sub-alt-color"));
  }, []);

  return (
    <div className={styles.chart}>
      <Line data={data} options={options} />
    </div>
  );
};
