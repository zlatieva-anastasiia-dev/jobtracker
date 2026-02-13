"use client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { resetPasswordAction } from "@/app/actions/auth";
import { Form, PasswordField } from "@/components/form";
import { initialActionState } from "@/lib/constants";

export function ResetPasswordForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialActionState,
  );

  useEffect(() => {
    if (state.success && state.redirect) {
      router.push(state.redirect);
    }
  }, [state.success, state.redirect, router]);

  return (
    <Form state={state} action={formAction} isPending={isPending}>
      <Form.Heading>Reset your password</Form.Heading>
      <Form.Message />
      <Form.Fields>
        <PasswordField
          id="password"
          name="password"
          label="New Password"
          isRequired
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm New Password"
          isRequired
        />
      </Form.Fields>
      <Form.Actions>
        <Form.Button>Confirm Update Password</Form.Button>
      </Form.Actions>
    </Form>
  );
}
