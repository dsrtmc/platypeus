import { MouseEvent, PropsWithChildren } from "react";

interface Props {
  handleSelect: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function TimeSettingButton({ children, handleSelect }: PropsWithChildren<Props>) {
  return <button onClick={handleSelect}>{children}</button>;
}
