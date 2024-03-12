import React from "react";
import styles from "@/app/settings/Settings.module.css";
import { WrapperSizeChangeSection } from "@/app/settings/WrapperSizeChangeSection";

interface Props {}

export const WrapperConfigSection: React.FC<Props> = ({}) => {
  return (
    <div>
      <h1 className={styles.headerSmall}>wrapper</h1>
      <WrapperSizeChangeSection />
      hello you can customzie the wrapper<code>here</code>
    </div>
  );
};
