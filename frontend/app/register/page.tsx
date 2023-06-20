import RegisterForm from "@/app/register/RegisterForm";
import { getAccessToken } from "@/accessToken";

export default function Register() {
  return (
    <div>
      <p>hello, you are on register page</p>
      <RegisterForm />
    </div>
  );
}
