"use client";

import styles from "./Test.module.css";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { TestHorizontal } from "@/components/test/TestHorizontal";

// it might actually be really useless idk
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
      <p>{active ? "ACTIVE" : "INACTIVE"}</p>
      <TestHorizontal active={active} />
    </div>
  );
}
