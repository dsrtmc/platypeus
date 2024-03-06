"use client";

import React, { ReducerState, useEffect, useReducer } from "react";
import { PropertyEditor } from "@/app/settings/PropertyEditor";
import { THEMES, ThemeType } from "@/shared/constants/themes";
import styles from "./Settings.module.css";
import { ThemeButton } from "@/app/settings/ThemeButton";
import { FontChangeSection } from "@/app/settings/FontChangeSection";
import { PropertyList } from "@/app/settings/PropertyList";
import { ThemeList } from "@/app/settings/ThemeList";

interface Props {}

export default function SettingsPage() {
  return (
    <div className={styles.main}>
      <h1 className={styles.header}>appearance</h1>
      <PropertyList />
      <ThemeList />
      <FontChangeSection />
    </div>
  );
}
