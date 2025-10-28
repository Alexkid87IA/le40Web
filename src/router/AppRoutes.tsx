import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.new';
import Offres from '../pages/Offres';
import Tarifs from '../pages/Tarifs';
import Coworking from '../pages/Coworking';
import BureauxPrives from '../pages/BureauxPrives';
import Domiciliation from '../pages/Domiciliation';
import Salles from '../pages/Salles';
import Studios from '../pages/Studios/Studios';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Contact from '../pages/Contact';
import Community from '../pages/Community';
import Experts from '../pages/Experts';
import Events from '../pages/Events';
import ServicesPlus from '../pages/ServicesPlus';
import NotFound from '../pages/NotFound';
import BookingPage from '../pages/BookingPage';
import CartDrawer from '../components/Cart/CartDrawer';

export default function AppRoutes() {
  return (
    <Router>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/coworking" element={<Coworking />} />
        <Route path="/bureaux-prives" element={<BureauxPrives />} />
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
        <Route path="/reservation" element={<BookingPage />} />
        
        {/* Route 404 - toujours en dernier */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}