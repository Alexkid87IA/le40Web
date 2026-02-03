import React from 'react';
import { Video, Camera, Mic, Lightbulb } from 'lucide-react';
import AnimatedServiceSection from '../../components/ServiceSection/AnimatedServiceSection';

export default function StudioCreateursSection() {
  return (
    <AnimatedServiceSection
      id="studios-content"
      gradientClasses="bg-gradient-to-br from-red-950/60 via-black/80 to-rose-950/60"
      badge={{
        icon: Camera,
        text: 'Studio Créateurs',
        colorClasses: 'bg-red-500/10 border border-red-500/20 text-red-300'
      }}
      title={
        <h2>
          Créez Vos<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-400">
            Contenus Viraux
          </span>
        </h2>
      }
      comingSoon={true}
      description="Un espace pensé pour les créateurs de contenu. Setup rapide, équipement plug-and-play et ambiances modulables pour vos vidéos et podcasts."
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
      images={['https://le40-cdn.b-cdn.net/homepage/home-studio-createurs.png']}
      order="left"
    />
  );
}
