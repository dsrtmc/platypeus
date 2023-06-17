import { ReactNode } from "react";
import { ApolloWrapper } from "@/lib/apollo-provider";

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
