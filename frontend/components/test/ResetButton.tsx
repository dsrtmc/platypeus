import { MouseEvent } from "react";

interface Props {
  handleReset: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function ResetButton({ handleReset }: Props) {
  return (
    <button onClick={handleReset}>
      you can reset the test <code>here</code>
    </button>
  );
}
