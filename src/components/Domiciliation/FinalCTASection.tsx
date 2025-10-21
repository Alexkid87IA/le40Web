import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  const benefits = [
    { text: 'Courrier géré, scanné, notifié', icon: Check },
    { text: 'Standard pro + salle incluse', icon: Check },
    { text: 'Zéro paperasse', icon: Check }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] bg-orange-500/10"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] bg-amber-500/8"
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 mb-8"
          >
            <Sparkles className="w-8 h-8 text-orange-400" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 font-montserrat leading-tight">
            Prêt pour une domiciliation
          </h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-12 font-montserrat leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500"
                  style={{
                    filter: 'drop-shadow(0 2px 30px rgba(249, 115, 22, 0.3))'
                  }}>
              qui fait vraiment le job ?
            </span>
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 lg:gap-8 justify-center mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl rounded-xl border border-white/[0.08] hover:border-green-500/30 transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                  className="w-6 h-6 rounded-lg bg-green-400/20 flex items-center justify-center group-hover:bg-green-400/30 transition-colors"
                >
                  <Check className="w-4 h-4 text-green-400" />
                </motion.div>
                <span className="text-white/80 font-inter group-hover:text-white transition-colors">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12"
          >
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl overflow-hidden shadow-2xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 font-montserrat text-lg">Choisir ma formule</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 backdrop-blur-xl bg-white/[0.04] rounded-xl border border-white/[0.12] hover:bg-white/[0.08] hover:border-white/[0.16] transition-all"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                  animate={{ x: [-300, 300] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <MessageCircle className="w-6 h-6 text-white/80 relative z-10" />
                <span className="text-white font-semibold font-montserrat text-lg relative z-10">Poser une question</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 backdrop-blur-xl rounded-xl border border-white/[0.08]"
          >
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-zinc-900 flex items-center justify-center text-white text-xs font-bold"
                >
                  {['A', 'M', 'S'][i]}
                </motion.div>
              ))}
            </div>
            <span className="text-white/70 text-sm font-inter">
              Rejoignez les <strong className="text-white font-semibold">120+ entreprises</strong> qui nous font confiance
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
}
