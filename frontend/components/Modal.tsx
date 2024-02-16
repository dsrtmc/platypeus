import React, { PropsWithChildren, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

interface Props {
  visible: boolean;
  handleHide: () => void;
}

// TODO: I guess move it somewhere else so it's more fitting to its reusable properties
export const Modal: React.FC<PropsWithChildren<Props>> = ({ visible, handleHide, children }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  function handleClick(e: globalThis.MouseEvent) {
    if (!contentRef || !contentRef.current || !visible) return;
    if (!contentRef.current!.contains(e.target)) {
      console.log("We clicked outside");
      handleHide();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [visible]);

  if (visible) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content} ref={contentRef}>
          {children}
        </div>
      </div>
    );
  }
};
