import React, { PropsWithChildren } from "react";
import Link from "next/link";
import styles from "@/components/navbar/Navbar.module.css";
import { IconType } from "react-icons";

interface Props {
  href: string;
  Icon: IconType;
  iconSize: string;
  textPosition?: "left" | "right" | undefined;
}

export const NavLink: React.FC<PropsWithChildren<Props>> = ({ href, Icon, iconSize, textPosition, children }) => {
  return (
    <Link href={href} className={styles.item}>
      {textPosition === "left" && children}
      <Icon className={styles.icon} style={{ fontSize: iconSize }} />
      {textPosition === "right" && children}
    </Link>
  );
};
