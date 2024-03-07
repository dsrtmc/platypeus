"use client";

import { useEffect } from "react";
import styles from "@/app/Error.module.css";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.main}>
      <h1 className={styles.header}>oops! something went wrong!</h1>
      <div className={styles.sub}>check the console for more details...</div>
      <button className={styles.button} onClick={() => reset()}>
        try again
      </button>
    </div>
  );
}
