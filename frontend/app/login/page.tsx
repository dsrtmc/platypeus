import LoginForm from "@/components/forms/LoginForm";

export default async function LoginPage() {
  // for some reason Next.js always throws an error when using `redirect()`.
  // This functionality is not needed now anyways so I don't care and I'll keep it commented out.
  // const response = await getClient().query({ query: MeDocument });
  // if (response.data.me) redirect(`/user/${response.data.me.username}`);
  return (
    <div>
      <LoginForm />
    </div>
  );
}
