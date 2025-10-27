import React from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Mic, Lightbulb, ArrowRight, Zap } from 'lucide-react';
import Button from '../../components/UI/Button';

export default function StudiosSection() {
  return (
    <>
      <section id="studios-pro" className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-[#0A0A0A] to-indigo-950/20"></div>

          <motion.div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute inset-0"
          >
            <img
              src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Studio professionnel Le 40"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-transparent to-[#0A0A0A]"></div>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                <Video className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">Studio Pro</span>
              </div>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
                Production<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  8K Ultra HD
                </span>
              </h2>

              <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">
                Studios photo et vidéo professionnels équipés des dernières technologies. Parfait pour vos shootings produits, interviews, publicités et contenus corporate haut de gamme.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Camera, text: 'Caméras 8K RED & Sony' },
                  { icon: Mic, text: 'Son Dolby Atmos' },
                  { icon: Lightbulb, text: 'Éclairage Professionnel' },
                  { icon: Zap, text: 'Post-Production IA' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <feature.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-white/80 text-sm leading-tight pt-1">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="text-white/50 text-sm">À partir de</div>
                <div className="text-5xl font-montserrat font-black text-white">150€</div>
                <div className="text-white/50 text-sm">/demi-journée</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/studios"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white"
                >
                  RÉSERVER UN STUDIO
                </Button>
                <Button
                  href="/studios"
                  variant="secondary"
                  size="md"
                  className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                >
                  Voir l'équipement
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-8xl mb-4">🎬</div>
                    <div className="text-2xl font-bold text-white mb-2">3 Studios Disponibles</div>
                    <div className="text-white/50">50m² à 120m²</div>
                  </div>
                  <div className="h-px bg-white/10 my-6"></div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Fond vert/blanc</span>
                      <span className="text-white font-semibold">Inclus</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Régie technique</span>
                      <span className="text-white font-semibold">Disponible</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Technicien sur demande</span>
                      <span className="text-white font-semibold">+80€/h</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
          <svg width="100%" height="100%">
            <filter id="noiseStudiosPro">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseStudiosPro)" />
          </svg>
        </div>
      </section>

      <section id="studios-content" className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950/30 via-[#0A0A0A] to-pink-950/20"></div>

          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[140px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-2 mb-6">
                <Camera className="w-4 h-4 text-rose-400" />
                <span className="text-rose-300 text-sm font-medium uppercase tracking-wider">Studio Créateurs</span>
              </div>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
                Créez Vos<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400">
                  Contenus Viraux
                </span>
              </h2>

              <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">
                Un espace pensé pour les créateurs de contenu, YouTubeurs, TikTokeurs et influenceurs. Setup rapide, équipement plug-and-play et ambiances modulables pour vos vidéos, podcasts et lives.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Video, text: 'Setup Prêt en 5 min' },
                  { icon: Mic, text: 'Micro & Podcast Kit' },
                  { icon: Lightbulb, text: 'Ring Light & Softbox' },
                  { icon: Camera, text: 'Streaming 4K' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="p-2 bg-rose-500/10 rounded-lg">
                      <feature.icon className="w-5 h-5 text-rose-400" />
                    </div>
                    <span className="text-white/80 text-sm leading-tight pt-1">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="text-white/50 text-sm">À partir de</div>
                <div className="text-5xl font-montserrat font-black text-white">50€</div>
                <div className="text-white/50 text-sm">/heure</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/studios"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white"
                >
                  RÉSERVER MAINTENANT
                </Button>
                <Button
                  href="/studios"
                  variant="secondary"
                  size="md"
                  className="border-rose-500/30 text-rose-300 hover:bg-rose-500/10"
                >
                  Voir les formules
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-8xl mb-4">📱</div>
                    <div className="text-2xl font-bold text-white mb-2">Studio Créateurs</div>
                    <div className="text-white/50">Parfait pour YouTube & TikTok</div>
                  </div>
                  <div className="h-px bg-white/10 my-6"></div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Décors modulables</span>
                      <span className="text-white font-semibold">5 ambiances</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Connexion live</span>
                      <span className="text-white font-semibold">Fibre 1 Gbps</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Forfaits mensuels</span>
                      <span className="text-white font-semibold">Dès 400€</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
          <svg width="100%" height="100%">
            <filter id="noiseStudiosContent">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="6" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseStudiosContent)" />
          </svg>
        </div>
      </section>
    </>
  );
}
