import React, { MouseEvent } from "react";
import { IconType } from "react-icons";
import styles from "@/components/navbar/Navbar.module.css";

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  Icon: IconType;
  iconSize: string;
}

export const NavButton: React.FC<Props> = ({ onClick, iconSize, Icon }) => {
  return (
    <button onClick={onClick} className={styles.item}>
      <Icon className={styles.icon} style={{ fontSize: iconSize }} />
    </button>
  );
};
