import { StudioAdditionalService } from './studioAdditionalServices';

export interface StudioRecommendation {
  studioId: string;
  studioName: string;
  recommendedServices: {
    serviceId: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
  }[];
  recommendedBundles: string[];
}

export const studioRecommendations: StudioRecommendation[] = [
  {
    studioId: 'face-cam',
    studioName: 'Studio Face-Cam Solo',
    recommendedServices: [
      {
        serviceId: 'teleprompter',
        priority: 'high',
        reason: 'Essentiel pour formations et présentations fluides'
      },
      {
        serviceId: 'script-writing',
        priority: 'high',
        reason: 'Scripts professionnels pour contenus structurés'
      },
      {
        serviceId: 'montage-standard',
        priority: 'high',
        reason: 'Montage optimisé pour YouTube et formations'
      },
      {
        serviceId: 'clipping-shorts',
        priority: 'medium',
        reason: 'Maximisez la portée avec des extraits courts'
      },
      {
        serviceId: 'copywriting-youtube',
        priority: 'medium',
        reason: 'Descriptions SEO pour meilleure visibilité'
      },
      {
        serviceId: 'miniatures',
        priority: 'medium',
        reason: 'Miniatures professionnelles = plus de clics'
      },
      {
        serviceId: 'seo-youtube',
        priority: 'low',
        reason: 'Optimisation complète pour référencement'
      }
    ],
    recommendedBundles: ['pack-creator-pro', 'pack-entrepreneur']
  },
  {
    studioId: 'podcast-audio',
    studioName: 'Studio Podcast Audio',
    recommendedServices: [
      {
        serviceId: 'camera-extra',
        priority: 'high',
        reason: 'Ajoutez la vidéo pour élargir votre audience'
      },
      {
        serviceId: 'montage-standard',
        priority: 'high',
        reason: 'Post-production audio et vidéo professionnelle'
      },
      {
        serviceId: 'mixage-audio',
        priority: 'high',
        reason: 'Son professionnel de qualité broadcast'
      },
      {
        serviceId: 'clipping-shorts',
        priority: 'medium',
        reason: 'Extraits viraux pour TikTok et Reels'
      },
      {
        serviceId: 'podcast-to-blog',
        priority: 'medium',
        reason: 'Réutilisez votre contenu en articles SEO'
      },
      {
        serviceId: 'sous-titrage',
        priority: 'low',
        reason: 'Accessibilité et engagement améliorés'
      }
    ],
    recommendedBundles: ['pack-podcast-pro', 'pack-creator-pro']
  },
  {
    studioId: 'stream',
    studioName: 'Studio Live Stream',
    recommendedServices: [
      {
        serviceId: 'live-switch',
        priority: 'high',
        reason: 'Multi-streaming déjà optimisé avec ATEM'
      },
      {
        serviceId: 'camera-extra',
        priority: 'medium',
        reason: 'Ajoutez un 4ème angle pour plus de dynamisme'
      },
      {
        serviceId: 'montage-premium',
        priority: 'medium',
        reason: 'Highlights de qualité pour YouTube'
      },
      {
        serviceId: 'clipping-shorts',
        priority: 'high',
        reason: 'Best moments en clips courts viraux'
      },
      {
        serviceId: 'incrustation-graphics',
        priority: 'low',
        reason: 'Package graphique personnalisé'
      }
    ],
    recommendedBundles: ['pack-streaming', 'pack-creator-pro']
  },
  {
    studioId: 'full-show',
    studioName: 'Studio Émission/Talk-Show',
    recommendedServices: [
      {
        serviceId: 'teleprompter',
        priority: 'high',
        reason: 'Script professionnel pour émissions fluides'
      },
      {
        serviceId: 'script-writing',
        priority: 'high',
        reason: 'Structure narrative professionnelle'
      },
      {
        serviceId: 'montage-premium',
        priority: 'high',
        reason: 'Qualité broadcast pour émissions'
      },
      {
        serviceId: 'camera-extra',
        priority: 'medium',
        reason: '7ème caméra pour plan large ou détails'
      },
      {
        serviceId: 'incrustation-graphics',
        priority: 'medium',
        reason: 'Lower thirds et graphics sur mesure'
      },
      {
        serviceId: 'clipping-shorts',
        priority: 'medium',
        reason: 'Extraits percutants pour réseaux sociaux'
      }
    ],
    recommendedBundles: ['pack-growth-accelerator', 'pack-entrepreneur']
  },
  {
    studioId: 'intimiste',
    studioName: 'Studio Interview Intimiste',
    recommendedServices: [
      {
        serviceId: 'montage-premium',
        priority: 'high',
        reason: 'Look cinéma pour interviews de qualité'
      },
      {
        serviceId: 'script-writing',
        priority: 'medium',
        reason: 'Questions structurées pour interviews fluides'
      },
      {
        serviceId: 'clipping-shorts',
        priority: 'high',
        reason: 'Moments forts en extraits courts'
      },
      {
        serviceId: 'camera-extra',
        priority: 'medium',
        reason: '3ème angle pour inserts et détails'
      },
      {
        serviceId: 'podcast-to-blog',
        priority: 'low',
        reason: 'Transformez interviews en articles'
      }
    ],
    recommendedBundles: ['pack-podcast-pro', 'pack-entrepreneur']
  },
  {
    studioId: 'vertical-social',
    studioName: 'Studio Vertical Social',
    recommendedServices: [
      {
        serviceId: 'clipping-shorts',
        priority: 'high',
        reason: 'Automatisation complète pour 10-20 contenus'
      },
      {
        serviceId: 'montage-standard',
        priority: 'high',
        reason: 'Optimisation rapide spéciale courts formats'
      },
      {
        serviceId: 'titles-pack',
        priority: 'high',
        reason: '10 variations de titres accrocheurs'
      },
      {
        serviceId: 'multi-platform-distribution',
        priority: 'medium',
        reason: 'Distribution automatique sur toutes plateformes'
      },
      {
        serviceId: 'content-strategy',
        priority: 'medium',
        reason: 'Stratégie viral pour formats courts'
      },
      {
        serviceId: 'sous-titrage',
        priority: 'low',
        reason: 'Sous-titres auto pour engagement maximal'
      }
    ],
    recommendedBundles: ['pack-creator-pro', 'pack-streaming']
  }
];

