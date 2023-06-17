import { getClient } from "@/lib/client";
import { LoginDocument } from "@/graphql/generated/graphql";

export default async function Login() {
  const client = getClient();

  const response = await client.mutate({
    mutation: LoginDocument,
    variables: {
      username: "qwe",
    },
  });
  console.log(response);

  return (
    <div>
      you are on the <code>login</code> page
    </div>
  );
}
