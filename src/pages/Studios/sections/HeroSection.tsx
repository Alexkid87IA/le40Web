import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.section 
      style={{ 
        opacity: heroOpacity,
        scale: heroScale,
        y: heroY 
      }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background 3D Universe */}
      <div className="absolute inset-0">
        {/* Nebula animée */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[200px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-pink-600/20 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[250px]"></div>
          </motion.div>
        </div>

        {/* Grille 3D perspective */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(147, 51, 234, 0.3) 2px, transparent 2px)`,
            backgroundSize: '100px 100px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-50%)',
            transformOrigin: 'center center',
          }}
        />

        {/* Particules flottantes améliorées */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#3b82f6',
                boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
                scale: [0, Math.random() * 2 + 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Orbes lumineux flottants */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, ${['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'][i]}40 0%, transparent 70%)`,
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.5, 1, 1.5, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

        {/* Lignes de connexion animées */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[...Array(10)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Contenu Hero Premium */}
      <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{ x: springX, y: springY }}
        >
          {/* Badge premium animé */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-4 mb-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl"></div>
              <div className="relative bg-black border border-purple-500/50 rounded-full px-8 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium tracking-wider text-sm uppercase">
                    Studios Premium • Marseille
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Titre principal avec effet 3D */}
          <motion.div className="mb-8">
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-[8rem] xl:text-[10rem] font-montserrat font-black leading-[0.85] tracking-tighter"
              initial={{ opacity: 0, z: -100 }}
              animate={{ opacity: 1, z: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative inline-block"
              >
                <span className="text-white relative z-10">Studio</span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-transparent blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
              
              <br />
              
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="relative inline-block mt-[-0.2em]"
              >
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_100%] animate-gradient relative z-10"
                  style={{
                    WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                  }}
                >
                  Vision
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-blue-600/30 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </motion.h1>
          </motion.div>

          {/* Sous-titre avec effet typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mb-12 max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">
              L'excellence créative à votre portée
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-lg md:text-xl text-white/50 mt-4"
            >
              2 studios ultramodernes • 7 configurations • Équipe d'experts
            </motion.p>
          </motion.div>

          {/* Boutons avec design futuriste */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="flex flex-col lg:flex-row gap-6 justify-center items-center"
          >
            {/* Bouton principal */}
            <motion.button
              onClick={() => document.getElementById('setups').scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-70 blur-xl group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-black border border-purple-500/50 backdrop-blur-xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
                <div className="relative px-12 py-6 flex items-center gap-4">
                  <span className="text-white font-montserrat font-bold text-lg tracking-wide">
                    Découvrir l'expérience
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.button>

            {/* Bouton secondaire */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl px-10 py-6 border border-white/10 hover:border-white/30 transition-all">
                <div className="flex items-center gap-3 text-white">
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-purple-600 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <Play className="w-6 h-6 relative z-10" />
                  </div>
                  <span className="font-montserrat font-semibold">Visite immersive 360°</span>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Pricing avec animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5, type: "spring" }}
            className="mt-20"
          >
            <div className="inline-flex flex-col items-center">
              <p className="text-white/40 text-sm uppercase tracking-widest mb-3">À partir de</p>
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-2xl blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <div className="relative flex items-baseline gap-2 bg-black/50 backdrop-blur-xl rounded-2xl px-8 py-4 border border-purple-500/30">
                  <span className="text-7xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    119€
                  </span>
                  <span className="text-white/40 text-xl mb-2">/heure</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Indicateurs de réalisations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: "500+", label: "Productions réalisées" },
              { number: "98%", label: "Clients satisfaits" },
              { number: "24h", label: "Livraison express" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                className="text-center"
              >
                <motion.p
                  className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-white/50 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator amélioré */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-50"></div>
            <div className="relative w-7 h-12 border-2 border-purple-400/50 rounded-full flex justify-center backdrop-blur-xl bg-black/30">
              <motion.div
                animate={{ y: [3, 12, 3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}