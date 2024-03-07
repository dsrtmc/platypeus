import styles from "@/app/[...not-found]/NotFound.module.css";
import Link from "next/link";
import { TiHome } from "react-icons/ti";

export default async function NotFound() {
  return (
    <div className={styles.group}>
      <div className={styles.top}>404</div>
      <div className={styles.middle}>it appears such a race does not exist.</div>
      <div className={styles.bottom}>
        <Link href={"/"}>
          <TiHome />
        </Link>
      </div>
    </div>
  );
}
