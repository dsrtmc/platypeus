import { FC, forwardRef, MouseEvent } from "react";
import styles from "./Test.module.css";

interface Props {
  onReset: () => void;
}

export const RestartButton: FC<Props> = forwardRef(({ onReset }: Props, ref) => {
  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    onReset();
    (e.target as HTMLButtonElement).blur(); // the default type is very funny for some reason
  }

  return (
    <button onClick={handleReset} className={styles.restart} ref={ref}>
      RESTART
    </button>
  );
});
