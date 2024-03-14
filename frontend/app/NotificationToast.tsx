"use client";

import React, { useContext, useRef } from "react";
import styles from "@/app/./Toast.module.css";
import { NotificationContext } from "@/app/NotificationProvider";
import { MdOutlineErrorOutline } from "react-icons/md";
import { BiInfoCircle } from "react-icons/bi";
import { CSSTransition } from "react-transition-group";

interface Props {}

export const NotificationToast: React.FC<Props> = ({}) => {
  const { notification } = useContext(NotificationContext)!;
  const ref = useRef<HTMLDivElement | null>(null);
  if (!notification?.message) return null;
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
      <div className={`${styles.toast} ${styles.notification}`} ref={ref}>
        <div className={styles.label}>
          <BiInfoCircle /> notification
        </div>
        <div className={styles.message}>{notification.message}</div>
      </div>
    </CSSTransition>
  );
};
