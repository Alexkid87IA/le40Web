import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Check, Star, Shield, Building2, Zap, Phone, Mail, TrendingUp, Award, Clock } from 'lucide-react';
import { designTokens } from '../../styles/designTokens';
import Button from '../UI/Button';
import { useParallaxMouse } from '../../hooks/useParallaxMouse';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Hook personnalisé optimisé avec throttle pour l'effet parallax
  const { containerRef, mouseX, mouseY } = useParallaxMouse(20, 16);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const serviceDetails = {
    accentColor: "#F59E0B",
    shadowColor: "rgba(245, 158, 11, 0.3)"
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-red-600">

      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent"></div>

        <div className="absolute inset-0 opacity-[0.02]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px]"
          style={{ backgroundColor: serviceDetails.accentColor, opacity: 0.12 }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 60, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[32rem] h-[32rem] rounded-full blur-[140px]"
          style={{ backgroundColor: serviceDetails.accentColor, opacity: 0.08 }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -60, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Hero Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-[-5%] overflow-hidden"
          style={{
            x: smoothMouseX,
            y: smoothMouseY
          }}
        >
          <div className="relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Domiciliation Marseille - Le 40"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              srcSet="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=640 640w,
                      https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1280 1280w,
                      https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1920 1920w"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/98 to-slate-950/85"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-transparent to-slate-950"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating Light Rays */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full"
            style={{
              top: `${25 + i * 20}%`,
              background: `linear-gradient(90deg, transparent, rgba(251,191,36,0.1), transparent)`
            }}
            animate={{
              x: [-1200, 1200],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 15 + i * 4,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-20"
      >
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-20 items-center">

          {/* Left Column - Ultra-Conversion Focused */}
          <div className="max-w-3xl">

            {/* Floating Offer Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 backdrop-blur-sm mb-8 shadow-lg shadow-amber-500/10"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 font-inter text-sm font-bold">Agrément Préfecture</span>
              <div className="w-px h-4 bg-amber-400/30"></div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-white/90 font-inter text-sm font-semibold">4.9/5</span>
                <span className="text-white/60 text-xs">(127 avis)</span>
              </div>
            </motion.div>

            {/* Power Headline - Problem/Solution */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7"
            >
              <h1 className={`${designTokens.typography.h1.size} font-montserrat ${designTokens.typography.h1.weight} text-white ${designTokens.typography.h1.leading} ${designTokens.typography.h1.tracking} mb-6`}
                  style={{ textShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                Domiciliation d'entreprise en{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                    24h
                  </span>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 to-orange-500/30 blur-2xl -z-10"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Killer Value Prop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl sm:text-7xl font-montserrat font-black text-white">29€</span>
                  <span className="text-2xl font-montserrat font-medium text-white/60">/mois</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-green-500/20 border border-green-400/40">
                  <span className="text-green-400 font-inter text-sm font-bold">-40%</span>
                </div>
              </div>
              <p className={`${designTokens.typography.body.size} text-white/80 font-inter font-medium ${designTokens.typography.body.leading}`}>
                Adresse professionnelle République + Scan courrier 2h + Standard téléphonique inclus
              </p>
            </motion.div>

            {/* Value Stack - Premium Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-3 mb-10"
            >
              {[
                { icon: Building2, text: 'Adresse Place de la République', highlight: 'Stratégique' },
                { icon: Zap, text: 'Activation garantie sous 24h', highlight: 'Express' },
                { icon: Shield, text: 'Agrément Préfecture + Conformité légale', highlight: 'Certifié' },
                { icon: Mail, text: 'Scan et transfert courrier en 2h', highlight: 'Ultra-rapide' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.08, duration: 0.6 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-white font-inter ${designTokens.typography.body.size} font-medium leading-snug`}>
                      {benefit.text}
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <span className="text-amber-400 font-inter text-xs font-bold">{benefit.highlight}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mega CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="space-y-5"
            >
              <div className={`flex flex-col sm:flex-row ${designTokens.spacing.gap.sm}`}>
                {/* Primary Mega CTA */}
                <div className="group relative flex-1">
                  <motion.div
                    className="absolute -inset-1 rounded-2xl opacity-60 group-hover:opacity-100 blur-xl transition-all duration-500"
                    style={{ background: `linear-gradient(135deg, ${serviceDetails.accentColor}, #F97316)` }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative">
                    <Button
                      href="#pricing"
                      size="lg"
                      icon={ArrowRight}
                      iconPosition="right"
                      fullWidth
                      className="shadow-2xl shadow-amber-500/30"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="text-left">
                          <p className="font-montserrat font-black text-base">Choisir cette offre</p>
                          <p className="text-white/90 text-xs font-inter">Dès 29€/mois • 3 forfaits</p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Secondary CTA */}
              <Button
                href="/contact"
                variant="secondary"
                size="md"
                icon={Phone}
                fullWidth
              >
                Nous contacter
              </Button>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-green-400"
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white/70 font-inter text-sm">
                    <span className="text-green-400 font-bold">Disponible immédiatement</span>
                  </span>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-white/70 font-inter text-sm">127 entrepreneurs nous font confiance</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column - Ultra Social Proof */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="space-y-5"
            >

              {/* Featured Testimonial - Premium */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex items-center gap-1.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="ml-2 text-white/90 font-inter text-sm font-bold">5.0</span>
                </div>
                <p className="text-white/95 font-inter text-base leading-relaxed mb-6">
                  "Le scan courrier automatique m'a fait gagner <span className="font-bold text-amber-400">8 heures par semaine</span>. Tout est géré efficacement et je peux me concentrer sur mon activité. Un vrai gain de temps et de productivité au quotidien."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-900"></div>
                  </div>
                  <div>
                    <p className="text-white font-inter text-base font-bold">Sophie Martinez</p>
                    <p className="text-white/60 font-inter text-sm">CEO @ TechFlow SaaS</p>
                  </div>
                  <div className="ml-auto">
                    <Award className="w-8 h-8 text-amber-400" />
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                >
                  <Clock className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                  <p className="text-4xl font-montserrat font-black text-white mb-1">24h</p>
                  <p className="text-white/60 font-inter text-sm">Activation</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                >
                  <Shield className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                  <p className="text-4xl font-montserrat font-black text-white mb-1">127</p>
                  <p className="text-white/60 font-inter text-sm">Entreprises</p>
                </motion.div>
              </div>

              {/* Mini Testimonials Stack */}
              <div className="space-y-3">
                {[
                  { name: 'Lucas D.', role: 'E-commerce', text: 'Configuration en 10 min, tout fonctionne parfaitement' },
                  { name: 'Emma R.', role: 'Consultante', text: 'Le standard téléphonique est hyper pro' }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.15 }}
                    whileHover={{ x: 4 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <p className="text-white/90 font-inter text-sm leading-relaxed mb-1.5">
                          "{testimonial.text}"
                        </p>
                        <p className="text-white/60 font-inter text-xs">
                          <span className="font-semibold">{testimonial.name}</span> · {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badge Ribbon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 }}
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-400/20"
              >
                <Shield className="w-6 h-6 text-emerald-400" />
                <div className="text-left">
                  <p className="text-white font-inter text-sm font-bold">Agrément Préfecture</p>
                  <p className="text-white/60 font-inter text-xs">Certifié depuis 2018</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-[5] pointer-events-none"></div>

      {/* Cinematic Grain */}
      <div className="absolute inset-0 z-[3] opacity-[0.02] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="heroNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="5" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroNoise)" />
        </svg>
      </div>

    </section>
  );
}
