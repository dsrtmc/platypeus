import React from "react";
import { GetRacesQuery } from "@/graphql/generated/graphql";
import Link from "next/link";
import styles from "./Races.module.css";

interface Props {
  node: NonNullable<NonNullable<GetRacesQuery["races"]["edges"][number]>["node"]>; // the funniest type known to man
}

export const RaceCard: React.FC<Props> = ({ node: race }) => {
  return (
    <Link href={`/races/${race.slug}`} className={styles.card}>
      <div>click here to join it :D</div>
      <div>author: {race.host.username}</div>
      <div>
        created {Math.round(new Date().getTime() / 1000 / 60 - new Date(race.createdAt).getTime() / 1000 / 60)} minutes
        ago
      </div>
    </Link>
  );
};
