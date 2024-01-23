"use client";

import styles from "./Test.module.css";
import { useEffect, useRef, useState } from "react";
import { Test, TestMethods } from "@/components/test/Test";
import { Timer } from "@/components/test/Timer";
import { ModeSettingSelection } from "@/components/test/ModeSettingSelection";
import { Counter } from "@/components/test/Counter";
import { RestartButton } from "@/components/test/RestartButton";
import { Score as ScoreType } from "@/graphql/generated/graphql";
import { HiMiniLanguage } from "react-icons/hi2";
import { generateWord } from "@/utils/generateWords";
import { generateRandomWords } from "@/utils/generateRandomWords";
import { ModeSelection } from "@/components/test/ModeSelection";
import { LanguageSelection } from "@/components/test/LanguageSelection";

interface Props {
  handleSaveScore: (score: ScoreType) => void;
}

export function TestBox({ handleSaveScore }: Props) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [testStartTime, setTestStartTime] = useState(0);
  const [mode, setMode] = useState<string>("words");
  const [testKey, setTestKey] = useState(0); // useful for easy re-mounting
  const [modeSetting, setModeSetting] = useState(50);
  const [initialContent, setInitialContent] = useState([""]);
  // TODO: add `test start time` or something so we can measure the timePassed
  const [timePassed, setTimePassed] = useState(modeSetting);
  const [wpm, setWpm] = useState(0);

  const testRef = useRef<TestMethods | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const restartButtonRef = useRef<HTMLButtonElement | null>(null);

  // Not sure whether it's a great idea to have a function like that here and in `Test.tsx` itself
  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (e.key === "Tab") {
      e.preventDefault();
      if (restartButtonRef && restartButtonRef.current) {
        restartButtonRef.current!.focus();
      }
    } else if (e.key.length === 1) {
      if (finished || !focused) return 1;
      if (!running) handleStart();
      if (restartButtonRef && restartButtonRef.current) {
        restartButtonRef.current!.blur();
      }
    }
    return 0;
  }

  function handleClick(e: globalThis.MouseEvent) {
    if (ref && ref.current) setFocused(ref.current!.contains(e.target));
  }

  function handleStart() {
    setTestStartTime(new Date().getTime());
    setRunning(true);
  }

  function handleSelectModeSetting(setting: number) {
    return () => {
      setModeSetting(setting);
    };
  }

  function handleChangeWpm(wpm: number) {
    setWpm(wpm);
  }

  function handleReset() {
    setFocused(true);
    setFinished(false);
    setRunning(false);
    setTimePassed(0); // TODO: 0/25 words instead of timer
    setWpm(0);
    setWordCount(0);
    // TODO: fix code duplication
    switch (mode) {
      case "words":
        setInitialContent(generateRandomWords(modeSetting));
        break;
      case "time":
        setInitialContent(generateRandomWords(modeSetting * 7));
        break;
    }
    setTestKey((k) => k + 1);
    // gonna keep it in for now but i have this thought - couldn't i just force unmount Test and that would work as a reset?
    // if (testRef && testRef.current) testRef.current!.reset();
  }
  const [disableTest, setDisableTest] = useState(false);

  // TODO: sit down one day and think about those useEffect()s, some of them here and in `Test.tsx` are likely to be unnecessary.
  useEffect(() => {
    setVisible(true);
    switch (mode) {
      case "words":
        setInitialContent(generateRandomWords(modeSetting));
        break;
      case "time":
        setInitialContent(generateRandomWords(modeSetting * 7));
        break;
    }
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
        const duration = Math.round((new Date().getTime() - testStartTime) / 1000);
        setTimePassed(duration);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function handleFinish() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setRunning(false);
    setFinished(true);
  }

  // useEffect(() => {
  //   if (time <= 0) {
  //     // TODO: handleFinish();
  //     handleFinish();
  //   }
  // }, [time]);

  useEffect(() => {
    if (!running && !finished) {
      handleReset();
    }
  }, [mode, modeSetting]);

  /**
   * Returns the elements to be added to the word pool.
   * @param {string} count - The number of elements to add to the pool
   */
  // TODO: also make it better
  function onPoolUpdate(count: number) {
    const words: string[] = [];
    if (mode === "time") {
      for (let i = 0; i < count; i++) {
        words.push(generateWord());
      }
    }
    return words;
  }

  // TODO: save selected modeSettings to localStorage?
  function handleSelectMode(mode: string) {
    setMode(mode);
  }
  const [wordCount, setWordCount] = useState(0);

  if (visible) {
    return (
      <div className={styles.box} ref={ref}>
        <button onClick={() => console.log(modeSetting)}>log current mode setting</button>
        <button onClick={() => handleReset()}>"Reset" test</button>
        <button onClick={() => setDisableTest(!disableTest)}>disable/enable test</button>
        <section>
          Current mode: {mode}
          <ModeSelection handleSelectMode={handleSelectMode} />
        </section>
        <section className={styles.top}>
          <section className={styles.left}>
            {/* TODO: make it so that it shows e.g. `3/25` words */}
            {/* TODO: FIx because now it shows time passed rather than time left */}
            {mode === "time" ? <Timer time={modeSetting - timePassed} /> : `${wordCount}/${modeSetting}`}
            <Counter count={wpm} />
          </section>
          {/* HOW CAN I CENTER A DIV LOL */}
          <section className={styles.center}>
            {/* that should actually be called Language lol */}
            {/* TODO ???????? XD wtf is this name */}
            <LanguageSelection>
              <HiMiniLanguage /> english
            </LanguageSelection>
          </section>
          <section className={styles.right}>
            <ModeSettingSelection mode={mode} selectedSetting={modeSetting} handleSelect={handleSelectModeSetting} />
          </section>
        </section>
        <section className={styles.middle}>
          {!disableTest && (
            <Test
              focused={focused}
              running={running}
              finished={finished}
              timePassed={timePassed}
              handleFinish={handleFinish}
              mode={mode}
              modeSetting={modeSetting}
              startTime={testStartTime}
              setWordCount={setWordCount}
              handleChangeWpm={handleChangeWpm}
              onKeyDown={handleKeyDown}
              ref={testRef}
              handleSaveScore={handleSaveScore}
              initialContent={initialContent}
              onPoolUpdate={onPoolUpdate}
              key={testKey}
            />
          )}
        </section>
        <section className={styles.bottom}>
          <RestartButton onReset={handleReset} ref={restartButtonRef} />
          <p>{focused ? "FOCUSED" : "UNFOCUSED"}</p>
        </section>
      </div>
    );
  }
}
