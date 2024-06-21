"use client";

import React from "react";
import styles from "@/app/settings/Settings.module.css";
import { WrapperSizeChangeSection } from "@/app/settings/WrapperSizeChangeSection";

interface Props {}

export const WrapperConfigSection: React.FC<Props> = ({}) => {
  return (
    <div className={styles.generalConfigSection}>
      <h1 className={styles.headerSmall}>wrapper</h1>
      <WrapperSizeChangeSection />
    </div>
  );
};
