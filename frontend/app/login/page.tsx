import LoginForm from "@/app/login/LoginForm";
import { getAccessToken } from "@/accessToken";

export default async function Login() {
  return (
    <div>
      <h1>
        you are on the <code>login</code> page
      </h1>
      <LoginForm />
    </div>
  );
}
