"use client";

import styles from "./Test.module.css";
import { useEffect, useRef, useState } from "react";
import { Test, TestMethods } from "@/components/test/Test";
import { Timer } from "@/components/test/Timer";
import { TimeSettingSelection } from "@/components/test/TimeSettingSelection";
import { Counter } from "@/components/test/Counter";
import { RestartButton } from "@/components/test/RestartButton";
import { Score as ScoreType } from "@/graphql/generated/graphql";
import { Mode } from "@/components/test/Mode";
import { HiMiniLanguage } from "react-icons/hi2";

interface Props {
  handleSaveScore: (score: ScoreType) => void;
}

export function TestBox({ handleSaveScore }: Props) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [timeSetting, setTimeSetting] = useState(5);
  const [time, setTime] = useState(timeSetting);
  const [wpm, setWpm] = useState(0);

  const testRef = useRef<TestMethods | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const restartButtonRef = useRef<HTMLButtonElement | null>(null);

  // Not sure whether it's a great idea to have a function like that here and in `Test.tsx` itself
  function handleKeyDown(e: globalThis.MouseEvent) {
    if (e.key === "Tab") {
      e.preventDefault();
      if (restartButtonRef && restartButtonRef.current) {
        restartButtonRef.current!.focus();
      }
    } else if (e.key.length === 1) {
      if (restartButtonRef && restartButtonRef.current) {
        restartButtonRef.current!.blur();
      }
    }
  }

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
    // gonna keep it in for now but i have this thought - couldn't i just force unmount Test and that would work as a reset?
    if (testRef && testRef.current) testRef.current!.reset();
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

  if (visible) {
    return (
      <div className={styles.box} ref={ref}>
        <section className={styles.top}>
          <section className={styles.left}>
            <Timer time={time} />
            <Counter count={wpm} />
          </section>
          {/* that should actually be called Language lol */}
          {/* HOW CAN I CENTER A DIV LOL */}
          <section className={styles.center}>
            <Mode>
              <HiMiniLanguage /> english
            </Mode>
          </section>
          <section className={styles.right}>
            <TimeSettingSelection
              timeSettings={[5, 15, 30]}
              currentTimeSetting={timeSetting}
              handleSelect={handleTimeSettingSelection}
            />
          </section>
        </section>
        <section className={styles.middle}>
          <Test
            focused={focused}
            running={running}
            finished={finished}
            time={time}
            timeSetting={timeSetting}
            handleChangeWpm={handleChangeWpm}
            handleStart={handleStart}
            onKeyDown={handleKeyDown}
            ref={testRef}
            onSaveScore={handleSaveScore}
          />
        </section>
        <section className={styles.bottom}>
          <RestartButton onReset={handleReset} ref={restartButtonRef} />
          <p>{focused ? "FOCUSED" : "UNFOCUSED"}</p>
        </section>
      </div>
    );
  }
}
