import Image from "next/image";
import styles from "./page.module.css";
import { getClient } from "@/lib/client";
import { gql, useQuery } from "@apollo/client";
import { GetAllUsersDocument } from "@/graphql/generated/graphql";
import { getAccessToken } from "@/accessToken";
import { cookies } from "next/headers";

export default async function Home() {
  // const { data } = await getClient().query({ query: GetAllUsersDocument });
  //console.log("access token:", getAccessToken());
  //localStorage.setItem("token", "test");
  return (
    <main className={styles.main}>
      <div className={styles.description}>description</div>

      <div className={styles.center}>
        <p>center</p>
        <p>hello world</p>
        {/*<ul>*/}
        {/*  users:{" "}*/}
        {/*  {data.allUsers.map((user) => (*/}
        {/*    <li key={user.id}>*/}
        {/*      {user.username}: {user.email}*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
      </div>
    </main>
  );
}
