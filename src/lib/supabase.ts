import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration error:', {
    url: supabaseUrl ? 'Set' : 'Missing',
    key: supabaseAnonKey ? 'Set' : 'Missing',
    env: import.meta.env
  });
  throw new Error(
    `Missing Supabase environment variables:\n` +
    `- VITE_SUPABASE_URL: ${supabaseUrl ? '✓' : '✗'}\n` +
    `- VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓' : '✗'}\n\n` +
    `Please ensure these variables are defined in your .env file.`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
