"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import React, { PropsWithChildren } from "react";

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
  function customErrorSetter(error: ErrorType) {
    setError(error);
    setTimeout(() => setError(null), 3000);
  }
  return <ErrorContext.Provider value={{ error, setError: customErrorSetter }}>{children}</ErrorContext.Provider>;
};
