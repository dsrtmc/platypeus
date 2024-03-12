"use client";

import styles from "./Settings.module.css";
import { ThemeConfigSection } from "@/app/settings/ThemeConfigSection";
import { FontConfigSection } from "@/app/settings/FontConfigSection";
import { WrapperConfigSection } from "@/app/settings/WrapperConfigSection";

interface Props {}

export default function SettingsPage() {
  return (
    <div className={styles.main}>
      <h1 className={styles.header}>appearance</h1>
      <ThemeConfigSection />
      <FontConfigSection />
      <WrapperConfigSection />
    </div>
  );
}
