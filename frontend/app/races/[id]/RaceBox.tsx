"use client";

import React, { Fragment, Ref, useEffect, useRef, useState } from "react";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  FinishRaceForUserDocument,
  FlipRunningStatusDocument,
  JoinRaceDocument,
  LeaveRaceDocument,
  MeDocument,
  OnRaceEventDocument,
  StartRaceDocument,
} from "@/graphql/generated/graphql";
import { Chatbox } from "@/app/races/[id]/Chatbox";
import styles from "./Race.module.css";
import { Test, TestMethods } from "@/components/test/Test";
import { LOADED_WORDS_COUNT } from "@/shared/constants/testConfig";
import { StartRaceButton } from "@/app/races/[id]/StartRaceButton";
import { JoinRaceButton } from "@/app/races/[id]/JoinRaceButton";
import { LeaveRaceButton } from "@/app/races/[id]/LeaveRaceButton";

interface Props {
  raceId: string;
}

export const RaceBox: React.FC<Props> = ({ raceId }) => {
  const { data: meData } = useQuery(MeDocument);
  const { data, loading, error } = useSubscription(OnRaceEventDocument, { variables: { raceId } });
  const [finishRaceForUser, {}] = useMutation(FinishRaceForUserDocument);

  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [content, setContent] = useState([""]);
  const [countdown, setCountdown] = useState(5);
  const testRef = useRef<TestMethods | null>(null);

  // TODO: maybe just make it a bool xd idk why i did funny numbers
  function handleKeyDown(e: globalThis.MouseEvent): number {
    if (e.key.length === 1) {
      if (finished || !focused || !running) return 1;
    }
    return 0;
  }
  // TODO: investigate those
  function handleChangeWpm() {}
  function handleSaveScore() {} // TODO: maybe rename to `handleFinishTest`? makes sense since the behavior changes based on where we're at
  function handleClick(e: globalThis.MouseEvent) {
    if (ref && ref.current) {
      setFocused(ref.current!.contains(e.target));
    }
  }

  const ref = useRef<HTMLDivElement | null>(null);

  // TODO: think if there's a better way to do that because holy fuck is it confusing
  /**
   * Returns the n elements to be added to the word pool while removing n elements
   * from the beginning of the content, to account for index differences between `Test`'s content and this one.
   * @param {string} count - The count of elements to add to the pool
   * @param {number} index - If using a static word pool, the index from which to start adding words
   */
  function onPoolUpdate(count: number, index: number) {
    const copy = content.slice(count);
    const words: string[] = [];
    for (let i = LOADED_WORDS_COUNT - count; i < LOADED_WORDS_COUNT; i++) {
      if (copy[i]) words.push(copy[i]);
    }
    setContent(copy);
    return words;
  }
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [startRace, {}] = useMutation(StartRaceDocument);

  // Handles what happens after the `StartRaceButton` is pressed
  async function onRaceStart() {
    if (!data?.onRaceEvent.running && !data?.onRaceEvent.finished) {
      await startRace({ variables: { input: { raceId } } });
    }
  }

  // Begins the countdown for connected players
  useEffect(() => {
    if (data?.onRaceEvent.running && !data?.onRaceEvent.finished) {
      intervalRef.current = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
  }, [data?.onRaceEvent.running]);

  useEffect(() => {
    if (countdown <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setFocused(true);
      setRunning(true);
    }
  }, [countdown]);

  // TODO: ?XD?XD?XD?D?XD?XD?X?XD?
  useEffect(() => {
    if (data) setContent(data.onRaceEvent.content.split(" "));
  }, [data]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  // TODO: would probs make sense to kick someone out of the race once they leave/F5 during the race (or not but i dont care, could be cool)
  // TODO: maybe figure out a better error page? right now it shows an ugly "theres a funny error: {}" which is not too user-friendly in case-
  // ^^^^^-some shit actually goes down
  // ↓ dont read this
  // NOTE: if you try to join the race twice from the same account on two different clients, funny shit happens and it throws you an error
  // which i guess is good? idk probably
  // ↑ dont read this
  return (
    <div className={styles.raceBox}>
      {data && meData && (
        <>
          {/* TODO: unnecessary div */}
          <div ref={ref}>
            <Test
              focused={focused}
              running={running}
              finished={finished}
              time={data.onRaceEvent.modeSetting}
              timeSetting={data.onRaceEvent.modeSetting}
              handleChangeWpm={handleChangeWpm}
              onKeyDown={handleKeyDown}
              ref={testRef}
              onSaveScore={handleSaveScore}
              initialContent={data.onRaceEvent.content.split(" ").slice(0, LOADED_WORDS_COUNT)}
              onPoolUpdate={onPoolUpdate}
            />
          </div>
          {data?.onRaceEvent.host.id === meData.me?.id && <StartRaceButton handleStart={onRaceStart} />}
          {meData.me && (
            <div>
              finish the race{" "}
              <button
                onClick={async () => {
                  await finishRaceForUser({ variables: { input: { userId: meData?.me?.id, raceId } } });
                }}
              >
                click here
              </button>
            </div>
          )}
          <h1 style={{ fontSize: "1.5rem" }}>start typing once the countdown reaches zero</h1>
          <h1 style={{ fontSize: "3rem" }}>countdown: {countdown}</h1>
          <h1 style={{ fontSize: "3rem" }}>running: {running ? "true" : "false"}</h1>
          <h1 style={{ fontSize: "3rem" }}>running backend: {data?.onRaceEvent.running ? "true" : "false"}</h1>
          <h1 style={{ fontSize: "3rem" }}>THE HOST IS: {data?.onRaceEvent.host.username}</h1>
          <ul>
            users:
            {data.onRaceEvent.racers.map((racer) => (
              <li key={racer.username}>{racer.username}</li>
            ))}
          </ul>
          {/* TODO: do we actually need to pass the raceIds here? I think its just better to pass `handleJoin/Leave` functions hmm */}
          {meData &&
            meData.me &&
            (!data.onRaceEvent.racers.find((racer) => racer.id === meData.me!.id) ? (
              <JoinRaceButton raceId={data?.onRaceEvent.id} userId={meData.me.id} />
            ) : (
              <LeaveRaceButton raceId={data.onRaceEvent.id} userId={meData.me.id} />
            ))}
          <div className={styles.hr} />
          <Chatbox chatboxId={data.onRaceEvent.chatboxId} meData={meData} />
        </>
      )}
      {loading && <p>its loading</p>}
      {error && <p>there is a funny error: {JSON.stringify(error)}</p>}
    </div>
  );
};
