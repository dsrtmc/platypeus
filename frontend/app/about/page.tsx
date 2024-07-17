import React from "react";
import styles from "./About.module.css";
import { CgNotes } from "react-icons/cg";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

export const metadata = {
  title: "About",
};

interface Props {}

export default async function AboutPage() {
  return (
    <div className={styles.main}>
      <div className={styles.bigSection}>
        <div className={styles.bigSectionHeader}>
          <FiInfo style={{ fontSize: "2rem" }}/> about
        </div>
        <p className={styles.description}>Platypeus is a website where you can measure your typing speed. It offers a basic account and a scoreboard system, as well as some multiplayer racing capabilities. The default test uses the 200 most common English words as the wordlist.</p>
      </div>
      <div className={styles.smallSection}>
        <div className={styles.smallSectionHeader}>
          <CgNotes style={{fontSize: "1.2rem"}}/> tips & clarifications
        </div>
        <p>Every word list consists of the most common 200 words/phrases from the selected language.</p>
        <p>You can quickly restart the test by pressing{" "}
          <code className={styles.code}>tab</code>
          +
          <code className={styles.code}>enter</code>
          .
        </p>
        <p>WPM is calculated by getting the number of characters in correctly-spelled words and dividing them by 5 (a rounded average length of a word in English). Raw WPM accounts for every characters regardless of whether the word is correct.</p>
        <p>
          We are aware of certain bugs that are yet to be fixed, however if you feel like you encounter{" "}
          a bug we might not know about, you can simply let the developer know privately if you know them.{" "}
          Otherwise, you're invited to create a{" "}
          <a
            href="https://github.com/dsrtmc/platypeus/issues"
            className={styles.link}
            style={{textDecoration: "underline"}}
          >
            GitHub issue
          </a>
          .
        </p>
        <p>
          This project is largely inspired by{" "}
          <a href={"https://monkeytype.com"} className={styles.link}>monkeytype</a>{" "}
          as well as{" "}
          <a href={"https://play.typeracer.com"} className={styles.link}>typeracer</a>.{" "}
          While the former serves as a great inspiration due to its captivating design and general type-testing features,
          this rendition of Platypeus would not happen if not for typeracer's amazing multiplayer racing system.
          We encourage you to visit both websites and show them the love they deserve.
        </p>
      </div>
      <div className={styles.smallSection}>
        <div className={styles.smallSectionHeader}>
          <PiBracketsCurlyBold style={{fontSize: "1.2rem"}}/> links
        </div>
        <a href="https://github.com/dsrtmc/platypeus" className={styles.linkWithIcon}><FaGithub /> GitHub</a>
      </div>
      <footer className={styles.footer}>
        <a href="https://github.com/dsrtmc" className={styles.linkWithIcon}>by dsrtmc</a>
        </footer>
    </div>
  );
}
