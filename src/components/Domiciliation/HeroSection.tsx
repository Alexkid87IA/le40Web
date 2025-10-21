import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Check, Star, Shield, Clock, MapPin, Users } from 'lucide-react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
      setMousePosition({ x: x * 50, y: y * 50 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const serviceDetails = {
    tagline: "Adresse prestigieuse République",
    metric: "120+ entreprises",
    gradient: "from-slate-200 via-amber-50 to-slate-100",
    shadowColor: "rgba(245, 158, 11, 0.3)",
    accentColor: "#F59E0B"
  };

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]"></div>

        {/* Subtle mesh pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

      {/* Dynamic ambient light orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[120px]"
            style={{ backgroundColor: serviceDetails.accentColor, opacity: 0.08 }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-48 w-[30rem] h-[30rem] rounded-full blur-[140px]"
            style={{ backgroundColor: serviceDetails.accentColor, opacity: 0.06 }}
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -50, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
      </div>

      {/* Hero Image with ultra-smooth parallax */}
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
            />

            {/* Multi-layer sophisticated overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent"></div>

            {/* Subtle color accent overlay */}
            <motion.div
              className="absolute inset-0 mix-blend-soft-light"
              style={{ backgroundColor: serviceDetails.accentColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.04 }}
              transition={{ duration: 2 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Elegant light rays */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[0.5px] w-full"
            style={{
              top: `${20 + i * 15}%`,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)`
            }}
            animate={{
              x: [-1200, 1200],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              delay: i * 2.5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Sales Message */}
          <div>
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-amber-400 font-inter text-sm font-semibold">4.9/5 sur Google</span>
              <span className="text-white/40 text-sm">·</span>
              <span className="text-white/60 text-sm">120+ entreprises</span>
            </motion.div>

            {/* Main Headline - Short & Benefit-Focused */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-black text-white leading-tight tracking-tight mb-4"
              style={{ textShadow: '0 4px 60px rgba(0,0,0,0.5)' }}
            >
              Domiciliez votre entreprise
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-black leading-tight tracking-tight mb-6 bg-gradient-to-br from-slate-200 via-amber-50 to-slate-100 bg-clip-text text-transparent"
              style={{ filter: `drop-shadow(0 2px 30px ${serviceDetails.shadowColor})` }}
            >
              à partir de 29€/mois
            </motion.h2>

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-white/70 font-inter leading-relaxed mb-8 max-w-xl"
            >
              Adresse prestigieuse Place de la République + scan courrier 2h + standard téléphonique. Activation en 24h.
            </motion.p>

            {/* Key Benefits - Quick Scan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
            >
              {[
                { icon: Shield, text: 'Agrément Préfecture' },
                { icon: Clock, text: 'Activation 24h' },
                { icon: MapPin, text: 'Adresse prestigieuse' },
                { icon: Users, text: '120+ clients actifs' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-green-400/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-white/80 font-inter text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs - More Prominent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA */}
              <motion.a
                href="#pricing"
                className="group relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-50 group-hover:opacity-100 blur-lg transition-opacity duration-500"
                  style={{ backgroundColor: serviceDetails.accentColor }}
                />
                <div className="relative bg-white text-black rounded-xl px-8 py-4 flex items-center justify-center gap-3 shadow-2xl">
                  <span className="font-montserrat font-bold text-base">
                    Voir les formules
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl px-8 py-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="font-montserrat font-semibold text-base text-white">
                  Être rappelé
                </span>
              </motion.a>
            </motion.div>

            {/* Urgency/Scarcity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-6 flex items-center gap-2"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/50 font-inter text-sm">
                <span className="text-green-400 font-semibold">3 places disponibles</span> ce mois-ci
              </span>
            </motion.div>
          </div>

          {/* Right Column - Social Proof & Trust */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="space-y-6"
            >
              {/* Testimonial Card */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/80 font-inter text-sm leading-relaxed mb-4">
                  "Service impeccable depuis 2 ans. Le scan courrier en 2h est un vrai gain de temps. Équipe très pro et réactive."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"></div>
                  <div>
                    <p className="text-white font-inter text-sm font-semibold">Marie Dubois</p>
                    <p className="text-white/50 font-inter text-xs">CEO, Startup Tech</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <Shield className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-white/90 font-montserrat text-sm font-bold">Agrément</p>
                  <p className="text-white/50 font-inter text-xs">Préfecture 13</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-white/90 font-montserrat text-sm font-bold">120+</p>
                  <p className="text-white/50 font-inter text-xs">Entreprises</p>
                </div>
              </div>

              {/* Additional testimonial */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/80 font-inter text-sm leading-relaxed">
                      "J'ai créé ma société en <span className="text-white font-semibold">moins de 48h</span> grâce à leur accompagnement."
                    </p>
                    <p className="text-white/50 font-inter text-xs mt-2">Thomas L. - Consultant</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Premium bottom fade with subtle vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-[5] pointer-events-none"></div>

      {/* Refined film grain texture */}
      <div className="absolute inset-0 z-[3] opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="sophisticatedNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sophisticatedNoise)" />
        </svg>
      </div>
    </section>
  );
}
