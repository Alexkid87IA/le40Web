import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Award, Sparkles, Lightbulb } from 'lucide-react';
import AnimatedServiceSection from '../../components/ServiceSection/AnimatedServiceSection';

export default function CommunitySection() {
  return (
    <AnimatedServiceSection
      id="community"
      videoSrc="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761792125/f6861355-bc98-4c72-b9bc-fb13a1abdfb7_i7v3kj.mp4"
      gradientClasses="bg-gradient-to-br from-orange-950/60 via-[#0A0A0A]/80 to-amber-950/60"
      badge={{
        icon: Users,
        text: 'Communauté Active',
        colorClasses: 'bg-purple-500/10 border border-purple-500/20 text-purple-300'
      }}
      title={
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
          Rejoignez le Réseau<br />
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400">
              Des Entrepreneurs
            </span>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </h2>
      }
      description="Plus qu'un espace de travail, Le 40 est une communauté vibrante où se rencontrent les esprits les plus brillants de Marseille. Échangez, collaborez et grandissez ensemble."
      features={[
        { icon: Calendar, text: 'Networking Events Mensuels' },
        { icon: Lightbulb, text: 'Ateliers & Masterclass Membres' },
        { icon: Award, text: 'Mentors & Experts Disponibles' },
        { icon: Sparkles, text: 'Opportunités de Collaboration' }
      ]}
      price={{
        amount: 'Inclus',
        period: 'avec votre abonnement',
        gradientClasses: 'bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400'
      }}
      cta={{
        primary: {
          text: 'REJOINDRE LA COMMUNAUTÉ',
          href: '/community',
          gradientClasses: 'bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500'
        },
        secondary: {
          text: 'Voir les événements',
          href: '/events',
          borderColorClasses: 'border-white/10 hover:border-white/20'
        }
      }}
      images={[
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
        'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg',
        'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
      ]}
      noiseFilterId="noiseCommunity"
      noiseSeed="7"
      order="right"
    />
  );
}
