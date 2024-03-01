"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  CreateScoreDocument,
  FinishRaceDocument,
  FinishRaceForUserDocument,
  GetRaceQuery,
  JoinRaceDocument,
  LeaveRaceDocument,
  MeDocument,
  OnRaceEventDocument,
  RunRaceDocument,
  Score as ScoreType,
  StartRaceDocument,
  UpdateStatsForUserDocument,
} from "@/graphql/generated/graphql";
import { Chatbox } from "@/app/races/[slug]/Chatbox";
import styles from "./Race.module.css";
import { Test, TestMethods } from "@/components/test/Test";
import { LOADED_WORDS_COUNT } from "@/shared/constants/testConfig";
import { StartRaceButton } from "@/app/races/[slug]/StartRaceButton";
import { JoinRaceButton } from "@/app/races/[slug]/JoinRaceButton";
import { LeaveRaceButton } from "@/app/races/[slug]/LeaveRaceButton";
import { Timer } from "@/components/test/Timer";
import { WordProgress } from "@/components/test/WordProgress";
import { RaceScoreboard } from "@/app/races/[slug]/RaceScoreboard";

interface Props {
  race: NonNullable<GetRaceQuery["race"]>;
}

// The length of race start countdown in seconds
const COUNTDOWN_TIME = 5;

