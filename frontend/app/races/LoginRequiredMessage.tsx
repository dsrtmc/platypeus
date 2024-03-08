import React from "react";
import styles from "./Races.module.css";
import Link from "next/link";

interface Props {}

export const LoginRequiredMessage: React.FC<Props> = ({}) => {
  return (
    <div className={styles.loginRequiredMessage}>
      <Link href={"/login"} className={styles.link}>
        log in
      </Link>{" "}
      to create a race
    </div>
  );
};
