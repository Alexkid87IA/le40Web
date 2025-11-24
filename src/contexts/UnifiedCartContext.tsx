import { createContext, useState, useEffect, ReactNode } from 'react';
import { createCheckout, addToCheckout, removeFromCheckout, ShopifyCheckout } from '../lib/shopify';

export interface StudioConfiguration {
  studioId: string;
  formulaId: string;
  formulaName: string;
  formulaMultiplier: number;
  durationId: string;
  durationLabel: string;
  durationHours: number;
  durationMultiplier: number;
  options: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

export interface LocalCartItem {
  id: string;
  type: 'local';
  serviceType: 'coworking' | 'meeting-room' | 'studio' | 'private-office' | 'domiciliation' | 'event';
  serviceName: string;
  date: string;
  startTime?: string;
  endTime?: string;
  duration: 'hour' | 'half-day' | 'day' | 'week' | 'month';
  price: number;
  quantity: number;
  studioConfig?: StudioConfiguration;
  image?: string;
  gradient?: string;
}

export interface ShopifyCartItem {
  id: string;
  type: 'shopify';
  shopifyVariantId: string;
  shopifyLineItemId?: string;
  productTitle: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image?: string;
  availableForSale: boolean;
  customAttributes?: Array<{ key: string; value: string }>;
}

export type UnifiedCartItem = LocalCartItem | ShopifyCartItem;

interface UnifiedCartContextType {
  items: UnifiedCartItem[];
  shopifyCheckout: ShopifyCheckout | null;
  addLocalItem: (item: Omit<LocalCartItem, 'id' | 'type'>) => void;
  addShopifyItem: (item: Omit<ShopifyCartItem, 'id' | 'type'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  calculateStudioTotal: (item: LocalCartItem) => number;
  loading: boolean;
  error: string | null;
  getCheckoutUrl: () => string | null;
}

export const UnifiedCartContext = createContext<UnifiedCartContextType | undefined>(undefined);

const LOCAL_CART_KEY = 'le40-unified-cart-local';
const SHOPIFY_CHECKOUT_KEY = 'le40-shopify-checkout-id';

export const UnifiedCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [localItems, setLocalItems] = useState<LocalCartItem[]>([]);
  const [shopifyItems, setShopifyItems] = useState<ShopifyCartItem[]>([]);
  const [shopifyCheckout, setShopifyCheckout] = useState<ShopifyCheckout | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedLocalCart = localStorage.getItem(LOCAL_CART_KEY);
    if (savedLocalCart) {
      try {
        setLocalItems(JSON.parse(savedLocalCart));
      } catch (e) {
        console.error('Failed to parse local cart:', e);
      }
    }

    const savedCheckoutId = localStorage.getItem(SHOPIFY_CHECKOUT_KEY);
    if (savedCheckoutId) {
      fetchShopifyCheckout(savedCheckoutId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(localItems));
  }, [localItems]);

  const fetchShopifyCheckout = async (checkoutId: string) => {
    try {
      const { getCheckout } = await import('../lib/shopify');
      const checkout = await getCheckout(checkoutId);
      setShopifyCheckout(checkout);

      const items: ShopifyCartItem[] = checkout.lineItems.edges.map(edge => ({
        id: edge.node.id,
        type: 'shopify',
        shopifyVariantId: edge.node.variant.id,
        shopifyLineItemId: edge.node.id,
        productTitle: edge.node.title,
        variantTitle: edge.node.variant.title,
        price: parseFloat(edge.node.variant.price.amount),
        quantity: edge.node.quantity,
        image: edge.node.variant.image?.url,
        availableForSale: true,
      }));
      setShopifyItems(items);
    } catch (err) {
      console.error('Failed to fetch Shopify checkout:', err);
      localStorage.removeItem(SHOPIFY_CHECKOUT_KEY);
    }
  };

