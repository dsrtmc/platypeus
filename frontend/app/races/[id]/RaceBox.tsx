"use client";

import React, { Fragment, Ref, useEffect, useRef, useState } from "react";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  FinishRaceForUserDocument,
  FlipRunningStatusDocument,
  JoinRaceDocument,
  LeaveRaceDocument,
  MeDocument,
  OnRaceJoinLeaveDocument,
  StartRaceDocument,
} from "@/graphql/generated/graphql";
import { Chatbox } from "@/app/races/[id]/Chatbox";
import styles from "./Race.module.css";
import { Test, TestMethods } from "@/components/test/Test";
import { LOADED_WORDS_COUNT } from "@/shared/constants/testConfig";
import { StartRaceButton } from "@/app/races/[id]/StartRaceButton";

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
    const response = await joinRace({
      variables: {
        input: {
          userId: meData?.me?.id,
          raceId,
        },
      },
    });
    console.log("RESPONSE FROM JOINING:::::::::::", response);
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
  const [content, setContent] = useState([""]);
  const testRef = useRef<TestMethods | null>(null);

  function handleKeyDown(e: globalThis.MouseEvent): number {
    if (e.key.length === 1) {
      if (finished || !focused || !running) return 1;
    }
    return 0;
  }
  function handleChangeWpm() {}
  function handleSaveScore() {}
  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [finishRaceForUser, {}] = useMutation(FinishRaceForUserDocument);
  function handleClick(e: globalThis.MouseEvent) {
    if (ref && ref.current) {
      setFocused(ref.current!.contains(e.target));
    }
  }

  // TODO: ?XD?XD?XD?D?XD?XD?X?XD?
  useEffect(() => {
    if (data) setContent(data.onRaceJoinLeave.content.split(" "));
  }, [data]);
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
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
    console.log("it should reutrn those words?", words);
    return words;
  }
  const [countdown, setCountdown] = useState(5);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [startRace, {}] = useMutation(StartRaceDocument);
  const [flipRunningStatus, {}] = useMutation(FlipRunningStatusDocument);
  async function startRaceFn() {
    console.log("SJKHLDFJKYGSDFJSKDHFJ");
    const response = await startRace({ variables: { input: { raceId } } });
    console.log("Starting race response:", response);
  }
  async function onStart() {
    if (!data?.onRaceJoinLeave.running && !data?.onRaceJoinLeave.finished) {
      await startRaceFn();
    }
  }
  useEffect(() => {
    if (data?.onRaceJoinLeave.running && !data?.onRaceJoinLeave.finished) {
      intervalRef.current = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
  }, [data?.onRaceJoinLeave.running]);
  useEffect(() => {
    if (countdown <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setFocused(true);
      setRunning(true);
    }
  }, [countdown]);
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
              time={data.onRaceJoinLeave.modeSetting}
              timeSetting={data.onRaceJoinLeave.modeSetting}
              handleChangeWpm={handleChangeWpm}
              onKeyDown={handleKeyDown}
              ref={testRef}
              onSaveScore={handleSaveScore}
              initialContent={data.onRaceJoinLeave.content.split(" ").slice(0, LOADED_WORDS_COUNT)}
              onPoolUpdate={onPoolUpdate}
            />
          </div>
          {data?.onRaceJoinLeave.host.id === meData.me?.id && <StartRaceButton handleStart={onStart} />}
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
          <h1 style={{ fontSize: "3rem" }}>running backend: {data?.onRaceJoinLeave.running ? "true" : "false"}</h1>
          <h1 style={{ fontSize: "3rem" }}>THE HOST IS: {data?.onRaceJoinLeave.host.username}</h1>
          <button
            onClick={async () => {
              const response = await flipRunningStatus({ variables: { input: { raceId } } });
              console.log("The response:", response);
            }}
          >
            flip running status
          </button>
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
