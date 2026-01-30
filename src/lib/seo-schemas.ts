/**
 * SEO Schema.org structured data for Le 40 Coworking
 * Source unique de vérité pour tous les schemas SEO
 * Use these with the SEOHead component's schema prop
 */

// ============================================================================
// DONNÉES DE BASE - Source unique de vérité
// ============================================================================

export const businessInfo = {
  name: "Le 40 Coworking",
  alternateName: "Le 40",
  description: "Espace de coworking premium au cœur de Marseille. Domiciliation d'entreprise, salles de réunion équipées, studios créatifs et communauté d'entrepreneurs.",
  url: "https://le40coworking.fr",
  logo: "https://le40coworking.fr/logo.png",
  image: "https://le40coworking.fr/og-image.jpg",
  telephone: "+33-4-91-96-21-51",
  email: "contact@bureauxle40.fr",
  priceRange: "€€",
  address: {
    streetAddress: "40 Avenue de Saint Antoine",
    addressLocality: "Marseille",
    addressRegion: "Provence-Alpes-Côte d'Azur",
    postalCode: "13015",
    addressCountry: "FR"
  },
  geo: {
    latitude: 43.2965,
    longitude: 5.3698
  },
  socialLinks: [
    "https://www.instagram.com/le40coworking",
    "https://www.linkedin.com/company/le40coworking",
    "https://www.facebook.com/le40coworking"
  ]
} as const;

// ============================================================================
// SCHEMAS PRINCIPAUX
// ============================================================================

/**
 * LocalBusiness schema for Le 40 Coworking
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "CoworkingSpace",
  "@id": `${businessInfo.url}/#organization`,
  "name": businessInfo.name,
  "alternateName": businessInfo.alternateName,
  "description": businessInfo.description,
  "url": businessInfo.url,
  "logo": businessInfo.logo,
  "image": [businessInfo.image],
  "telephone": businessInfo.telephone,
  "email": businessInfo.email,
  "priceRange": businessInfo.priceRange,
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "address": {
    "@type": "PostalAddress",
    ...businessInfo.address
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": businessInfo.geo.latitude,
    "longitude": businessInfo.geo.longitude
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "WiFi haut débit", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Climatisation", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Salles de réunion équipées", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Cuisine", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Accès 24/7", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Café et thé illimité", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Studios créatifs", "value": true }
  ],
  "sameAs": businessInfo.socialLinks
};

/**
 * Organization schema (alias pour compatibilité)
 */
export const organizationSchema = localBusinessSchema;

/**
 * SiteNavigationElement schema - helps Google understand site structure for sitelinks
 */
export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Domiciliation",
      "description": "Domiciliation d'entreprise à Marseille avec adresse prestigieuse",
      "url": `${businessInfo.url}/domiciliation`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Bureaux Privés",
      "description": "Location de bureaux privés équipés à Marseille",
      "url": `${businessInfo.url}/bureaux`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Coworking",
      "description": "Espace de coworking premium à Marseille",
      "url": `${businessInfo.url}/coworking`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Salles de Réunion",
      "description": "Location de salles de réunion équipées à Marseille",
      "url": `${businessInfo.url}/salles`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": "Studios",
      "description": "Studios photo et vidéo professionnels à Marseille",
      "url": `${businessInfo.url}/studios`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 6,
      "name": "Contact",
      "description": "Contactez Le 40 Marseille",
      "url": `${businessInfo.url}/contact`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 7,
      "name": "Tarifs",
      "description": "Tarifs des espaces de travail Le 40",
      "url": `${businessInfo.url}/tarifs`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 8,
      "name": "Événements",
      "description": "Événements et networking au 40 Marseille",
      "url": `${businessInfo.url}/events`
    }
  ]
};

// ============================================================================
// SERVICE SCHEMAS
// ============================================================================

const baseServiceProvider = {
  "@type": "CoworkingSpace" as const,
  "name": businessInfo.name,
  "url": businessInfo.url
};

const baseAreaServed = {
  "@type": "City" as const,
  "name": "Marseille"
};

export const serviceSchemas = {
  coworking: {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Coworking Space",
    "name": "Espace Coworking",
    "description": "Espaces de travail partagés flexibles avec WiFi haut débit, café illimité et accès aux salles de réunion.",
    "provider": baseServiceProvider,
    "areaServed": baseAreaServed,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Coworking",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hot Desk",
            "description": "Bureau flexible en espace partagé"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bureau Privé",
            "description": "Bureau dédié pour 1 à 4 personnes"
          }
        }
      ]
    }
  },
  domiciliation: {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Business Domiciliation",
    "name": "Domiciliation d'entreprise",
    "description": "Domiciliation commerciale à Marseille avec adresse prestigieuse, gestion du courrier et services administratifs.",
    "provider": baseServiceProvider,
    "areaServed": baseAreaServed,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": "99",
      "highPrice": "299",
      "offerCount": "3"
    }
  },
  studios: {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Creative Studio Rental",
    "name": "Studios Créatifs",
    "description": "Studios photo et vidéo professionnels avec fond vert, éclairage studio et équipement audio/vidéo.",
    "provider": baseServiceProvider,
    "areaServed": baseAreaServed,
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Fond vert professionnel" },
      { "@type": "LocationFeatureSpecification", "name": "Éclairage studio" },
      { "@type": "LocationFeatureSpecification", "name": "Matériel audio/vidéo" }
    ]
  },
  salles: {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Meeting Room Rental",
    "name": "Salles de Réunion",
    "description": "Salles de réunion équipées avec écran 4K, visioconférence et tableau blanc.",
    "provider": baseServiceProvider,
    "areaServed": baseAreaServed,
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Écran 4K" },
      { "@type": "LocationFeatureSpecification", "name": "Système de visioconférence" },
      { "@type": "LocationFeatureSpecification", "name": "Tableau blanc" }
    ]
  }
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
