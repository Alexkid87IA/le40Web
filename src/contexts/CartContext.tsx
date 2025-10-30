import { createContext, useState, useEffect, ReactNode } from 'react';

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

export interface CartItem {
  id: string;
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

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  calculateStudioTotal: (item: CartItem) => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('le40-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('le40-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(prev => {
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
      } else {
        const existingItem = prev.find(item =>
          item.id === newItem.id &&
          item.date === newItem.date &&
          item.startTime === newItem.startTime
        );

        if (existingItem) {
          return prev.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
      }

      return [...prev, { ...newItem, id: `${newItem.serviceType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }];
    });

    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const calculateStudioTotal = (item: CartItem): number => {
    if (item.serviceType !== 'studio' || !item.studioConfig) {
      return item.price * item.quantity;
    }

    const config = item.studioConfig;
    const basePrice = item.price * config.durationHours * config.formulaMultiplier * config.durationMultiplier;

    let optionsTotal = 0;
    config.options.forEach(option => {
      optionsTotal += option.price;
    });

    const total = basePrice + optionsTotal;

    return total * item.quantity;
  };

  const totalPrice = items.reduce((sum, item) => {
    if (item.serviceType === 'studio' && item.studioConfig) {
      return sum + calculateStudioTotal(item);
    }
    return sum + (item.price * item.quantity);
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
        itemCount,
        isOpen,
        setIsOpen,
        calculateStudioTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
