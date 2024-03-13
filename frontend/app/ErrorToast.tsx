"use client";

import React, { useContext } from "react";
import { ErrorContext, ErrorType } from "@/app/ErrorProvider";
import styles from "@/app/./Toast.module.css";

interface Props {}

export const ErrorToast: React.FC<Props> = ({}) => {
  const { error } = useContext(ErrorContext)!;
  if (!error?.message) return null;
  return <div className={`${styles.toast} ${styles.error}`}>error: {error.message}</div>;
};
