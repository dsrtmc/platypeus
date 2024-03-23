"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  CreateScoreInput as CreateScoreInputType,
  RaceBox_CreateScoreDocument,
  RaceBox_DeleteRaceDocument,
  RaceBox_FinishRaceDocument,
  RaceBox_FinishRaceForUserDocument,
  RaceBox_JoinRaceDocument,
  RaceBox_LeaveRaceDocument,
  RaceBox_MeDocument,
  RaceBox_OnRaceEventDocument,
  RaceBox_RunRaceDocument,
  RaceBox_StartRaceDocument,
  RaceBox_UpdateStatsDocument,
  RacePage_GetRaceQuery,
  Score as ScoreType,
} from "@/graphql/generated/graphql";
import { Chatbox } from "@/app/races/[slug]/Chatbox";
import styles from "./Race.module.css";
import { Test } from "@/components/test/Test";
import { LOADED_WORDS_COUNT } from "@/shared/constants/testConfig";
import { StartRaceButton } from "@/app/races/[slug]/StartRaceButton";
import { JoinRaceButton } from "@/app/races/[slug]/JoinRaceButton";
import { LeaveRaceButton } from "@/app/races/[slug]/LeaveRaceButton";
import { Timer } from "@/components/test/Timer";
import { WordProgress } from "@/components/test/WordProgress";
import { RaceScoreboard } from "@/app/races/[slug]/RaceScoreboard";
import { assertIsNode } from "@/utils/assertIsNode";
import { Countdown } from "@/app/races/[slug]/Countdown";
import { HiArrowsPointingIn } from "react-icons/hi2";
import { ErrorContext } from "@/app/ErrorProvider";

interface Props {
  race: NonNullable<RacePage_GetRaceQuery["race"]>;
}

// The length of race start countdown in seconds
const COUNTDOWN_TIME = 5;

