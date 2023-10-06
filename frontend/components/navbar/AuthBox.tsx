"use client";

import styles from "@/components/navbar/Navbar.module.css";
import React, { useEffect, useState } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { MeDocument } from "@/graphql/generated/graphql";
import Link from "next/link";
import { BiLogIn, BiSolidUser, BiUser } from "react-icons/bi";
import { LogoutButton } from "@/components/navbar/LogoutButton";

interface Props {
  // make it a better type TODO
  initial: { __typename?: "User"; id: any; username: string } | null | undefined;
}

export const AuthBox: React.FC<Props> = ({ initial }) => {
  const { data } = useSuspenseQuery(MeDocument);
  const [user, setUser] = useState(data?.me ? data.me : initial);

  // not sure if that's correct but hey, it works :)
  useEffect(() => {
    if (data) setUser(data.me);
  }, [data]);

  return (
    <div className={styles.box}>
      {user ? (
        // logged in
        <>
          <Link href={`/user/${user.username}`} className={styles.icon}>
            {user.username}
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
  );
};
