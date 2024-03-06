"use client";

import React, { useEffect, useState } from "react";
import { availableFonts } from "@/shared/constants/fonts";
import { FontSelectionItem } from "@/app/settings/FontSelectionItem";
import { FontSelection } from "@/app/settings/FontSelection";
import { FontSizeChangeSection } from "@/app/settings/FontSizeChangeSection";
import styles from "./Settings.module.css";

interface Props {}

export const FontChangeSection: React.FC<Props> = ({}) => {
  return (
    <div className={styles.fontChangeSection}>
      <FontSelection />
      <FontSizeChangeSection />
    </div>
  );
};