  const addLocalItem = (newItem: Omit<LocalCartItem, 'id' | 'type'>) => {
    setLocalItems(prev => {
      if (newItem.serviceType === 'studio' && newItem.studioConfig) {
        const existingItem = prev.find(item =>
          item.serviceType === 'studio' &&
          item.studioConfig?.studioId === newItem.studioConfig?.studioId &&
          item.studioConfig?.formulaId === newItem.studioConfig?.formulaId &&
          item.studioConfig?.durationId === newItem.studioConfig?.durationId &&
          JSON.stringify(item.studioConfig?.options) === JSON.stringify(newItem.studioConfig?.options)
        );

        if (existingItem) {
          return prev.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
      }

      return [...prev, {
        ...newItem,
        type: 'local',
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }];
    });
    setIsOpen(true);
  };

  const addShopifyItem = async (item: Omit<ShopifyCartItem, 'id' | 'type'>) => {
    setLoading(true);
    setError(null);

    try {
      let checkout = shopifyCheckout;

      if (!checkout) {
        checkout = await createCheckout([{
          variantId: item.shopifyVariantId,
          quantity: item.quantity,
          customAttributes: item.customAttributes,
        }]);
        setShopifyCheckout(checkout);
        localStorage.setItem(SHOPIFY_CHECKOUT_KEY, checkout.id);
      } else {
        const existingLineItem = checkout.lineItems.edges.find(
          edge => edge.node.variant.id === item.shopifyVariantId
        );

        if (existingLineItem) {
          checkout = await addToCheckout(checkout.id, [{
            variantId: item.shopifyVariantId,
            quantity: item.quantity,
            customAttributes: item.customAttributes,
          }]);
        } else {
          checkout = await addToCheckout(checkout.id, [{
            variantId: item.shopifyVariantId,
            quantity: item.quantity,
            customAttributes: item.customAttributes,
          }]);
        }
        setShopifyCheckout(checkout);
      }

      const items: ShopifyCartItem[] = checkout.lineItems.edges.map(edge => ({
        id: edge.node.id,
        type: 'shopify',
        shopifyVariantId: edge.node.variant.id,
        shopifyLineItemId: edge.node.id,
        productTitle: edge.node.title,
        variantTitle: edge.node.variant.title,
        price: parseFloat(edge.node.variant.price.amount),
        quantity: edge.node.quantity,
        image: edge.node.variant.image?.url,
        availableForSale: true,
      }));
      setShopifyItems(items);
      setIsOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      console.error('Add to Shopify cart error:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    const item = [...localItems, ...shopifyItems].find(i => i.id === id);

    if (!item) return;

    if (item.type === 'local') {
      setLocalItems(prev => prev.filter(i => i.id !== id));
    } else if (item.type === 'shopify' && shopifyCheckout) {
      setLoading(true);
      try {
        const checkout = await removeFromCheckout(shopifyCheckout.id, [id]);
        setShopifyCheckout(checkout);

        const items: ShopifyCartItem[] = checkout.lineItems.edges.map(edge => ({
          id: edge.node.id,
          type: 'shopify',
          shopifyVariantId: edge.node.variant.id,
          shopifyLineItemId: edge.node.id,
          productTitle: edge.node.title,
          variantTitle: edge.node.variant.title,
          price: parseFloat(edge.node.variant.price.amount),
          quantity: edge.node.quantity,
          image: edge.node.variant.image?.url,
          availableForSale: true,
        }));
        setShopifyItems(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to remove item');
      } finally {
        setLoading(false);
      }
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id);
      return;
    }

    const item = [...localItems, ...shopifyItems].find(i => i.id === id);
    if (!item) return;

    if (item.type === 'local') {
      setLocalItems(prev =>
        prev.map(i => i.id === id ? { ...i, quantity } : i)
      );
    } else {
      await removeItem(id);
      if (item.type === 'shopify') {
        await addShopifyItem({
          shopifyVariantId: item.shopifyVariantId,
          productTitle: item.productTitle,
          variantTitle: item.variantTitle,
          price: item.price,
          quantity,
          image: item.image,
          availableForSale: item.availableForSale,
        });
      }
    }
  };

  const clearCart = async () => {
    setLocalItems([]);
    setShopifyItems([]);
    setShopifyCheckout(null);
    localStorage.removeItem(LOCAL_CART_KEY);
    localStorage.removeItem(SHOPIFY_CHECKOUT_KEY);
  };

  const calculateStudioTotal = (item: LocalCartItem): number => {
    if (item.serviceType !== 'studio' || !item.studioConfig) {
      return item.price * item.quantity;
    }

    const config = item.studioConfig;
    const basePrice = item.price * config.durationHours * config.formulaMultiplier * config.durationMultiplier;
    const optionsTotal = config.options.reduce((sum, opt) => sum + opt.price, 0);
    return (basePrice + optionsTotal) * item.quantity;
  };

  const totalPrice = [...localItems, ...shopifyItems].reduce((sum, item) => {
    if (item.type === 'local' && item.serviceType === 'studio' && item.studioConfig) {
      return sum + calculateStudioTotal(item);
    }
    return sum + (item.price * item.quantity);
  }, 0);

  const itemCount = [...localItems, ...shopifyItems].reduce((sum, item) => sum + item.quantity, 0);

  const getCheckoutUrl = (): string | null => {
    return shopifyCheckout?.webUrl || null;
  };

  const items: UnifiedCartItem[] = [...localItems, ...shopifyItems];

  return (
    <UnifiedCartContext.Provider
      value={{
        items,
        shopifyCheckout,
        addLocalItem,
        addShopifyItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
        itemCount,
        isOpen,
        setIsOpen,
        calculateStudioTotal,
        loading,
        error,
        getCheckoutUrl,
      }}
    >
      {children}
    </UnifiedCartContext.Provider>
  );
};
