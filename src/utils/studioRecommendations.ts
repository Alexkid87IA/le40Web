import { optionsCatalog } from '../data/studios/options';
import { studioSetups } from '../data/studios/setups';
import { formulas } from '../data/studios/formulas';

export interface RecommendationContext {
  studioId: string;
  formulaId: string;
  durationHours: number;
  budget?: number;
  contentType?: string;
}

export interface OptionRecommendation {
  optionId: string;
  score: number;
  reason: string;
  savings?: number;
  category: 'essential' | 'recommended' | 'premium';
}

export interface BundleRecommendation {
  name: string;
  options: string[];
  totalPrice: number;
  originalPrice: number;
  discount: number;
  description: string;
}

export function getSmartRecommendations(context: RecommendationContext): OptionRecommendation[] {
  const studio = studioSetups.find(s => s.id === context.studioId);
  const formula = formulas.find(f => f.id === context.formulaId);

  if (!studio || !formula) return [];

  const recommendations: OptionRecommendation[] = [];

  Object.entries(optionsCatalog).forEach(([optionId, option]) => {
    let score = 0;
    let reason = '';
    let category: 'essential' | 'recommended' | 'premium' = 'recommended';

    if (studio.relevantOptions?.includes(optionId)) {
      score += 30;
    }

    if (formula.id === 'postprod' || formula.id === 'expert') {
      if (optionId === 'color-grading') {
        score += 25;
        reason = 'Essentiel pour une production professionnelle avec post-production';
        category = 'essential';
      }
      if (optionId === 'subtitles') {
        score += 20;
        reason = 'Augmente l\'engagement de +40% sur les réseaux sociaux';
        category = 'recommended';
      }
    }

    if (context.studioId === 'tiktok' || context.studioId === 'face-cam') {
      if (optionId === 'shorts-pack') {
        score += 35;
        reason = 'Pack parfait pour maximiser votre contenu vertical';
        category = 'essential';
      }
      if (optionId === 'subtitles') {
        score += 30;
        reason = 'Indispensable pour les vidéos sans son';
        category = 'essential';
      }
    }

    if (context.studioId === 'full-show' || context.studioId === 'stream') {
      if (optionId === 'live-switch') {
        score += 40;
        reason = 'Montage en direct - gagnez des heures de post-production';
        category = 'essential';
      }
    }

    if (context.studioId === 'intimiste' || context.studioId === 'face-cam') {
      if (optionId === 'teleprompter') {
        score += 25;
        reason = 'Fluidité professionnelle pour vos prises de parole';
        category = 'recommended';
      }
    }

    if (context.durationHours >= 3) {
      if (optionId === 'buffet') {
        score += 15;
        reason = 'Confort pour votre équipe durant une longue session';
        category = 'recommended';
      }
    }

    if (option.recommended || option.popular) {
      score += 15;
      if (!reason) reason = 'Option très appréciée par nos clients';
    }

    if (score > 0) {
      recommendations.push({
        optionId,
        score,
        reason: reason || 'Compatible avec votre configuration',
        category
      });
    }
  });

  recommendations.sort((a, b) => b.score - a.score);

  return recommendations;
}

