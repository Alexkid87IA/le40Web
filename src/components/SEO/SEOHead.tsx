import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  noindex?: boolean;
  schema?: object;
}

const DEFAULT_META = {
  siteName: 'Le 40 Coworking',
  baseUrl: 'https://le40coworking.fr',
  defaultTitle: 'Le 40 - Coworking Premium Marseille | Domiciliation & Salles de Réunion',
  defaultDescription: 'Espace de coworking premium au cœur de Marseille. Domiciliation d\'entreprise, salles de réunion équipées, studios créatifs et communauté d\'entrepreneurs. Réservez votre visite gratuite.',
  defaultImage: 'https://le40coworking.fr/og-image.jpg',
  defaultKeywords: 'coworking Marseille, espace de travail Marseille, domiciliation entreprise Marseille, salle de réunion Marseille, bureau privé Marseille, coworking premium, studio créatif Marseille',
  twitterHandle: '@le40coworking',
};

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noindex = false,
  schema
}: SEOHeadProps) {
  const location = useLocation();

  const pageTitle = title
    ? `${title} | ${DEFAULT_META.siteName}`
    : DEFAULT_META.defaultTitle;

  const pageDescription = description || DEFAULT_META.defaultDescription;
  const pageKeywords = keywords || DEFAULT_META.defaultKeywords;
  const pageImage = ogImage || DEFAULT_META.defaultImage;
  const pageUrl = canonicalUrl || `${DEFAULT_META.baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = pageTitle;

    updateMetaTag('name', 'description', pageDescription);
    updateMetaTag('name', 'keywords', pageKeywords);

    if (noindex) {
      updateMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      updateMetaTag('name', 'robots', 'index, follow');
    }

    updateMetaTag('property', 'og:title', pageTitle);
    updateMetaTag('property', 'og:description', pageDescription);
    updateMetaTag('property', 'og:image', pageImage);
    updateMetaTag('property', 'og:url', pageUrl);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:site_name', DEFAULT_META.siteName);
    updateMetaTag('property', 'og:locale', 'fr_FR');

    updateMetaTag('name', 'twitter:card', twitterCard);
    updateMetaTag('name', 'twitter:title', pageTitle);
    updateMetaTag('name', 'twitter:description', pageDescription);
    updateMetaTag('name', 'twitter:image', pageImage);
    updateMetaTag('name', 'twitter:site', DEFAULT_META.twitterHandle);
    updateMetaTag('name', 'twitter:creator', DEFAULT_META.twitterHandle);

    updateLinkTag('canonical', pageUrl);

    if (schema) {
      updateSchemaMarkup(schema);
    }
  }, [pageTitle, pageDescription, pageKeywords, pageImage, pageUrl, ogType, twitterCard, noindex, schema]);

  return null;
}

function updateMetaTag(attribute: string, attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function updateSchemaMarkup(schema: object) {
  const scriptId = 'schema-org-markup';
  let element = document.getElementById(scriptId);

  if (!element) {
    element = document.createElement('script');
    element.id = scriptId;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
}
