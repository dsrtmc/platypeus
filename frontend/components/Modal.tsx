import React, { PropsWithChildren, useEffect, useRef } from "react";
import styles from "@/components/Modal.module.css";
import { CSSTransition } from "react-transition-group";

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

  function handleKeyDown(e: globalThis.KeyboardEvent) {
    if (e.key === "Escape") handleHide();
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  useEffect(() => console.log("we just mounted"), []);

  return (
    <CSSTransition
      in={visible}
      timeout={100}
      unmountOnExit
      classNames={{
        enter: styles.overlayEnter,
        enterActive: styles.overlayEnterActive,
        exit: styles.overlayExit,
        exitActive: styles.overlayExitActive,
      }}
    >
      <div className={styles.overlay}>
        <div className={styles.content} ref={contentRef}>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};
