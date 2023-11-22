"use client";

import React from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { JoinRaceDocument, MeDocument, OnRaceJoinLeaveDocument } from "@/graphql/generated/graphql";

interface Props {
  raceId: string;
}

export const RaceBox: React.FC<Props> = ({ raceId }) => {
  const { data: meData } = useQuery(MeDocument);
  const [joinRace, {}] = useMutation(JoinRaceDocument);
  const { data, loading, error } = useSubscription(OnRaceJoinLeaveDocument, {
    variables: {
      raceId,
    },
  });
  async function handleJoinRace() {
    const response = await joinRace({
      variables: {
        input: {
          userId: meData?.me?.id,
          raceId,
        },
      },
    });
    console.log("Join race response:", response);
  }
  return (
    <div>
      <code>meow</code>
      {data && (
        <ul>
          users:{" "}
          {data.onRaceJoinLeave.racers.map((racer) => (
            <li key={racer.username}>{racer.username}</li>
          ))}
        </ul>
      )}
      {loading && <p>its loading</p>}
      {error && <p>there is a funny error: {JSON.stringify(error)}</p>}
      <button onClick={handleJoinRace}>Join the race</button>
    </div>
  );
};
