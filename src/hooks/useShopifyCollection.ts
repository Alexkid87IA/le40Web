import { useState, useEffect, useRef, useCallback } from 'react';
import { shopifyFetch } from '../lib/shopify';
import type { ShopifyProduct, ShopifyEdge } from '../types';

interface CollectionResponse {
  collectionByHandle: {
    id: string;
    title: string;
    products: {
      edges: Array<ShopifyEdge<ShopifyProduct>>;
    };
  } | null;
}

// GraphQL query memoized outside component to avoid recreation
const COLLECTION_QUERY = `
  query GetCollectionProducts($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      products(first: 50) {
        edges {
          node {
            id
            title
            description
            handle
            tags
            productType
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  sku
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function useShopifyCollection(collectionHandle: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track the current request to prevent race conditions
  const abortControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  const refetch = useCallback(async () => {
    if (!collectionHandle) return;

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setLoading(true);
      setError(null);

      const response = await shopifyFetch<CollectionResponse>({
        query: COLLECTION_QUERY,
        variables: { handle: collectionHandle },
        signal: abortController.signal,
      });

      // Check if component is still mounted and request wasn't cancelled
      if (!mountedRef.current || abortController.signal.aborted) return;

      const collection = response?.collectionByHandle;
      if (!collection) {
        throw new Error(`Collection "${collectionHandle}" not found`);
      }

      const fetchedProducts = collection.products.edges.map(
        (edge: ShopifyEdge<ShopifyProduct>) => edge.node
      );
      setProducts(fetchedProducts);
    } catch (err) {
      // Don't update state if request was cancelled
      if (!mountedRef.current) return;
      if (err instanceof Error && err.name === 'ShopifyNetworkError' && err.message === 'Request cancelled') {
        return;
      }
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [collectionHandle]);

  useEffect(() => {
    mountedRef.current = true;
    refetch();

    return () => {
      mountedRef.current = false;
      // Cleanup: abort any pending request on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [refetch]);

  return { products, loading, error, refetch };
}
