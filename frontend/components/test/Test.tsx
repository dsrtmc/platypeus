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
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Array<HTMLDivElement>>([]);
  const caretRef = useRef<HTMLDivElement | null>(null);
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
  function focusNext() {
    console.log("index:", index);
    let next = itemsRef.current?.[index];
    console.log("offset top:", next?.offsetTop);
    console.log("offset left:", next?.offsetLeft);
    console.log("caret left:", caretRef.current?.style.left);
    // why does it show up as invalid lhs assignment if it's not read only lol?
    caretRef.current?.style.left = `${next?.offsetLeft}px`;
    setIndex(index + 1);
  }
  function handleKeyPress(e: globalThis.KeyboardEvent) {
    if (active) {
      console.log("clicked when test is active");
      focusNext();
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
  }, [active, index]);
  return (
    <div style={{ display: "flex", gap: "1rem" }} ref={ref}>
      {words.map((word, index) => (
        <Word
          word={word}
          key={index}
          id={`word-${index}`}
          ref={(el: HTMLDivElement) => el && (itemsRef.current[index] = el)}
        />
        // might consider putting <Letter />s in word's children props
        // can't think of a good way to loop over them
        // ---
        // actually u could just loop over word's children from via javascript
        // by not putting it into children props i can ensure there's not going to be any non-letters in word
      ))}
      <p>{active ? "ACTIVE" : "INACTIVE"}</p>
      <Caret x={10} y={10} ref={(el: HTMLDivElement) => el && (caretRef.current = el)} />
    </div>
  );
}
