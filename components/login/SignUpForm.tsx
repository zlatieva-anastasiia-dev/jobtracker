"use client";
import { useActionState } from "react";
import { signUpAction } from "@/app/actions/auth";
import { EmailField, Form, PasswordField } from "@/components/form";
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
    <Form state={state} action={formAction} isPending={isPending}>
      <Form.Heading>Create new account</Form.Heading>
      <Form.Message />
      <Form.Fields>
        <EmailField id="email" name="email" label="Email" />
        <PasswordField id="password" name="password" label="Password" />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
        />
      </Form.Fields>
      <Form.Actions>
        <Form.Button>Create account</Form.Button>
      </Form.Actions>
    </Form>
  );
}
