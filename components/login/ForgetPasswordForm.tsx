"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordResetAction } from "@/app/actions/auth";
import { initialActionState } from "@/lib/constants";

export function ForgetPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    requestPasswordResetAction,
    initialActionState,
  );

  if (state.success) {
    return (
      <div className="p-6 text-center bg-green-50 rounded-lg border border-green-200">
        <p className="text-green-700 mt-2">{state.message}</p>
        <p className="text-sm text-green-500 mt-4 italic">
          Please check your email for the reset link.
        </p>
        <Link
          href="/auth/login"
          className="text-blue-700 hover:underline mt-4 block"
        >
          Back to login
        </Link>
      </div>
    );
  }
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        disabled={isPending}
      >
        Send Reset Link
      </button>
    </form>
  );
}
