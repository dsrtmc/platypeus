import styles from "./page.module.css";
import { getClient } from "@/lib/client";
import { GetAllUsersDocument } from "@/graphql/generated/graphql";
import { TestBox } from "@/components/test/TestBox";

export default async function Home() {
  const { data } = await getClient().query({ query: GetAllUsersDocument });
  return (
    <main className={styles.main}>
      <TestBox />
    </main>
  );
}
