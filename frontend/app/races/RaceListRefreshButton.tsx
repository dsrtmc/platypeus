import React, { MouseEvent, useState } from "react";
import styles from "@/app/races/Races.module.css";
import { VscDebugRestart } from "react-icons/vsc";

interface Props {
  handleRefetch: (e?: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const RaceListRefreshButton: React.FC<Props> = ({ handleRefetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  async function onRefetch() {
    setDisabled(true);
    setRefreshing(true);
    await handleRefetch();
    setRefreshing(false);
    setTimeout(() => setDisabled(false), 2000);
  }
  return (
    <button onClick={onRefetch} disabled={disabled} className={styles.refreshListButton}>
      {refreshing ? <VscDebugRestart /> : "refresh list"}
    </button>
  );
};
