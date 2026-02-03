"use client";
import { useActionState } from "react";
import { signInAction } from "@/app/actions/auth";
import { initialActionState } from "@/lib/constants";
import { EmailField } from "../form/EmailField";
import { Form } from "../form/Form";
import { PasswordField } from "../form/PasswordField";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialActionState,
  );

  return (
    <Form state={state} action={formAction}>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Welcome back to Job tracker
      </h1>
      <EmailField id="email" name="email" label="Email" isRequired />
      <PasswordField
        id="password"
        name="password"
        label="Password"
        isRequired
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        disabled={isPending}
      >
        Log in
      </button>
    </Form>
  );
}
