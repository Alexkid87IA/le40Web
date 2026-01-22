import { useState, useEffect } from 'react';
import { spaces } from '../data/salles/spaces';

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
  gradient?: string;
  accentColor?: string;
  popular?: boolean;
}

export function useRoomBooking() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Utiliser les données locales directement
    try {
      const mappedRooms: Room[] = spaces.map((space) => ({
        id: space.id,
        title: space.title,
        handle: space.id,
        capacity: space.capacity,
        description: space.description,
        images: space.images,
        variants: [
          {
            id: `${space.id}-hour`,
            title: 'Heure',
            price: space.price,
          },
          {
            id: `${space.id}-half-day`,
            title: 'Demi-journée (4h)',
            price: space.price * 3.5,
          },
          {
            id: `${space.id}-full-day`,
            title: 'Journée (8h)',
            price: space.price * 6,
          },
        ],
        features: space.features,
        category: space.category,
        gradient: space.gradient,
        accentColor: space.accentColor,
        popular: space.popular,
      }));

      setRooms(mappedRooms);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
      setLoading(false);
    }
  }, []);

  return {
    rooms,
    loading,
    error,
  };
}
