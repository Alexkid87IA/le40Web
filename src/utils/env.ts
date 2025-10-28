import { z } from 'zod';

/**
 * Schema de validation pour les variables d'environnement
 */
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('VITE_SUPABASE_URL must be a valid URL'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'VITE_SUPABASE_ANON_KEY is required'),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).optional().default('development'),
  VITE_ENABLE_ERROR_LOGGING: z.string().optional().default('true'),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Valide et retourne les variables d'environnement
 * @throws {Error} Si les variables d'environnement sont invalides
 */
export function validateEnv(): Env {
  try {
    const env = {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
      VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
      VITE_ENABLE_ERROR_LOGGING: import.meta.env.VITE_ENABLE_ERROR_LOGGING,
    };

    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => `- ${err.path.join('.')}: ${err.message}`).join('\n');

      throw new Error(
        `❌ Invalid environment variables:\n${missingVars}\n\n` +
        `Please check your .env file and ensure all required variables are set.\n` +
        `See .env.example for reference.`
      );
    }
    throw error;
  }
}

/**
 * Variables d'environnement validées - exportées pour utilisation dans l'app
 */
export const env = validateEnv();

/**
 * Helper pour vérifier si on est en production
 */
export const isProduction = env.VITE_APP_ENV === 'production';

/**
 * Helper pour vérifier si le logging d'erreurs est activé
 */
export const isErrorLoggingEnabled = env.VITE_ENABLE_ERROR_LOGGING === 'true';
