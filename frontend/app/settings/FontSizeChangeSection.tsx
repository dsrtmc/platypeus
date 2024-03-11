import React from "react";
import styles from "./Settings.module.css";
import { GlobalFontSizeChangeSection } from "@/app/settings/GlobalFontSizeChangeSection";
import { TestFontSizeChangeSection } from "@/app/settings/TestFontSizeChangeSection";

interface Props {}

export const FontSizeChangeSection: React.FC<Props> = ({}) => {
  return (
    <div className={styles.fontSizeChangeSection}>
      <GlobalFontSizeChangeSection />
      <TestFontSizeChangeSection />
    </div>
  );
};
