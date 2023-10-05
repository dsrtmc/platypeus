import { ReactNode } from "react";
import { ApolloWrapper } from "@/lib/apollo-provider";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
