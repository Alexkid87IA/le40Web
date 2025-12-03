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
  tags: string[];
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
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice: {
          amount: string;
          currencyCode: string;
        } | null;
        availableForSale: boolean;
        quantityAvailable: number;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
        image: {
          url: string;
          altText: string | null;
        } | null;
      };
    }>;
  };
  metafields: Array<{
    key: string;
    value: string;
    namespace: string;
  } | null>;
}

// ============================================================
// NOUVELLE API CART (remplace Checkout)
// ============================================================

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    } | null;
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
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
          product: {
            title: string;
            handle: string;
          };
        };
        attributes: Array<{
          key: string;
          value: string;
        }>;
      };
    }>;
  };
}

// Type simplifié pour le cart retourné
export interface ShopifyCartSimple {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        attributes: Array<{
          key: string;
          value: string;
        }>;
        merchandise: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          image?: {
            url: string;
            altText: string | null;
          } | null;
          product: {
            title: string;
            handle: string;
          };
        };
      };
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

// ============================================================
// CART MUTATIONS
// ============================================================

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          merchandise {
            ... on ProductVariant {
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
              product {
                title
                handle
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
  }
`;

export const createCart = async (
  lines: Array<{ 
    merchandiseId: string; 
    quantity: number; 
    attributes?: Array<{ key: string; value: string }> 
  }> = []
): Promise<ShopifyCartSimple> => {
  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<{ 
    cartCreate: { 
      cart: ShopifyCartSimple; 
      userErrors: Array<{ field: string[]; message: string }> 
    } 
  }>({
    query,
    variables: {
      input: {
        lines: lines.map(line => ({
          merchandiseId: line.merchandiseId,
          quantity: line.quantity,
          attributes: line.attributes || [],
        })),
      },
    },
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
};

export const addToCart = async (
  cartId: string,
  lines: Array<{ 
    merchandiseId: string; 
    quantity: number; 
    attributes?: Array<{ key: string; value: string }> 
  }>
): Promise<ShopifyCartSimple> => {
  const query = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<{ 
    cartLinesAdd: { 
      cart: ShopifyCartSimple; 
      userErrors: Array<{ field: string[]; message: string }> 
    } 
  }>({
    query,
    variables: {
      cartId,
      lines: lines.map(line => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
        attributes: line.attributes || [],
      })),
    },
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
};

export const removeFromCart = async (
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCartSimple> => {
  const query = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<{ 
    cartLinesRemove: { 
      cart: ShopifyCartSimple; 
      userErrors: Array<{ field: string[]; message: string }> 
    } 
  }>({
    query,
    variables: { cartId, lineIds },
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
};

export const getCart = async (cartId: string): Promise<ShopifyCartSimple | null> => {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<{ cart: ShopifyCartSimple | null }>({
    query,
    variables: { cartId },
  });

  return data.cart;
};

// ============================================================
// ANCIENNE API CHECKOUT (pour compatibilité)
// Redirige vers la nouvelle API Cart
// ============================================================

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
          image?: {
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

// Fonction de compatibilité - convertit Cart en format Checkout
const cartToCheckout = (cart: ShopifyCartSimple): ShopifyCheckout => {
  return {
    id: cart.id,
    webUrl: cart.checkoutUrl,
    lineItems: {
      edges: cart.lines.edges.map(edge => ({
        node: {
          id: edge.node.id,
          title: edge.node.merchandise.product.title,
          quantity: edge.node.quantity,
          variant: {
            id: edge.node.merchandise.id,
            title: edge.node.merchandise.title,
            price: edge.node.merchandise.price,
            image: edge.node.merchandise.image,
          },
        },
      })),
    },
    subtotalPrice: cart.cost.subtotalAmount,
    totalPrice: cart.cost.totalAmount,
    totalTax: { amount: '0', currencyCode: 'EUR' },
  };
};

// Fonctions de compatibilité qui utilisent la nouvelle API Cart
export const createCheckout = async (
  lineItems: Array<{ 
    variantId: string; 
    quantity: number; 
    customAttributes?: Array<{ key: string; value: string }> 
  }> = []
): Promise<ShopifyCheckout> => {
  const cart = await createCart(
    lineItems.map(item => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
      attributes: item.customAttributes,
    }))
  );
  return cartToCheckout(cart);
};

export const addToCheckout = async (
  checkoutId: string,
  lineItems: Array<{ 
    variantId: string; 
    quantity: number; 
    customAttributes?: Array<{ key: string; value: string }> 
  }>
): Promise<ShopifyCheckout> => {
  const cart = await addToCart(
    checkoutId,
    lineItems.map(item => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
      attributes: item.customAttributes,
    }))
  );
  return cartToCheckout(cart);
};

export const removeFromCheckout = async (
  checkoutId: string,
  lineItemIds: string[]
): Promise<ShopifyCheckout> => {
  const cart = await removeFromCart(checkoutId, lineItemIds);
  return cartToCheckout(cart);
};

export const getCheckout = async (checkoutId: string): Promise<ShopifyCheckout> => {
  const cart = await getCart(checkoutId);
  if (!cart) {
    throw new Error('Cart not found');
  }
  return cartToCheckout(cart);
};

// ============================================================
// PRODUCTS & COLLECTIONS
// ============================================================

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
                  quantityAvailable
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
            metafields(identifiers: [
              {namespace: "custom", key: "calendar_sync_required"},
              {namespace: "custom", key: "resource_type"},
              {namespace: "custom", key: "capacity"},
              {namespace: "custom", key: "gradient"}
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
              quantityAvailable
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
            }
          }
        }
        metafields(identifiers: [
          {namespace: "custom", key: "calendar_sync_required"},
          {namespace: "custom", key: "resource_type"},
          {namespace: "custom", key: "capacity"},
          {namespace: "custom", key: "gradient"}
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

export const getCollection = async (handle: string): Promise<ShopifyProduct[]> => {
  const query = `
    query GetCollection($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        products(first: 50) {
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
                    quantityAvailable
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
              metafields(identifiers: [
                {namespace: "custom", key: "calendar_sync_required"},
                {namespace: "custom", key: "resource_type"},
                {namespace: "custom", key: "capacity"},
                {namespace: "custom", key: "gradient"}
              ]) {
                key
                value
                namespace
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ 
    collectionByHandle: { 
      id: string; 
      title: string; 
      products: { edges: Array<{ node: ShopifyProduct }> } 
    } | null 
  }>({
    query,
    variables: { handle },
  });

  if (!data.collectionByHandle) {
    console.warn(`Collection "${handle}" not found`);
    return [];
  }

  return data.collectionByHandle.products.edges.map(edge => edge.node);
};