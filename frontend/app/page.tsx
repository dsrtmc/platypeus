import styles from "./page.module.css";
import { MainBox } from "@/components/test/MainBox";

export default async function HomePage() {
  return (
    <main className={styles.main}>
      <MainBox />
    </main>
  );
}