// TODO: ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ lowkey i like that idea.
// TODO: Maybe we just load the race server-side first in `../page.tsx` and then we don't have to struggle w/ initial states here
// TODO: add error handling whenever we execute a mutation (not just in this file)
export const RaceBox: React.FC<Props> = ({ race }) => {
  const { data, loading, error } = useSubscription(OnRaceEventDocument, {
    variables: { raceId: race!.id, racersFirst: 10 },
  });
  console.log("THE DATA:", data);
  const { data: meData } = useQuery(MeDocument);

  const [finishRaceForUser, {}] = useMutation(FinishRaceForUserDocument);
  const [updateStatsForUser, {}] = useMutation(UpdateStatsForUserDocument);
  const [finishRace, {}] = useMutation(FinishRaceDocument);
  const [joinRace, {}] = useMutation(JoinRaceDocument);
  const [leaveRace, {}] = useMutation(LeaveRaceDocument);
  const [createScore, {}] = useMutation(CreateScoreDocument);
  const [startRace, {}] = useMutation(StartRaceDocument);
  const [runRace, {}] = useMutation(RunRaceDocument);

  const ref = useRef<HTMLDivElement | null>(null);
  const testRef = useRef<TestMethods | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const [focused, setFocused] = useState(false);
  const [testStartTime, setTestStartTime] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [userHasFinished, setUserHasFinished] = useState(false);
  const [content, setContent] = useState<Array<string> | null>(null);
  const [countdown, setCountdown] = useState(race.running ? 0 : COUNTDOWN_TIME);
  const [wordCount, setWordCount] = useState(0);

  // TODO: make it nicer, right now it returns true when we should prevent user input
  function handleKeyDown(e: globalThis.MouseEvent): boolean {
    return !data?.onRaceEvent.running || userHasFinished || !focused;
  }
  // TODO: investigate those
  async function handleChangeWpm(wpm: number) {
    if (!meData?.me) return;
    if (userHasFinished) return;
    await updateStatsForUser({
      variables: { input: { raceId: race!.id, userId: meData.me.id, wpm, wordsTyped: wordCount } },
    });
  }
  async function handleSaveScore(score: ScoreType) {
    // Prevents multiple saving of the same score (as well as attempting to save on re-entering, which would crash out)
    if (userHasFinished) return;
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
    if (!meData?.me || !data?.onRaceEvent) return;
    console.log(
      data.onRaceEvent.racers?.edges!.find((edge) => edge.node.id === meData.me!.id)
        ? "you are in the race"
        : "you are not in the race"
    );
    if (ref && ref.current && data.onRaceEvent.racers?.edges!.find((edge) => edge.node.user.id === meData.me!.id)) {
      setFocused(!data.onRaceEvent.finished && ref.current!.contains(e.target));
    }
  }

  // TODO: think if there's a better way to do that because holy fuck is it confusing
  /**
   * Returns n elements to be added to the word pool while removing the first n elements
   * to account for index differences between `Test`'s content and this one.
   * @param {string} count - The count of elements to add to the pool
   * @param {number} index - If using a static word pool, the index from which to start adding words
   */
  function onPoolUpdate(count: number, index: number): string[] {
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
      await startRace({ variables: { input: { raceId: race!.id } } });
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

  // TODO: think about deleting the race when the host leaves? hmm
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [data?.onRaceEvent.finished, data?.onRaceEvent.racers]);
  // TODO: the cache update is fucked whenever you do a `joinRace` so idk bro fix it i guess lol // I GUESS IT GOT FIXED? LOL
  // TODO: would probably make sense to kick someone out of the race once they leave/F5 during the race (or not but i dont care, could be cool)
  // TODO: maybe figure out a better error page? right now it shows an ugly "theres a funny error: {}" which is not too user-friendly in case-
  // ^^^^^-some shit actually goes down
  // ↓ dont read this
  // NOTE: if you try to join the race twice from the same account on two different clients, funny shit happens and it throws you an error
  // which i guess is good? idk probably
  // ↑ dont read this
  if (loading) return <p>loading race data...</p>;
  if (error) return <p>error: {JSON.stringify(error)}</p>;
  if (!data) return <p>no race data</p>;
  return (
    <div className={styles.raceBox}>
      {meData &&
        meData.me &&
        !data.onRaceEvent.running &&
        (!data.onRaceEvent.racers?.edges!.find((edge) => edge.node.user.id === meData.me!.id) ? (
          <JoinRaceButton handleJoinRace={handleJoinRace} />
        ) : (
          <LeaveRaceButton handleLeaveRace={handleLeaveRace} />
        ))}
      {data.onRaceEvent.mode === "time" ? (
        <Timer time={Math.max(data.onRaceEvent.modeSetting - timePassed, 0)} />
      ) : (
        <WordProgress count={wordCount} setting={data.onRaceEvent.modeSetting} />
      )}
      {/* TODO: maybe an unnecessary ref idk */}
      <div ref={ref}>
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
          onPoolUpdate={onPoolUpdate}
          handleFinish={handleFinishForUser}
          handleChangeWpm={handleChangeWpm}
          handleSaveScore={handleSaveScore}
          setWordCount={setWordCount}
          initialContent={data.onRaceEvent.content.split(" ").slice(0, LOADED_WORDS_COUNT)}
          ref={testRef}
        />
      </div>
      {data?.onRaceEvent.host.id === meData?.me?.id && (
        // TODO: looks like the length doesn't get updated the way it should? useState??????? LOL!!!!!!!!!!! love react
        <StartRaceButton
          disabled={
            data.onRaceEvent.finished ||
            data.onRaceEvent.running ||
            data.onRaceEvent.started ||
            data.onRaceEvent.racers?.edges?.length <= 0
          }
          handleStart={handleStart}
        />
      )}
      {/* TODO: ↓ */}
      {!data.onRaceEvent.running && !data.onRaceEvent.finished && (
        <h1 style={{ fontSize: "3rem" }}>countdown: {countdown}</h1>
      )}
      <RaceScoreboard
        edges={data.onRaceEvent.racers?.edges}
        mode={data.onRaceEvent.mode}
        modeSetting={data.onRaceEvent.modeSetting}
      />
      <h1 style={{ fontSize: "1.5rem" }}>start typing once the countdown reaches zero</h1>
      <div className={styles.hr} />
      <Chatbox chatboxId={data.onRaceEvent.chatboxId} meData={meData} />
    </div>
  );
};
