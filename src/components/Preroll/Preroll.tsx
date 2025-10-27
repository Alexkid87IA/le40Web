import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MapPin, Monitor, Video, Camera, Network, X, Sparkles } from 'lucide-react';

interface PrerollOption {
  id: string;
  question: string;
  icon: React.ElementType;
  gradient: string;
  shadowColor: string;
  targetSection: string;
}

const prerollOptions: PrerollOption[] = [
  {
    id: 'bureau',
    question: 'Un bureau privé pour votre équipe?',
    icon: Monitor,
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    shadowColor: '#10b981',
    targetSection: 'bureaux'
  },
  {
    id: 'domiciliation',
    question: 'Une adresse prestigieuse à Marseille?',
    icon: MapPin,
    gradient: 'from-amber-600 via-orange-600 to-red-600',
    shadowColor: '#f59e0b',
    targetSection: 'domiciliation'
  },
  {
    id: 'studio-pro',
    question: 'Un studio photo/vidéo professionnel?',
    icon: Video,
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    shadowColor: '#3b82f6',
    targetSection: 'studios-pro'
  },
  {
    id: 'studio-content',
    question: 'Un espace pour vos contenus YouTube?',
    icon: Camera,
    gradient: 'from-rose-600 via-pink-600 to-fuchsia-600',
    shadowColor: '#ec4899',
    targetSection: 'studios-content'
  },
  {
    id: 'coworking',
    question: 'Un coworking pour réseauter?',
    icon: Users,
    gradient: 'from-violet-600 via-purple-600 to-indigo-600',
    shadowColor: '#8b5cf6',
    targetSection: 'coworking'
  },
  {
    id: 'community',
    question: 'Rejoindre une communauté d\'entrepreneurs?',
    icon: Network,
    gradient: 'from-cyan-600 via-sky-600 to-blue-600',
    shadowColor: '#06b6d4',
    targetSection: 'community'
  }
];

interface PrerollProps {
  onSelect: (sectionId: string) => void;
  onSkip: () => void;
}

export default function Preroll({ onSelect, onSkip }: PrerollProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelect = (sectionId: string) => {
    setIsVisible(false);
    setTimeout(() => onSelect(sectionId), 600);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => onSkip(), 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-black"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]"></div>

            <motion.div
              className="absolute inset-0"
              style={{
                x: mousePosition.x,
                y: mousePosition.y
              }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-amber-600/15 rounded-full blur-[140px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-cyan-600/10 rounded-full blur-[160px]"></div>
            </motion.div>

            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  y: [0, -100]
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
            <motion.button
              onClick={handleSkip}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-black/60 border border-white/20 rounded-full px-6 py-3 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <span className="text-white/90 font-medium text-sm uppercase tracking-wider">
                        Bienvenue au 40
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-4 leading-tight">
                Que recherchez-vous?
              </h1>
              <p className="text-lg sm:text-xl text-white/60 font-light max-w-2xl mx-auto">
                Choisissez votre besoin, nous vous guidons vers la solution idéale
              </p>
            </motion.div>

            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {prerollOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 60, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.4 + index * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(option.targetSection)}
                    className="group relative"
                  >
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${option.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                    />

                    <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden group-hover:border-white/20 transition-all duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)',
                        }}
                        initial={{ x: '-100%', y: '-100%' }}
                        whileHover={{ x: '100%', y: '100%' }}
                        transition={{ duration: 0.8 }}
                      />

                      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${option.gradient} rounded-xl blur-lg opacity-50`}
                          />
                          <div className={`relative p-4 bg-gradient-to-br ${option.gradient} rounded-xl`}>
                            <option.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                          </div>
                        </motion.div>

                        <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                          {option.question}
                        </h3>

                        <motion.div
                          className="w-12 h-1 rounded-full bg-white/20 overflow-hidden"
                          whileHover={{ width: 64 }}
                        >
                          <motion.div
                            className={`h-full bg-gradient-to-r ${option.gradient}`}
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleSkip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 text-white/50 hover:text-white/80 font-light text-sm transition-colors underline underline-offset-4"
            >
              Découvrir tous nos services
            </motion.button>
          </div>

          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
            <svg width="100%" height="100%">
              <filter id="noiseFilterPreroll">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilterPreroll)" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
