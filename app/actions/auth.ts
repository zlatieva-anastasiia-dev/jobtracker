"use server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  LoginSchema,
  ResetPasswordSchema,
  SignUpSchema,
} from "@/lib/validation/authSchema";
import type { ActionState } from "@/types/actions";

export async function signInAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validateSignInData = LoginSchema.safeParse({ email, password });
  if (!validateSignInData.success) {
    const formFieldErrors = validateSignInData.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: Object.fromEntries(
        Object.entries(formFieldErrors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : String(value),
        ]),
      ),
      values: { email, password },
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: `Error logging in: ${error.message}`,
      values: { email, password },
    };
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Logged in successfully",
    redirect: "/jobs",
  };
}

export async function signUpAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const validateSignUpData = SignUpSchema.safeParse({
    email,
    password,
    confirmPassword,
  });
  if (!validateSignUpData.success) {
    const formFieldErrors = validateSignUpData.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: Object.fromEntries(
        Object.entries(formFieldErrors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : String(value),
        ]),
      ),
      values: { email, password, confirmPassword },
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/jobs`,
    },
  });

  if (data.user?.identities && data.user.identities.length === 0) {
    return {
      success: false,
      message: "User already exists. Please log in instead.",
    };
  }

  if (data.user && !data.session) {
    return {
      success: true,
      message: "Success! Please check your email to confirm your account.",
    };
  }

  if (error) {
    return {
      success: false,
      message: `Error signing up: ${error.message}`,
      values: { email, password },
    };
  }

  return {
    success: false,
    message: "Something went wrong. Please try again.",
  };
}

export async function requestPasswordResetAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email") as string;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: `If an account exists for ${email}, you will get an email with link for resetting your password`,
  };
}

export async function resetPasswordAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const validateResetData = ResetPasswordSchema.safeParse({
    password,
    confirmPassword,
  });
  if (!validateResetData.success) {
    const formFieldErrors = validateResetData.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: Object.fromEntries(
        Object.entries(formFieldErrors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : String(value),
        ]),
      ),
      values: { password, confirmPassword },
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return {
      success: false,
      message: `Error resetting password: ${error.message}`,
      values: { password },
    };
  }

  return {
    success: true,
    message: "Password reset successfully",
    redirect: "/jobs",
  };
}
