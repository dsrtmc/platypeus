import styles from "./page.module.css";
import { getClient } from "@/lib/client";
import { GetAllUsersDocument } from "@/graphql/generated/graphql";

export default async function Home() {
  const { data } = await getClient().query({ query: GetAllUsersDocument });
  return (
    <main className={styles.main}>
      <div className={styles.description}>description</div>

      <div className={styles.center}>
        <p>center</p>
        <p>hello world</p>
        <ul>
          users:{" "}
          {data.allUsers.map((user) => (
            <li key={user.id}>
              {user.username}: {user.email}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
