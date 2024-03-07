import React from "react";
import styles from "@/app/Loading.module.css";
import { CgSpinner } from "react-icons/cg";

// TODO: watch out, sometimes causes infinite re-renders if kept in the root directory? no idea if that's even true,
// because I can't replicate it, lol. it just sometimes happens, taking out the file fixes it, but then it doesn't
// happen when we bring the file back. really funny, meh.
export default function Loading() {
  return (
    <div className={styles.main}>
      <CgSpinner className={styles.spinner} />
    </div>
  );
}
