import { ErrorToast } from "@/app/ErrorToast";
import { NotificationToast } from "@/app/NotificationToast";
import styles from "./Toast.module.css";

interface Props {}

const width = "200px";

export function Toasts({}: Props) {
  return (
    <div className={styles.toasts}>
      <ErrorToast />
      <NotificationToast />
    </div>
  );
}
