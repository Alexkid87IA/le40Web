/**
 * @deprecated Ce fichier est conservé pour compatibilité.
 * Utilisez directement les imports depuis '@/lib/seo-schemas' pour les nouveaux développements.
 */

export {
  // Données de base
  businessInfo,

  // Schemas principaux
  localBusinessSchema,
  organizationSchema,
  serviceSchemas,

  // Fonctions de création
  createFAQSchema,
  createServiceSchema,
  createBreadcrumbSchema,
  createProductSchema,
  createEventSchema,
  createBlogPostSchema,

  // Alias pour compatibilité
  faqSchema,
  breadcrumbSchema,
  eventSchema,
  blogPostSchema,
} from '../lib/seo-schemas';
