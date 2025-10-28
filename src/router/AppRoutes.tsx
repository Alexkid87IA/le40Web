import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartDrawer from '../components/Cart/CartDrawer';

// Eager load: Home page (critical) and CartDrawer
import Home from '../pages/Home.new';

// Lazy load: All other pages
const Offres = lazy(() => import('../pages/Offres'));
const Tarifs = lazy(() => import('../pages/Tarifs'));
const Coworking = lazy(() => import('../pages/Coworking'));
const Domiciliation = lazy(() => import('../pages/Domiciliation'));
const Salles = lazy(() => import('../pages/Salles'));
const Studios = lazy(() => import('../pages/Studios/Studios'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const Contact = lazy(() => import('../pages/Contact'));
const Community = lazy(() => import('../pages/Community'));
const Experts = lazy(() => import('../pages/Experts'));
const Events = lazy(() => import('../pages/Events'));
const ServicesPlus = lazy(() => import('../pages/ServicesPlus'));
const NotFound = lazy(() => import('../pages/NotFound'));
const BookingPage = lazy(() => import('../pages/BookingPage'));

// Lazy load: Individual space pages
const OpenSpace = lazy(() => import('../pages/spaces/OpenSpace'));
const BureauxPrives = lazy(() => import('../pages/spaces/BureauxPrives'));
const PhoneBox = lazy(() => import('../pages/spaces/PhoneBox'));
const LoungeCafe = lazy(() => import('../pages/spaces/LoungeCafe'));
const TerrasseRooftop = lazy(() => import('../pages/spaces/TerrasseRooftop'));

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-cyan-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
        <p className="text-gray-600 font-medium">Chargement...</p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <CartDrawer />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/coworking" element={<Coworking />} />
          <Route path="/domiciliation" element={<Domiciliation />} />
          <Route path="/salles" element={<Salles />} />
          <Route path="/studios" element={<Studios />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/services-plus" element={<ServicesPlus />} />

          {/* Routes des espaces individuels */}
          <Route path="/spaces/open-space" element={<OpenSpace />} />
          <Route path="/spaces/bureaux-prives" element={<BureauxPrives />} />
          <Route path="/spaces/phone-box" element={<PhoneBox />} />
          <Route path="/spaces/lounge-cafe" element={<LoungeCafe />} />
          <Route path="/spaces/terrasse-rooftop" element={<TerrasseRooftop />} />

          {/* Route de réservation */}
          <Route path="/reservation" element={<BookingPage />} />

          {/* Route 404 - toujours en dernier */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}