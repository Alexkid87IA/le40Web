import { useState, useEffect } from 'react';
import { getProducts, getProductByHandle, ShopifyProduct } from '../lib/shopify';

export const useShopifyProducts = (initialFetch = true) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (limit = 50) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(limit);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFetch) {
      fetchProducts();
    }
  }, [initialFetch]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};

export const useShopifyProduct = (handle: string) => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;

      setLoading(true);
      setError(null);
      try {
        const data = await getProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  return { product, loading, error };
};

export const getProductMetafield = (
  product: ShopifyProduct,
  namespace: string,
  key: string
): string | null => {
  // Vérifier que metafields existe et filtrer les éléments null
  if (!product.metafields || !Array.isArray(product.metafields)) {
    return null;
  }
  
  const metafield = product.metafields.find(
    (m) => m && m.namespace === namespace && m.key === key
  );
  return metafield?.value || null;
};

export const requiresCalendarSync = (product: ShopifyProduct): boolean => {
  const value = getProductMetafield(product, 'custom', 'calendar_sync_required');
  return value === 'true' || value === '1';
};

export const getResourceName = (product: ShopifyProduct): string | null => {
  return getProductMetafield(product, 'custom', 'resource_name');
};

export const getResourceType = (product: ShopifyProduct): string | null => {
  return getProductMetafield(product, 'custom', 'resource_type');
};

export const getDurationHours = (product: ShopifyProduct): number => {
  const value = getProductMetafield(product, 'custom', 'duration_hours');
  return value ? parseFloat(value) : 1;
};