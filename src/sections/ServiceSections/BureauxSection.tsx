import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Wifi, Coffee, Users, Building2 } from 'lucide-react';
import AnimatedServiceSection from '../../components/ServiceSection/AnimatedServiceSection';

export default function BureauxSection() {
  return (
    <AnimatedServiceSection
      id="bureaux"
      videoSrc="https://le40-cdn.b-cdn.net/videos/bureaux/bureaux-background.mp4"
      gradientClasses="bg-gradient-to-br from-emerald-950/60 via-black/80 to-teal-950/60"
      badge={{
        icon: Building2,
        text: 'Bureaux Privés',
        colorClasses: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
      }}
      title={
        <h2 className="text-4xl sm:text-5xl lg:text-6xl laptop:text-4xl font-montserrat font-black text-white mb-6 laptop:mb-4 leading-tight">
          Votre Espace<br />
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              100% Dédié
            </span>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </h2>
      }
      description="Louez un bureau privé fermé et sécurisé pour votre entreprise. Espaces exclusifs de 10m² à 100m² avec mobilier premium, ligne téléphonique dédiée et services professionnels inclus."
      features={[
        { icon: Lock, text: 'Bureaux Privés Sécurisés' },
        { icon: Wifi, text: 'Fibre Dédiée 1 Gbps' },
        { icon: Coffee, text: 'Cuisine Équipée Premium' },
        { icon: Users, text: 'De 2 à 20 Personnes' }
      ]}
      price={{
        amount: '499€',
        period: '/mois',
        gradientClasses: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400'
      }}
      cta={{
        primary: {
          text: 'VOIR LES BUREAUX',
          href: '/bureaux',
          gradientClasses: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
        },
        secondary: {
          text: 'Demander une visite',
          href: '/contact',
          borderColorClasses: 'border-emerald-500/30 hover:border-emerald-500/50'
        }
      }}
      images={[
        'https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg',
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
        'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg',
        'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
      ]}
      noiseFilterId="noiseBureaux"
      noiseSeed="4"
      order="right"
    />
  );
}
