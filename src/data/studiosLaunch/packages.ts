export interface Package {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge?: string;
  popular?: boolean;
  includedServices: string[];
  totalValue: number;
  packagePrice: number;
  savings: number;
  recommendedFor: string[];
}

export const packages: Package[] = [
  {
    id: "creator-starter",
    name: "Pack Créateur Débutant",
    description: "Tout pour lancer votre chaîne YouTube avec un premier contenu pro",
    icon: "🚀",
    popular: true,
    badge: "Best-seller",
    includedServices: [
      "post-production",
      "thumbnail-pro",
      "seo-optimization",
      "shorts-pack"
    ],
    totalValue: 346,
    packagePrice: 279,
    savings: 67,
    recommendedFor: ["creator"]
  },
  {
    id: "viral-accelerator",
    name: "Pack Viralité Maximum",
    description: "Multipliez votre reach avec shorts, SEO et diffusion optimisée",
    icon: "🔥",
    badge: "Viral",
    includedServices: [
      "post-production",
      "thumbnail-pro",
      "shorts-pack-5",
      "seo-optimization",
      "distribution-pro",
      "subtitles-animated"
    ],
    totalValue: 665,
    packagePrice: 499,
    savings: 166,
    recommendedFor: ["creator", "enterprise"]
  },
  {
    id: "enterprise-complete",
    name: "Pack Entreprise Premium",
    description: "Solution complète avec stratégie, production et distribution multi-canal",
    icon: "💼",
    badge: "Premium",
    includedServices: [
      "complete-solution",
      "content-strategy",
      "motion-graphics",
      "color-grading-cinema",
      "sound-design",
      "multi-format-export",
      "distribution-pro"
    ],
    totalValue: 1163,
    packagePrice: 899,
    savings: 264,
    recommendedFor: ["enterprise", "production"]
  },
  {
    id: "expert-coaching",
    name: "Pack Montée en Compétences",
    description: "Coaching + scripts + stratégie pour créer du contenu impactant",
    icon: "🎓",
    includedServices: [
      "content-strategy",
      "script-writing",
      "coaching-on-camera",
      "viral-analysis"
    ],
    totalValue: 776,
    packagePrice: 599,
    savings: 177,
    recommendedFor: ["creator", "enterprise"]
  },
  {
    id: "launch-campaign",
    name: "Pack Lancement Produit",
    description: "Tout pour un lancement réussi avec visibilité maximale",
    icon: "🎯",
    badge: "ROI garanti",
    includedServices: [
      "complete-solution",
      "thumbnail-pro",
      "distribution-pro",
      "ads-campaign",
      "email-campaign",
      "press-release"
    ],
    totalValue: 1315,
    packagePrice: 999,
    savings: 316,
    recommendedFor: ["enterprise", "production"]
  },
  {
    id: "content-machine",
    name: "Pack Machine à Contenu",
    description: "Produisez massivement avec shorts, multi-formats et distribution",
    icon: "⚡",
    popular: true,
    includedServices: [
      "post-production",
      "shorts-pack-5",
      "subtitles-animated",
      "multi-format-export",
      "thumbnail-pro",
      "distribution-basic"
    ],
    totalValue: 615,
    packagePrice: 449,
    savings: 166,
    recommendedFor: ["creator"]
  }
];

export function getRecommendedPackages(
  profile: string,
  selectedFormula?: string
): Package[] {
  let recommended = packages.filter(pkg =>
    pkg.recommendedFor.includes(profile)
  );

  if (selectedFormula === 'studio-only') {
    recommended = recommended.filter(pkg =>
      !pkg.includedServices.includes('post-production') &&
      !pkg.includedServices.includes('complete-solution')
    );
  }

  return recommended.slice(0, 3);
}

export function getSmartUpsells(
  selectedOptions: string[],
  selectedFormula?: string
): string[] {
  const upsells: string[] = [];

  if (selectedFormula === 'post-production' && !selectedOptions.includes('thumbnail-pro')) {
    upsells.push('thumbnail-pro');
  }

  if (selectedOptions.includes('thumbnail-pro') && !selectedOptions.includes('seo-optimization')) {
    upsells.push('seo-optimization');
  }

  if (selectedOptions.includes('shorts-pack') && !selectedOptions.includes('distribution-pro')) {
    upsells.push('distribution-pro');
  }

  if (selectedFormula === 'complete-solution' && !selectedOptions.includes('distribution-pro')) {
    upsells.push('distribution-pro');
  }

  if (selectedOptions.includes('script-writing') && !selectedOptions.includes('coaching-on-camera')) {
    upsells.push('coaching-on-camera');
  }

  return upsells;
}
