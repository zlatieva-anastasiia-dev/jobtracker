import { createClient } from "../supabase/client";

export async function signIn(email: string, password: string) {
  const supabase = createClient();
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const supabase = createClient();
  return await supabase.auth.signOut();
}

export async function signUp(email: string, password: string) {
  const supabase = createClient();
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });
}
