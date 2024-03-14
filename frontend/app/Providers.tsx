import { PropsWithChildren } from "react";
import { ErrorProvider } from "@/app/ErrorProvider";
import { NotificationProvider } from "@/app/NotificationProvider";

interface Props {}

export function Providers({ children }: PropsWithChildren<Props>) {
  return (
    <ErrorProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </ErrorProvider>
  );
}
