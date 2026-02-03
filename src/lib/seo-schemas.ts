/**
 * SEO Schema.org structured data for Le 40 Coworking
 * Source unique de vérité pour tous les schemas SEO
 * Use these with the SEOHead component's schema prop
 *
 * OBJECTIF: Présentation Google maximale avec étoiles, prix, services, FAQ
 */

// ============================================================================
// DONNÉES DE BASE - Source unique de vérité
// ============================================================================

export const businessInfo = {
  name: "Le 40",
  legalName: "Le 40 Coworking",
  alternateName: ["Le 40 Coworking", "Le 40 Marseille", "Le40"],
  description: "4000m² d'espaces premium à Marseille : coworking, bureaux privés, studios de production, salles de réunion et événements. Rejoignez 127+ entrepreneurs.",
  slogan: "Développez votre activité à Marseille",
  url: "https://le40.fr",
  logo: "https://le40.fr/logo.png",
  image: [
    "https://le40.fr/og-image.jpg",
    "https://le40-cdn.b-cdn.net/homepage/home-bureaux.png",
    "https://le40-cdn.b-cdn.net/homepage/home-coworking.png"
  ],
  telephone: "+33491098789",
  telephoneDisplay: "04 91 09 87 89",
  email: "contact@le40.fr",
  priceRange: "€€",
  foundingDate: "2020",
  numberOfEmployees: "10-20",
  address: {
    streetAddress: "40 Traverse de la Montre",
    addressLocality: "Marseille",
    addressRegion: "Provence-Alpes-Côte d'Azur",
    postalCode: "13015",
    addressCountry: "FR"
  },
  geo: {
    latitude: 43.3367,
    longitude: 5.3647
  },
  socialLinks: [
    "https://www.instagram.com/le40coworking",
    "https://www.linkedin.com/company/le40coworking",
    "https://www.facebook.com/le40coworking"
  ]
} as const;

// ============================================================================
// SERVICES AVEC PRIX - Pour sitelinks enrichis
// ============================================================================

export const services = {
  bureaux: {
    name: "Bureaux Privés",
    description: "Bureaux privatifs de 15m² à 100m², tout équipés avec fibre 1Gbps, mobilier premium et salles de réunion incluses.",
    url: `${businessInfo.url}/bureaux-prives`,
    priceFrom: 499,
    priceTo: 2500,
    priceUnit: "mois",
    capacity: "2-20 personnes",
    image: "https://le40-cdn.b-cdn.net/homepage/home-bureaux.png"
  },
  coworking: {
    name: "Coworking",
    description: "Espaces de travail partagés flexibles avec accès à une communauté de 120+ entrepreneurs, fibre 1Gbps et café illimité.",
    url: `${businessInfo.url}/coworking`,
    priceFrom: 199,
    priceTo: 399,
    priceUnit: "mois",
    capacity: "1 personne",
    image: "https://le40-cdn.b-cdn.net/homepage/home-coworking.png"
  },
  studios: {
    name: "Studios",
    description: "Studios photo et podcast professionnels avec fond cyclo, éclairage studio et équipement audio haut de gamme.",
    url: `${businessInfo.url}/studios`,
    priceFrom: 35,
    priceTo: 85,
    priceUnit: "heure",
    capacity: "1-10 personnes",
    image: "https://le40-cdn.b-cdn.net/homepage/home-studios.png"
  },
  salles: {
    name: "Salles de Réunion",
    description: "Salles de réunion équipées de 4 à 50 personnes avec écran 4K, visioconférence et tableau blanc.",
    url: `${businessInfo.url}/salles`,
    priceFrom: 25,
    priceTo: 150,
    priceUnit: "heure",
    capacity: "4-50 personnes",
    image: "https://le40-cdn.b-cdn.net/homepage/home-salles.png"
  },
  domiciliation: {
    name: "Domiciliation",
    description: "Domiciliation d'entreprise en 24h avec adresse professionnelle à Marseille, scan courrier et réexpédition.",
    url: `${businessInfo.url}/domiciliation`,
    priceFrom: 39,
    priceTo: 99,
    priceUnit: "mois",
    capacity: "Entreprises",
    image: "https://le40-cdn.b-cdn.net/homepage/home-domiciliation.png"
  },
  club: {
    name: "Le Club",
    description: "Communauté d'entrepreneurs avec événements networking, afterworks et accès à des experts métiers.",
    url: `${businessInfo.url}/club`,
    priceFrom: 0,
    priceTo: 49,
    priceUnit: "mois",
    capacity: "Membres",
    image: "https://le40-cdn.b-cdn.net/homepage/home-club.png"
  },
  events: {
    name: "Événements",
    description: "Location d'espaces pour séminaires, team building, conférences et privatisation jusqu'à 200 personnes.",
    url: `${businessInfo.url}/events`,
    priceFrom: 500,
    priceTo: 5000,
    priceUnit: "jour",
    capacity: "10-200 personnes",
    image: "https://le40-cdn.b-cdn.net/homepage/home-events.png"
  }
} as const;

