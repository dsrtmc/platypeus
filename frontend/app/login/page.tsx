import LoginForm from "@/app/login/LoginForm";
import { getAccessToken } from "@/accessToken";

export default async function Login() {
  return (
    <div>
      you are on the <code>login</code> page
      <LoginForm />
    </div>
  );
}
