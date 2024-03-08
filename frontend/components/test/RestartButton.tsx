import { FC, ForwardedRef, forwardRef, MouseEvent } from "react";
import styles from "./Test.module.css";
import { VscDebugRestart } from "react-icons/vsc";

interface Props {
  onReset: () => void;
}

type Ref = HTMLButtonElement;

export const RestartButton = forwardRef<Ref, Props>(({ onReset }: Props, ref) => {
  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    onReset();
    (e.target as HTMLButtonElement).blur(); // the default type is very funny for some reason
  }

  return (
    <button onClick={handleReset} className={styles.restart} ref={ref}>
      <VscDebugRestart />
    </button>
  );
});