export function getBundleRecommendations(context: RecommendationContext): BundleRecommendation[] {
  const bundles: BundleRecommendation[] = [];

  if (context.studioId === 'tiktok' || context.studioId === 'face-cam') {
    const viralBundle = ['shorts-pack', 'subtitles', 'thumbnail'];
    const totalPrice = viralBundle.reduce((sum, id) => {
      const option = optionsCatalog[id as keyof typeof optionsCatalog];
      return sum + option.price;
    }, 0);

    bundles.push({
      name: 'Pack Viral',
      options: viralBundle,
      totalPrice: Math.round(totalPrice * 0.85),
      originalPrice: totalPrice,
      discount: 15,
      description: 'Optimisez votre contenu pour les réseaux sociaux'
    });
  }

  if (context.studioId === 'full-show' || context.studioId === 'stream') {
    const liveBundle = ['live-switch', 'extra-cameras', 'buffet'];
    const totalPrice = liveBundle.reduce((sum, id) => {
      const option = optionsCatalog[id as keyof typeof optionsCatalog];
      return sum + (option.unit === '/h' ? option.price * context.durationHours : option.price);
    }, 0);

    bundles.push({
      name: 'Pack Émission Live',
      options: liveBundle,
      totalPrice: Math.round(totalPrice * 0.88),
      originalPrice: totalPrice,
      discount: 12,
      description: 'Solution complète pour productions live professionnelles'
    });
  }

  if (context.formulaId === 'postprod' || context.formulaId === 'expert') {
    const proBundle = ['color-grading', 'subtitles', 'thumbnail'];
    const totalPrice = proBundle.reduce((sum, id) => {
      const option = optionsCatalog[id as keyof typeof optionsCatalog];
      return sum + option.price;
    }, 0);

    bundles.push({
      name: 'Pack Pro Finition',
      options: proBundle,
      totalPrice: Math.round(totalPrice * 0.82),
      originalPrice: totalPrice,
      discount: 18,
      description: 'Finition professionnelle complète'
    });
  }

  const growthBundle = ['calendar', 'dashboard', 'tiktok-boost'];
  const growthTotal = growthBundle.reduce((sum, id) => {
    const option = optionsCatalog[id as keyof typeof optionsCatalog];
    return sum + option.price;
  }, 0);

  bundles.push({
    name: 'Pack Croissance',
    options: growthBundle,
    totalPrice: Math.round(growthTotal * 0.80),
    originalPrice: growthTotal,
    discount: 20,
    description: 'Stratégie complète pour développer votre audience'
  });

  return bundles;
}

export function calculateBundleSavings(selectedOptions: string[], context: RecommendationContext): number {
  const bundles = getBundleRecommendations(context);

  for (const bundle of bundles) {
    const allOptionsSelected = bundle.options.every(opt => selectedOptions.includes(opt));
    if (allOptionsSelected) {
      return bundle.originalPrice - bundle.totalPrice;
    }
  }

  return 0;
}

export function getFrequentlyBoughtTogether(optionId: string, studioId: string): string[] {
  const commonPairs: Record<string, string[]> = {
    'live-switch': ['extra-cameras', 'buffet'],
    'shorts-pack': ['subtitles', 'thumbnail'],
    'teleprompter': ['color-grading', 'subtitles'],
    'color-grading': ['subtitles', 'thumbnail'],
    'calendar': ['dashboard', 'tiktok-boost'],
    'extra-cameras': ['live-switch', 'buffet'],
    'subtitles': ['shorts-pack', 'thumbnail'],
    'buffet': ['transport-gare', 'live-switch']
  };

  return commonPairs[optionId] || [];
}

export function getSocialProofForOption(optionId: string): {
  popularityPercent: number;
  satisfactionRating: number;
  testimonial?: string;
} {
  const popularOptions: Record<string, any> = {
    'live-switch': {
      popularityPercent: 78,
      satisfactionRating: 4.9,
      testimonial: 'Un gain de temps incroyable - plus besoin de post-prod !'
    },
    'shorts-pack': {
      popularityPercent: 85,
      satisfactionRating: 4.8,
      testimonial: 'Parfait pour multiplier la portée de mon contenu'
    },
    'teleprompter': {
      popularityPercent: 72,
      satisfactionRating: 4.7,
      testimonial: 'Mes vidéos sont beaucoup plus fluides maintenant'
    },
    'color-grading': {
      popularityPercent: 68,
      satisfactionRating: 4.9,
      testimonial: 'Le rendu est vraiment cinématographique'
    },
    'subtitles': {
      popularityPercent: 81,
      satisfactionRating: 4.6,
      testimonial: 'Essentiel pour l\'engagement sur les réseaux'
    }
  };

  return popularOptions[optionId] || {
    popularityPercent: 45,
    satisfactionRating: 4.5
  };
}
