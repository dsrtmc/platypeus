"use client";

import styles from "@/components/navbar/Navbar.module.css";
import React from "react";
import { useSuspenseQuery } from "@apollo/client";
import { MeDocument } from "@/graphql/generated/graphql";
import Link from "next/link";
import { BiLogIn, BiSolidUser, BiUser } from "react-icons/bi";
import { LogoutButton } from "@/components/navbar/LogoutButton";

interface Props {}

export const RightSideBox: React.FC<Props> = ({}) => {
  const { data } = useSuspenseQuery(MeDocument);
  console.log("Data:", data);
  return (
    <div className={styles.box}>
      <p style={{ color: "white" }}>{data?.me ? "user" : "not logged in"}</p>
      {/*{data?.me ? (*/}
      {/*  // logged in*/}
      {/*  <>*/}
      {/*    <Link href={`/user/${data.me.username}`} className={styles.icon}>*/}
      {/*      {data.me.username}*/}
      {/*      <BiSolidUser />*/}
      {/*    </Link>*/}
      {/*    /!* TODO: maybe just keep the logout here, no need for abstraction *!/*/}
      {/*    <LogoutButton />*/}
      {/*  </>*/}
      {/*) : (*/}
      {/*  // logged out*/}
      {/*  <>*/}
      {/*    <Link href={"/register"} className={styles.icon}>*/}
      {/*      register*/}
      {/*      <BiUser />*/}
      {/*    </Link>*/}
      {/*    <Link href={"/login"} className={styles.icon}>*/}
      {/*      <BiLogIn />*/}
      {/*    </Link>*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
};
