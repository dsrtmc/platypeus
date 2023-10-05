"use client";

import Link from "next/link";
import { LogoutButton } from "@/components/navbar/LogoutButton";
import { MeDocument } from "@/graphql/generated/graphql";
import styles from "./Navbar.module.css";
import { BsBarChartFill, BsInfoLg, BsKeyboardFill } from "react-icons/bs";
import { GiPuppet } from "react-icons/gi";
import { BiLogIn, BiLogOut, BiSolidUser, BiUser } from "react-icons/bi";
import { Suspense, useEffect, useState } from "react";
import { RightSideBox } from "@/components/navbar/RightSideBox";

export default function Navbar() {
  // const [test, setTest] = useState(false);
  // useEffect(() => {
  //   setTest(true);
  // }, []);
  return (
    <nav className={styles.navbar}>
      {/*<p>hitler {test && " is active"}</p>*/}
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
      {/*<RightSideBox />*/}
      {/*<div className={styles.box}>*/}
      {/*  {data?.me ? (*/}
      {/*    // logged in*/}
      {/*    <>*/}
      {/*      <Link href={`/user/${data.me.username}`} className={styles.icon}>*/}
      {/*        {data.me.username}*/}
      {/*        <BiSolidUser />*/}
      {/*      </Link>*/}
      {/*      /!* TODO: maybe just keep the logout here, no need for abstraction *!/*/}
      {/*      <LogoutButton />*/}
      {/*    </>*/}
      {/*  ) : (*/}
      {/*    // logged out*/}
      {/*    <>*/}
      {/*      <Link href={"/register"} className={styles.icon}>*/}
      {/*        register*/}
      {/*        <BiUser />*/}
      {/*      </Link>*/}
      {/*      <Link href={"/login"} className={styles.icon}>*/}
      {/*        <BiLogIn />*/}
      {/*      </Link>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</div>*/}
    </nav>
  );
}
