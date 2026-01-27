import { redirect } from "next/navigation";
import { signIn, signUp } from "@/lib/services/auth";
import { LoginSchema, SignUpSchema } from "@/lib/validation/authSchema";
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