export const getRecommendationsForStudio = (studioId: string): StudioRecommendation | undefined => {
  return studioRecommendations.find(rec => rec.studioId === studioId);
};

export const getHighPriorityServices = (studioId: string): string[] => {
  const recommendations = getRecommendationsForStudio(studioId);
  if (!recommendations) return [];

  return recommendations.recommendedServices
    .filter(service => service.priority === 'high')
    .map(service => service.serviceId);
};

export const getRecommendedBundles = (studioId: string): string[] => {
  const recommendations = getRecommendationsForStudio(studioId);
  return recommendations?.recommendedBundles || [];
};

export const getServiceRecommendationReason = (studioId: string, serviceId: string): string | undefined => {
  const recommendations = getRecommendationsForStudio(studioId);
  if (!recommendations) return undefined;

  const service = recommendations.recommendedServices.find(s => s.serviceId === serviceId);
  return service?.reason;
};

export const sortServicesByRecommendation = (
  services: StudioAdditionalService[],
  studioId: string
): StudioAdditionalService[] => {
  const recommendations = getRecommendationsForStudio(studioId);
  if (!recommendations) return services;

  const priorityMap: { [key: string]: number } = {
    high: 3,
    medium: 2,
    low: 1
  };

  return [...services].sort((a, b) => {
    const aRec = recommendations.recommendedServices.find(s => s.serviceId === a.id);
    const bRec = recommendations.recommendedServices.find(s => s.serviceId === b.id);

    const aPriority = aRec ? priorityMap[aRec.priority] : 0;
    const bPriority = bRec ? priorityMap[bRec.priority] : 0;

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;

    return 0;
  });
};

export const getUpsellSuggestions = (
  studioId: string,
  selectedServices: string[]
): {
  service: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}[] => {
  const recommendations = getRecommendationsForStudio(studioId);
  if (!recommendations) return [];

  return recommendations.recommendedServices
    .filter(rec => !selectedServices.includes(rec.serviceId))
    .sort((a, b) => {
      const priorityMap: { [key: string]: number } = { high: 3, medium: 2, low: 1 };
      return priorityMap[b.priority] - priorityMap[a.priority];
    })
    .slice(0, 3)
    .map(rec => ({
      service: rec.serviceId,
      reason: rec.reason,
      priority: rec.priority
    }));
};
