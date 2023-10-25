import { HiHome } from "react-icons/hi";
import styles from "./NotFound.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles.group}>
      <div className={styles.top}>404</div>
      <div className={styles.middle}>Looks like your princess is in another castle!</div>
      <div className={styles.bottom}>
        <Link href={"/"}>
          <HiHome />
        </Link>
      </div>
    </div>
  );
}
