import { getClient } from "@/lib/client";
import { GetUserByUsernameDocument } from "@/graphql/generated/graphql";

export default async function User({ params }: { params: { username: string } }) {
  const { data } = await getClient().query({
    query: GetUserByUsernameDocument,
    variables: {
      username: params.username,
    },
  });
  if (!data.userByUsername) return <div>no such user</div>;
  return (
    <div>
      hello you are on <code>{data.userByUsername?.username}</code> page
    </div>
  );
}
