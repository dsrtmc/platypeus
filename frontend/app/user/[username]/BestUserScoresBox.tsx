"use client";

import React, { Suspense, useEffect, useState } from "react";
import { getClient } from "@/lib/client";
import {
  UserPage_GetUserQuery,
  UserPage_GetUsersBestScoresDocument,
  UserPage_GetUsersBestScoresQueryVariables,
} from "@/graphql/generated/graphql";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { BestUserScoreCard } from "@/app/user/[username]/BestUserScoreCard";
import styles from "./User.module.css";
import { SelectModeButton } from "@/app/user/[username]/SelectModeButton";

interface Props {
  user: NonNullable<UserPage_GetUserQuery["user"]>;
}

const initialSettings = {
  mode: "time",
  modeSettings: [5, 15, 30, 60],
};

export function BestUserScoresBox({ user }: Props) {
  const [mode, setMode] = useState(initialSettings.mode);
  const [modeSettings, setModeSettings] = useState(initialSettings.modeSettings);
  const { data } = useSuspenseQuery(UserPage_GetUsersBestScoresDocument, {
    variables: {
      userId: user.id,
      mode,
      modeSettings,
    },
  });
  if (!data?.usersBestScores) return <div>no data sorry :p</div>;
  function handleSelectMode(mode: string) {
    return () => {
      switch (mode) {
        case "time":
          setModeSettings([5, 15, 30, 60]);
          break;
        case "words":
          setModeSettings([10, 25, 50, 100]);
          break;
      }
      setMode(mode);
    };
  }
  return (
    <div className={styles.bestUserScoresBoxWrapper}>
      <label className={styles.label}>{user.username}'s best scores</label>
      <div className={styles.bestUserScoresBox}>
        <Suspense>
          {modeSettings.map((modeSetting) => (
            <BestUserScoreCard
              score={data!.usersBestScores!.find((score) => score?.modeSetting === modeSetting && score.mode === mode)}
              mode={mode}
              modeSetting={modeSetting}
              key={modeSetting}
            />
          ))}
        </Suspense>
      </div>
      <div className={styles.selectModeButtons}>
        <SelectModeButton selected={mode === "time"} handleSelectMode={handleSelectMode("time")}>
          time
        </SelectModeButton>
        <SelectModeButton selected={mode === "words"} handleSelectMode={handleSelectMode("words")}>
          words
        </SelectModeButton>
      </div>
    </div>
  );
}
