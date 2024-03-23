import React from "react";
import styles from "@/app/Loading.module.css";
import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <div className={styles.main}>
      <CgSpinner className={styles.spinner} />
    </div>
  );
}
