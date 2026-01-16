import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../../hooks/useKonamiCode';

export default function DjalPopup() {
  const { activated, reset } = useKonamiCode();
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    if (activated) {
      setShowExplosion(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setShowExplosion(false);
        reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activated, reset]);

  return (
    <AnimatePresence>
      {showExplosion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => { setShowExplosion(false); reset(); }}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Confetti / particles */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                x: '50vw',
                y: '50vh',
                scale: 0
              }}
              animate={{
                opacity: [1, 1, 0],
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                scale: [0, 1.5, 0.5],
                rotate: Math.random() * 720
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: 'easeOut'
              }}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'][Math.floor(Math.random() * 6)]
              }}
            />
          ))}

          {/* Main text */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: [0, 1.3, 1],
              rotate: [-180, 10, 0]
            }}
            transition={{
              duration: 0.8,
              type: 'spring',
              bounce: 0.5
            }}
            className="relative z-10 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 20px #10b981, 0 0 40px #10b981, 0 0 60px #10b981',
                  '0 0 40px #f59e0b, 0 0 80px #f59e0b, 0 0 120px #f59e0b',
                  '0 0 20px #10b981, 0 0 40px #10b981, 0 0 60px #10b981'
                ]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="text-[12vw] md:text-[10vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-500 leading-none"
              style={{
                fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
                WebkitTextStroke: '2px rgba(255,255,255,0.3)'
              }}
            >
              DJAL
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[20vw] md:text-[15vw] font-black text-white leading-none"
              style={{
                fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
                textShadow: '0 0 30px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.5)'
              }}
            >
              LE 100
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-white/60 text-lg"
            >
              (clique pour fermer)
            </motion.p>
          </motion.div>

          {/* Rainbow border animation */}
          <motion.div
            animate={{
              background: [
                'linear-gradient(0deg, #10b981, #f59e0b, #ef4444, #8b5cf6)',
                'linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6, #10b981)',
                'linear-gradient(180deg, #ef4444, #8b5cf6, #10b981, #f59e0b)',
                'linear-gradient(270deg, #8b5cf6, #10b981, #f59e0b, #ef4444)',
                'linear-gradient(360deg, #10b981, #f59e0b, #ef4444, #8b5cf6)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-4 rounded-3xl opacity-50"
            style={{ padding: '4px' }}
          >
            <div className="w-full h-full bg-black rounded-3xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
