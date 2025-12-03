import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Offres from '../pages/Offres';
import Tarifs from '../pages/Tarifs';
import BureauxComparison from '../pages/Bureaux';
import Coworking from '../pages/Coworking';
import BureauxPrives from '../pages/BureauxPrives';
import Domiciliation from '../pages/Domiciliation';
import Salles from '../pages/Salles';
import Studios from '../pages/Studios';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Contact from '../pages/Contact';
import Experts from '../pages/Experts';
import Club from '../pages/Club';
import Events from '../pages/Events';
import ServicesPlus from '../pages/ServicesPlus';
import NotFound from '../pages/NotFound';
import BookingPage from '../pages/BookingPage';
import Checkout from '../pages/Checkout';
import CheckoutWithStripe from '../pages/CheckoutWithStripe';
import OrderConfirmation from '../pages/OrderConfirmation';
import CGV from '../pages/CGV';
import PolitiqueConfidentialite from '../pages/PolitiqueConfidentialite';
import UnifiedCartDrawer from '../components/Cart/UnifiedCartDrawer';
import UnifiedCheckout from '../pages/UnifiedCheckout';
import ShopPage from '../pages/ShopPage';
import ShopifyCheckout from '../pages/ShopifyCheckout';
import ShopifyConfirmation from '../pages/ShopifyConfirmation';
import Bundles from '../pages/Bundles';
import AdminVisits from '../pages/AdminVisits';
import ReserverVisite from '../pages/ReserverVisite';

export default function AppRoutes() {
  return (
    <>
      <UnifiedCartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/bureaux" element={<BureauxPrives />} />
        <Route path="/coworking" element={<Coworking />} />
        <Route path="/bureaux-prives" element={<BureauxPrives />} />
        <Route path="/bureaux-comparaison" element={<BureauxComparison />} />
        <Route path="/domiciliation" element={<Domiciliation />} />
        <Route path="/salles" element={<Salles />} />
        <Route path="/studios" element={<Studios />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/community" element={<Club />} />
        <Route path="/experts" element={<Club />} />
        <Route path="/club" element={<Club />} />
        <Route path="/events" element={<Events />} />
        <Route path="/services-plus" element={<ServicesPlus />} />
        <Route path="/reservation" element={<BookingPage />} />
        <Route path="/reserver-visite" element={<ReserverVisite />} />
        <Route path="/panier" element={<UnifiedCheckout />} />
        <Route path="/checkout" element={<CheckoutWithStripe />} />
        <Route path="/checkout-old" element={<Checkout />} />
        <Route path="/confirmation/:orderNumber" element={<OrderConfirmation />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/boutique" element={<ShopPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/bundles" element={<Bundles />} />
        <Route path="/packs" element={<Bundles />} />
        <Route path="/checkout-shopify" element={<ShopifyCheckout />} />
        <Route path="/confirmation-shopify" element={<ShopifyConfirmation />} />
        <Route path="/admin/visites" element={<AdminVisits />} />

        {/* Route 404 - toujours en dernier */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}