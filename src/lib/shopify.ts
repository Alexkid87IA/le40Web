const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = '2024-10';

// Check if Shopify is configured
const isShopifyConfigured = Boolean(SHOPIFY_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN);

if (!isShopifyConfigured) {
  console.warn('⚠️ Shopify is not configured. Set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env file.');
}

const SHOPIFY_GRAPHQL_URL = isShopifyConfigured
  ? `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`
  : '';

export const shopifyEnabled = isShopifyConfigured;

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error('Shopify is not configured. Please contact support.');
  }

  const response = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'Shopify GraphQL error');
  }

  return json.data;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];  // AJOUTÉ
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        quantityAvailable: number;
        price: {
          amount: string;
          currencyCode: string;
        };
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  metafields: Array<{
    key: string;
    value: string;
    namespace: string;
  }>;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export interface ShopifyCheckout {
  id: string;
  webUrl: string;
  lineItems: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        quantity: number;
        variant: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          image: {
            url: string;
            altText: string | null;
          } | null;
        };
      };
    }>;
  };
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalTax: {
    amount: string;
    currencyCode: string;
  };
}

export const getProducts = async (first = 20): Promise<ShopifyProduct[]> => {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            tags
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
            images(first: 5) {
              edges {
                node {
                  id
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
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            metafields(identifiers: [
              { namespace: "custom", key: "calendar_sync_required" },
              { namespace: "custom", key: "resource_name" },
              { namespace: "custom", key: "resource_type" },
              { namespace: "custom", key: "duration_hours" }
            ]) {
              key
              value
              namespace
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>({
    query,
    variables: { first },
  });

  return data.products.edges.map(edge => edge.node);
};

export const getProductByHandle = async (handle: string): Promise<ShopifyProduct | null> => {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        tags
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
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        metafields(identifiers: [
          { namespace: "custom", key: "calendar_sync_required" },
          { namespace: "custom", key: "resource_name" },
          { namespace: "custom", key: "resource_type" },
          { namespace: "custom", key: "duration_hours" }
        ]) {
          key
          value
          namespace
        }
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>({
    query,
    variables: { handle },
  });

  return data.productByHandle;
};

export const getCollections = async (first = 10): Promise<ShopifyCollection[]> => {
  const query = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              url
              altText
            }
            products(first: 20) {
              edges {
                node {
                  id
                  handle
                  title
                  description
                  tags
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ collections: { edges: Array<{ node: ShopifyCollection }> } }>({
    query,
    variables: { first },
  });

  return data.collections.edges.map(edge => edge.node);
};

export const createCheckout = async (lineItems: Array<{ variantId: string; quantity: number; customAttributes?: Array<{ key: string; value: string }> }> = []): Promise<ShopifyCheckout> => {
  const query = `
    mutation CheckoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 50) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          totalTax {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{ checkoutCreate: { checkout: ShopifyCheckout; checkoutUserErrors: Array<{ field: string[]; message: string }> } }>({
    query,
    variables: {
      input: {
        lineItems: lineItems.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity,
          customAttributes: item.customAttributes || [],
        })),
      },
    },
  });

  if (data.checkoutCreate.checkoutUserErrors.length > 0) {
    throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
  }

  return data.checkoutCreate.checkout;
};

export const addToCheckout = async (
  checkoutId: string,
  lineItems: Array<{ variantId: string; quantity: number; customAttributes?: Array<{ key: string; value: string }> }>
): Promise<ShopifyCheckout> => {
  const query = `
    mutation CheckoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          lineItems(first: 50) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          totalTax {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{ checkoutLineItemsAdd: { checkout: ShopifyCheckout; checkoutUserErrors: Array<{ field: string[]; message: string }> } }>({
    query,
    variables: {
      checkoutId,
      lineItems: lineItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
        customAttributes: item.customAttributes || [],
      })),
    },
  });

  if (data.checkoutLineItemsAdd.checkoutUserErrors.length > 0) {
    throw new Error(data.checkoutLineItemsAdd.checkoutUserErrors[0].message);
  }

  return data.checkoutLineItemsAdd.checkout;
};

export const removeFromCheckout = async (checkoutId: string, lineItemIds: string[]): Promise<ShopifyCheckout> => {
  const query = `
    mutation CheckoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
      checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
        checkout {
          id
          webUrl
          lineItems(first: 50) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{ checkoutLineItemsRemove: { checkout: ShopifyCheckout; checkoutUserErrors: Array<{ field: string[]; message: string }> } }>({
    query,
    variables: { checkoutId, lineItemIds },
  });

  if (data.checkoutLineItemsRemove.checkoutUserErrors.length > 0) {
    throw new Error(data.checkoutLineItemsRemove.checkoutUserErrors[0].message);
  }

  return data.checkoutLineItemsRemove.checkout;
};

export const getCheckout = async (checkoutId: string): Promise<ShopifyCheckout> => {
  const query = `
    query GetCheckout($checkoutId: ID!) {
      node(id: $checkoutId) {
        ... on Checkout {
          id
          webUrl
          lineItems(first: 50) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          totalTax {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ node: ShopifyCheckout }>({
    query,
    variables: { checkoutId },
  });

  return data.node;
};