import React, { PropsWithChildren } from "react";

interface Props {}

export const ContentWrapper: React.FC<Props> = ({ children }: PropsWithChildren<Props>) => {
  return <div id={"contentWrapper"}>{children}</div>;
};
