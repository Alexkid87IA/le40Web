import React from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Mic, Lightbulb, Zap, Clock } from 'lucide-react';
import AnimatedServiceSection from '../../components/ServiceSection/AnimatedServiceSection';

export default function StudiosSection() {
  return (
    <>
      <AnimatedServiceSection
        id="studios-pro"
        gradientClasses="bg-gradient-to-br from-blue-950/60 via-black/80 to-slate-950/60"
        badge={{
          icon: Video,
          text: 'Studio Pro',
          colorClasses: 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
        }}
        title={
          <div className="mb-4 md:mb-6 laptop:mb-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl laptop:text-4xl font-montserrat font-black text-white leading-tight">
              Production<br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  8K Ultra HD
                </span>
              </span>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm font-bold uppercase tracking-wider">Bientôt disponible</span>
            </motion.div>
          </div>
        }
        description="Studios photo et vidéo professionnels équipés des dernières technologies. Parfait pour vos shootings produits, interviews, publicités et contenus corporate haut de gamme."
        features={[
          { icon: Camera, text: 'Caméras 8K RED & Sony' },
          { icon: Mic, text: 'Son Dolby Atmos' },
          { icon: Lightbulb, text: 'Éclairage Professionnel' },
          { icon: Zap, text: 'Post-Production IA' }
        ]}
        price={{
          amount: '150€',
          period: '/demi-journée',
          gradientClasses: 'bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400'
        }}
        cta={{
          primary: {
            text: 'RÉSERVER UN STUDIO',
            href: '/studios',
            gradientClasses: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
          },
          secondary: {
            text: "Voir l'équipement",
            href: '/studios',
            borderColorClasses: 'border-blue-500/30 hover:border-blue-500/50'
          }
        }}
        images={[
          'https://le40-cdn.b-cdn.net/homepage/home-studio-pro.png'
        ]}
        noiseFilterId="noiseStudiosPro"
        noiseSeed="5"
        order="right"
      />

      <AnimatedServiceSection
        id="studios-content"
        gradientClasses="bg-gradient-to-br from-red-950/60 via-black/80 to-rose-950/60"
        badge={{
          icon: Camera,
          text: 'Studio Créateurs',
          colorClasses: 'bg-red-500/10 border border-red-500/20 text-red-300'
        }}
        title={
          <div className="mb-4 md:mb-6 laptop:mb-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl laptop:text-4xl font-montserrat font-black text-white leading-tight">
              Créez Vos<br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-400">
                  Contenus Viraux
                </span>
              </span>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm font-bold uppercase tracking-wider">Bientôt disponible</span>
            </motion.div>
          </div>
        }
        description="Un espace pensé pour les créateurs de contenu, YouTubeurs, TikTokeurs et influenceurs. Setup rapide, équipement plug-and-play et ambiances modulables pour vos vidéos, podcasts et lives."
        features={[
          { icon: Video, text: 'Setup Prêt en 5 min' },
          { icon: Mic, text: 'Micro & Podcast Kit' },
          { icon: Lightbulb, text: 'Ring Light & Softbox' },
          { icon: Camera, text: 'Streaming 4K' }
        ]}
        price={{
          amount: '50€',
          period: '/heure',
          gradientClasses: 'bg-gradient-to-r from-red-400 via-rose-400 to-pink-400'
        }}
        cta={{
          primary: {
            text: 'RÉSERVER MAINTENANT',
            href: '/studios',
            gradientClasses: 'bg-gradient-to-r from-red-500 via-rose-500 to-pink-500'
          },
          secondary: {
            text: 'Voir les formules',
            href: '/studios',
            borderColorClasses: 'border-red-500/30 hover:border-red-500/50'
          }
        }}
        images={[
          'https://le40-cdn.b-cdn.net/homepage/home-studio-createurs.png'
        ]}
        noiseFilterId="noiseStudiosContent"
        noiseSeed="6"
        order="left"
      />
    </>
  );
}
