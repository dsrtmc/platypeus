"use client";

import styles from "./Test.module.css";
import { useEffect, useRef, useState } from "react";
import { Test } from "@/components/test/Test";
import { Timer } from "@/components/test/Timer";
import { TimeSettingSelection } from "@/components/test/TimeSettingSelection";

export function TestBox() {
  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [timeSetting, setTimeSetting] = useState(5);
  const [time, setTime] = useState(timeSetting);

  const ref = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  function handleClick(e: globalThis.MouseEvent) {
    setFocused(ref.current?.contains(e.target));
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  function handleStart() {
    setRunning(true);
  }

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
    if (!running) {
      setTime(timeSetting);
    }
  }, [timeSetting]);

  function handleTimeSettingSelection(time: number) {
    return () => {
      setTimeSetting(time);
    };
  }

  return (
    <div className={styles.box} ref={ref}>
      <p>{focused ? "FOCUSED" : "UNFOCUSED"}</p>
      <Timer time={time} />
      <TimeSettingSelection timeSettings={[5, 15, 30]} handleSelect={handleTimeSettingSelection} />
      <Test
        focused={focused}
        running={running}
        finished={finished}
        time={time}
        timeSetting={timeSetting}
        handleStart={handleStart}
      />
    </div>
  );
}
