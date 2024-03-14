"use client";

import React, { Ref, useContext, useRef } from "react";
import { ErrorContext, ErrorType } from "@/app/ErrorProvider";
import styles from "@/app/./Toast.module.css";
import { MdOutlineError, MdOutlineErrorOutline } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

interface Props {}

export const ErrorToast: React.FC<Props> = ({}) => {
  const { error } = useContext(ErrorContext)!;
  const ref = useRef<HTMLDivElement | null>(null);
  if (!error?.message) return null;
  return (
    <CSSTransition
      nodeRef={ref}
      in={true}
      appear={true}
      timeout={200}
      classNames={{
        appear: styles.toastAppear,
        appearActive: styles.toastAppearActive,
        appearDone: styles.toastAppearDone,
      }}
    >
      <div className={`${styles.toast} ${styles.error}`} ref={ref}>
        <div className={styles.label}>
          <MdOutlineErrorOutline /> error
        </div>
        <div className={styles.message}>{error.message}</div>
      </div>
    </CSSTransition>
  );
};
