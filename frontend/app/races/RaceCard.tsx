import React from "react";
import { GetRacesQuery } from "@/graphql/generated/graphql";
import Link from "next/link";

interface Props {
  node: NonNullable<NonNullable<GetRacesQuery["races"]["edges"][number]>["node"]>; // the funniest type known to man
}

export const RaceCard: React.FC<Props> = ({ node: race }) => {
  return (
    <div>
      hello that is a race: <code>{JSON.stringify(race.createdAt)}</code>
      <Link href={`/races/${race.id}`} style={{ border: "1px solid blue" }}>
        click here to join it :D
      </Link>
    </div>
  );
};
