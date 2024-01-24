"use client";

import React, { Fragment, Ref, useEffect, useRef, useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  CreateScoreDocument,
  FinishRaceDocument,
  FinishRaceForUserDocument,
  FlipRunningStatusDocument,
  GetRacesDocument,
  JoinRaceDocument,
  LeaveRaceDocument,
  MeDocument,
  OnRaceEventDocument,
  Score as ScoreType,
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
import { Timer } from "@/components/test/Timer";
import { WordProgress } from "@/components/test/WordProgress";
import { count } from "rxjs";

interface Props {
  raceId: string;
}

// The length of race start countdown in seconds
const COUNTDOWN_TIME = 5;

// TODO: Maybe we just load the race server-side first in `../page.tsx` and then we don't have to struggle w/ initial states here
// TODO: add error handling whenever we execute a mutation (not just in this file)
export const RaceBox: React.FC<Props> = ({ raceId }) => {
  const { data: meData } = useQuery(MeDocument);
  const { data, loading, error } = useSubscription(OnRaceEventDocument, { variables: { raceId } });
  const [finishRaceForUser, {}] = useMutation(FinishRaceForUserDocument);
  const [updateStatsForUser, {}] = useMutation(UpdateStatsForUserDocument);
  const [testStartTime, setTestStartTime] = useState(0);
  const [modeSetting, setModeSetting] = useState(0);
  const [timePassed, setTimePassed] = useState(modeSetting);
  const [finished, setFinished] = useState(false);
  const [finishedForUser, setFinishedForUser] = useState(false);
  const [focused, setFocused] = useState(true);
  const [running, setRunning] = useState(false);
  const [content, setContent] = useState([""]);
  const [time, setTime] = useState(5);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const testRef = useRef<TestMethods | null>(null);

  // TODO: maybe just make it a bool xd idk why i did funny numbers
  function handleKeyDown(e: globalThis.MouseEvent): number {
    if (finished || !focused || !running) return 1;
    return 0;
  }
  // TODO: investigate those
  async function handleChangeWpm(wpm: number) {
    if (!meData?.me) return;
    if (finishedForUser) return;
    const response = await updateStatsForUser({ variables: { input: { raceId, userId: meData.me.id, wpm } } });
    console.log("Response from updating stats:", response);
  }
  // TODO: maybe rename to `handleFinishTest`? makes sense since the behavior changes based on where we're at
  const [createScore, {}] = useMutation(CreateScoreDocument);
  async function handleSaveScore(score: ScoreType) {
    // TODO: think whether i definitely want to save scores in races
    console.log("The score we should be trying to save:", score);
    await handleChangeWpm(score.wpm);
    await createScore({
      variables: {
        input: {
          wpm: Math.round(score.wpm), // since there's no way to enforce `int`, we round here just to be sure
          rawWpm: Math.round(score.rawWpm),
          accuracy: score.accuracy,
          wpmStats: score.wpmStats,
          rawStats: score.rawStats,
          mode: score.mode,
          modeSetting: score.modeSetting,
          content: score.content,
          language: score.language,
        },
      },
    });
  }

  function handleClick(e: globalThis.MouseEvent) {
    if (ref && ref.current) {
      setFocused(!finished && ref.current!.contains(e.target));
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
        console.log("aaaaaaaaa");
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
      if (data.onRaceEvent.running && !data.onRaceEvent.finished) {
        console.log("RACERS BEFORE FINISHING:", data.onRaceEvent.racers);
        const shouldEndRace = data.onRaceEvent.racers.every((racer) => racer.finished);
        if (shouldEndRace) {
          (async () => await handleFinish())();
        }
      }
      console.log("How often does this shit run?");
      setContent(data.onRaceEvent.content.split(" "));
      setFinished(data.onRaceEvent.finished);
      setModeSetting(data.onRaceEvent.modeSetting);
      setFocused(!data.onRaceEvent.finished);
      // TODO: change the logic if the `mode` isn't `time` lol
    }
  }, [data]);

  const [finishRace, {}] = useMutation(FinishRaceDocument);
  // TODO: i might be using 2 intervals in the same ref lol
  useEffect(() => {
    if (running && !finished) {
      intervalRef.current = setInterval(async () => {
        if (!data) return;
        const startTime = new Date(data?.onRaceEvent.startTime).getTime();
        const nowTime = new Date().getTime();
        setTestStartTime(startTime + COUNTDOWN_TIME * 1000);

        const duration = Math.round(Math.abs(startTime + COUNTDOWN_TIME * 1000 - nowTime) / 1000);
        const timeLeft = Math.max(data?.onRaceEvent.modeSetting - duration, 0);
        setTimePassed(duration);
        console.log("The time passed:", duration);
        setTime(timeLeft);
        // TODO: make it the handleSaveScore (or handleFinishTest or whatever)
        // if (timeLeft <= 0) {
        //   // TODO: idk if that's actually needed, could just
        //   clearInterval(intervalRef.current);
        // }
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  async function handleFinish() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const finishResponse = await finishRace({ variables: { input: { raceId } } });
    setFinished(finishResponse.data?.finishRace.race?.finished ?? false);
    setRunning(false);
    setFinished(true);
  }

  async function handleFinishForUser() {
    if (!meData?.me) return;
    const response = await finishRaceForUser({ variables: { input: { raceId, userId: meData?.me!.id } } });
    setFinishedForUser(true);
  }

  // useEffect(() => {}, [time]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [finished]);
  // TODO: the cache update is fucked whenever you do a `joinRace` so idk bro fix it i guess lol // I GUESS IT GOT FIXED? LOL
  // TODO: would probs make sense to kick someone out of the race once they leave/F5 during the race (or not but i dont care, could be cool)
  // TODO: maybe figure out a better error page? right now it shows an ugly "theres a funny error: {}" which is not too user-friendly in case-
  // ^^^^^-some shit actually goes down
  // ↓ dont read this
  // NOTE: if you try to join the race twice from the same account on two different clients, funny shit happens and it throws you an error
  // which i guess is good? idk probably
  // ↑ dont read this
  const [lazyGetRace, { data: lazyGetRaceData }] = useLazyQuery(GetRacesDocument);
  const [wordCount, setWordCount] = useState(0);
  return (
    <div className={styles.raceBox}>
      {data && meData && (
        <>
          {data.onRaceEvent.mode === "time" ? (
            <Timer time={time} />
          ) : (
            <WordProgress count={wordCount} setting={modeSetting} />
          )}
          <div ref={ref}>
            <Test
              focused={focused}
              running={running}
              finished={finished}
              timePassed={timePassed}
              setWordCount={setWordCount}
              modeSetting={data.onRaceEvent.modeSetting}
              mode={data.onRaceEvent.mode}
              handleChangeWpm={handleChangeWpm}
              onKeyDown={handleKeyDown}
              startTime={testStartTime}
              handleFinish={handleFinishForUser}
              ref={testRef}
              handleSaveScore={handleSaveScore}
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
          {data?.onRaceEvent.host.id === meData.me?.id && (
            // TODO: looks like the length doesn't get updated the way it should? useState??????? LOL!!!!!!!!!!! love react
            // <StartRaceButton handleStart={onRaceStart} hasError={finished || data.onRaceEvent.racers.length <= 0} />
            <StartRaceButton handleStart={onRaceStart} hasError={false} />
          )}
          <div style={{ border: "1px solid red" }}>
            {/* TODO: Fix that it shows the actual stats after the race-ended, right now it shows arr[arr.size - 2] stats */}
            <h1>racer stats:</h1>
            {data.onRaceEvent.racers.map((racer) => (
              <div key={racer.user.username}>
                {racer.user.username}: {racer.wpm}wpm {racer.finished ? "☑️" : "❎"} finished
              </div>
            ))}
          </div>
          <h1 style={{ fontSize: "1.5rem" }}>start typing once the countdown reaches zero</h1>
          <h1 style={{ fontSize: "1.5rem" }}>current time: {JSON.stringify(new Date())}</h1>
          {/* TODO: Consider adding a `startTime` field to a race? then it's easier to calculate the time left lol */}
          <h1 style={{ fontSize: "3rem" }}>FINISHED? {finished ? "☑️" : "❎"} finished</h1>
          <h1 style={{ fontSize: "3rem" }}>countdown: {countdown}</h1>
          <h1 style={{ fontSize: "3rem" }}>running: {running ? "true" : "false"}</h1>
          <h1 style={{ fontSize: "3rem" }}>running backend: {data?.onRaceEvent.running ? "true" : "false"}</h1>
          <h1 style={{ fontSize: "3rem" }}>THE HOST IS: {data?.onRaceEvent.host.username}</h1>
          <ul>
            users:
            {data.onRaceEvent.racers.map((racer) => (
              <li key={racer.user.username}>{racer.user.username}</li>
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
