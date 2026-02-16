import { createBrowserClient } from "@supabase/ssr";

export const createBrowserSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl) {
    throw new Error(
      "[lib/supabase/client.ts] Missing NEXT_PUBLIC_SUPABASE_URL environment variable",
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "[lib/supabase/client.ts] Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable",
    );
  }

  const client = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return client;
};
