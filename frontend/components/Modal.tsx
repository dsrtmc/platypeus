import React, { PropsWithChildren, useEffect, useRef } from "react";
import styles from "@/components/Modal.module.css";
import { CSSTransition } from "react-transition-group";
import { assertIsNode } from "@/utils/assertIsNode";

interface Props {
  visible: boolean;
  handleHide: () => void;
}

export const Modal: React.FC<PropsWithChildren<Props>> = ({ visible, handleHide, children }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  function handleMouseUp(e: globalThis.MouseEvent) {
    assertIsNode(e.target);
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
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

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
