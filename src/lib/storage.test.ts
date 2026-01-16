import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getStoredCart,
  saveStoredCart,
  clearStoredCart,
  getStoredCheckoutId,
  saveStoredCheckoutId,
  clearStoredCheckoutId,
  STORAGE_KEYS,
  type LocalCartItemSchema,
} from './storage';

describe('Storage utilities', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Cart storage', () => {
    const validCartItem: LocalCartItemSchema = {
      id: 'test-123',
      type: 'local',
      serviceName: 'Test Service',
      serviceType: 'studio',
      price: 100,
      quantity: 1,
    };

    it('should return empty array when no cart stored', () => {
      const result = getStoredCart();
      expect(result).toEqual([]);
    });

    it('should save and retrieve cart items', () => {
      saveStoredCart([validCartItem]);
      const result = getStoredCart();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-123');
    });

    it('should clear stored cart', () => {
      saveStoredCart([validCartItem]);
      clearStoredCart();
      const result = getStoredCart();
      expect(result).toEqual([]);
    });

    it('should handle invalid cart data gracefully', () => {
      localStorage.setItem(STORAGE_KEYS.LOCAL_CART, 'invalid-json');
      const result = getStoredCart();
      expect(result).toEqual([]);
    });

    it('should migrate legacy cart format', () => {
      // Store in legacy format (just array)
      localStorage.setItem(STORAGE_KEYS.LOCAL_CART, JSON.stringify([validCartItem]));
      const result = getStoredCart();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-123');
    });

    it('should reject invalid cart items', () => {
      const invalidItem = { id: 'test', price: 'not-a-number' };
      localStorage.setItem(STORAGE_KEYS.LOCAL_CART, JSON.stringify([invalidItem]));
      const result = getStoredCart();
      expect(result).toEqual([]);
    });
  });

  describe('Checkout storage', () => {
    const validCheckoutId = 'gid://shopify/Cart/12345';

    it('should return null when no checkout stored', () => {
      const result = getStoredCheckoutId();
      expect(result).toBeNull();
    });

    it('should save and retrieve checkout ID', () => {
      saveStoredCheckoutId(validCheckoutId);
      const result = getStoredCheckoutId();
      expect(result).toBe(validCheckoutId);
    });

    it('should clear stored checkout', () => {
      saveStoredCheckoutId(validCheckoutId);
      clearStoredCheckoutId();
      const result = getStoredCheckoutId();
      expect(result).toBeNull();
    });

    it('should migrate legacy checkout format', () => {
      localStorage.setItem(STORAGE_KEYS.SHOPIFY_CHECKOUT, validCheckoutId);
      const result = getStoredCheckoutId();
      expect(result).toBe(validCheckoutId);
    });

    it('should expire old checkouts', () => {
      const expiredData = {
        version: 1,
        checkoutId: validCheckoutId,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        expiresAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago (expired)
      };
      localStorage.setItem(STORAGE_KEYS.SHOPIFY_CHECKOUT, JSON.stringify(expiredData));
      const result = getStoredCheckoutId();
      expect(result).toBeNull();
    });
  });
});
