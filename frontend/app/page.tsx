import Image from "next/image";
import styles from "./page.module.css";
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

const query = gql`
  query GetAllUsers {
    allUsers {
      username
      email
    }
  }
`;

export default async function Home() {
  const { data } = await getClient().query({ query });
  console.log(data);
  return (
    <main className={styles.main}>
      <div className={styles.description}>description</div>

      <div className={styles.center}>
        <p>center</p>
        <p>hello world</p>
        <p>
          users:{" "}
          {data.allUsers.map((user) => (
            <code>{user.username}, </code>
          ))}
        </p>
      </div>
    </main>
  );
}
