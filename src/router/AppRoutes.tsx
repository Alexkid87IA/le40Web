import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Offres from '../pages/Offres';
import Coworking from '../pages/Coworking';
import Domiciliation from '../pages/Domiciliation';
import Salles from '../pages/Salles';
import Studios from '../pages/Studios';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Contact from '../pages/Contact';
import Community from '../pages/Community';
import Experts from '../pages/Experts';
import Events from '../pages/Events';
import ServicesPlus from '../pages/ServicesPlus';
import NotFound from '../pages/NotFound';

// Pages individuelles des espaces
import OpenSpace from '../pages/spaces/OpenSpace';
import BureauxPrives from '../pages/spaces/BureauxPrives';
import PhoneBox from '../pages/spaces/PhoneBox';
import LoungeCafe from '../pages/spaces/LoungeCafe';
import TerrasseRooftop from '../pages/spaces/TerrasseRooftop';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offres" element={<Offres />} />
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
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}