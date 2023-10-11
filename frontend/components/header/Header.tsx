import React from "react";
import { Logo } from "@/components/header/Logo";
import Navbar from "@/components/navbar/Navbar";
import styles from "@/components/header/Header.module.css";

interface Props {}

export const Header: React.FC<Props> = ({}) => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
    </header>
  );
};
