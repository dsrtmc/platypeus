import styles from "./Test.module.css";

interface Props {
  time: number;
}

export function Timer({ time }: Props) {
  return <div className={styles.timer}>{time}</div>;
}
