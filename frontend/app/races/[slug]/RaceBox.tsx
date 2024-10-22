"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  CreateScoreInput as CreateScoreInputType,
  RaceBox_CreateScoreDocument,
  RaceBox_DeleteRaceDocument,
  RaceBox_FinishRaceForUserDocument,
  RaceBox_JoinRaceDocument,
  RaceBox_LeaveRaceDocument,
  RaceBox_MeDocument,
  RaceBox_OnRaceEventDocument,
  RaceBox_StartRaceDocument,
  RaceBox_UpdateStatsDocument,
  RacePage_GetRaceQuery,
} from "@/graphql/generated/graphql";
import { Chatbox } from "@/app/races/[slug]/Chatbox";
import styles from "./Race.module.css";
import { Test, TestScoreType } from "@/components/test/Test";
import { LOADED_WORDS_COUNT } from "@/shared/constants/testConfig";
import { StartRaceButton } from "@/app/races/[slug]/StartRaceButton";
import { JoinRaceButton } from "@/app/races/[slug]/JoinRaceButton";
import { LeaveRaceButton } from "@/app/races/[slug]/LeaveRaceButton";
import { Timer } from "@/components/test/Timer";
import { WordProgress } from "@/components/test/WordProgress";
import { RaceScoreboard } from "@/app/races/[slug]/RaceScoreboard";
import { assertIsNode } from "@/utils/assertIsNode";
import { Countdown } from "@/app/races/[slug]/Countdown";
import { ErrorContext } from "@/app/ErrorProvider";

interface Props {
  race: NonNullable<RacePage_GetRaceQuery["race"]>;
}

// The length of race start countdown in seconds
const COUNTDOWN_TIME = 5;

