/**
 * Safe localStorage wrapper with error handling
 * Prevents crashes from JSON parse errors or storage quota exceeded
 */

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