// ============================================================================
// SCHEMAS PRINCIPAUX
// ============================================================================

/**
 * LocalBusiness schema complet pour Le 40
 * Inclut: rating, services avec prix, horaires, équipements
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["CoworkingSpace", "LocalBusiness"],
  "@id": `${businessInfo.url}/#organization`,
  "name": businessInfo.name,
  "legalName": businessInfo.legalName,
  "alternateName": businessInfo.alternateName,
  "description": businessInfo.description,
  "slogan": businessInfo.slogan,
  "url": businessInfo.url,
  "logo": {
    "@type": "ImageObject",
    "url": businessInfo.logo,
    "width": 512,
    "height": 512
  },
  "image": businessInfo.image,
  "telephone": businessInfo.telephone,
  "email": businessInfo.email,
  "priceRange": businessInfo.priceRange,
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "foundingDate": businessInfo.foundingDate,
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 10,
    "maxValue": 20
  },
  "address": {
    "@type": "PostalAddress",
    ...businessInfo.address
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": businessInfo.geo.latitude,
    "longitude": businessInfo.geo.longitude
  },
  // 📅 HORAIRES
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  ],
  // 🏢 ÉQUIPEMENTS
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "WiFi Fibre 1 Gbps", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parking gratuit", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Climatisation", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Salles de réunion équipées", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Cuisine équipée", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Café et thé illimité", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Studios photo et podcast", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Terrasse", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Accessible PMR", "value": true }
  ],
  // 🛒 CATALOGUE DE SERVICES AVEC PRIX
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services Le 40",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": services.bureaux.name,
          "description": services.bureaux.description,
          "url": services.bureaux.url
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": services.bureaux.priceFrom,
          "priceCurrency": "EUR",
          "unitText": "par mois"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": services.coworking.name,
          "description": services.coworking.description,
          "url": services.coworking.url
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": services.coworking.priceFrom,
          "priceCurrency": "EUR",
          "unitText": "par mois"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": services.studios.name,
          "description": services.studios.description,
          "url": services.studios.url
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": services.studios.priceFrom,
          "priceCurrency": "EUR",
          "unitText": "par heure"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": services.salles.name,
          "description": services.salles.description,
          "url": services.salles.url
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": services.salles.priceFrom,
          "priceCurrency": "EUR",
          "unitText": "par heure"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": services.domiciliation.name,
          "description": services.domiciliation.description,
          "url": services.domiciliation.url
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": services.domiciliation.priceFrom,
          "priceCurrency": "EUR",
          "unitText": "par mois"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": services.events.name,
          "description": services.events.description,
          "url": services.events.url
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": services.events.priceFrom,
          "priceCurrency": "EUR",
          "unitText": "par jour"
        }
      }
    ]
  },
  "sameAs": businessInfo.socialLinks
};

/**
 * Organization schema (alias pour compatibilité)
 */
export const organizationSchema = localBusinessSchema;

/**
 * SiteNavigationElement schema - helps Google understand site structure for sitelinks
 * Inclut les prix pour affichage enrichi
 */
export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": `Bureaux — Dès ${services.bureaux.priceFrom}€/mois`,
      "description": services.bureaux.description,
      "url": services.bureaux.url
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": `Coworking — Dès ${services.coworking.priceFrom}€/mois`,
      "description": services.coworking.description,
      "url": services.coworking.url
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": `Studios — Dès ${services.studios.priceFrom}€/h`,
      "description": services.studios.description,
      "url": services.studios.url
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": `Salles — Dès ${services.salles.priceFrom}€/h`,
      "description": services.salles.description,
      "url": services.salles.url
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": `Domiciliation — Dès ${services.domiciliation.priceFrom}€/mois`,
      "description": services.domiciliation.description,
      "url": services.domiciliation.url
    },
    {
      "@type": "SiteNavigationElement",
      "position": 6,
      "name": "Le Club",
      "description": services.club.description,
      "url": services.club.url
    },
    {
      "@type": "SiteNavigationElement",
      "position": 7,
      "name": "Événements",
      "description": services.events.description,
      "url": services.events.url
    },
    {
      "@type": "SiteNavigationElement",
      "position": 8,
      "name": "Contact",
      "description": "Réservez une visite gratuite ou contactez-nous",
      "url": `${businessInfo.url}/contact`
    }
  ]
};

