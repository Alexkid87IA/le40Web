import React from 'react';
import { Video, Camera, Mic, Lightbulb, Zap } from 'lucide-react';
import AnimatedServiceSection from '../../components/ServiceSection/AnimatedServiceSection';

export default function StudioProSection() {
  return (
    <AnimatedServiceSection
      id="studios-pro"
      gradientClasses="bg-gradient-to-br from-blue-950/60 via-black/80 to-slate-950/60"
      badge={{
        icon: Video,
        text: 'Studio Pro',
        colorClasses: 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
      }}
      title={
        <h2>
          Production<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            8K Ultra HD
          </span>
        </h2>
      }
      comingSoon={true}
      description="Studios photo et vidéo professionnels équipés des dernières technologies. Parfait pour vos shootings produits, interviews et contenus corporate."
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
      images={['https://le40-cdn.b-cdn.net/homepage/home-studio-pro.png']}
      order="right"
    />
  );
}
