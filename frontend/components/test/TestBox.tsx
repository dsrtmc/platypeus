"use client";

import styles from "./Test.module.css";
import { useEffect, useRef, useState } from "react";
import { Test } from "@/components/test/Test";
import { Timer } from "@/components/test/Timer";

// it might actually be really useless idk
export function TestBox() {
  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState(5);

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
    if (finished) {
      setVisible(false);
    }
  }, [finished]);

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

  return (
    <div className={styles.box} ref={ref}>
      <p>{focused ? "FOCUSED" : "UNFOCUSED"}</p>
      {/*<TestHorizontal active={active} />*/}
      <Timer time={time} />
      {/* just for development, generally i think it works very ok right now */}
      {visible && <Test focused={focused} running={running} finished={finished} handleStart={handleStart} />}
    </div>
  );
}
