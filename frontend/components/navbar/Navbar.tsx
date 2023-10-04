"use client";

import Link from "next/link";
import { LogoutButton } from "@/components/navbar/LogoutButton";
import { MeDocument } from "@/graphql/generated/graphql";
import styles from "./Navbar.module.css";
import { useSuspenseQuery_experimental } from "@apollo/client";
import { BsBarChartFill, BsInfoLg, BsKeyboardFill } from "react-icons/bs";
import { GiPuppet } from "react-icons/gi";
import { BiLogIn, BiLogOut, BiSolidUser, BiUser } from "react-icons/bi";

export default function Navbar() {
  const { data, loading, error } = useSuspenseQuery_experimental(MeDocument);

  return (
    <nav className={styles.navbar}>
      <div className={styles.box}>
        <Link href={"/"} className={styles.icon}>
          <GiPuppet />
        </Link>
        <Link href={"/"} className={styles.icon}>
          <BsKeyboardFill />
        </Link>
        <Link href={"/leaderboards"} className={styles.icon}>
          <BsBarChartFill />
        </Link>
        <Link href={"/about"} className={styles.icon}>
          <BsInfoLg />
        </Link>
        <Link href={"/bye"} className={styles.icon}>
          Bye
        </Link>
      </div>
      <div className={styles.spacer}></div>
      {/* TODO: fix xd Suspense? */}
      {/* TODO: make styling better */}
      <div className={styles.box}>
        {!loading && data?.me ? (
          <>
            <Link href={`/user/${data.me.username}`} className={styles.icon}>
              {data.me.username}
              <BiSolidUser />
            </Link>
            {/* TODO: maybe just keep the logout here, no need for abstraction */}
            <LogoutButton />
          </>
        ) : (
          // logged out
          <>
            <Link href={"/register"} className={styles.icon}>
              register
              <BiUser />
            </Link>
            <Link href={"/login"} className={styles.icon}>
              <BiLogIn />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
