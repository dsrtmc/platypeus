import { MouseEvent, PropsWithChildren } from "react";

interface Props {
  handleTimeSettingSelection: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function TimeSettingButton({ children, handleTimeSettingSelection }: PropsWithChildren<Props>) {
  return <button onClick={handleTimeSettingSelection}>{children}</button>;
}
