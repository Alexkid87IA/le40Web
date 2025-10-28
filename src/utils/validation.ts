import { z } from 'zod';

/**
 * Schema de validation pour un item du panier
 */
export const cartItemSchema = z.object({
  id: z.string().min(1),
  serviceType: z.enum(['coworking', 'meeting-room', 'studio', 'private-office', 'domiciliation']),
  serviceName: z.string().min(1),
  date: z.string().min(1),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  duration: z.enum(['hour', 'half-day', 'day', 'week', 'month']),
  price: z.number().min(0),
  quantity: z.number().int().min(1),
});

/**
 * Schema de validation pour le panier complet
 */
export const cartSchema = z.array(cartItemSchema);

/**
 * Type TypeScript inféré du schema
 */
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;

/**
 * Valide et parse les données du panier depuis localStorage
 * @param data - Données brutes du localStorage
 * @returns Panier validé ou tableau vide si invalide
 */
export function validateCart(data: unknown): Cart {
  try {
    // Si data est null ou undefined, retourner tableau vide
    if (!data) {
      return [];
    }

    // Parse et valide avec Zod
    const parsed = cartSchema.parse(data);
    return parsed;
  } catch (error) {
    // En cas d'erreur de validation, logger et retourner tableau vide
    // Cela évite de crasher l'app si des données corrompues sont dans localStorage
    console.warn('Invalid cart data in localStorage, resetting cart', error);
    return [];
  }
}

/**
 * Parse en toute sécurité du JSON depuis localStorage
 * @param jsonString - String JSON à parser
 * @returns Objet parsé ou null si erreur
 */
export function safeJsonParse(jsonString: string | null): unknown {
  if (!jsonString) {
    return null;
  }

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse JSON from localStorage', error);
    return null;
  }
}

/**
 * Sanitize une string pour prévenir les attaques XSS
 * @param str - String à nettoyer
 * @returns String nettoyée
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Valide un ID de session (format: timestamp-random)
 * @param sessionId - ID de session à valider
 * @returns true si valide
 */
export function isValidSessionId(sessionId: string): boolean {
  // Format attendu: "1234567890-abc123def"
  const sessionIdRegex = /^\d{13}-[a-z0-9]{9}$/;
  return sessionIdRegex.test(sessionId);
}
