"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { GetScoresQuery, UserPage_GetUserMonthlyScoreSummariesQuery } from "@/graphql/generated/graphql";
import styles from "./User.module.css";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  LogarithmicScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

interface Props {
  scores: UserPage_GetUserMonthlyScoreSummariesQuery["userMonthlyScoreSummaries"];
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// TODO: fix charts
export const PerformanceChart: React.FC<Props> = ({ scores }) => {
  const [fontFamily, setFontFamily] = useState("monospace");
  const [mainColor, setMainColor] = useState("#00000000");
  const [subColor, setSubColor] = useState("#00000000");
  const [subAltColor, setSubAltColor] = useState("#00000000");

  const options: ChartOptions<"line"> = {
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          color: subColor,
          padding: 15,
          font: {
            family: fontFamily,
          },
        },
        title: {
          display: true,
          text: "accuracy",
          color: subColor,
          font: {
            family: fontFamily,
          },
        },
        grid: {
          drawOnChartArea: false,
          color: subAltColor,
          drawTicks: false,
        },
        position: "left",
      },
      y1: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          color: subColor,
          padding: 15,
          font: {
            family: fontFamily,
          },
        },
        title: {
          display: true,
          text: "wpm",
          color: subColor,
          font: {
            family: fontFamily,
          },
        },
        grid: {
          color: subAltColor,
          drawTicks: false,
        },
        position: "right",
      },
      x: {
        ticks: {
          color: subColor,
          padding: 15,
          font: {
            family: fontFamily,
          },
        },
        title: {
          display: true,
          color: subColor,
        },
        grid: {
          drawOnChartArea: false,
          color: subAltColor,
          drawTicks: false,
        },
        position: "left",
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: subColor,
        },
        display: false,
      },
      title: {
        display: true,
        text: "monthly progress",
        font: {
          family: fontFamily,
        },
        color: subColor,
        padding: 8,
      },
    },
  };

  const data: ChartData<"line"> = {
    labels: scores.map((score) => new Date(score!.date).getUTCMonth() + 1),
    datasets: [
      {
        data: scores.map((score) => score!.accuracy * 100),
        borderColor: subAltColor,
        pointBackgroundColor: subAltColor,
        pointRadius: 6,
        fill: true,
        yAxisID: "y",
        order: 2,
      },
      {
        data: scores.map((score) => score!.rawWpm),
        borderColor: subColor,
        pointBackgroundColor: subColor,
        yAxisID: "y1",
        order: 1,
      },
      {
        data: scores.map((score) => score!.wpm),
        borderColor: mainColor,
        pointBackgroundColor: mainColor,
        yAxisID: "y1",
        order: 0,
      },
    ] as ChartDataset<"line">[],
  };

  // really don't know whether I should be doing it like that, it seems very very very error-prone but oh well
  // TODO: use global variables as an enum?
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
