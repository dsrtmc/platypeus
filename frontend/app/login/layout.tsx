import { ReactNode } from "react";
import { ApolloWrapper } from "@/lib/apollo-provider";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
