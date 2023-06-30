"use client";

import styles from "./Test.module.css";
import { useEffect, useRef, useState } from "react";
import { Test } from "@/components/test/Test";

export function TestBox() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(true);

  function handleClick(e: globalThis.MouseEvent) {
    setActive(ref.current?.contains(e.target));
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <div className={styles.box} ref={ref}>
      <Test active={active} />
      <p>{active ? "ACTIVE" : "INACTIVE"}</p>
    </div>
  );
}
