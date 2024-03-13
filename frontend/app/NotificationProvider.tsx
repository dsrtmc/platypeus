"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import React, { PropsWithChildren } from "react";

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
  function customNotificationSetter(notification: NotificationType) {
    console.log("Hitler!:", notification);
    setNotification(notification);
    setTimeout(() => setNotification(null), 3000);
  }
  return (
    <NotificationContext.Provider value={{ notification, setNotification: customNotificationSetter }}>
      {children}
    </NotificationContext.Provider>
  );
};
