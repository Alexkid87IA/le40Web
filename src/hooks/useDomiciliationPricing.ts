import { useState, useEffect } from 'react';
import { useShopifyCollection } from './useShopifyCollection';

export interface DomiciliationPlan {
  id: string;
  name: string;
  handle: string;
  price: number;
  priceAnnual: number;
  period: string;
  description: string;
  features: string[];
  savings: string[];
  popular?: boolean;
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

function extractNameFromTitle(title: string): string {
  const match = title.match(/Domiciliation\s+([A-Z-]+)/i);
  return match ? match[1] : title.replace('Domiciliation', '').trim();
}

export function useDomiciliationPricing() {
  const { products, loading, error } = useShopifyCollection('domiciliation');
  const [plans, setPlans] = useState<DomiciliationPlan[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const mappedPlans: DomiciliationPlan[] = products.map((product: any) => {
        const variants = product.variants?.edges || [];
        const monthlyVariant = variants.find((v: any) =>
          v.node.title.toLowerCase().includes('mensuel') && !v.node.title.toLowerCase().includes('annuel')
        );
        const annualVariant = variants.find((v: any) =>
          v.node.title.toLowerCase().includes('annuel')
        );

        const price = monthlyVariant ? parseFloat(monthlyVariant.node.price.amount) : 0;
        const priceAnnual = annualVariant ? parseFloat(annualVariant.node.price.amount) : price * 12 * 0.8;

        const features = extractFeaturesFromHtml(product.descriptionHtml || '');
        const tags = product.tags || [];
        const popular = tags.includes('populaire') || tags.includes('popular');

        const savings = [
          'Pas de bail commercial',
          'Pas de caution',
          'Pas de frais cachés'
        ];

        return {
          id: product.id,
          name: extractNameFromTitle(product.title),
          handle: product.handle,
          price,
          priceAnnual,
          period: '/mois',
          description: product.title.split('-')[1]?.trim() || '',
          features,
          savings,
          popular,
        };
      });

      setPlans(mappedPlans);
    }
  }, [products]);

  return {
    plans,
    loading,
    error,
  };
}
