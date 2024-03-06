"use client";

import React from "react";
import { FontSelection } from "@/app/settings/FontSelection";
import { FontSizeChangeSection } from "@/app/settings/FontSizeChangeSection";
import styles from "./Settings.module.css";

interface Props {}

export const FontConfigSection: React.FC<Props> = ({}) => {
  return (
    <div className={styles.fontChangeSection}>
      <h1 className={styles.headerSmall}>font</h1>
      <FontSelection />
      <FontSizeChangeSection />
    </div>
  );
};
