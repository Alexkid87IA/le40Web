import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Clock, Volume2, VolumeX, Play, Building2, Users, Wifi, Lock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import VisitBookingModal from './VisitBookingModal';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const videoReveal = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 } } };

export default function BureauHeroSection() {
  const videoUrl = "https://le40-cdn.b-cdn.net/videos/promo/bureau-promo-916.mp4";
  const backgroundVideoUrl = "https://le40-cdn.b-cdn.net/videos/bureaux/bureaux-background.mp4";

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !isMuted;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Background video + overlays */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src={backgroundVideoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      </div>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.015] z-[1]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* ══════════════════════════════════════════
          MOBILE
          ══════════════════════════════════════════ */}
      <div className="lg:hidden relative h-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full px-4 pt-20 pb-6 flex flex-col"
        >
          {/* Video card */}
          <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden">
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-black cursor-pointer"
              onClick={togglePlayPause}
            >
              {isMobile && (
                <video ref={videoRef} autoPlay loop muted={true} playsInline preload="metadata" className="w-full h-full object-cover">
                  <source src={videoUrl} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />

              {/* Play button */}
              <motion.div
                animate={{ opacity: isPlaying ? 0 : 0.9, scale: isPlaying ? 0.8 : 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
              </motion.div>

              {/* Mute button */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="absolute top-3 right-3 z-20 w-8 h-8 bg-black/40 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white/60" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
              </button>

              {/* Overlaid content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-3">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span className="text-[11px] font-inter font-medium text-white/90 tracking-wide uppercase">Bureaux Privés</span>
                </div>
                <h1 className="text-2xl font-montserrat font-black text-white mb-2 leading-[1.1]">
                  VOTRE ESPACE{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400">100% DÉDIÉ</span>
                </h1>
                <p className="text-sm text-white/70 font-inter mb-3">
                  De 15m² à 100m². Tout équipé. <span className="text-white font-medium">127+ entreprises hébergées.</span>
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />)}</div>
                    <span className="text-white text-xs font-semibold">4.9</span>
                  </div>
                  <span className="text-white/50 text-xs">127+ entreprises</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-4 flex flex-col gap-2.5">
            <a href="#pricing" className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-montserrat font-bold text-sm shadow-lg shadow-blue-500/20">
              Découvrir les bureaux <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-3.5 bg-white/10 backdrop-blur border border-white/15 text-white rounded-xl font-montserrat font-bold text-sm text-center"
            >
              Réserver une visite
            </button>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — Split 50/50 (style homepage)
          ══════════════════════════════════════════ */}
      <div className="h-full hidden lg:flex items-center justify-center relative z-10 pt-20">
        <div className="w-full max-w-[1200px] mx-auto px-8 flex items-center justify-center gap-12">

          {/* ── TEXTE ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-md"
          >
            <div>
              {/* Badge */}
              <motion.div variants={fade}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] mb-4">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-inter font-medium text-white/80 tracking-[0.12em] uppercase">Bureaux Privés · À partir de 499€/mois</span>
                </div>
              </motion.div>

              {/* Titre */}
              <motion.h1 variants={fade} className="text-4xl font-montserrat font-black text-white mb-3 leading-[0.95] tracking-[-0.02em]">
                VOTRE ESPACE<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400">100% DÉDIÉ</span>
              </motion.h1>

              {/* Sous-titre */}
              <motion.p variants={fade} className="text-sm text-white/60 font-inter mb-4 leading-relaxed">
                De 15m² à 100m². Équipement complet inclus : fibre, mobilier premium, salles de réunion.{' '}
                <span className="text-white/90 font-medium">127+ entreprises hébergées.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fade} className="flex items-center gap-3 mb-4">
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-40 blur-xl group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-montserrat font-bold text-sm">
                    Découvrir les bureaux
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.a>

                <motion.button
                  onClick={() => setIsBookingModalOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-sm border border-white/[0.1] hover:border-white/[0.2] text-white rounded-xl font-montserrat font-bold text-sm transition-colors duration-300"
                >
                  Réserver une visite
                </motion.button>
              </motion.div>

              {/* Services chips */}
              <motion.div variants={fade} className="flex flex-wrap gap-2 mb-4">
                {[
                  { icon: Lock, label: 'Bureaux Sécurisés' },
                  { icon: Wifi, label: 'Fibre 1 Gbps' },
                  { icon: Users, label: 'De 2 à 20 pers.' },
                  { icon: Building2, label: '15m² à 100m²' },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-colors cursor-default"
                  >
                    <service.icon className="w-3.5 h-3.5 text-blue-400/70" />
                    <span className="text-xs font-inter font-medium text-white/70">{service.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Social proof + Info */}
              <motion.div variants={fade} className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <span className="text-white font-inter text-sm font-bold ml-0.5">4.9/5</span>
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-black flex items-center justify-center text-white font-bold text-[8px]">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-white/50 font-inter text-sm">
                      <span className="text-blue-400 font-semibold">127+</span> entreprises
                    </span>
                  </div>
                </div>

                {/* Location & Hours */}
                <div className="flex items-center gap-4 text-white/40 text-xs font-inter">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Marseille 15e</span>
                  </div>
                  <div className="w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Lun-Ven 9h-20h</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── VIDÉO ── */}
          <motion.div
            variants={videoReveal}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Glow ambiant */}
              <div className="absolute -inset-6 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-transparent rounded-[2rem] blur-3xl pointer-events-none" />

              {/* Glass card */}
              <div
                className="relative p-3 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 32px 64px -16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <div
                  className="relative w-[240px] h-[420px] rounded-xl overflow-hidden cursor-pointer group"
                  onClick={togglePlayPause}
                >
                  {!isMobile && (
                    <video ref={videoRef} autoPlay loop muted={true} playsInline preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]">
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  )}

                  {/* Vignette subtile */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.15) 100%)',
                  }} />

                  {/* Play button */}
                  <motion.div
                    animate={{ opacity: isPlaying ? 0 : 1, scale: isPlaying ? 0.9 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl" />
                      <div className="relative w-16 h-16 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Mute button */}
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                    className="absolute top-3 right-3 z-20 group/mute"
                  >
                    <div className="flex items-center justify-center w-9 h-9 bg-black/40 backdrop-blur-md border border-white/10 rounded-full group-hover/mute:border-blue-400/40 transition-colors duration-300">
                      {isMuted
                        ? <VolumeX className="w-4 h-4 text-white/50 group-hover/mute:text-blue-400 transition-colors" />
                        : <Volume2 className="w-4 h-4 text-blue-400" />
                      }
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-[2]" />

      <VisitBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
