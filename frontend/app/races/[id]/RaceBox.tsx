"use client";

import React from "react";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { JoinRaceDocument, LeaveRaceDocument, MeDocument, OnRaceJoinLeaveDocument } from "@/graphql/generated/graphql";
import { Chatbox } from "@/app/races/[id]/Chatbox";
import styles from "./Race.module.css";

interface Props {
  raceId: string;
}

export const RaceBox: React.FC<Props> = ({ raceId }) => {
  const { data: meData } = useQuery(MeDocument);
  const [joinRace, {}] = useMutation(JoinRaceDocument);
  const [leaveRace, {}] = useMutation(LeaveRaceDocument);
  const { data, loading, error } = useSubscription(OnRaceJoinLeaveDocument, {
    variables: {
      raceId,
    },
  });
  async function handleJoinRace() {
    await joinRace({
      variables: {
        input: {
          userId: meData?.me?.id,
          raceId,
        },
      },
    });
  }
  async function handleLeaveRace() {
    await leaveRace({
      variables: {
        input: {
          userId: meData?.me?.id,
          raceId,
        },
      },
    });
  }
  return (
    <div className={styles.raceBox}>
      {data && meData && (
        <>
          <ul>
            users:
            {data.onRaceJoinLeave.racers.map((racer) => (
              <li key={racer.username}>{racer.username}</li>
            ))}
          </ul>
          {!data.onRaceJoinLeave.racers.find((racer) => racer.id === meData?.me?.id) ? (
            <button onClick={handleJoinRace}>Join the race</button>
          ) : (
            <button onClick={handleLeaveRace}>leave the race</button>
          )}
          <div className={styles.hr} />
          <Chatbox chatboxId={data.onRaceJoinLeave.chatboxId} meData={meData} />
        </>
      )}
      {loading && <p>its loading</p>}
      {error && <p>there is a funny error: {JSON.stringify(error)}</p>}
    </div>
  );
};
