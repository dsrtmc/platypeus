interface Props {
  time: number;
}

export function Timer({ time }: Props) {
  return <code>time remaining: {time}</code>;
}
