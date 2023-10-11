import React, { PropsWithChildren } from "react";
import Link from "next/link";
import styles from "@/components/navbar/Navbar.module.css";
import { IconType } from "react-icons";

interface Props {
  href: string;
  Icon: IconType;
  textPosition?: "left" | "right" | undefined;
}

export const NavLink: React.FC<Props> = ({ href, Icon, textPosition, children }: PropsWithChildren<Props>) => {
  return (
    <Link href={href} className={styles.item}>
      {textPosition === "left" && children}
      <Icon className={styles.icon} />
      {textPosition === "right" && children}
    </Link>
  );
};
