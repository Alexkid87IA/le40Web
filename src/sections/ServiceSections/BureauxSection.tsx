import React from 'react';
import { Lock, Wifi, Coffee, Users, Building2 } from 'lucide-react';
import AnimatedServiceSection from '../../components/ServiceSection/AnimatedServiceSection';

export default function BureauxSection() {
  return (
    <AnimatedServiceSection
      id="bureaux"
      gradientClasses="bg-gradient-to-br from-emerald-950/60 via-black/80 to-teal-950/60"
      badge={{
        icon: Building2,
        text: 'Bureaux Privés',
        colorClasses: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
      }}
      title={
        <h2>
          Votre Espace<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
            100% Dédié
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
        'https://le40-cdn.b-cdn.net/homepage/home-bureaux.png'
      ]}
      noiseFilterId="noiseBureaux"
      noiseSeed="4"
      order="right"
    />
  );
}
