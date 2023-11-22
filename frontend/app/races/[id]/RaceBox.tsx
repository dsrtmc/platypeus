"use client";

import React from "react";
import { useSubscription } from "@apollo/client";
import { OnRaceJoinLeaveDocument } from "@/graphql/generated/graphql";

interface Props {
  raceId: string;
}

export const RaceBox: React.FC<Props> = ({ raceId }) => {
  const { data, loading, error } = useSubscription(OnRaceJoinLeaveDocument, {
    variables: {
      raceId,
    },
  });
  return (
    <div>
      <code>meow</code>
      <p>data: {JSON.stringify(data)}</p>
      {loading && <p>its loading</p>}
      {error && <p>there is a funny error: {JSON.stringify(error)}</p>}
    </div>
  );
};
