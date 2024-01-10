import React from "react";
import { GetRacesQuery } from "@/graphql/generated/graphql";

interface Props {
  race: GetRacesQuery["races"]["edges"][number]["node"]; // the funniest type known to man
}

export const RaceCard: React.FC<Props> = ({ race }) => {
  return (
    <div>
      hello that is a race: <code>{JSON.stringify(race.createdAt)}</code>
    </div>
  );
};
