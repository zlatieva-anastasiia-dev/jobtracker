import { createBrowserSupabaseClient } from "../supabase/client";

export async function signIn(email: string, password: string) {
  const supabase = createBrowserSupabaseClient();
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const supabase = createBrowserSupabaseClient();
  return await supabase.auth.signOut();
}

export async function signUp(email: string, password: string) {
  const supabase = createBrowserSupabaseClient();
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/jobs`,
    },
  });
}

export async function sendPasswordReset(email: string) {
  const supabase = createBrowserSupabaseClient();
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });
}

export async function updatePassword(newPassword: string) {
  const supabase = createBrowserSupabaseClient();
  return await supabase.auth.updateUser({ password: newPassword });
}
