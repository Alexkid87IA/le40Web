/**
 * Studios.tsx - Page Studios avec parcours de réservation en 4 étapes
 * 
 * Structure simplifiée:
 * - Hero avec vidéo de fond violet
 * - ProcessSection (comment ça marche)
 * - StudioBookingFlow (parcours 4 étapes - LE COEUR)
 * - Témoignages
 * - FAQ
 * - CTA Final
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, ArrowRight, Phone } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import { serviceSchemas } from '../utils/seoSchemas';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import BottomBar from '../components/Shared/BottomBar';
import HeroSection from '../components/StudiosRefonte/HeroSection';
import ProcessSection from '../components/StudiosRefonte/ProcessSection';
import StudioShowcaseSection from '../components/StudiosRefonte/StudioShowcaseSection';
import StudioBookingFlow from '../components/StudiosRefonte/StudioBookingFlow';
import TestimonialsSection from '../components/StudiosRefonte/TestimonialsSection';
import FAQSection from '../components/StudiosRefonte/FAQSection';
import FinalCTASection from '../components/StudiosRefonte/FinalCTASection';

export default function Studios() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking-flow')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <SEOHead
        title="Studios Créatifs & Production Audio-Visuelle Marseille | Le 40"
        description="Louez nos studios créatifs équipés à Marseille. Face-Cam, Podcast, Live Stream, Talk-Show. Formules Autonome, Assisté ou Full Service. Réservation en ligne instantanée."
        keywords="studio créatif Marseille, studio podcast Marseille, studio vidéo Marseille, location studio tournage, production audiovisuelle Marseille, studio YouTube Marseille, studio TikTok"
        schema={serviceSchemas.studios}
      />

      <HeaderNav />
      <MobileBurger />

      <BottomBar
        variant="studios"
        title="Studios Créatifs Le 40"
        subtitle="À partir de 80€/session"
        features={[
          { text: 'Équipement 4K', pulse: false },
          { text: 'Formules flexibles', pulse: false },
          { text: 'Résa instantanée', highlight: true },
        ]}
        ctaText="Réserver un studio"
        ctaHref="#booking-flow"
        phoneNumber="04 13 00 10 00"
        icon={<Video className="w-5 h-5 md:w-6 md:h-6 text-white" />}
      />

      <main className="pt-24">
        {/* ============================================
            VIDÉO DE FOND FIXE (violet/abstrait)
            Visible sur toute la page
        ============================================ */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source 
              src="https://le40-cdn.b-cdn.net/videos/studios/studios-background.mp4" 
              type="video/mp4" 
            />
          </video>
          {/* Overlay sombre pour lisibilité du contenu */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>

        {/* ============================================
            CONTENU DE LA PAGE (par-dessus la vidéo)
        ============================================ */}
        <div className="relative z-10">
          
          {/* HERO SECTION */}
          <HeroSection />

          {/* COMMENT ÇA MARCHE - 3 étapes simples */}
          <ProcessSection />

          {/* ============================================
              VISITE VIRTUELLE DES STUDIOS + SERVICES
              Permet de découvrir chaque studio avant de réserver
          ============================================ */}
          <StudioShowcaseSection />

          {/* ============================================
              PARCOURS DE RÉSERVATION EN 4 ÉTAPES
              
              Étape 1: Choix du studio
              Étape 2: Choix de la formule
              Étape 3: Ajout des extras
              Étape 4: Récapitulatif & Paiement
          ============================================ */}
          <StudioBookingFlow />

          {/* TÉMOIGNAGES */}
          <section id="testimonials">
            <TestimonialsSection />
          </section>

          {/* FAQ */}
          <section id="faq">
            <FAQSection />
          </section>

          {/* CTA FINAL */}
          <FinalCTASection />
        </div>
      </main>

      <Footer />

      {/* ============================================
          STICKY CTA MOBILE
          Apparaît après scroll
      ============================================ */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm truncate">
                    Réservez votre studio
                  </div>
                  <div className="text-emerald-400 text-xs font-medium">
                    À partir de 40€/h · Réservation instantanée
                  </div>
                </div>

                {/* Bouton réserver */}
                <button
                  onClick={scrollToBooking}
                  className="shrink-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600
                           rounded-xl text-white font-bold text-sm shadow-lg shadow-emerald-500/30
                           active:scale-95 transition-transform"
                >
                  <span>Réserver</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Bouton téléphone */}
                <a
                  href="tel:+33413252640"
                  className="shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl
                           active:scale-95 transition-transform"
                  aria-label="Appeler"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}