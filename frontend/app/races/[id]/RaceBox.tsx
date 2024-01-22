"use client";

import React, { Fragment, Ref, useEffect, useRef, useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  FinishRaceForUserDocument,
  FlipRunningStatusDocument,
  GetRacesDocument,
  JoinRaceDocument,
  LeaveRaceDocument,
  MeDocument,
  OnRaceEventDocument,
  StartRaceDocument,
  UpdateStatsForUserDocument,
} from "@/graphql/generated/graphql";
import { Chatbox } from "@/app/races/[id]/Chatbox";
import styles from "./Race.module.css";
import { Test, TestMethods } from "@/components/test/Test";
import { LOADED_WORDS_COUNT } from "@/shared/constants/testConfig";
import { StartRaceButton } from "@/app/races/[id]/StartRaceButton";
import { JoinRaceButton } from "@/app/races/[id]/JoinRaceButton";
import { LeaveRaceButton } from "@/app/races/[id]/LeaveRaceButton";
import { setFlagsFromString } from "v8";

interface Props {
  raceId: string;
}

// The length of race start countdown in seconds
const COUNTDOWN_TIME = 5;

export const RaceBox: React.FC<Props> = ({ raceId }) => {
  const { data: meData } = useQuery(MeDocument);
  const { data, loading, error } = useSubscription(OnRaceEventDocument, { variables: { raceId } });
  const [finishRaceForUser, {}] = useMutation(FinishRaceForUserDocument);
  const [updateStatsForUser, {}] = useMutation(UpdateStatsForUserDocument);

  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [content, setContent] = useState([""]);
  const [time, setTime] = useState(5);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const testRef = useRef<TestMethods | null>(null);

  // TODO: maybe just make it a bool xd idk why i did funny numbers
  function handleKeyDown(e: globalThis.MouseEvent): number {
    if (e.key.length === 1) {
      if (finished || !focused || !running) return 1;
    }
    return 0;
  }
  // TODO: investigate those
  async function handleChangeWpm(wpm: number) {
    // TODO: look over the `me` nullability here
    const response = await updateStatsForUser({ variables: { input: { raceId, userId: meData?.me!.id, wpm } } });
    console.log("Response from updating stats:", response);
  }
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
    // TODO: this shit is being run on every single event/update, so it's doing this funny stuff for no reason
    // TODO: ↑therefore we need to figure out a way to just do an initial load
    if (data) {
      console.log("How often does this shit run?");
      setContent(data.onRaceEvent.content.split(" "));
      // TODO: change the logic if the `mode` isn't `time` lol
    }
  }, [data]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        // TODO: check nullability lol xdd
        if (!data) return;
        const startTime = new Date(data?.onRaceEvent.startTime).getTime();
        const nowTime = new Date().getTime();

        // start time 60 + 5 (countdown)
        // current time 65
        // start time - current time == 65 - 65
        // current time is 70
        // start time - current time == -5
        const difference = Math.round(Math.abs(startTime + COUNTDOWN_TIME * 1000 - nowTime) / 1000);
        console.log("holy fucking shit differnece:", difference);
        console.log(
          "Stats:",
          data.onRaceEvent.racerStatistics[0].racer.username,
          data.onRaceEvent.racerStatistics[0].wpm
        );
        const timeLeft = Math.max(data?.onRaceEvent.modeSetting - difference, 0);
        setTime(timeLeft);
        if (timeLeft <= 0) {
          setFinished(true);
        }
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // useEffect(() => {}, [time]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  // TODO: the cache update is fucked whenever you do a `joinRace` so idk bro fix it i guess lol
  // TODO: would probs make sense to kick someone out of the race once they leave/F5 during the race (or not but i dont care, could be cool)
  // TODO: maybe figure out a better error page? right now it shows an ugly "theres a funny error: {}" which is not too user-friendly in case-
  // ^^^^^-some shit actually goes down
  // ↓ dont read this
  // NOTE: if you try to join the race twice from the same account on two different clients, funny shit happens and it throws you an error
  // which i guess is good? idk probably
  // ↑ dont read this
  const [lazyGetRace, { data: lazyGetRaceData }] = useLazyQuery(GetRacesDocument);
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
              time={time}
              timeSetting={data.onRaceEvent.modeSetting}
              handleChangeWpm={handleChangeWpm}
              onKeyDown={handleKeyDown}
              ref={testRef}
              onSaveScore={handleSaveScore}
              initialContent={data.onRaceEvent.content.split(" ").slice(0, LOADED_WORDS_COUNT)}
              onPoolUpdate={onPoolUpdate}
            />
          </div>
          <button
            onClick={async () => {
              const response = await lazyGetRace({
                variables: { where: { id: { eq: raceId } } },
                fetchPolicy: "network-only",
              });
              // response.data?.races?.edges!.map((edge) => edge.node.)
              console.log("the entire race object:", response);
            }}
          >
            log the entire race object
          </button>
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
          <div style={{ border: "1px solid red" }}>
            <h1>racer stats:</h1>
            {data.onRaceEvent.racerStatistics.map((stats) => (
              <div key={stats.racer.username}>
                {stats.racer.username}: {stats.wpm}wpm
              </div>
            ))}
          </div>
          <h1 style={{ fontSize: "1.5rem" }}>start typing once the countdown reaches zero</h1>
          <h1 style={{ fontSize: "1.5rem" }}>current time: {JSON.stringify(new Date())}</h1>
          {/* TODO: Consider adding a `startTime` field to a race? then it's easier to calculate the time left lol */}
          <h1 style={{ fontSize: "3rem" }}>time left: {time}</h1>
          <h1 style={{ fontSize: "3rem" }}>THE TEST {finished ? "IS" : "ISN'T"} finished</h1>
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
