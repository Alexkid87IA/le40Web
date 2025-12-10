import { useState, useEffect } from 'react';
import { pricingPlans } from '../data/domiciliation/pricingPlans';

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

export function useDomiciliationPricing() {
  const [plans, setPlans] = useState<DomiciliationPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mappedPlans: DomiciliationPlan[] = pricingPlans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      handle: plan.id.toLowerCase().replace(/_/g, '-'),
      price: plan.price,
      priceAnnual: Math.round(plan.price * 12 * 0.8),
      period: plan.period,
      description: plan.description,
      features: plan.features,
      savings: plan.savings,
      popular: plan.popular,
    }));

    setPlans(mappedPlans);
    setLoading(false);
  }, []);

  return {
    plans,
    loading,
    error: null,
  };
}
