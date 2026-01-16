/**
 * Safe localStorage wrapper with error handling and schema validation
 * Prevents crashes from JSON parse errors or storage quota exceeded
 */

// Storage version for migration support
const STORAGE_VERSION = 1;

// Storage keys
export const STORAGE_KEYS = {
  LOCAL_CART: 'le40-unified-cart-local',
  SHOPIFY_CHECKOUT: 'le40-shopify-checkout-id',
  STUDIO_SESSION: 'studio_session_id',
  PREROLL_SERVICE: 'le40-preroll-service',
} as const;

// Schema definitions for stored data
export interface LocalCartItemSchema {
  id: string;
  type: 'local' | 'shopify';
  serviceName: string;
  serviceType: string;
  price: number;
  quantity: number;
  date?: string;
  time?: string;
  duration?: string;
  studioConfig?: {
    studioId: string;
    formulaId: string;
    durationHours: number;
    selectedExtras: Record<string, number>;
    basePrice: number;
    extrasTotal: number;
    totalPrice: number;
  };
  shopifyVariantId?: string;
  customAttributes?: Array<{ key: string; value: string }>;
}

export interface StoredCartData {
  version: number;
  items: LocalCartItemSchema[];
  updatedAt: string;
}

export interface CheckoutStorageData {
  version: number;
  checkoutId: string;
  createdAt: string;
  expiresAt: string;
}

// Validation functions
function isValidCartItem(item: unknown): item is LocalCartItemSchema {
  if (typeof item !== 'object' || item === null) return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    (obj.type === 'local' || obj.type === 'shopify') &&
    typeof obj.serviceName === 'string' &&
    typeof obj.serviceType === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.quantity === 'number' &&
    obj.quantity > 0
  );
}

function isValidStoredCart(data: unknown): data is StoredCartData {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.version === 'number' &&
    Array.isArray(obj.items) &&
    obj.items.every(isValidCartItem) &&
    typeof obj.updatedAt === 'string'
  );
}

function isValidCheckoutData(data: unknown): data is CheckoutStorageData {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.version === 'number' &&
    typeof obj.checkoutId === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.expiresAt === 'string'
  );
}

// Cart storage functions with validation
const CHECKOUT_EXPIRY_DAYS = 7;

export function getStoredCart(): LocalCartItemSchema[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LOCAL_CART);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    // Check new format
    if (isValidStoredCart(parsed)) {
      return parsed.items;
    }

    // Try legacy format (just array of items)
    if (Array.isArray(parsed) && parsed.every(isValidCartItem)) {
      saveStoredCart(parsed); // Migrate to new format
      return parsed;
    }

    // Invalid data
    localStorage.removeItem(STORAGE_KEYS.LOCAL_CART);
    return [];
  } catch {
    localStorage.removeItem(STORAGE_KEYS.LOCAL_CART);
    return [];
  }
}

export function saveStoredCart(items: LocalCartItemSchema[]): void {
  try {
    const data: StoredCartData = {
      version: STORAGE_VERSION,
      items,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.LOCAL_CART, JSON.stringify(data));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[Storage] Error saving cart:', error);
    }
  }
}

export function clearStoredCart(): void {
  localStorage.removeItem(STORAGE_KEYS.LOCAL_CART);
}

export function getStoredCheckoutId(): string | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SHOPIFY_CHECKOUT);
    if (!stored) return null;

    // Try new format
    try {
      const parsed = JSON.parse(stored);
      if (isValidCheckoutData(parsed)) {
        const expiresAt = new Date(parsed.expiresAt);
        if (expiresAt < new Date()) {
          localStorage.removeItem(STORAGE_KEYS.SHOPIFY_CHECKOUT);
          return null;
        }
        return parsed.checkoutId;
      }
    } catch {
      // Not JSON, try legacy format
    }

    // Legacy format (just string ID)
    if (stored.startsWith('gid://')) {
      saveStoredCheckoutId(stored);
      return stored;
    }

    localStorage.removeItem(STORAGE_KEYS.SHOPIFY_CHECKOUT);
    return null;
  } catch {
    return null;
  }
}

export function saveStoredCheckoutId(checkoutId: string): void {
  try {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + CHECKOUT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const data: CheckoutStorageData = {
      version: STORAGE_VERSION,
      checkoutId,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.SHOPIFY_CHECKOUT, JSON.stringify(data));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[Storage] Error saving checkout:', error);
    }
  }
}

export function clearStoredCheckoutId(): void {
  localStorage.removeItem(STORAGE_KEYS.SHOPIFY_CHECKOUT);
}

/**
 * Safely get an item from localStorage with JSON parsing
 * @param key - The storage key
 * @param defaultValue - Default value if key doesn't exist or parsing fails
 * @returns Parsed value or default value
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    // Log error in development only
    if (import.meta.env.DEV) {
      console.warn(`[Storage] Failed to parse "${key}":`, error);
    }
    return defaultValue;
  }
}

/**
 * Safely set an item in localStorage with JSON stringification
 * @param key - The storage key
 * @param value - The value to store
 * @returns true if successful, false if failed
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    // Log error in development only
    if (import.meta.env.DEV) {
      console.warn(`[Storage] Failed to set "${key}":`, error);
    }
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * @param key - The storage key
 * @returns true if successful, false if failed
 */
export function removeStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`[Storage] Failed to remove "${key}":`, error);
    }
    return false;
  }
}

/**
 * Get a raw string from localStorage (no JSON parsing)
 * @param key - The storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns String value or default
 */
export function getStorageString(key: string, defaultValue: string = ''): string {
  try {
    return localStorage.getItem(key) ?? defaultValue;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`[Storage] Failed to get string "${key}":`, error);
    }
    return defaultValue;
  }
}

/**
 * Set a raw string in localStorage (no JSON stringification)
 * @param key - The storage key
 * @param value - The string value to store
 * @returns true if successful, false if failed
 */
export function setStorageString(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`[Storage] Failed to set string "${key}":`, error);
    }
    return false;
  }
}

/**
 * Check if localStorage is available
 * @returns true if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
