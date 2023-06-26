import styles from "./Test.module.css";

interface Props {
  x: number;
  y: number;
}

export function Caret({ x, y }: Props) {
  return <div className={styles.caret} />;
}
