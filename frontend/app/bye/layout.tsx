import { ReactNode } from "react";
import { ApolloWrapper } from "@/lib/apollo-provider";

export default function ByeLayout({ children }: { children: ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
