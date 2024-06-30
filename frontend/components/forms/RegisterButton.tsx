import React from "react";
import styles from "@/components/forms/Form.module.css";
import { BiLogIn } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";

interface Props {
  disabled: boolean;
  isSubmitting: boolean;
}

export const RegisterButton: React.FC<Props> = ({ disabled, isSubmitting }) => {
  return (
    <button type={"submit"} disabled={disabled} className={styles.button}>
      {isSubmitting ? (
        <CgSpinner className={styles.spinner} />
      ) : (
        <>
          <BiLogIn /> register
        </>
      )}
    </button>
  );
};
