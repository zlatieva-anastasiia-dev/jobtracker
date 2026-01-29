import { redirect } from "next/navigation";
import {
  sendPasswordReset,
  signIn,
  signUp,
  updatePassword,
} from "@/lib/services/auth";
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
      errors: formFieldErrors as Record<string, string>,
      values: { email, password },
    };
  }

  try {
    const { error } = await signIn(email, password);

    if (error) {
      return {
        success: false,
        message: "Error logging in: " + error.message,
        values: { email, password },
      };
    }
  } catch (_error) {
    return {
      success: false,
      message: "Error logging in",
    };
  }
  redirect("/jobs");
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
      errors: formFieldErrors as Record<string, string>,
      values: { email, password, confirmPassword },
    };
  }

  try {
    const { error, data } = await signUp(email, password);

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
        message: "Error signing up: " + error.message,
        values: { email, password },
      };
    }
  } catch (_error) {
    return {
      success: false,
      message: "Error signing up",
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
  const { error } = await sendPasswordReset(email);

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
      errors: formFieldErrors as Record<string, string>,
      values: { password, confirmPassword },
    };
  }

  try {
    const { error } = await updatePassword(password);

    if (error) {
      return {
        success: false,
        message: "Error resetting password: " + error.message,
        values: { password },
      };
    }
  } catch (_error) {
    return {
      success: false,
      message: "Error resetting password",
    };
  }
  redirect("/jobs");
}
