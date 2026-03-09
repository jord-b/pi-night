import { createClient } from "@supabase/supabase-js";

export type PieCommitment = {
  id: string;
  created_at: string;
  name: string;
  pie_name: string;
  pie_type: "sweet" | "savory" | "other";
  serves: string;
  notes: string | null;
};

export function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Copy .env.local.example to .env.local and fill in your values."
    );
  }
  return createClient(url, key);
}

// Admin client for server actions — bypasses RLS using the service role key.
// Never used client-side; the key is never exposed to the browser.
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Add it to your .env.local and Vercel environment variables."
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
