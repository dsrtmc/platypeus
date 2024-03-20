"use client";

import { createContext, Dispatch, SetStateAction, useRef, useState } from "react";
import React, { PropsWithChildren } from "react";
import { NotificationType } from "@/app/NotificationProvider";

interface Props {}

export type ErrorType = {
  code: string;
  message: string;
} | null;

type ErrorContextType = {
  error: ErrorType;
  setError: (error: ErrorType) => void;
};

export const ErrorContext = createContext<ErrorContextType | null>(null);

export const ErrorProvider: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [error, setError] = useState<ErrorType>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  function customErrorSetter(error: ErrorType) {
    setError(error);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setError(null), 3000);
  }
  return <ErrorContext.Provider value={{ error, setError: customErrorSetter }}>{children}</ErrorContext.Provider>;
};
