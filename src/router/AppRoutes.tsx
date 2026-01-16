import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import UnifiedCartDrawer from '../components/Cart/UnifiedCartDrawer';
import PageLoader from '../components/UI/PageLoader';

// ============================================================================
// LAZY LOADED PAGES - Code splitting pour de meilleures performances
// ============================================================================

// Pages principales (priorité haute)
const Home = lazy(() => import('../pages/Home'));
const Offres = lazy(() => import('../pages/Offres'));
const Tarifs = lazy(() => import('../pages/Tarifs'));

// Services
const BureauxComparison = lazy(() => import('../pages/Bureaux'));
const Coworking = lazy(() => import('../pages/Coworking'));
const BureauxPrives = lazy(() => import('../pages/BureauxPrives'));
const Domiciliation = lazy(() => import('../pages/Domiciliation'));
const Salles = lazy(() => import('../pages/Salles'));
const Studios = lazy(() => import('../pages/Studios'));

// Community & Events
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const Club = lazy(() => import('../pages/Club'));
const Events = lazy(() => import('../pages/Events'));
const Experts = lazy(() => import('../pages/Experts'));

// E-commerce & Checkout
const ShopPage = lazy(() => import('../pages/ShopPage'));
const Packs = lazy(() => import('../pages/Packs'));
const UnifiedCheckout = lazy(() => import('../pages/UnifiedCheckout'));
const CheckoutWithStripe = lazy(() => import('../pages/CheckoutWithStripe'));
const ShopifyCheckout = lazy(() => import('../pages/ShopifyCheckout'));
const OrderConfirmation = lazy(() => import('../pages/OrderConfirmation'));
const ShopifyConfirmation = lazy(() => import('../pages/ShopifyConfirmation'));

// Autres pages
const Contact = lazy(() => import('../pages/Contact'));
const ServicesPlus = lazy(() => import('../pages/ServicesPlus'));
const ReserverVisite = lazy(() => import('../pages/ReserverVisite'));
const BookingPage = lazy(() => import('../pages/BookingPage'));

// Pages légales
const CGV = lazy(() => import('../pages/CGV'));
const PolitiqueConfidentialite = lazy(() => import('../pages/PolitiqueConfidentialite'));
const MentionsLegales = lazy(() => import('../pages/MentionsLegales'));

// Admin
const AdminVisits = lazy(() => import('../pages/AdminVisits'));

// 404
const NotFound = lazy(() => import('../pages/NotFound'));

// ============================================================================
// ROUTER
// ============================================================================

export default function AppRoutes() {
  return (
    <>
      <UnifiedCartDrawer />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Accueil */}
          <Route path="/" element={<Home />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/tarifs" element={<Tarifs />} />

          {/* Services - Bureaux */}
          <Route path="/bureaux" element={<BureauxPrives />} />
          <Route path="/coworking" element={<Coworking />} />
          <Route path="/bureaux-prives" element={<BureauxPrives />} />
          <Route path="/bureaux-comparaison" element={<BureauxComparison />} />

          {/* Services - Autres */}
          <Route path="/domiciliation" element={<Domiciliation />} />
          <Route path="/salles" element={<Salles />} />
          <Route path="/studios" element={<Studios />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Contact & Visites */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/reserver-visite" element={<ReserverVisite />} />

          {/* Community */}
          <Route path="/community" element={<Club />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/club" element={<Club />} />
          <Route path="/events" element={<Events />} />
          <Route path="/services-plus" element={<ServicesPlus />} />

          {/* E-commerce */}
          <Route path="/boutique" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/packs" element={<Packs />} />
          <Route path="/bundles" element={<Packs />} />

          {/* Checkout */}
          <Route path="/panier" element={<UnifiedCheckout />} />
          <Route path="/checkout" element={<CheckoutWithStripe />} />
          <Route path="/checkout-shopify" element={<ShopifyCheckout />} />
          <Route path="/confirmation/:orderNumber" element={<OrderConfirmation />} />
          <Route path="/confirmation-shopify" element={<ShopifyConfirmation />} />

          {/* Pages légales */}
          <Route path="/cgv" element={<CGV />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />

          {/* Admin */}
          <Route path="/admin/visites" element={<AdminVisits />} />

          {/* 404 - toujours en dernier */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
