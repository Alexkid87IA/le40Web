import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  validateCart,
  safeJsonParse,
  sanitizeString,
  isValidSessionId,
  type CartItem,
} from './validation';

describe('validation utilities', () => {
  describe('validateCart', () => {
    it('should validate a correct cart', () => {
      const validCart = [
        {
          id: 'item-1',
          serviceType: 'coworking',
          serviceName: 'Open Space',
          date: '2025-11-01',
          duration: 'day',
          price: 25,
          quantity: 1,
        },
      ];

      const result = validateCart(validCart);
      expect(result).toEqual(validCart);
    });

    it('should return empty array for null/undefined', () => {
      expect(validateCart(null)).toEqual([]);
      expect(validateCart(undefined)).toEqual([]);
    });

    it('should return empty array for invalid cart data', () => {
      const invalidCart = [
        {
          id: 'item-1',
          serviceType: 'invalid-type', // Invalid enum value
          serviceName: 'Test',
          date: '2025-11-01',
          duration: 'day',
          price: 25,
          quantity: 1,
        },
      ];

      const result = validateCart(invalidCart);
      expect(result).toEqual([]);
    });

    it('should reject negative prices', () => {
      const invalidCart = [
        {
          id: 'item-1',
          serviceType: 'coworking',
          serviceName: 'Test',
          date: '2025-11-01',
          duration: 'day',
          price: -10, // Invalid negative price
          quantity: 1,
        },
      ];

      const result = validateCart(invalidCart);
      expect(result).toEqual([]);
    });

    it('should reject zero or negative quantities', () => {
      const invalidCart = [
        {
          id: 'item-1',
          serviceType: 'coworking',
          serviceName: 'Test',
          date: '2025-11-01',
          duration: 'day',
          price: 25,
          quantity: 0, // Invalid quantity
        },
      ];

      const result = validateCart(invalidCart);
      expect(result).toEqual([]);
    });

    it('should validate optional fields', () => {
      const validCartWithOptional: CartItem[] = [
        {
          id: 'item-1',
          serviceType: 'meeting-room',
          serviceName: 'Salle A',
          date: '2025-11-01',
          startTime: '09:00',
          endTime: '11:00',
          duration: 'hour',
          price: 50,
          quantity: 1,
        },
      ];

      const result = validateCart(validCartWithOptional);
      expect(result).toEqual(validCartWithOptional);
    });
  });

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const json = '{"test": "value"}';
      const result = safeJsonParse(json);
      expect(result).toEqual({ test: 'value' });
    });

    it('should return null for invalid JSON', () => {
      const invalidJson = '{invalid json}';
      const result = safeJsonParse(invalidJson);
      expect(result).toBeNull();
    });

    it('should return null for null input', () => {
      const result = safeJsonParse(null);
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      const result = safeJsonParse('');
      expect(result).toBeNull();
    });

    it('should parse arrays', () => {
      const json = '[1, 2, 3]';
      const result = safeJsonParse(json);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('sanitizeString', () => {
    it('should escape HTML tags', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeString(input);
      expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
    });

    it('should escape quotes', () => {
      const input = 'Hello "world" and \'test\'';
      const result = sanitizeString(input);
      expect(result).toBe('Hello &quot;world&quot; and &#x27;test&#x27;');
    });

    it('should escape forward slashes', () => {
      const input = '</script>';
      const result = sanitizeString(input);
      expect(result).toBe('&lt;&#x2F;script&gt;');
    });

    it('should handle normal strings without changes to letters', () => {
      const input = 'Hello World';
      const result = sanitizeString(input);
      expect(result).toBe('Hello World');
    });
  });

  describe('isValidSessionId', () => {
    it('should validate correct session ID format', () => {
      const validId = '1234567890123-abc123def';
      expect(isValidSessionId(validId)).toBe(true);
    });

    it('should reject invalid timestamp length', () => {
      const invalidId = '123456789-abc123def'; // Too short timestamp
      expect(isValidSessionId(invalidId)).toBe(false);
    });

    it('should reject invalid random part length', () => {
      const invalidId = '1234567890123-abc'; // Too short random part
      expect(isValidSessionId(invalidId)).toBe(false);
    });

    it('should reject uppercase letters in random part', () => {
      const invalidId = '1234567890123-ABC123DEF';
      expect(isValidSessionId(invalidId)).toBe(false);
    });

    it('should reject missing hyphen', () => {
      const invalidId = '1234567890123abc123def';
      expect(isValidSessionId(invalidId)).toBe(false);
    });

    it('should reject empty string', () => {
      expect(isValidSessionId('')).toBe(false);
    });

    it('should accept valid alphanumeric random part', () => {
      const validId = '1234567890123-a1b2c3d4e';
      expect(isValidSessionId(validId)).toBe(true);
    });
  });
});
