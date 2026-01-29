import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase Environment Variables");
  }
  return { supabaseUrl, supabaseAnonKey };
}

export const createBrowserSupabaseClient = () => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseBrowserClient();
  const client = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return client;
};
