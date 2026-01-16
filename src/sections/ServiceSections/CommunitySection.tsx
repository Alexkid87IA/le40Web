import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Award, Sparkles, Lightbulb, Clock } from 'lucide-react';
import AnimatedServiceSection from '../../components/ServiceSection/AnimatedServiceSection';

export default function CommunitySection() {
  return (
    <AnimatedServiceSection
      id="community"
      videoSrc="https://le40-cdn.b-cdn.net/videos/hero/hero-background.mp4"
      gradientClasses="bg-gradient-to-br from-orange-950/60 via-[#0A0A0A]/80 to-amber-950/60"
      badge={{
        icon: Users,
        text: 'Le Club',
        colorClasses: 'bg-purple-500/10 border border-purple-500/20 text-purple-300'
      }}
      title={
        <div className="mb-4 md:mb-6 laptop:mb-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl laptop:text-4xl font-montserrat font-black text-white leading-tight">
            Rejoignez<br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400">
                Le Club
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
      description="Un club exclusif réunissant les entrepreneurs les plus ambitieux de Marseille. Événements networking, masterclass, mentorat et opportunités de collaboration. Rejoignez une communauté d'excellence."
      features={[
        { icon: Calendar, text: 'Networking Events Mensuels', description: 'Rencontrez d\'autres entrepreneurs chaque mois' },
        { icon: Lightbulb, text: 'Ateliers & Masterclass Exclusifs', description: 'Formations par des experts reconnus' },
        { icon: Award, text: 'Programme de Mentorat', description: 'Conseils personnalisés de mentors expérimentés' },
        { icon: Sparkles, text: 'Accès Prioritaire aux Événements', description: 'Réservez votre place en avant-première' }
      ]}
      price={{
        amount: '50€',
        period: '/mois',
        gradientClasses: 'bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400'
      }}
      cta={{
        primary: {
          text: 'REJOINDRE LE CLUB',
          href: '/club',
          gradientClasses: 'bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500'
        },
        secondary: {
          text: 'En savoir plus',
          href: '/club',
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
      order="left"
    />
  );
}
