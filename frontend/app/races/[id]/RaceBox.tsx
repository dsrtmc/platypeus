"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { JoinRaceDocument, LeaveRaceDocument, MeDocument, OnRaceJoinLeaveDocument } from "@/graphql/generated/graphql";
import { Chatbox } from "@/app/races/[id]/Chatbox";
import styles from "./Race.module.css";
import { Test, TestMethods } from "@/components/test/Test";
import { LOADED_WORDS_COUNT } from "@/shared/constants/testConfig";

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
  const [content, setContent] = useState([""]);
  const testRef = useRef<TestMethods | null>(null);
  function handleKeyDown() {}
  function handleStart() {}
  function handleChangeWpm() {}
  function handleSaveScore() {}
  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
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
    return words;
  }
  // TODO: would probs make sense to kick someone out of the race once they leave/F5 during the race (or not but i dont care, could be cool)
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
              handleStart={handleStart}
              onKeyDown={handleKeyDown}
              ref={testRef}
              onSaveScore={handleSaveScore}
              initialContent={data.onRaceJoinLeave.content.split(" ").slice(0, LOADED_WORDS_COUNT)}
              onPoolUpdate={onPoolUpdate}
            />
          </div>
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
