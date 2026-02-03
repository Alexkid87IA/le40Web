import React from 'react';
import { Users, Calendar, Award, Lightbulb } from 'lucide-react';
import AnimatedServiceSection from '../../components/ServiceSection/AnimatedServiceSection';

export default function CommunitySection() {
  return (
    <AnimatedServiceSection
      id="community"
      gradientClasses="bg-gradient-to-br from-purple-950/60 via-[#0A0A0A]/80 to-violet-950/60"
      badge={{
        icon: Users,
        text: 'Le Club',
        colorClasses: 'bg-purple-500/10 border border-purple-500/20 text-purple-300'
      }}
      title={
        <h2>
          Rejoignez<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400">
            Le Club
          </span>
        </h2>
      }
      comingSoon={true}
      description="Un club exclusif réunissant les entrepreneurs les plus ambitieux de Marseille. Événements networking, masterclass, mentorat et opportunités de collaboration. Rejoignez une communauté d'excellence."
      features={[
        { icon: Calendar, text: 'Networking Events Mensuels', description: 'Rencontrez d\'autres entrepreneurs chaque mois' },
        { icon: Lightbulb, text: 'Ateliers & Masterclass Exclusifs', description: 'Formations par des experts reconnus' },
        { icon: Award, text: 'Programme de Mentorat', description: 'Conseils personnalisés de mentors expérimentés' },
        { icon: Calendar, text: 'Accès Prioritaire aux Événements', description: 'Réservez votre place en avant-première' }
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
          borderColorClasses: 'border-purple-500/30 hover:border-purple-500/50'
        }
      }}
      images={[
        'https://le40-cdn.b-cdn.net/homepage/home-club.png'
      ]}
      noiseFilterId="noiseCommunity"
      noiseSeed="7"
      order="right"
    />
  );
}
