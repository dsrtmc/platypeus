import React from "react";
import Link from "next/link";
import styles from "@/app/races/Races.module.css";

interface Props {
  url: string;
}

// terrible naming
export const RaceJoinLink: React.FC<Props> = ({ url }) => {
  return (
    <Link href={url} className={styles.joinRaceLink}>
      join
    </Link>
  );
};
