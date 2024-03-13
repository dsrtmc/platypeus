"use client";

import React, { useContext } from "react";
import styles from "@/app/./Toast.module.css";
import { NotificationContext } from "@/app/NotificationProvider";

interface Props {}

export const NotificationToast: React.FC<Props> = ({}) => {
  const { notification } = useContext(NotificationContext)!;
  if (!notification?.message) return null;
  return <div className={`${styles.toast} ${styles.notification}`}>notification: {notification.message}</div>;
};
