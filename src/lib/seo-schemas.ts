/**
 * SEO Schema.org structured data for Le 40 Coworking
 * Use these with the SEOHead component's schema prop
 */

/**
 * LocalBusiness schema for Le 40 Coworking
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "CoworkingSpace",
  "@id": "https://le40coworking.fr/#organization",
  "name": "Le 40 Coworking",
  "alternateName": "Le 40",
  "description": "Espace de coworking premium au cœur de Marseille. Domiciliation d'entreprise, salles de réunion équipées, studios créatifs et communauté d'entrepreneurs.",
  "url": "https://le40coworking.fr",
  "telephone": "+33-4-13-25-26-40",
  "email": "contact@le40coworking.fr",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "40 Rue de la République",
    "addressLocality": "Marseille",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "postalCode": "13002",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.2965,
    "longitude": 5.3698
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
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Meeting Rooms", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Kitchen", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "24/7 Access", "value": true }
  ],
  "sameAs": [
    "https://www.instagram.com/le40coworking",
    "https://www.linkedin.com/company/le40coworking",
    "https://www.facebook.com/le40coworking"
  ],
  "image": [
    "https://le40coworking.fr/og-image.jpg"
  ]
};

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
    "provider": {
      "@type": "CoworkingSpace",
      "name": "Le 40 Coworking",
      "url": "https://le40coworking.fr"
    },
    "areaServed": {
      "@type": "City",
      "name": "Marseille"
    },
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
        "name": "Le 40 Coworking"
      }
    }
  };
}
