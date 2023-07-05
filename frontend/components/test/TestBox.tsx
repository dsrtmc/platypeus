"use client";

import styles from "./Test.module.css";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Test } from "@/components/test/Test";
import { TimeSettingButton } from "@/components/test/TimeSettingButton";
import { ResetButton } from "@/components/test/ResetButton";
import { Timer } from "@/components/test/Timer";
import { TestHorizontal } from "@/components/test/TestHorizontal";

export function TestBox() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(true);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const [timeSetting, setTimeSetting] = useState(5);

  const [timeRemaining, setTimeRemaining] = useState(5);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setRunning(false);
      setFinished(true);
      clearInterval(intervalRef.current!);
    }
  }, [timeRemaining]);

  function handleTimeSettingSelection(time: number) {
    return (e: MouseEvent<HTMLButtonElement>) => {
      localStorage.setItem("time-setting", time.toString());
      setTimeSetting(time);
      setTimeRemaining(time);
    };
  }

  function handleClick(e: globalThis.MouseEvent) {
    setActive(ref.current?.contains(e.target));
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    setRunning(false);
    setTimeRemaining(timeSetting);
    clearInterval(intervalRef.current!);
  }

  function handleStart() {
    setRunning(true);
    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => {
      setTimeRemaining((t) => t - 1);
    }, 1000);
  }

  return (
    <div className={styles.box} ref={ref}>
      <Timer time={timeRemaining} />
      <p>{active ? "ACTIVE" : "INACTIVE"}</p>
      <TestHorizontal active={active} running={running} finished={finished} handleStart={handleStart} />
      {[1, 5, 10].map((number) => (
        <TimeSettingButton handleTimeSettingSelection={handleTimeSettingSelection(number)} key={number}>
          {number}
        </TimeSettingButton>
      ))}
      <ResetButton handleReset={handleReset} />
    </div>
  );
}
