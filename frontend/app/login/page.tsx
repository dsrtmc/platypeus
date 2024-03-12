import LoginForm from "@/components/forms/LoginForm";
import { getClient } from "@/lib/client";
import { redirect } from "next/navigation";
import { Login_MeDocument } from "@/graphql/generated/graphql";
import { gql, useQuery } from "@apollo/client";

const Me = gql`
  query Login_Me {
    me {
      id
      ...UserInfoFragment
    }
  }
`;

export default async function LoginPage() {
  // for some reason Next.js always throws an error when using `redirect()`.
  // This functionality is not needed now anyways so I don't care and I'll keep it commented out.
  const { data } = await getClient().query({ query: Login_MeDocument });
  if (data.me) redirect(`/user/${data.me.username}`);
  return (
    <div>
      <LoginForm />
    </div>
  );
}
