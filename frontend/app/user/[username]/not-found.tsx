import styles from "@/app/[...not-found]/NotFound.module.css";
import Link from "next/link";
import { TiHome } from "react-icons/ti";

export default async function NotFound() {
  return (
    <div className={styles.group}>
      <div className={styles.top}>404</div>
      <div className={styles.middle}>
        <p>two things could have happened:</p>
        <ul>
          <li>a user with this username does not exist</li>
          <li style={{ textDecoration: "line-through" }}>or they've set their profile to private (one day!)</li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <Link href={"/"}>
          <TiHome />
        </Link>
      </div>
    </div>
  );
}
