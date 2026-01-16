import { useEffect, useState, createContext, useContext, ReactNode, useCallback } from 'react';

/**
 * Announcer pour l'accessibilité
 * Permet d'annoncer des messages aux lecteurs d'écran via aria-live
 */

interface AnnouncerContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}

const AnnouncerContext = createContext<AnnouncerContextType | undefined>(undefined);

interface AnnouncerProviderProps {
  children: ReactNode;
}

export function AnnouncerProvider({ children }: AnnouncerProviderProps) {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (priority === 'assertive') {
      setAssertiveMessage('');
      // Small delay to ensure the screen reader picks up the change
      setTimeout(() => setAssertiveMessage(message), 50);
    } else {
      setPoliteMessage('');
      setTimeout(() => setPoliteMessage(message), 50);
    }
  }, []);

  // Clear messages after announcement
  useEffect(() => {
    if (politeMessage) {
      const timer = setTimeout(() => setPoliteMessage(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [politeMessage]);

  useEffect(() => {
    if (assertiveMessage) {
      const timer = setTimeout(() => setAssertiveMessage(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [assertiveMessage]);

  return (
    <AnnouncerContext.Provider value={{ announce }}>
      {children}

      {/* Polite announcements - for non-urgent updates */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeMessage}
      </div>

      {/* Assertive announcements - for urgent updates */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessage}
      </div>
    </AnnouncerContext.Provider>
  );
}

export function useAnnouncer() {
  const context = useContext(AnnouncerContext);
  if (!context) {
    throw new Error('useAnnouncer must be used within an AnnouncerProvider');
  }
  return context;
}

/**
 * Hook pour annoncer les changements de route
 */
export function useRouteAnnouncer(title: string) {
  const { announce } = useAnnouncer();

  useEffect(() => {
    announce(`Navigation vers ${title}`, 'polite');
  }, [title, announce]);
}

/**
 * Hook pour annoncer les ajouts au panier
 */
export function useCartAnnouncer() {
  const { announce } = useAnnouncer();

  const announceAddToCart = useCallback((productName: string) => {
    announce(`${productName} ajouté au panier`, 'polite');
  }, [announce]);

  const announceRemoveFromCart = useCallback((productName: string) => {
    announce(`${productName} retiré du panier`, 'polite');
  }, [announce]);

  const announceCartUpdate = useCallback((itemCount: number) => {
    const message = itemCount === 0
      ? 'Votre panier est vide'
      : `Votre panier contient ${itemCount} article${itemCount > 1 ? 's' : ''}`;
    announce(message, 'polite');
  }, [announce]);

  return { announceAddToCart, announceRemoveFromCart, announceCartUpdate };
}

export default AnnouncerProvider;
