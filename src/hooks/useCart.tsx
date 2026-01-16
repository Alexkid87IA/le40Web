/**
 * @deprecated Utilisez useUnifiedCart à la place.
 * Ce hook est conservé pour compatibilité avec les anciens composants.
 */
import { useUnifiedCart } from './useUnifiedCart';
import type { LocalCartItem } from '../contexts/UnifiedCartContext';

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
  studioConfig?: {
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
  };
  image?: string;
  gradient?: string;
}

/**
 * @deprecated Utilisez useUnifiedCart à la place.
 */
export const useCart = () => {
  const unified = useUnifiedCart();

  // Filtrer pour ne garder que les items locaux (compatibilité)
  const items: CartItem[] = unified.items
    .filter((item): item is LocalCartItem => item.type === 'local')
    .map(item => ({
      id: item.id,
      serviceType: item.serviceType,
      serviceName: item.serviceName,
      date: item.date,
      startTime: item.startTime,
      endTime: item.endTime,
      duration: item.duration,
      price: item.price,
      quantity: item.quantity,
      studioConfig: item.studioConfig,
      image: item.image,
      gradient: item.gradient,
    }));

  const addItem = (item: Omit<CartItem, 'id'>) => {
    unified.addLocalItem({
      serviceType: item.serviceType,
      serviceName: item.serviceName,
      date: item.date,
      startTime: item.startTime,
      endTime: item.endTime,
      duration: item.duration,
      price: item.price,
      quantity: item.quantity,
      studioConfig: item.studioConfig,
      image: item.image,
      gradient: item.gradient,
    });
  };

  const removeItem = (id: string) => {
    unified.removeItem(id);
  };

  const updateQuantity = (id: string, quantity: number) => {
    unified.updateQuantity(id, quantity);
  };

  const clearCart = () => {
    unified.clearCart();
  };

  const calculateStudioTotal = (item: CartItem): number => {
    if (item.serviceType !== 'studio' || !item.studioConfig) {
      return item.price * item.quantity;
    }

    const config = item.studioConfig;
    const basePrice = item.price * config.durationMultiplier * config.formulaMultiplier;

    let optionsTotal = 0;
    config.options.forEach(option => {
      optionsTotal += option.price;
    });

    return (basePrice + optionsTotal) * item.quantity;
  };

  // Calculer le total uniquement pour les items locaux
  const totalPrice = items.reduce((sum, item) => {
    if (item.serviceType === 'studio' && item.studioConfig) {
      return sum + calculateStudioTotal(item);
    }
    return sum + (item.price * item.quantity);
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    itemCount,
    isOpen: unified.isOpen,
    setIsOpen: unified.setIsOpen,
    calculateStudioTotal,
  };
};
