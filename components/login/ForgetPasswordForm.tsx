"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordResetAction } from "@/app/actions/auth";
import { EmailField, Form } from "@/components/form";
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
    <Form action={formAction} state={state} isPending={isPending}>
      <Form.Heading>Forgot your password?</Form.Heading>
      <Form.Message />
      <Form.Fields>
        <EmailField id="email" name="email" label="Email Address" isRequired />
      </Form.Fields>
      <Form.Actions>
        <Form.Button>Send Reset Link</Form.Button>
      </Form.Actions>
    </Form>
  );
}
