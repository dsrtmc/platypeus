"use client";

import { createContext, Dispatch, SetStateAction, useRef, useState } from "react";
import React, { PropsWithChildren } from "react";
import { CgUserRemove } from "react-icons/cg";

interface Props {}

export type NotificationType = {
  message: string;
} | null;

type NotificationContextType = {
  notification: NotificationType;
  setNotification: (error: NotificationType) => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationType>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  function customNotificationSetter(notification: NotificationType) {
    setNotification(notification);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setNotification(null), 3000);
  }
  return (
    <NotificationContext.Provider value={{ notification, setNotification: customNotificationSetter }}>
      {children}
    </NotificationContext.Provider>
  );
};
