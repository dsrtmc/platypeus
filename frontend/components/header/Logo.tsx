import React from "react";
import Link from "next/link";
import styles from "@/components/header/Header.module.css";

interface Props {}

export const Logo: React.FC<Props> = ({}) => {
  return (
    <Link href={"/"} className={styles.logo}>
      platypeus
    </Link>
  );
};