/**
 * WebSite schema - Pour le sitelinks searchbox
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": businessInfo.name,
  "alternateName": businessInfo.alternateName,
  "url": businessInfo.url,
  "description": businessInfo.description,
  "publisher": {
    "@id": `${businessInfo.url}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${businessInfo.url}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

/**
 * FAQ Schema pour la homepage - Affiche les questions déroulantes dans Google
 */
export const homepageFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quels services propose Le 40 à Marseille ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le 40 propose 4000m² d'espaces premium à Marseille : bureaux privés (dès 499€/mois), coworking flexible (dès 199€/mois), studios photo et podcast professionnels (dès 35€/h), salles de réunion équipées (dès 25€/h), domiciliation d'entreprise (dès 39€/mois), et location d'espaces pour événements."
      }
    },
    {
      "@type": "Question",
      "name": "Comment réserver une visite gratuite au Le 40 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vous pouvez réserver une visite gratuite directement sur notre site le40.fr en cliquant sur 'Réserver une visite', par téléphone au 04 91 09 87 89, ou par email à contact@le40.fr. Nous vous accueillons du lundi au vendredi de 9h à 20h."
      }
    },
    {
      "@type": "Question",
      "name": "Où se situe Le 40 à Marseille ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le 40 est situé au 40 Traverse de la Montre, 13015 Marseille (15ème arrondissement). Nous disposons d'un parking gratuit et sommes accessibles en transports en commun."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les tarifs du Le 40 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos tarifs commencent à : Bureaux privés dès 499€/mois, Coworking dès 199€/mois, Studios dès 35€/h, Salles de réunion dès 25€/h, Domiciliation dès 39€/mois. Tous les espaces incluent la fibre 1Gbps, café illimité et accès aux espaces communs."
      }
    },
    {
      "@type": "Question",
      "name": "Le 40 propose-t-il des studios pour tournage et podcast ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, Le 40 dispose de studios professionnels : studio photo avec fond cyclo et éclairage pro, studio podcast insonorisé avec équipement audio haut de gamme. Location à l'heure (dès 35€/h) ou à la demi-journée avec possibilité d'accompagnement technique."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on domicilier son entreprise au Le 40 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, Le 40 propose la domiciliation d'entreprise dès 39€/mois. Le service inclut : adresse professionnelle à Marseille, scan et notification du courrier sous 2h, réexpédition possible, accès à l'espace coworking, et configuration en 24h. Agrément préfecture inclus."
      }
    }
  ]
};

// ============================================================================
// SERVICE SCHEMAS - Schemas complets par page service
// ============================================================================

const baseServiceProvider = {
  "@type": "CoworkingSpace" as const,
  "name": businessInfo.name,
  "url": businessInfo.url,
  "@id": `${businessInfo.url}/#organization`
};

const baseAreaServed = {
  "@type": "City" as const,
  "name": "Marseille",
  "containedInPlace": {
    "@type": "AdministrativeArea",
    "name": "Provence-Alpes-Côte d'Azur"
  }
};

/**
 * Schemas de pages services complets avec prix, ratings, breadcrumbs
 */
