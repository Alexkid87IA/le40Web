export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "CoworkingSpace",
  "name": "Le 40 Coworking",
  "description": "Espace de coworking premium au cœur de Marseille offrant des bureaux privés, hot desks, salles de réunion et studios créatifs.",
  "url": "https://le40coworking.fr",
  "logo": "https://le40coworking.fr/logo.png",
  "image": "https://le40coworking.fr/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "40 Rue Paradis",
    "addressLocality": "Marseille",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "postalCode": "13001",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.2965",
    "longitude": "5.3698"
  },
  "telephone": "+33-4-XX-XX-XX-XX",
  "email": "contact@le40coworking.fr",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "€€",
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "WiFi haut débit",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Café et thé illimité",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Salles de réunion équipées",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Studios créatifs",
      "value": true
    }
  ],
  "sameAs": [
    "https://www.facebook.com/le40coworking",
    "https://www.instagram.com/le40coworking",
    "https://www.linkedin.com/company/le40coworking"
  ]
};

export const serviceSchemas = {
  coworking: {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Coworking Space",
    "provider": {
      "@type": "Organization",
      "name": "Le 40 Coworking"
    },
    "areaServed": {
      "@type": "City",
      "name": "Marseille"
    },
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
    "provider": {
      "@type": "Organization",
      "name": "Le 40 Coworking"
    },
    "areaServed": {
      "@type": "City",
      "name": "Marseille"
    },
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
    "provider": {
      "@type": "Organization",
      "name": "Le 40 Coworking"
    },
    "areaServed": {
      "@type": "City",
      "name": "Marseille"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Fond vert professionnel"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Éclairage studio"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Matériel audio/vidéo"
      }
    ]
  },
  salles: {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Meeting Room Rental",
    "provider": {
      "@type": "Organization",
      "name": "Le 40 Coworking"
    },
    "areaServed": {
      "@type": "City",
      "name": "Marseille"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Écran 4K"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Système de visioconférence"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Tableau blanc"
      }
    ]
  }
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
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
});

export const eventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image?: string;
  organizer?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.name,
  "description": event.description,
  "startDate": event.startDate,
  "endDate": event.endDate || event.startDate,
  "location": {
    "@type": "Place",
    "name": event.location,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "40 Rue Paradis",
      "addressLocality": "Marseille",
      "postalCode": "13001",
      "addressCountry": "FR"
    }
  },
  "image": event.image,
  "organizer": {
    "@type": "Organization",
    "name": event.organizer || "Le 40 Coworking"
  }
});

export const blogPostSchema = (post: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) => ({
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
    "name": "Le 40 Coworking",
    "logo": {
      "@type": "ImageObject",
      "url": "https://le40coworking.fr/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": post.url
  }
});