export const RaceBox: React.FC<Props> = ({ race }) => {
  const { setError } = useContext(ErrorContext)!;

  const { data, loading, error } = useSubscription(RaceBox_OnRaceEventDocument, {
    variables: { raceId: race!.id, racersFirst: 10 },
  });
  const { data: meData } = useQuery(RaceBox_MeDocument);

  const [finishRaceForUser, {}] = useMutation(RaceBox_FinishRaceForUserDocument);
  const [updateStats, {}] = useMutation(RaceBox_UpdateStatsDocument);
  const [joinRace, {}] = useMutation(RaceBox_JoinRaceDocument);
  const [leaveRace, {}] = useMutation(RaceBox_LeaveRaceDocument);
  const [createScore, {}] = useMutation(RaceBox_CreateScoreDocument);
  const [startRace, {}] = useMutation(RaceBox_StartRaceDocument);
  const [deleteRace, {}] = useMutation(RaceBox_DeleteRaceDocument);

  const ref = useRef<HTMLDivElement | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const [focused, setFocused] = useState(false);
  const [userHasFinished, setUserHasFinished] = useState(false);
  const [content, setContent] = useState<Array<string> | null>(race.content.split(" "));
  const [wordCount, setWordCount] = useState(0);

  const initialTimePassed = Math.round(
    race.startTime ? (new Date().getTime() - new Date(race.startTime).getTime()) / 1000 : 0
  );
  const [timePassed, setTimePassed] = useState(initialTimePassed);

  // ...now....startTime...
  const initialCountdown = race.startTime
    ? Math.round((new Date(race.startTime).getTime() - new Date().getTime()) / 1000)
    : COUNTDOWN_TIME;
  const [countdown, setCountdown] = useState(initialCountdown);

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (!data?.onRaceEvent.running || userHasFinished || !focused) {
      e.stopPropagation();
    }
  }

  // TODO: investigate those
  async function handleChangeWpm(wpm: number) {
    if (!meData?.me) return;
    if (userHasFinished) return;
    const response = await updateStats({
      variables: { input: { raceId: race!.id, wpm, wordsTyped: wordCount } },
    });
    const firstError = response.data?.updateStats.errors?.[0];
    if (firstError) {
      setError({
        code: firstError.code,
        message: firstError.message,
      });
      console.error("Errors:", response.data?.updateStats.errors);
    }
  }

  async function handleSaveScore(score: TestScoreType) {
    if (!data) return; // xD
    await handleChangeWpm(score.wpm ?? 0);
    console.log("We just called handle save score");
    await createScore({
      variables: {
        input: {
          wpm: Math.round(score.wpm), // since there's no way to enforce `int`, we round here just to be sure
          rawWpm: Math.round(score.rawWpm),
          accuracy: score.accuracy,
          wpmStats: score.wpmStats,
          rawStats: score.rawStats,
          mode: data.onRaceEvent.mode,
          modeSetting: data.onRaceEvent.modeSetting,
          content: score.content,
          language: "english", // TODO: make it modular by allowing choosing languages for races (no priority)
        },
      },
    });
  }

  // lol
  function viewerIsInTheRace() {
    if (!meData?.me) return false;
    return data?.onRaceEvent.racers?.edges!.find((edge) => edge.node.user.id === meData.me!.id);
  }

  function handleClick(e: globalThis.MouseEvent) {
    assertIsNode(e.target);
    if (!meData?.me || !data?.onRaceEvent) return;
    console.log(viewerIsInTheRace() ? "you are in the race" : "you are not in the race");
    if (ref && ref.current && viewerIsInTheRace()) {
      setFocused(!data.onRaceEvent.finished && ref.current!.contains(e.target as Node));
    }
  }

  /**
   * Returns `n` elements to be added to the word pool while removing the first n elements
   * to account for index differences between `Test`'s content and this one.
   * @param {string} count - The count of elements to add to the pool
   */
  function onPoolUpdate(count: number): string[] {
    if (!content) return [];
    const copy = content.slice(count);
    const words: string[] = [];
    for (let i = LOADED_WORDS_COUNT - count; i < LOADED_WORDS_COUNT; i++) {
      if (copy[i]) words.push(copy[i]);
    }

    setContent(copy);
    return words;
  }

  async function handleStart() {
    if (!data?.onRaceEvent.running && !data?.onRaceEvent.finished) {
      const response = await startRace({ variables: { input: { raceId: race.id, countdownTime: COUNTDOWN_TIME } } });
      const firstError = response.data?.startRace.errors?.[0];
      if (firstError) {
        setError({
          code: firstError.code,
          message: firstError.message,
        });
        console.error("Errors:", response.data?.startRace.errors);
      }
    }
  }

  async function handleFinish() {
    setUserHasFinished(true);
  }

  async function handleFinishForUser() {
    // if the test is time-based then our server should finish the race for everyone at the same time.
    if (data?.onRaceEvent.finished) return;
    if (!meData || !meData.me) return;

    const response = await finishRaceForUser({ variables: { input: { raceId: race!.id, userId: meData?.me!.id } } });
    setUserHasFinished(!!response.data?.finishRaceForUser.racer?.finished);
  }

  async function handleJoinRace() {
    const response = await joinRace({ variables: { input: { raceId: race.id } } });
    const firstError = response.data?.joinRace.errors?.[0];
    if (firstError) {
      setError({
        code: firstError.code,
        message: firstError.message,
      });
      console.error("Errors:", response.data?.joinRace.errors);
    }
  }

  async function handleLeaveRace() {
    if (!meData || !meData.me) return;
    await leaveRace({ variables: { input: { raceId: race.id } } });
  }

  // Countdown logic
  useEffect(() => {
    if (!data || !data.onRaceEvent.startTime) return;
    countdownIntervalRef.current = setInterval(() => {
      const startTime = new Date(data.onRaceEvent.startTime).getTime();
      const nowTime = new Date().getTime();
      const timeLeftToBegin = Math.max(Math.round((startTime - nowTime) / 1000), 0);
      setCountdown(timeLeftToBegin);
    }, 1000);
    return () => {
      clearInterval(countdownIntervalRef.current);
    };
  }, [data?.onRaceEvent.startTime]);

  // Timer logic
  useEffect(() => {
    if (!data || !data.onRaceEvent.startTime) return;
    const startTime = new Date(data.onRaceEvent.startTime).getTime();
    const nowTime = new Date().getTime();
    const timeLeftToBegin = Math.max(Math.round((startTime - nowTime) / 1000), 0);
    if (timeLeftToBegin <= 0) {
      timerIntervalRef.current = setInterval(async () => {
        const now = new Date().getTime();
        const testDuration = Math.round(Math.abs(startTime - now) / 1000);
        setTimePassed(testDuration);
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [data?.onRaceEvent.startTime, countdown]);

  // server finishes race for every user      (e.g. time test)
  //    - race.finished = true
  //    - test.tsx effect on finished: save score and shit
  // user can finish his own race prematurely (e.g. words test)
  //    - race.finished is false
  //    - test.tsx effect on finished: save score and shit

  // useEffect(() => {
  //   if (!data?.onRaceEvent.finished) return;
  //   if (userHasFinished) return;
  // }, [data?.onRaceEvent.finished]);

  // useEffect(() => {
  //   if (!userHasFinished) return;
  //
  //   if (!data?.onRaceEvent.finished) {
  //     (async () => await handleFinishForUser())();
  //   }
  // }, [userHasFinished]);

  async function handleBeforeUnload(e: BeforeUnloadEvent) {
    // I would really love to have that and call `deleteRace()` depending on what the user clicks but :(
    // e.preventDefault();
    await deleteRace({ variables: { input: { raceId: race.id } } });
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [data?.onRaceEvent.finished, data?.onRaceEvent.racers, handleClick, handleBeforeUnload]);

  // fix this function the name is retarded but it does what i needed to accomplish.
  // what it helps me do is modify the `finished` flag from inside of <Test />
  function setFinished() {
    setUserHasFinished(true);
  }

  // TODO: would probably make sense to kick someone out of the race once they leave/F5 during the race (or not but i dont care, could be cool)
  if (loading) return <p>loading race data...</p>;
  if (error) {
    throw new Error(JSON.stringify(error));
  }
  // if (!data?.onRaceEvent || !meData?.me) return <p>no data</p>; // why did i do if (!meData?.me)?
  if (!data?.onRaceEvent) return <p>no data</p>;
  return (
    <div className={styles.box}>
      <div className={styles.top}>
        {data.onRaceEvent.mode === "time" ? (
          <Timer time={Math.max(data.onRaceEvent.modeSetting - timePassed, 0)} />
        ) : (
          <WordProgress count={wordCount} setting={data.onRaceEvent.modeSetting} />
        )}
        {countdown !== 0 && data.onRaceEvent.startTime && !data.onRaceEvent.finished && (
          <Countdown countdown={countdown} />
        )}
      </div>
      <div className={styles.middle} ref={ref}>
        <Test
          focused={focused}
          running={data.onRaceEvent.running}
          finished={data.onRaceEvent.finished || userHasFinished}
          setFinished={setFinished}
          timePassed={timePassed}
          startTime={data.onRaceEvent.startTime}
          finishConditions={{
            maxWordCount: data.onRaceEvent.mode === "words" ? data.onRaceEvent.modeSetting : undefined,
          }}
          onKeyDown={handleKeyDown}
          preventInput={
            !data?.onRaceEvent.startTime ||
            new Date(data.onRaceEvent.startTime).getTime() > new Date().getTime() ||
            userHasFinished ||
            data.onRaceEvent.finished ||
            !focused
          }
          onPoolUpdate={onPoolUpdate}
          handleFinish={handleFinishForUser}
          handleChangeWpm={handleChangeWpm}
          handleSaveScore={handleSaveScore}
          setWordCount={setWordCount}
          showCaret={true}
          initialContent={data.onRaceEvent.content.split(" ").slice(0, LOADED_WORDS_COUNT)}
        />
      </div>
      <div className={styles.bottom}>
        {meData &&
          meData.me &&
          !data.onRaceEvent.startTime &&
          !data.onRaceEvent.running &&
          (!data.onRaceEvent.racers?.edges!.find((edge) => edge.node.user.id === meData.me!.id) ? (
            <JoinRaceButton handleJoinRace={handleJoinRace} />
          ) : (
            <LeaveRaceButton handleLeaveRace={handleLeaveRace} />
          ))}
        <div className={styles.spacer} />
        {data?.onRaceEvent.host.id === meData?.me?.id && (
          <StartRaceButton
            disabled={
              data.onRaceEvent.finished ||
              data.onRaceEvent.running ||
              data.onRaceEvent.startTime ||
              !data.onRaceEvent.racers?.edges ||
              data.onRaceEvent.racers!.edges!.length < 2
            }
            handleStart={handleStart}
          />
        )}
      </div>
      <RaceScoreboard
        edges={data.onRaceEvent.racers?.edges}
        mode={data.onRaceEvent.mode}
        modeSetting={data.onRaceEvent.modeSetting}
      />
      {/* dev */}
      {/*<h1 style={{ fontSize: "1.5rem" }}>the start time: {data.onRaceEvent.startTime}</h1>*/}
      {/*<h1 style={{ fontSize: "1.5rem" }}>running: {data.onRaceEvent.running ? "true" : "false"}</h1>*/}
      {/*<h1 style={{ fontSize: "1.5rem" }}>started: {data.onRaceEvent.startTime ? "true" : "false"}</h1>*/}
      {/*<h1 style={{ fontSize: "1.5rem" }}>finished: {data.onRaceEvent.finished ? "true" : "false"}</h1>*/}
      {/* dev */}
      <div className={styles.hr} />
      <Chatbox chatboxId={data.onRaceEvent.chatboxId} me={meData?.me} />
    </div>
  );
};
