import { UserPage_GetUserQuery } from "@/graphql/generated/graphql";
import styles from "./User.module.css";

interface Props {
  user: NonNullable<UserPage_GetUserQuery["user"]>;
}

export default async function UserInfo({ user }: Props) {
  return (
    <div className={styles.userInfo}>
      <div className={styles.userStats}>
        <div className={styles.group}>
          <div className={styles.username}>{user.username}</div>
        </div>
        <div className={styles.group}>
          <div className={styles.groupTop}>{Math.round(user.averageWpm)}</div>
          <div className={styles.groupBottom}>average wpm</div>
        </div>
        <div className={styles.group}>
          <div className={styles.groupTop}>{user.scoreCount}</div>
          <div className={styles.groupBottom}>tests taken</div>
        </div>
      </div>
      <div className={styles.joinedInfo}>
        {user.username} has been a member since&nbsp;
        {new Date(user.createdAt).toLocaleDateString("en-UK", { day: "2-digit", month: "short", year: "numeric" })}
      </div>
    </div>
  );
}
