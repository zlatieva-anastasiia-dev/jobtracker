"use client";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import { signInAction } from "@/app/actions/auth";
import { initialActionState } from "@/lib/constants";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialActionState,
  );

  const [showPassword, setShowPassword] = useState(false);
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            defaultValue={state.values?.password || ""}
            required
            className="w-full px-3 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3  focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        disabled={isPending}
      >
        Log in
      </button>
    </form>
  );
}
