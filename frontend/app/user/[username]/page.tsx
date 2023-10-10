import { getClient } from "@/lib/client";
import { GetUserByUsernameDocument } from "@/graphql/generated/graphql";

export default async function UserPage({ params }: { params: { username: string } }) {
  const { data } = await getClient().query({
    query: GetUserByUsernameDocument,
    variables: {
      username: params.username,
    },
  });
  if (!data.userByUsername) return <div>no such user</div>;
  return (
    <div>
      <p>
        hello you are on <code>{data.userByUsername.username}</code> page
      </p>
      this account has been created on<code>{JSON.stringify(new Date(data.userByUsername.createdAt))}</code>
      all user's scores:{" "}
      {data.userByUsername.scores.map((score) => (
        <p key={score.id}>wpm: {score.averageWpm}</p>
      ))}
    </div>
  );
}
