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
import { WordProgress } from "@/components/test/WordProgress";
import { WORD_LISTS } from "@/utils/wordLists";
import { TestComponent } from "@/app/about/TestComponent";
import { TestConfig } from "@/components/test/TestConfig";
import { CSSTransition } from "react-transition-group";
import { ConfigType } from "@/shared/types/configTypes";
import { setConfig, getConfig } from "@/utils/getConfig";

interface Props {
  handleSaveScore: (score: ScoreType) => void;
}

export function TestBox({ handleSaveScore }: Props) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [language, setLanguage] = useState("english");
  const [mode, setMode] = useState("words");
  const [modeSetting, setModeSetting] = useState(50);
  const [testKey, setTestKey] = useState(0); // Useful for easy re-mounting
  const [testStartTime, setTestStartTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [initialContent, setInitialContent] = useState([""]);
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

  // TODO: save selected modeSettings to localStorage config
  function handleSelectMode(mode: string) {
    const config = getConfig();
    if (config && config[mode]) {
      setModeSetting(config[mode]);
      config.mode = mode;
      setConfig(config);
    }
    setMode(mode);
  }

  function handleSelectModeSetting(setting: number) {
    return () => {
      let config = getConfig();
      if (config) {
        config[mode] = setting;
        setConfig(config);
        console.log("The config we are setting:", config);
      }
      setModeSetting(setting);
    };
  }

  function handleSelectLanguage(language: string) {
    setLanguage(language);
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
    // TODO: maybe make that better somehow heh xd
    switch (mode) {
      case "words":
        setInitialContent(generateRandomWords(WORD_LISTS[language], modeSetting));
        break;
      case "time":
        setInitialContent(generateRandomWords(WORD_LISTS[language], modeSetting * 7));
        break;
    }
    setTestKey((k) => k + 1); // Does a re-mount of `Test`, therefore causing a reset
  }

  /**
   * Returns the elements to be added to the word pool.
   * @param {string} count - The number of elements to add to the pool
   */
  function onPoolUpdate(count: number) {
    // TODO: make it better
    const words: string[] = [];
    if (mode === "time") {
      for (let i = 0; i < count; i++) {
        words.push(generateWord(WORD_LISTS[language]));
      }
    }
    return words;
  }

  function handleFinish() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setRunning(false);
    setFinished(true);
  }

  // TODO: sit down one day and think about those useEffect()s, some of them here and in `Test.tsx` are likely to be unnecessary.
  useEffect(() => {
    setVisible(true);
    const config = getConfig();
    // TODO: fix this funny code lol
    let _mode = mode;
    let _modeSetting = modeSetting;
    if (config) {
      _mode = config.mode;
      setMode(_mode);
      _modeSetting = config[_mode];
      setModeSetting(_modeSetting);
    }
    console.log("we are loading mode:", _mode, "with setting:", _modeSetting);
    // TODO: Code duplication, could probably have a function `initializePool` or something alike
    switch (_mode) {
      case "words":
        setInitialContent(generateRandomWords(WORD_LISTS[language], _modeSetting));
        break;
      case "time":
        setInitialContent(generateRandomWords(WORD_LISTS[language], _modeSetting * 7));
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
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

  useEffect(() => {
    // TODO: THINK -> not sure if that condition is necessary
    if (!finished) {
      handleReset();
    }
  }, [mode, modeSetting, language]);

  if (visible) {
    return (
      <div className={styles.box} ref={ref}>
        <section>
          <TestConfig
            language={language}
            mode={mode}
            modeSetting={modeSetting}
            handleSelectMode={handleSelectMode}
            handleSelectLanguage={handleSelectLanguage}
            handleSelectModeSetting={handleSelectModeSetting}
          />
        </section>
        {/*<section>*/}
        {/*  Current mode: {mode}*/}
        {/*  <ModeSelection handleSelectMode={handleSelectMode} />*/}
        {/*</section>*/}
        {/*selected language: {language}*/}
        <section className={styles.top}>
          <section className={styles.left}>
            {/* TODO: Is there a better way to handle checking the mode? */}
            {mode === "time" ? (
              <Timer time={modeSetting - timePassed} />
            ) : (
              <WordProgress count={wordCount} setting={modeSetting} />
            )}
            <Counter count={wpm} />
          </section>
          {/* HOW CAN I CENTER A DIV LOL */}
          {/*<section className={styles.center}>*/}
          {/*  <LanguageSelection selectedLanguage={language} handleSelectLanguage={handleSelectLanguage} />*/}
          {/*</section>*/}
          {/*<section className={styles.right}>*/}
          {/*  <ModeSettingSelection mode={mode} selectedSetting={modeSetting} handleSelect={handleSelectModeSetting} />*/}
          {/*</section>*/}
        </section>
        <section className={styles.middle}>
          <Test
            focused={focused}
            running={running}
            finished={finished}
            timePassed={timePassed}
            modeSetting={modeSetting}
            startTime={testStartTime}
            mode={mode}
            language={language}
            onKeyDown={handleKeyDown}
            onPoolUpdate={onPoolUpdate}
            handleFinish={handleFinish}
            handleChangeWpm={handleChangeWpm}
            handleSaveScore={handleSaveScore}
            setWordCount={setWordCount}
            initialContent={initialContent}
            ref={testRef}
            key={testKey}
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
