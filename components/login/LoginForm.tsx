"use client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { signInAction } from "@/app/actions/auth";
import { EmailField, Form, PasswordField } from "@/components/form";
import { initialActionState } from "@/lib/constants";

export function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialActionState,
  );

  useEffect(() => {
    if (state.success && state.redirect) {
      router.push(state.redirect);
    }
  }, [state.success, state.redirect, router]);

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
