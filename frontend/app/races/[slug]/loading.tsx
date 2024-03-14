import styles from "./Race.module.css";
import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <div className={styles.box}>
      <div className={styles.loadingWrapper}>
        <CgSpinner className={styles.spinner} />
      </div>
    </div>
  );
}
