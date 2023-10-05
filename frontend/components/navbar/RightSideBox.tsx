"use client";

import styles from "@/components/navbar/Navbar.module.css";
import React, { useEffect, useState } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { MeDocument } from "@/graphql/generated/graphql";
import Link from "next/link";
import { BiLogIn, BiSolidUser, BiUser } from "react-icons/bi";
import { LogoutButton } from "@/components/navbar/LogoutButton";

interface Props {}

export const RightSideBox: React.FC<Props> = ({}) => {
  const { data } = useSuspenseQuery(MeDocument);
  console.log("Bruh:", data);
  // SO WHY DOES HYDRATION NOT FAIL IF I DO THIS HAHAHAHAHAHAH ?XD
  // const [data, setData] = useState<any>(null);
  // const test = fetch("https://api.kanye.rest/", { cache: "no-cache" })
  //   .then((x) => x.json())
  //   .then((x) => setData(x));
  return (
    <div className={styles.box}>
      <p style={{ color: "white" }}>{data?.me ? "user" : "not logged in"}</p>
      <button onClick={() => console.log(data)}>log data IM DOGE</button>
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
