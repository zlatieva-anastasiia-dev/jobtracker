import Link from "next/link";
import { SignUpForm } from "@/components/login/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg">
      <SignUpForm />
      <div className="mt-4 flex flex-col gap-2 text-sm text-center">
        <Link href="/auth/login">Already have account ? Log in</Link>
      </div>
    </div>
  );
}
