import React from "react";
import styles from "./User.module.css";
import { CgSpinner } from "react-icons/cg";

interface Props {}

export const PerformanceChartFallback: React.FC<Props> = ({}) => {
  return (
    <div className={styles.chartFallback}>
      <CgSpinner className={styles.spinner} />
    </div>
  );
};
