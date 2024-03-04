import { UserPage_GetUserQuery } from "@/graphql/generated/graphql";

interface Props {
  user: NonNullable<UserPage_GetUserQuery["user"]>;
}

export default async function UserInfo({ user }: Props) {
  return (
    <div>
      {user.username}
      <div>
        you have been a member since&nbsp;
        {new Date(user.createdAt).toLocaleDateString("en-UK", { day: "2-digit", month: "short", year: "numeric" })}
      </div>
      <div>
        <p>average wpm: {Math.round(user.averageWpm)}</p>
        <p>total tests: {user.scoreCount}</p>
      </div>
    </div>
  );
}
