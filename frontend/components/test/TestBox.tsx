"use client";

import styles from "./Test.module.css";
import { Ref, useEffect, useRef, useState } from "react";
import { Test } from "@/components/test/Test";
import { Timer } from "@/components/test/Timer";
import { Counter } from "@/components/test/Counter";
import { RestartButton } from "@/components/test/RestartButton";
import { CreateScoreInput as CreateScoreInputType } from "@/graphql/generated/graphql";
import { generateWord } from "@/utils/generateWords";
import { generateRandomWords } from "@/utils/generateRandomWords";
import { WordProgress } from "@/components/test/WordProgress";
import { WORD_LISTS } from "@/utils/wordLists";
import { TestConfig } from "@/components/test/TestConfig";
import { CSSTransition } from "react-transition-group";
import { getConfig, setConfig } from "@/utils/configUtils";
import { TestLanguage, TestMode, ConfigType } from "@/shared/types/configTypes";
import { assertIsNode } from "@/utils/assertIsNode";
import { oneOf } from "prop-types";

interface Props {
  handleSaveScore: (score: CreateScoreInputType) => void;
}

export function TestBox({ handleSaveScore }: Props) {
  const [mounted, setMounted] = useState(true); // Used for triggering the animation on test reset
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [running, setRunning] = useState(false);
  const [language, setLanguage] = useState<TestLanguage>("english");
  const [mode, setMode] = useState<TestMode>("words");
  const [modeSetting, setModeSetting] = useState(0);
  const [testKey, setTestKey] = useState(0); // Useful for easy re-mounting
  const [testStartTime, setTestStartTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [initialContent, setInitialContent] = useState([""]);
  const [timePassed, setTimePassed] = useState(modeSetting);
  const [wpm, setWpm] = useState(0);
  const [showCaret, setShowCaret] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const testRef = useRef<HTMLDivElement | null>(null);
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
      if (!running) handleStart();
      if (restartButtonRef && restartButtonRef.current) {
        restartButtonRef.current!.blur();
      }
    }
  }

  function handleMouseUp(e: globalThis.MouseEvent) {
    assertIsNode(e.target);
    if (ref && ref.current) setFocused(ref.current!.contains(e.target));
  }

  function handleStart() {
    setTestStartTime(new Date().getTime());
    setRunning(true);
  }

  function handleSelectMode(mode: TestMode) {
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

  function handleSelectLanguage(language: TestLanguage) {
    const config = getConfig();
    if (config) {
      config.language = language;
      setConfig(config);
    }
    setLanguage(language);
  }

  function handleChangeWpm(wpm: number) {
    setWpm(wpm);
  }

  function initializePool(mode: TestMode, modeSetting: number, language: TestLanguage) {
    let count = mode === "words" ? modeSetting : 50;
    setInitialContent(generateRandomWords(WORD_LISTS[language], count));
  }

  function handleReset() {
    setMounted(true);
    setFocused(true);
    setFinished(false);
    setRunning(false);
    setTimePassed(0);
    setWpm(0);
    setWordCount(0);
    initializePool(mode, modeSetting, language);
    setTestKey((k) => k + 1); // Does a re-mount of `Test`, therefore causing a reset
  }

  /**
   * Returns the elements to be added to the word pool.
   * @param {string} count - The number of elements to add to the pool
   */
  function onPoolUpdate(count: number) {
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
    let newMode = mode;
    let newModeSetting = modeSetting;
    let newLanguage = language;

    const config = getConfig();
    if (config) {
      newMode = config.mode;
      newModeSetting = config[newMode];
      newLanguage = config.language;
      setMode(newMode);
      setModeSetting(newModeSetting);
      setLanguage(newLanguage);
    }

    initializePool(mode, modeSetting, language);
    setVisible(true);
  }, []);

  function handleTabPress(e: KeyboardEvent) {
    if (e.key === "Tab") {
      e.preventDefault();
      if (restartButtonRef.current) restartButtonRef.current!.focus();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleTabPress);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("keydown", handleTabPress);
      document.removeEventListener("mouseup", handleMouseUp);
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

  useEffect(() => {
    if (!finished) {
      /*
       * NOTE: this only runs if the initial loading of settings actually changes one of those dependencies.
       * it means that if those values in the config are equal to the initial values in this component, we will not call it.
       * to counteract that, we just make sure the initial values are bogus and incredibly unlikely to be a part of someone's config. :)
       * TODO: ↑ fix ↑
       */
      if (mounted) {
        setMounted(false);
      } else {
        handleReset();
      }
    }
  }, [mode, modeSetting, language]);

  if (!visible) return null;
  return (
    <CSSTransition
      nodeRef={ref as Ref<HTMLDivElement | undefined>}
      in={true}
      appear={true}
      timeout={300}
      classNames={{
        appear: styles.boxAppear,
        appearActive: styles.boxAppearActive,
        appearDone: styles.boxAppearDone,
      }}
    >
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
        <section className={styles.top}>
          <section className={styles.left}>
            {mode === "time" ? (
              <Timer time={modeSetting - timePassed} />
            ) : (
              <WordProgress count={wordCount} setting={modeSetting} />
            )}
            <Counter count={wpm} />
          </section>
        </section>
        <section className={styles.middle}>
          <CSSTransition
            nodeRef={testRef as Ref<HTMLDivElement | undefined>}
            in={mounted}
            timeout={150}
            classNames={{
              enter: styles.wordsEnter,
              enterActive: styles.wordsEnterActive,
              enterDone: styles.wordsEnterDone,
              exit: styles.wordsExit,
              exitActive: styles.wordsExitActive,
              exitDone: styles.wordsExitDone,
            }}
            onEnter={() => {
              setShowCaret(true);
            }}
            onExited={() => handleReset()}
          >
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
              preventInput={finished || !focused}
              onPoolUpdate={onPoolUpdate}
              handleFinish={handleFinish}
              handleChangeWpm={handleChangeWpm}
              handleSaveScore={handleSaveScore}
              setWordCount={setWordCount}
              initialContent={initialContent}
              innerRef={testRef}
              showCaret={showCaret}
              key={testKey}
            />
          </CSSTransition>
        </section>
        <section className={styles.bottom}>
          <RestartButton
            onReset={() => {
              setShowCaret(false);
              setMounted(false);
            }}
            ref={restartButtonRef}
          />
        </section>
      </div>
    </CSSTransition>
  );
}
