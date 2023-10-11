import React, { MouseEvent } from "react";
import { IconType } from "react-icons";
import styles from "@/components/navbar/Navbar.module.css";

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  Icon: IconType;
}

export const NavButton: React.FC<Props> = ({ onClick, Icon }) => {
  return (
    <button onClick={onClick} className={styles.item}>
      <Icon className={styles.icon} />
    </button>
  );
};
