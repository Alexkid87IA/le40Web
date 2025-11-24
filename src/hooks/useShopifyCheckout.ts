import { useState, useEffect } from 'react';
import { createCheckout, addToCheckout, removeFromCheckout, getCheckout, ShopifyCheckout } from '../lib/shopify';

const CHECKOUT_STORAGE_KEY = 'shopify_checkout_id';

export const useShopifyCheckout = () => {
  const [checkout, setCheckout] = useState<ShopifyCheckout | null>(null);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedCheckoutId = localStorage.getItem(CHECKOUT_STORAGE_KEY);
    if (savedCheckoutId) {
      setCheckoutId(savedCheckoutId);
      fetchCheckout(savedCheckoutId);
    }
  }, []);

  const fetchCheckout = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCheckout(id);
      setCheckout(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch checkout');
      localStorage.removeItem(CHECKOUT_STORAGE_KEY);
      setCheckoutId(null);
    } finally {
      setLoading(false);
    }
  };

  const initCheckout = async (lineItems: Array<{ variantId: string; quantity: number; customAttributes?: Array<{ key: string; value: string }> }> = []) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createCheckout(lineItems);
      setCheckout(data);
      setCheckoutId(data.id);
      localStorage.setItem(CHECKOUT_STORAGE_KEY, data.id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create checkout');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (
    variantId: string,
    quantity: number,
    customAttributes?: Array<{ key: string; value: string }>
  ) => {
    setLoading(true);
    setError(null);
    try {
      let currentCheckoutId = checkoutId;

      if (!currentCheckoutId) {
        const newCheckout = await initCheckout([{ variantId, quantity, customAttributes }]);
        return newCheckout;
      }

      const data = await addToCheckout(currentCheckoutId, [{ variantId, quantity, customAttributes }]);
      setCheckout(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to checkout');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (lineItemId: string) => {
    if (!checkoutId) return null;

    setLoading(true);
    setError(null);
    try {
      const data = await removeFromCheckout(checkoutId, [lineItemId]);
      setCheckout(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item from checkout');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearCheckout = () => {
    setCheckout(null);
    setCheckoutId(null);
    localStorage.removeItem(CHECKOUT_STORAGE_KEY);
  };

  const getCheckoutUrl = (): string | null => {
    return checkout?.webUrl || null;
  };

  return {
    checkout,
    checkoutId,
    loading,
    error,
    initCheckout,
    addItem,
    removeItem,
    clearCheckout,
    getCheckoutUrl,
    refreshCheckout: checkoutId ? () => fetchCheckout(checkoutId) : undefined,
  };
};