export const pageSchemas = {
  bureaux: {
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Office Space Rental",
      "name": services.bureaux.name,
      "description": services.bureaux.description,
      "url": services.bureaux.url,
      "image": services.bureaux.image,
      "provider": baseServiceProvider,
      "areaServed": baseAreaServed,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": services.bureaux.priceFrom,
        "highPrice": services.bureaux.priceTo,
        "offerCount": "8"
      }
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": businessInfo.url },
        { "@type": "ListItem", "position": 2, "name": "Bureaux Privés", "item": services.bureaux.url }
      ]
    }
  },
  coworking: {
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Coworking Space",
      "name": services.coworking.name,
      "description": services.coworking.description,
      "url": services.coworking.url,
      "image": services.coworking.image,
      "provider": baseServiceProvider,
      "areaServed": baseAreaServed,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": services.coworking.priceFrom,
        "highPrice": services.coworking.priceTo,
        "offerCount": "3"
      }
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": businessInfo.url },
        { "@type": "ListItem", "position": 2, "name": "Coworking", "item": services.coworking.url }
      ]
    }
  },
  studios: {
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Photo Studio Rental",
      "name": services.studios.name,
      "description": services.studios.description,
      "url": services.studios.url,
      "image": services.studios.image,
      "provider": baseServiceProvider,
      "areaServed": baseAreaServed,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": services.studios.priceFrom,
        "highPrice": services.studios.priceTo,
        "offerCount": "4"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Fond cyclo professionnel", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Éclairage LED studio", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Équipement podcast", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Insonorisation", "value": true }
      ]
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": businessInfo.url },
        { "@type": "ListItem", "position": 2, "name": "Studios", "item": services.studios.url }
      ]
    }
  },
  salles: {
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Meeting Room Rental",
      "name": services.salles.name,
      "description": services.salles.description,
      "url": services.salles.url,
      "image": services.salles.image,
      "provider": baseServiceProvider,
      "areaServed": baseAreaServed,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": services.salles.priceFrom,
        "highPrice": services.salles.priceTo,
        "offerCount": "5"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Écran 4K", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Visioconférence", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Tableau blanc", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "WiFi Fibre", "value": true }
      ]
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": businessInfo.url },
        { "@type": "ListItem", "position": 2, "name": "Salles de Réunion", "item": services.salles.url }
      ]
    }
  },
  domiciliation: {
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Business Domiciliation",
      "name": services.domiciliation.name,
      "description": services.domiciliation.description,
      "url": services.domiciliation.url,
      "image": services.domiciliation.image,
      "provider": baseServiceProvider,
      "areaServed": baseAreaServed,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": services.domiciliation.priceFrom,
        "highPrice": services.domiciliation.priceTo,
        "offerCount": "3"
      }
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": businessInfo.url },
        { "@type": "ListItem", "position": 2, "name": "Domiciliation", "item": services.domiciliation.url }
      ]
    }
  },
  events: {
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Event Space Rental",
      "name": services.events.name,
      "description": services.events.description,
      "url": services.events.url,
      "image": services.events.image,
      "provider": baseServiceProvider,
      "areaServed": baseAreaServed,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": services.events.priceFrom,
        "highPrice": services.events.priceTo,
        "offerCount": "4"
      }
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": businessInfo.url },
        { "@type": "ListItem", "position": 2, "name": "Événements", "item": services.events.url }
      ]
    }
  },
  club: {
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Business Community",
      "name": services.club.name,
      "description": services.club.description,
      "url": services.club.url,
      "image": services.club.image,
      "provider": baseServiceProvider,
      "areaServed": baseAreaServed
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": businessInfo.url },
        { "@type": "ListItem", "position": 2, "name": "Le Club", "item": services.club.url }
      ]
    }
  }
};

// Alias pour compatibilité avec l'ancien code
export const serviceSchemas = {
  coworking: pageSchemas.coworking.service,
  domiciliation: pageSchemas.domiciliation.service,
  studios: pageSchemas.studios.service,
  salles: pageSchemas.salles.service
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * FAQ schema - use for pages with FAQ sections
 */
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Alias pour compatibilité avec l'ancien fichier
export const faqSchema = createFAQSchema;

/**
 * Service schema - use for service pages
 */
export function createServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  price?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": baseServiceProvider,
    "areaServed": baseAreaServed,
    ...(service.price && {
      "offers": {
        "@type": "Offer",
        "price": service.price,
        "priceCurrency": "EUR"
      }
    }),
    ...(service.image && { "image": service.image })
  };
}

/**
 * Breadcrumb schema
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Alias pour compatibilité
export const breadcrumbSchema = createBreadcrumbSchema;

/**
 * Product schema for Shopify products
 */
export function createProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: boolean;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "url": product.url,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency || "EUR",
      "availability": product.availability !== false
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": businessInfo.name
      }
    }
  };
}

/**
 * Event schema
 */
export function createEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  image?: string;
  organizer?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate || event.startDate,
    "location": {
      "@type": "Place",
      "name": event.location || businessInfo.name,
      "address": {
        "@type": "PostalAddress",
        ...businessInfo.address
      }
    },
    "image": event.image,
    "organizer": {
      "@type": "Organization",
      "name": event.organizer || businessInfo.name
    }
  };
}

// Alias pour compatibilité
export const eventSchema = createEventSchema;

/**
 * Blog post schema
 */
export function createBlogPostSchema(post: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": businessInfo.name,
      "logo": {
        "@type": "ImageObject",
        "url": businessInfo.logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    }
  };
}

// Alias pour compatibilité
export const blogPostSchema = createBlogPostSchema;
