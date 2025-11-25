import { useState, useEffect } from 'react';
import { shopifyFetch } from '../lib/shopify';
import type { ShopifyProduct } from '../lib/shopify';

export function useShopifyCollection(collectionHandle: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollectionProducts() {
      try {
        setLoading(true);
        setError(null);

        const query = `
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

        const response: any = await shopifyFetch({ query, variables: { handle: collectionHandle } });

        const collection = response?.collectionByHandle;
        if (!collection) {
          throw new Error(`Collection "${collectionHandle}" not found`);
        }

        const fetchedProducts = collection.products.edges.map((edge: any) => edge.node);
        setProducts(fetchedProducts);
      } catch (err: any) {
        console.error('Error fetching collection products:', err);
        setError(err.message || 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    }

    if (collectionHandle) {
      fetchCollectionProducts();
    }
  }, [collectionHandle]);

  return { products, loading, error };
}
