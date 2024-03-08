import React from "react";
import { GetRacesQuery } from "@/graphql/generated/graphql";
import Link from "next/link";
import styles from "./Races.module.css";
import { RaceJoinLink } from "@/app/races/RaceJoinLink";

interface Props {
  race: NonNullable<NonNullable<GetRacesQuery["races"]>["edges"]>[number]["node"]; // the funniest type known to man
}

export const RaceListItem: React.FC<Props> = ({ race }) => {
  return (
    <tr className={styles.tr}>
      <td className={`${styles.left} ${styles.td}`}>
        <Link href={`/user/${race.host.username}`} className={styles.user}>
          {race.host?.username}
        </Link>
      </td>
      <td className={`${styles.right} ${styles.td}`}>
        <p>{race.racers?.edges?.length}</p>
      </td>
      <td className={`${styles.right} ${styles.td} ${styles.date}`}>
        <p>
          {Math.round(new Date().getTime() / 1000 / 60 - new Date(race.createdAt).getTime() / 1000 / 60)} minutes ago
        </p>
      </td>
      <td className={`${styles.right} ${styles.td}`}>
        <RaceJoinLink url={`/races/${race.slug}`} />
      </td>
    </tr>
  );
};
