import styles from "./NotFound.module.css";
import Link from "next/link";
import { TiHome } from "react-icons/ti";

export const metadata = {
  title: "not found :(",
};

export default function NotFound() {
  return (
    <div className={styles.group}>
      <div className={styles.top}>404</div>
      <div className={styles.middle}>looks like your princess is in another castle!</div>
      <div className={styles.bottom}>
        <Link href={"/"}>
          <TiHome />
        </Link>
      </div>
    </div>
  );
}
