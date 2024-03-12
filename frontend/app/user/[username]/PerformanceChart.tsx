"use client";

import React, { Ref, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { UserPage_GetUserMonthlyScoreSummariesQuery } from "@/graphql/generated/graphql";
import styles from "./User.module.css";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  Filler,
  FontSpec,
  GridLineOptions,
  Legend,
  LinearScale,
  LinearScaleOptions,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { PerformanceChartFallback } from "@/app/user/[username]/PerformanceChartFallback";
import { CSSTransition } from "react-transition-group";
import { ConfigCssVariables, ThemeCssVariables } from "@/shared/types/configTypes";

interface Props {
  scores: UserPage_GetUserMonthlyScoreSummariesQuery["userMonthlyScoreSummaries"];
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// TODO: fix charts
export const PerformanceChart: React.FC<Props> = ({ scores }) => {
  const [visible, setVisible] = useState(false);

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
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          ...ticks,
          color: subColor,
        },
        title: {
          display: true,
          text: "accuracy%",
          color: subColor,
          font,
        },
        grid: {
          ...grid,
          drawOnChartArea: false,
        },
        position: "left",
      },
      y1: {
        type: "linear",
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
        position: "right",
      },
      x: {
        ticks: {
          ...ticks,
          color: subColor,
        },
        title: {
          display: true,
          color: subColor,
        },
        grid: {
          ...grid,
          drawOnChartArea: false,
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
        font,
        color: subColor,
        padding: 8,
      },
    },
    animation: false,
  };

  // this code makes sure we have a steady line on the chart if someone's only played for a month.
  // TODO: apparently you should be able to achieve the same using `spanGaps = true`, but it doesn't work for me :)
  if (scores.length === 1) {
    scores = [...scores, scores[0]];
  }

  const data: ChartData<"line"> = {
    labels: scores.map((score) => new Date(score!.date).getUTCMonth() + 1),
    datasets: [
      {
        data: scores.map((score) => score!.accuracy * 100),
        borderColor: subAltColor,
        pointBackgroundColor: subAltColor,
        pointRadius: 2,
        fill: true,
        yAxisID: "y",
        order: 2,
      },
      {
        data: scores.map((score) => score!.rawWpm),
        borderColor: subColor,
        pointBackgroundColor: subColor,
        pointRadius: 2,
        yAxisID: "y1",
        order: 1,
      },
      {
        data: scores.map((score) => score!.wpm),
        borderColor: mainColor,
        pointBackgroundColor: mainColor,
        pointRadius: 2,
        yAxisID: "y1",
        order: 0,
      },
    ] as ChartDataset<"line">[],
  };

  // really don't know whether I should be doing it like that, it seems very very very error-prone but oh well
  // TODO: use global variables as an enum?
  useEffect(() => {
    let style = getComputedStyle(document.body);
    setFontFamily(style.getPropertyValue(ConfigCssVariables.FontFamily));
    setMainColor(style.getPropertyValue(ThemeCssVariables.MainColor));
    setSubColor(style.getPropertyValue(ThemeCssVariables.SubColor));
    setSubAltColor(style.getPropertyValue(ThemeCssVariables.SubAltColor));
    setVisible(true);
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);

  // TODO: fix this stupid font issue where it doesn't load until a rerender
  return (
    <CSSTransition
      nodeRef={ref as Ref<HTMLDivElement | undefined>}
      in={true}
      appear={true}
      timeout={300}
      classNames={{
        appear: styles.chartAppear,
        appearActive: styles.chartAppearActive,
        appearDone: styles.chartAppearDone,
      }}
    >
      <div className={styles.chart} ref={ref}>
        {visible ? <Line data={data} options={options} /> : <PerformanceChartFallback />}
      </div>
    </CSSTransition>
  );
};