// TODO: add error handling whenever we execute a mutation (not just in this file)
export const RaceBox: React.FC<Props> = ({ race }) => {
  const { setError } = useContext(ErrorContext)!;

  const { data, loading, error } = useSubscription(RaceBox_OnRaceEventDocument, {
    variables: { raceId: race!.id, racersFirst: 10 },
  });
  const { data: meData } = useQuery(RaceBox_MeDocument);

  const [finishRaceForUser, {}] = useMutation(RaceBox_FinishRaceForUserDocument);
  const [updateStats, {}] = useMutation(RaceBox_UpdateStatsDocument);
  const [finishRace, {}] = useMutation(RaceBox_FinishRaceDocument);
  const [joinRace, {}] = useMutation(RaceBox_JoinRaceDocument);
  const [leaveRace, {}] = useMutation(RaceBox_LeaveRaceDocument);
  const [createScore, {}] = useMutation(RaceBox_CreateScoreDocument);
  const [startRace, {}] = useMutation(RaceBox_StartRaceDocument);
  const [runRace, {}] = useMutation(RaceBox_RunRaceDocument);
  const [deleteRace, {}] = useMutation(RaceBox_DeleteRaceDocument);

  const ref = useRef<HTMLDivElement | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const [focused, setFocused] = useState(false);
  const [testStartTime, setTestStartTime] = useState(0);
  const [userHasFinished, setUserHasFinished] = useState(false);
  const [content, setContent] = useState<Array<string> | null>(race.content.split(" "));
  const [wordCount, setWordCount] = useState(0);

  const initialTimePassed = Math.round(
    race.started ? (new Date().getTime() - new Date(race.startTime).getTime()) / 1000 : 0
  );
  const [timePassed, setTimePassed] = useState(initialTimePassed);

  const initialCountdown = race.started
    ? Math.round(new Date(race.startTime).getTime() / 1000 + COUNTDOWN_TIME - new Date().getTime() / 1000)
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
    await updateStats({
      variables: { input: { raceId: race!.id, wpm, wordsTyped: wordCount } },
    });
  }

  async function handleSaveScore(score: CreateScoreInputType) {
    // Prevents multiple saving of the same score (as well as attempting to save on re-entering, which would crash out)
    if (userHasFinished) return;
    await handleChangeWpm(score.wpm!);
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

  // lol
  function viewerIsInTheRace() {
    if (!meData?.me) return false;
    return data?.onRaceEvent.racers?.edges!.find((edge) => edge.node.user.id === meData.me!.id);
  }

  function handleClick(e: globalThis.MouseEvent) {
    assertIsNode(e.target);
    if (!meData?.me || !data?.onRaceEvent) return;
    console.log(
      data.onRaceEvent.racers?.edges!.find((edge) => edge.node.user.id === meData.me!.id)
        ? "you are in the race"
        : "you are not in the race"
    );
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
      const { data } = await startRace({ variables: { input: { raceId: race!.id } } });
      if (data?.startRace?.errors?.length) {
        setError({ code: data?.startRace.errors?.[0].code ?? "", message: data?.startRace.errors?.[0].message ?? "" });
      }
    }
  }

  async function handleFinish() {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    await finishRace({ variables: { input: { raceId: race!.id } } });
  }

  // TODO: very likely this shit is causing race conditions; need to investigate how to avoid sending the entire race as the event
  async function handleFinishForUser() {
    if (!meData || !meData.me) return;
    const response = await finishRaceForUser({ variables: { input: { raceId: race!.id, userId: meData?.me!.id } } });
    setUserHasFinished(!!response.data?.finishRaceForUser.racer?.finished);
  }

  async function handleJoinRace() {
    await joinRace({ variables: { input: { raceId: race.id } } });
  }

  async function handleLeaveRace() {
    if (!meData || !meData.me) return;
    await leaveRace({ variables: { input: { raceId: race.id } } });
  }

  useEffect(() => {
    if (data && data.onRaceEvent.started) {
      countdownIntervalRef.current = setInterval(() => {
        const timeLeftToBegin = Math.round(
          (new Date(data.onRaceEvent.startTime).getTime() + COUNTDOWN_TIME * 1000 - new Date().getTime()) / 1000
        );
        console.log("we call it here like retards?:", timeLeftToBegin);
        setCountdown(timeLeftToBegin);
      }, 1000);
    }
    return () => clearInterval(countdownIntervalRef.current);
  }, [data?.onRaceEvent.started]);

  useEffect(() => {
    if (!data) return;
    if (countdown <= 0) {
      clearInterval(countdownIntervalRef.current);
      (async () => await runRace({ variables: { input: { raceId: race.id } } }))();
    }
  }, [countdown]);

  useEffect(() => {
    if (data?.onRaceEvent.running) {
      // clearInterval(countdownIntervalRef.current);
      const startTime = new Date(data.onRaceEvent.startTime).getTime();
      setTestStartTime(startTime + COUNTDOWN_TIME * 1000);

      timerIntervalRef.current = setInterval(async () => {
        const nowTime = new Date().getTime();

        const testDuration = Math.round(Math.abs(startTime + COUNTDOWN_TIME * 1000 - nowTime) / 1000);
        setTimePassed(testDuration);
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [data?.onRaceEvent.running]); // perhaps it's just better to do `[data]` at this point

  useEffect(() => {
    if (!data) return;
    if (!content) setContent(data.onRaceEvent.content.split(" "));
    if (data.onRaceEvent.running && !data.onRaceEvent.finished) {
      if (data.onRaceEvent.racers?.edges!.every((edge) => edge.node.finished)) {
        (async () => await handleFinish())();
      }
    }
  }, [data]);

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

  // TODO: would probably make sense to kick someone out of the race once they leave/F5 during the race (or not but i dont care, could be cool)
  // TODO: maybe figure out a better error page? right now it shows an ugly "theres a funny error: {}" which is not too user-friendly in case-
  // ^^^^^-some shit actually goes down
  // ↓ dont read this
  // NOTE: if you try to join the race twice from the same account on two different clients, funny shit happens and it throws you an error
  // which i guess is good? idk probably
  // ↑ dont read this
  if (loading) return <p>loading race data...</p>;
  if (error) return <p>error: {JSON.stringify(error)}</p>;
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
        {data.onRaceEvent.started && !data.onRaceEvent.running && !data.onRaceEvent.finished && (
          <Countdown countdown={countdown} />
        )}
      </div>
      <div className={styles.middle} ref={ref}>
        <Test
          focused={focused}
          running={data.onRaceEvent.running}
          finished={data.onRaceEvent.finished ?? userHasFinished}
          timePassed={timePassed}
          modeSetting={data.onRaceEvent.modeSetting}
          startTime={testStartTime}
          mode={data.onRaceEvent.mode}
          language={"english"}
          onKeyDown={handleKeyDown}
          preventInput={!data?.onRaceEvent.running || userHasFinished || !focused}
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
          !data.onRaceEvent.started &&
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
              data.onRaceEvent.started ||
              !data.onRaceEvent.racers?.edges ||
              data.onRaceEvent.racers!.edges!.length <= 0 // TODO: set to 1 before deploy
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
      {/*<h1 style={{ fontSize: "1.5rem" }}>running: {data.onRaceEvent.running ? "true" : "false"}</h1>*/}
      {/*<h1 style={{ fontSize: "1.5rem" }}>started: {data.onRaceEvent.started ? "true" : "false"}</h1>*/}
      {/*<h1 style={{ fontSize: "1.5rem" }}>finished: {data.onRaceEvent.finished ? "true" : "false"}</h1>*/}
      {/* dev */}
      <div className={styles.hr} />
      <Chatbox chatboxId={data.onRaceEvent.chatboxId} me={meData?.me} />
    </div>
  );
};
