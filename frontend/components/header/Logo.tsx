import React from "react";
import Link from "next/link";
import styles from "@/components/header/Header.module.css";
import Image from "next/image";
import LogoSVG from "@/public/logoSVG";

interface Props {}

export const Logo: React.FC<Props> = ({}) => {
  return (
    <Link href={"/"} className={styles.logo}>
      <div className={styles.group}>
        <div className={styles.big}>platypeus</div>
      </div>
      <div className={styles.group}>
        <div className={styles.sub}>also try monkeytype!</div>
      </div>
    </Link>
  );
};
