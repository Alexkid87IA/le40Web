/**
 * Formules Data
 * Service levels available for studio bookings
 */

import type { Formule } from './types';

export const FORMULES: Formule[] = [
  {
    id: 'autonome',
    name: 'Autonome',
    tagline: 'Je gère, vous installez',
    price: 0,
    unit: 'inclus',
    color: 'emerald',
    icon: '🟢',
    features: [
      'Installation du matériel par notre tech',
      'Briefing de 15 minutes',
      'Support téléphone pendant la session',
      'Vous gérez le reste en toute autonomie',
    ],
    variants: [
      { duration: '2h', price: 0, sku: 'FORM-AUTO-2H' },
      { duration: '4h', price: 0, sku: 'FORM-AUTO-4H' },
      { duration: '8h', price: 0, sku: 'FORM-AUTO-8H' },
    ],
  },
  {
    id: 'assiste',
    name: 'Assisté',
    tagline: 'Accompagnement technique',
    price: 60,
    unit: '/h',
    color: 'amber',
    icon: '🟡',
    recommended: true,
    features: [
      'Tout le pack Autonome',
      'Tech dédié pendant toute la session',
      'Cadrage et recadrage temps réel',
      'Gestion éclairage et audio',
      'Monitoring et conseils posture',
      'Backup fichiers sécurisé',
    ],
    variants: [
      { duration: '2h', price: 120, sku: 'FORM-ASSIST-2H' },
      { duration: '4h', price: 220, sku: 'FORM-ASSIST-4H' },
      { duration: '8h', price: 400, sku: 'FORM-ASSIST-8H' },
    ],
  },
  {
    id: 'full-service',
    name: 'Full Service',
    tagline: 'Expertise totale, clé en main',
    price: 295,
    unit: '/h',
    color: 'red',
    icon: '🔴',
    features: [
      'Tout le pack Assisté',
      'Appel stratégique avant tournage',
      'Rédaction script incluse',
      'Direction artistique complète',
      'Coaching caméra personnalisé',
      'Montage professionnel inclus',
      'Color grading cinématique',
      'Mixage audio broadcast',
      'Sous-titres incrustés',
      '3 formats de sortie (16:9, 9:16, 1:1)',
      'Miniature YouTube offerte',
      '2 révisions incluses',
      'Livraison en 5 jours',
    ],
    variants: [
      { duration: '2h', price: 590, sku: 'FORM-FULL-2H' },
      { duration: '4h', price: 990, sku: 'FORM-FULL-4H' },
      { duration: '8h', price: 1790, sku: 'FORM-FULL-8H' },
    ],
  },
];

/**
 * Find formule by ID
 */
export function findFormuleById(id: string): Formule | undefined {
  return FORMULES.find(f => f.id === id);
}

/**
 * Get formule price for a specific duration
 */
export function getFormulePrice(formule: Formule, duration: string): number {
  const variant = formule.variants.find(v => v.duration === duration);
  return variant?.price || 0;
}

/**
 * Get recommended formule
 */
export function getRecommendedFormule(): Formule | undefined {
  return FORMULES.find(f => f.recommended);
}

/**
 * Formule comparison features for table
 */
export const FORMULE_COMPARISON = [
  { feature: 'Installation matériel', autonome: true, assiste: true, fullService: true },
  { feature: 'Tech dédié', autonome: false, assiste: true, fullService: true },
  { feature: 'Montage inclus', autonome: false, assiste: false, fullService: true },
  { feature: 'Script inclus', autonome: false, assiste: false, fullService: true },
  { feature: 'Livraison clé en main', autonome: false, assiste: false, fullService: true },
] as const;
