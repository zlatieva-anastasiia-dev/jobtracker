"use client";
import { useActionState } from "react";
import { signInAction } from "@/app/actions/auth";
import { EmailField, Form, PasswordField } from "@/components/form";
import { initialActionState } from "@/lib/constants";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialActionState,
  );
  return (
    <Form state={state} action={formAction} isPending={isPending}>
      <Form.Heading>Welcome back to Job tracker</Form.Heading>
      <Form.Message />
      <Form.Fields>
        <EmailField id="email" name="email" label="Email" isRequired />
        <PasswordField
          id="password"
          name="password"
          label="Password"
          isRequired
        />
      </Form.Fields>
      <Form.Actions>
        <Form.Button>Log in</Form.Button>
      </Form.Actions>
    </Form>
  );
}
