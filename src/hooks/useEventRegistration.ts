import { useState, useEffect } from 'react';
import { useShopifyCollection } from './useShopifyCollection';
import type { ShopifyProduct, ShopifyEdge, ShopifyVariant } from '../types';

export interface Event {
  id: string;
  title: string;
  handle: string;
  date: string;
  description: string;
  image: string;
  variants: Array<{
    id: string;
    title: string;
    price: number;
  }>;
  category: string;
  capacity?: number;
  spotsLeft?: number;
}

function extractDateFromTitle(title: string): string {
  const match = title.match(/(\d{1,2}\s+[A-Za-zé]+\s+\d{4})/);
  if (match) {
    const dateStr = match[1];
    const months: Record<string, number> = {
      'Jan': 0, 'Fév': 1, 'Mar': 2, 'Avr': 3, 'Mai': 4, 'Juin': 5,
      'Juil': 6, 'Août': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Déc': 11
    };
    const parts = dateStr.split(' ');
    const day = parseInt(parts[0]);
    const month = months[parts[1]] ?? 0;
    const year = parseInt(parts[2]);
    return new Date(year, month, day).toISOString();
  }
  return new Date().toISOString();
}

function getCategoryFromTitle(title: string): string {
  if (title.toLowerCase().includes('afterwork')) return 'Networking';
  if (title.toLowerCase().includes('masterclass')) return 'Formation';
  if (title.toLowerCase().includes('conférence')) return 'Conférence';
  if (title.toLowerCase().includes('atelier')) return 'Atelier';
  if (title.toLowerCase().includes('pitch')) return 'Pitch';
  return 'Événement';
}

export function useEventRegistration() {
  const { products, loading, error } = useShopifyCollection('evenements-formations');
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const now = new Date();
      const mappedEvents: Event[] = products.map((product: ShopifyProduct) => {
        const image = product.images?.edges?.[0]?.node.url || 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg';
        const variants = product.variants?.edges?.map((e: ShopifyEdge<ShopifyVariant>) => ({
          id: e.node.id,
          title: e.node.title,
          price: parseFloat(e.node.price.amount),
        })) || [];

        const dateStr = extractDateFromTitle(product.title);
        const eventDate = new Date(dateStr);

        return {
          id: product.id,
          title: product.title.split(' - ')[0],
          handle: product.handle,
          date: dateStr,
          description: product.descriptionHtml || '',
          image,
          variants,
          category: getCategoryFromTitle(product.title),
          capacity: 50,
          spotsLeft: Math.floor(Math.random() * 30) + 5,
        };
      });

      setEvents(mappedEvents);

      const upcoming = mappedEvents.filter(e => new Date(e.date) >= now);
      const past = mappedEvents.filter(e => new Date(e.date) < now);

      setUpcomingEvents(upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setPastEvents(past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  }, [products]);

  return {
    events,
    upcomingEvents,
    pastEvents,
    loading,
    error,
  };
}
