"use client";

import styles from "./Test.module.css";
import { useEffect, useRef, useState } from "react";
import { Test } from "@/components/test/Test";
import { Timer } from "@/components/test/Timer";
import { TimeSettingSelection } from "@/components/test/TimeSettingSelection";
import { Counter } from "@/components/test/Counter";
import { RestartButton } from "@/components/test/RestartButton";
import { Score } from "@/components/test/Score";
import { Score as ScoreType } from "@/graphql/generated/graphql";

export function TestBox() {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [timeSetting, setTimeSetting] = useState(5);
  const [time, setTime] = useState(timeSetting);
  const [wpm, setWpm] = useState(0);

  // danger zone
  const [dataFromChild, setDataFromChild] = useState<ScoreType>(null);
  const [showScore, setShowScore] = useState(false);

  // cant believe this shit actually works lol TODO: CLEAN THIS CODE UP IT'S TRAGIC AND TEMPORARY
  const handleDataUpdate = (newData) => {
    setShowScore(true);
    setDataFromChild(newData);
  };
  // danger zone

  const testRef = useRef<any>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  function handleClick(e: globalThis.MouseEvent) {
    if (ref && ref.current) setFocused(ref.current!.contains(e.target));
  }

  function handleStart() {
    setRunning(true);
  }

  function handleTimeSettingSelection(time: number) {
    return () => {
      setTimeSetting(time);
    };
  }

  function handleChangeWpm(wpm: number) {
    setWpm(wpm);
  }

  function handleReset() {
    setFocused(true);
    setFinished(false);
    setRunning(false);
    setTime(timeSetting);
    setWpm(0);
    testRef.current.reset();
  }

  // TODO: sit down one day and think about those useEffect()s, some of them here and in `Test.tsx` are likely to be unnecessary.
  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (time <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setRunning(false);
      setFinished(true);
    }
  }, [time]);

  useEffect(() => {
    if (!running && !finished) {
      setTime(timeSetting);
    }
  }, [timeSetting]);

  if (showScore) {
    return (
      <>
        <Score
          score={{
            rawWpm: 10,
            averageWpm: 10,
            time: 10,
            __typename: "Score",
            createdAt: new Date(),
            updatedAt: new Date(),
            id: "GUID?XD",
            ...dataFromChild,
          }}
        />
        <p>data from child: {JSON.stringify(dataFromChild)}</p>
      </>
    );
  }

  if (visible) {
    return (
      <div className={styles.box} ref={ref}>
        <div className={styles.top}>
          <Timer time={time} />
          <Counter count={wpm} />
          <TimeSettingSelection
            timeSettings={[5, 15, 30]}
            currentTimeSetting={timeSetting}
            handleSelect={handleTimeSettingSelection}
          />
        </div>
        <div className={styles.middle}>
          <Test
            focused={focused}
            running={running}
            finished={finished}
            time={time}
            timeSetting={timeSetting}
            handleChangeWpm={handleChangeWpm}
            handleStart={handleStart}
            ref={testRef}
            onDataUpdate={handleDataUpdate}
          />
        </div>
        <div className={styles.bottom}>
          <RestartButton handleReset={handleReset} />
          <p>{focused ? "FOCUSED" : "UNFOCUSED"}</p>
        </div>
      </div>
    );
  }
}
