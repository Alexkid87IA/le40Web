import React from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Mic, Lightbulb, ArrowRight, Zap } from 'lucide-react';

export default function StudiosSection() {
  return (
    <>
      <section id="studios-pro" className="relative min-h-screen flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761803653/d928c6b7-f494-4466-81f2-040f32b9eadc_nqynim.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-black/80 to-slate-950/60"></div>
        </div>

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:order-1"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative h-full">
                  {[
                    'https://images.pexels.com/photos/7991162/pexels-photo-7991162.jpeg',
                    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
                    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
                    'https://images.pexels.com/photos/7991206/pexels-photo-7991206.jpeg'
                  ].map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 1,
                        delay: index * 4,
                        repeat: Infinity,
                        repeatDelay: 12
                      }}
                      className="absolute inset-0"
                      style={{
                        opacity: 0,
                        animation: `fadeInOut 16s infinite ${index * 4}s`
                      }}
                    >
                      <img
                        src={src}
                        alt={`Studio pro ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-3 mb-8">
                <Video className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 text-sm font-bold uppercase tracking-wider">Studio Pro</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6 leading-tight">
                Production<br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                    8K Ultra HD
                  </span>
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl -z-10"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-inter">
                Studios photo et vidéo professionnels équipés des dernières technologies. Parfait pour vos shootings produits, interviews, publicités et contenus corporate haut de gamme.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
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
                    className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-blue-500/20 transition-colors duration-300"
                  >
                    <div className="p-2 bg-blue-500/10 rounded-xl shrink-0">
                      <feature.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-white/80 text-sm leading-tight pt-2 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
              >
                <div className="text-white/50 text-sm font-inter">À partir de</div>
                <div className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">150€</div>
                <div className="text-white/50 text-sm font-inter">/demi-journée</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href="/studios"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ opacity: [0.5, 0.75, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-xl font-montserrat font-bold shadow-2xl text-sm">
                    <span>RÉSERVER UN STUDIO</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.a>

                <motion.a
                  href="/studios"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-blue-500/30 hover:border-blue-500/50 text-white rounded-xl font-montserrat font-bold transition-all duration-300 text-center text-sm"
                >
                  Voir l'équipement
                </motion.a>
              </motion.div>
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

      <section id="studios-content" className="relative min-h-screen flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761808607/8fc51ed3-de40-42f7-ac18-7dd2da634556_yxt3cm.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-black/80 to-rose-950/60"></div>
        </div>

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:order-1"
            >
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-5 py-3 mb-8">
                <Camera className="w-5 h-5 text-red-400" />
                <span className="text-red-300 text-sm font-bold uppercase tracking-wider">Studio Créateurs</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6 leading-tight">
                Créez Vos<br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-400">
                    Contenus Viraux
                  </span>
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-pink-500/20 blur-3xl -z-10"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-inter">
                Un espace pensé pour les créateurs de contenu, YouTubeurs, TikTokeurs et influenceurs. Setup rapide, équipement plug-and-play et ambiances modulables pour vos vidéos, podcasts et lives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
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
                    className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-red-500/20 transition-colors duration-300"
                  >
                    <div className="p-2 bg-red-500/10 rounded-xl shrink-0">
                      <feature.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-white/80 text-sm leading-tight pt-2 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
              >
                <div className="text-white/50 text-sm font-inter">À partir de</div>
                <div className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-400">50€</div>
                <div className="text-white/50 text-sm font-inter">/heure</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href="/studios"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ opacity: [0.5, 0.75, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white rounded-xl font-montserrat font-bold shadow-2xl text-sm">
                    <span>RÉSERVER MAINTENANT</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.a>

                <motion.a
                  href="/studios"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-red-500/30 hover:border-red-500/50 text-white rounded-xl font-montserrat font-bold transition-all duration-300 text-center text-sm"
                >
                  Voir les formules
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative h-full">
                  {[
                    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
                    'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
                    'https://images.pexels.com/photos/7224705/pexels-photo-7224705.jpeg',
                    'https://images.pexels.com/photos/6954174/pexels-photo-6954174.jpeg'
                  ].map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 1,
                        delay: index * 4,
                        repeat: Infinity,
                        repeatDelay: 12
                      }}
                      className="absolute inset-0"
                      style={{
                        opacity: 0,
                        animation: `fadeInOut 16s infinite ${index * 4}s`
                      }}
                    >
                      <img
                        src={src}
                        alt={`Studio créateurs ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </motion.div>
                  ))}
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
