import { useState, useEffect } from 'react';
import { useShopifyCollection } from './useShopifyCollection';
import type { ShopifyProduct, ShopifyEdge, ShopifyVariant, ShopifyImage } from '../types';

export interface Room {
  id: string;
  title: string;
  handle: string;
  capacity: string;
  description: string;
  images: string[];
  variants: Array<{
    id: string;
    title: string;
    price: number;
  }>;
  features: string[];
  category: string;
}

function extractCapacityFromTitle(title: string): string {
  const match = title.match(/(\d+[-à]\d+\s*personnes?|\d+m²|Jusqu'à\s*\d+\s*personnes?)/i);
  return match ? match[0] : 'Non spécifié';
}

function extractFeaturesFromHtml(html: string): string[] {
  const features: string[] = [];
  const liMatches = html.matchAll(/<li[^>]*>(.*?)<\/li>/gi);

  for (const match of liMatches) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (text) features.push(text);
  }

  return features;
}

function getCategoryFromTags(tags: string[]): string {
  if (tags.includes('grande-capacite') || tags.includes('conference')) {
    return 'Grande Salle';
  }
  if (tags.includes('terrasse') || tags.includes('rooftop')) {
    return 'Espaces événementiels';
  }
  if (tags.includes('lounge') || tags.includes('cafe')) {
    return 'Espaces événementiels';
  }
  return 'Salles de réunion';
}

export function useRoomBooking() {
  const { products, loading, error } = useShopifyCollection('salles-de-reunion');
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const mappedRooms: Room[] = products.map((product: ShopifyProduct) => {
        const images = product.images?.edges?.map((e: ShopifyEdge<ShopifyImage>) => e.node.url) || [];
        const variants = product.variants?.edges?.map((e: ShopifyEdge<ShopifyVariant>) => ({
          id: e.node.id,
          title: e.node.title,
          price: parseFloat(e.node.price.amount),
        })) || [];

        const tags = product.tags || [];
        const features = extractFeaturesFromHtml(product.descriptionHtml || '');

        return {
          id: product.id,
          title: product.title,
          handle: product.handle,
          capacity: extractCapacityFromTitle(product.title),
          description: product.descriptionHtml || '',
          images,
          variants,
          features,
          category: getCategoryFromTags(tags),
        };
      });

      setRooms(mappedRooms);
    }
  }, [products]);

  return {
    rooms,
    loading,
    error,
  };
}
