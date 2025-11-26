import { createClient } from '@supabase/supabase-js';

declare global {
  interface Window {
    __ENV__?: {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_ANON_KEY: string;
    };
  }
}

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  (typeof window !== 'undefined' && window.__ENV__?.VITE_SUPABASE_URL);

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  (typeof window !== 'undefined' && window.__ENV__?.VITE_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration error:', {
    url: supabaseUrl ? 'Set' : 'Missing',
    key: supabaseAnonKey ? 'Set' : 'Missing',
    importMetaEnv: import.meta.env,
    windowEnv: typeof window !== 'undefined' ? window.__ENV__ : 'undefined'
  });
  throw new Error(
    `Missing Supabase environment variables:\n` +
    `- VITE_SUPABASE_URL: ${supabaseUrl ? '✓' : '✗'}\n` +
    `- VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓' : '✗'}\n\n` +
    `Please ensure these variables are defined in your .env file or index.html.`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
