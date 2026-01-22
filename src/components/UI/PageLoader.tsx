import { motion } from 'framer-motion';

interface PageLoaderProps {
  message?: string;
}

export default function PageLoader({ message = 'Chargement...' }: PageLoaderProps) {
  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      role="progressbar"
      aria-label={message}
      aria-busy="true"
    >
      <div className="text-center">
        {/* Logo animé */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <motion.img
            src="/logo.png"
            alt="Le 40"
            className="w-16 h-auto brightness-0 invert mx-auto"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Barre de progression */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-white/50 text-sm"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}
