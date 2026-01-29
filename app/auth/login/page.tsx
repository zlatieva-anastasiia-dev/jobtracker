import Link from "next/link";
import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg">
      <LoginForm />
      <div className="mt-4 flex flex-col gap-2 text-sm text-center">
        <Link href="/auth/signup">Need an account? Sign up</Link>
        <Link href="/auth/forgot-password">Forgot password?</Link>
      </div>
    </div>
  );
}
