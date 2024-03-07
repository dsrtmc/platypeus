import React from "react";
import styles from "@/app/races/Races.module.css";

interface Props {}

export const RaceListEmptyMessage: React.FC<Props> = ({}) => {
  return (
    <tr>
      <td colSpan={"100%" as any}>
        <div className={styles.empty}>uh oh, looks like there are no open lobbies right now!</div>
      </td>
    </tr>
  );
};
