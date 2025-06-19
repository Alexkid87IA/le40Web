import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Presentation as PresentationChart, Video, Network, Calendar, Star, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesData } from '../../data/mockData';

const iconMap = {
  Users,
  MapPin, 
  PresentationChart,
  Video,
  Network,
  Calendar,
  Star
};

const colorMap = {
  Users: 'from-coworking to-blue-600',
  MapPin: 'from-domiciliation to-orange-600',
  PresentationChart: 'from-salles to-gray-600',
  Video: 'from-studios to-purple-600',
  Network: 'from-community to-green-600',
  Calendar: 'from-blog to-teal-600',
  Star: 'from-violet-400 to-fuchsia-400'
};

// Mapping des services vers leurs pages
const serviceRoutes = {
  1: '/coworking',      // Coworking
  2: '/domiciliation',  // Domiciliation
  3: '/salles',         // Salles de Réunion
  4: '/studios',        // Studio de Tournage
  5: '/experts',        // Réseau d'Experts (nouvelle page)
  6: '/events',         // Événements (nouvelle page)
  7: '/services-plus'   // Services+ (nouvelle page)
};

export default function Services() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Gestion du scroll horizontal avec la molette
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const isInContainer = e.clientX >= rect.left && e.clientX <= rect.right && 
                           e.clientY >= rect.top && e.clientY <= rect.bottom;
      
      if (isInContainer) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
        updateScrollButtons();
      }
    };

    const updateScrollButtons = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', updateScrollButtons);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="min-h-screen bg-gradient-to-br from-black-deep via-black-nuanced to-black-deep relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Film grain texture */}
      <div className="absolute inset-0 film-grain"></div>

      <div className="relative z-10 py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-8 lg:px-16"
        >
          {/* Badge "Acte 1" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-community"></div>
              <span className="text-sm font-inter font-medium text-community tracking-[0.3em] uppercase">ACTE 1</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-community to-transparent"></div>
            </div>
          </motion.div>

          {/* Titre principal avec animation mot par mot */}
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-hero font-montserrat font-black text-white leading-none tracking-tight"
            >
              {['NOS', 'SERVICES'].map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, rotateX: 90 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                  className={`inline-block mr-6 ${word === 'SERVICES' ? 'gradient-text' : ''}`}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-body-large font-inter text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Des éclats de solutions premium pour nourrir votre ambition entrepreneuriale
          </motion.p>
        </motion.div>

        {/* Instructions de navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center justify-center gap-6 mb-16 px-8"
        >
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-full glass-effect border transition-all duration-300 flex items-center justify-center ${
              canScrollLeft 
                ? 'border-community/50 text-community hover:border-community hover:glow-effect' 
                : 'border-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="glass-effect border border-white/10 rounded-2xl px-6 py-3">
            <span className="text-sm font-inter text-white/70 tracking-wide">
              Faites défiler horizontalement pour découvrir
            </span>
          </div>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-full glass-effect border transition-all duration-300 flex items-center justify-center ${
              canScrollRight 
                ? 'border-community/50 text-community hover:border-community hover:glow-effect' 
                : 'border-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Grandes flèches latérales */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`fixed left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass-effect border transition-all duration-300 flex items-center justify-center z-30 ${
            canScrollLeft 
              ? 'border-community/50 text-community hover:border-community hover:scale-110 hover:glow-effect' 
              : 'border-white/10 text-white/20 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`fixed right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass-effect border transition-all duration-300 flex items-center justify-center z-30 ${
            canScrollRight 
              ? 'border-community/50 text-community hover:border-community hover:scale-110 hover:glow-effect' 
              : 'border-white/10 text-white/20 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Container de scroll horizontal */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto overflow-y-hidden px-8 lg:px-16 pb-8 cursor-grab active:cursor-grabbing scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {servicesData.map((service, index) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap];
              const gradientColor = colorMap[service.icon as keyof typeof colorMap];
              const serviceRoute = serviceRoutes[service.id as keyof typeof serviceRoutes];
              
              return (
                <motion.a
                  key={service.id}
                  href={serviceRoute}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.7 }}
                  whileHover={{ y: -12, scale: 1.03, zIndex: 10 }}
                  className="group flex-shrink-0 w-80 lg:w-96 h-[520px] relative block"
                >
                  <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-700 h-full relative">
                    {/* Background Image avec Ken Burns */}
                    <div className="absolute inset-0">
                      <img
                        src={`https://images.pexels.com/photos/${3184300 + index}/pexels-photo-${3184300 + index}.jpeg?auto=compress&cs=tinysrgb&w=600`}
                        alt={service.title}
                        className="w-full h-full object-cover ken-burns group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Overlays gradients stratégiques */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black-deep/90 via-black-nuanced/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black-deep/60 via-transparent to-black-nuanced/40"></div>
                    </div>

                    {/* Numérotation massive */}
                    <div className="absolute top-8 left-8 z-20">
                      <span 
                        className="font-playfair font-bold text-community opacity-80 group-hover:text-green-300 transition-colors duration-500"
                        style={{ 
                          fontSize: 'clamp(4rem, 8vw, 6rem)',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                          WebkitTextStroke: '1px rgba(72, 187, 120, 0.3)'
                        }}
                      >
                        {service.id.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Badge durée (simulé) */}
                    <div className="absolute top-8 right-8 glass-effect border border-white/20 rounded-full px-3 py-1">
                      <span className="text-white font-inter text-xs font-medium">
                        {Math.floor(Math.random() * 5) + 2} min
                      </span>
                    </div>

                    {/* Icône flottante */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r ${gradientColor} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-90 transition-all duration-500 z-20`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>

                    {/* Zone de contenu (bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                      <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-community group-hover:to-green-300 group-hover:bg-clip-text transition-all duration-500">
                        {service.title}
                      </h3>
                      
                      {/* Ligne décorative */}
                      <div className="w-16 h-1 bg-gradient-to-r from-community to-green-600 rounded-full mb-4 group-hover:w-24 transition-all duration-500"></div>
                      
                      <p className="text-white/80 font-inter leading-relaxed line-clamp-2 group-hover:text-white transition-colors duration-500">
                        {service.description}
                      </p>

                      {/* CTA intégré */}
                      <div className="flex items-center mt-4 text-community font-inter font-medium group-hover:text-green-300 transition-colors duration-500">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Découvrir</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-community/50 rounded-4xl transition-all duration-700"></div>
                    <div className="absolute inset-0 shadow-none group-hover:shadow-2xl group-hover:shadow-community/25 rounded-4xl transition-all duration-700"></div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-20 px-8 lg:px-16"
        >
          <motion.a
            href="/offres"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center px-10 py-5 glass-effect text-white font-montserrat font-semibold text-lg rounded-2xl border border-community/30 hover:bg-community/10 hover:border-community transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-community/10 to-green-600/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="relative flex items-center">
              <span className="tracking-wide">Voir toutes nos offres</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.a>
        </motion.div>
      </div>

      {/* Style pour masquer la scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}