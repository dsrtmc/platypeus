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
        {(() => {
          const date = new Date(user.createdAt);
          let day = date.getUTCDate().toString();
          let month = (date.getUTCMonth() + 1).toString(); // January is 0, so we add 1 to get the correct month
          let year = date.getUTCFullYear().toString();

          day = day < 10 ? "0" + day : day;
          month = month < 10 ? "0" + month : month;

          return day + "." + month + "." + year;
        })()}
      </div>
      <div>
        <p>average wpm: {Math.round(user.averageWpm)}</p>
        <p>total tests: {user.scoreCount}</p>
      </div>
    </div>
  );
}
