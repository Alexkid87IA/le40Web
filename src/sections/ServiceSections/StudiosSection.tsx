import React from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Mic, Lightbulb, Zap } from 'lucide-react';
import AnimatedServiceSection from '../../components/ServiceSection/AnimatedServiceSection';

export default function StudiosSection() {
  return (
    <>
      <AnimatedServiceSection
        id="studios-pro"
        videoSrc="https://le40-cdn.b-cdn.net/videos/studios/studios-background.mp4"
        gradientClasses="bg-gradient-to-br from-blue-950/60 via-black/80 to-slate-950/60"
        badge={{
          icon: Video,
          text: 'Studio Pro',
          colorClasses: 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
        }}
        title={
          <h2 className="text-4xl sm:text-5xl lg:text-6xl laptop:text-4xl font-montserrat font-black text-white mb-6 laptop:mb-4 leading-tight">
            Production<br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                8K Ultra HD
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </h2>
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
          'https://images.pexels.com/photos/7991162/pexels-photo-7991162.jpeg',
          'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
          'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
          'https://images.pexels.com/photos/7991206/pexels-photo-7991206.jpeg'
        ]}
        noiseFilterId="noiseStudiosPro"
        noiseSeed="5"
        order="right"
      />

      <AnimatedServiceSection
        id="studios-content"
        videoSrc="https://le40-cdn.b-cdn.net/videos/club/club-background.mp4"
        gradientClasses="bg-gradient-to-br from-red-950/60 via-black/80 to-rose-950/60"
        badge={{
          icon: Camera,
          text: 'Studio Créateurs',
          colorClasses: 'bg-red-500/10 border border-red-500/20 text-red-300'
        }}
        title={
          <h2 className="text-4xl sm:text-5xl lg:text-6xl laptop:text-4xl font-montserrat font-black text-white mb-6 laptop:mb-4 leading-tight">
            Créez Vos<br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-400">
                Contenus Viraux
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-pink-500/20 blur-3xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </h2>
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
          'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
          'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
          'https://images.pexels.com/photos/7224705/pexels-photo-7224705.jpeg',
          'https://images.pexels.com/photos/6954174/pexels-photo-6954174.jpeg'
        ]}
        noiseFilterId="noiseStudiosContent"
        noiseSeed="6"
        order="left"
      />
    </>
  );
}
