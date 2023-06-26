"use client";

import { Word } from "@/components/test/Word";
import { useCallback, useEffect, useRef, useState } from "react";
import { Caret } from "@/components/test/Caret";

export function Test() {
  const words: string[] = [
    "after",
    "how",
    "thing",
    "right",
    "against",
    "of",
    "both",
    "day",
    "those",
    "most",
    "what",
    "give",
    "present",
    "under",
  ];
  const [active, setActive] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  function handleClick(e: globalThis.MouseEvent) {
    // uncomment when debugging not that useful
    // setActive(ref.current?.contains(e.target));
    if (ref.current?.contains(e.target)) {
      setActive(true);
      console.log("active");
    } else {
      setActive(false);
      console.log("not active");
    }
  }
  function handleKeyPress(e: globalThis.KeyboardEvent) {
    if (active) {
      console.log("clicked when test is active");
    } else {
      console.log("clicked when test is not active");
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [active]);
  return (
    <div style={{ display: "flex", gap: "1rem" }} ref={ref}>
      {words.map((word, index) => (
        <Word word={word} key={index} />
      ))}
      <p>{active ? "ACTIVE" : "INACTIVE"}</p>
      <Caret x={10} y={10} />
    </div>
  );
}
