"use client";
import { useActionState } from "react";
import { signUpAction } from "@/app/actions/auth";
import { initialActionState } from "@/lib/constants";

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialActionState,
  );

  if (state.success) {
    return (
      <div className="p-6 text-center bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-700 mt-2">{state.message}</p>
        <p className="text-sm text-blue-500 mt-4 italic">
          You can close this window after confirming.
        </p>
      </div>
    );
  }
  return (
    <form action={formAction} noValidate>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Welcome back to Job tracker
      </h1>
      {state.message && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">
          {state.message}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block  mb-2">
          Email
        </label>
        {state.errors?.email && (
          <p className="text-red-500 text-sm mb-2">{state.errors.email}</p>
        )}
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={state.values?.email || ""}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block  mb-2">
          Password
        </label>
        {state.errors?.password && (
          <p className="text-red-500 text-sm mb-2">{state.errors.password}</p>
        )}
        <input
          type="password"
          id="password"
          name="password"
          defaultValue={state.values?.password || ""}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block  mb-2">
          Confirm Password
        </label>
        {state.errors?.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">
            {state.errors.confirmPassword}
          </p>
        )}
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          defaultValue={state.values?.confirmPassword || ""}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        disabled={isPending}
      >
        Create account
      </button>
    </form>
  );
}
