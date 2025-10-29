import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { membershipBenefits } from '../../data/club/benefits';

const BenefitCard = ({ benefit, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = benefit.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ perspective: 1000 }}
      className="relative group h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        <div className={`absolute -inset-1 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />

        <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>

          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.8 }}
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.gradient} mb-6`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-amber-400 transition-all">
            {benefit.title}
          </h3>

          <p className="text-white/70 mb-6 leading-relaxed">
            {benefit.description}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r ${benefit.gradient} bg-opacity-20`}
          >
            {benefit.stats}
          </motion.div>

          <motion.div
            className="absolute top-0 right-0 w-32 h-32 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className={`w-full h-full bg-gradient-to-br ${benefit.gradient} rounded-full blur-3xl`} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function BenefitsSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-sm font-semibold text-emerald-400 mb-6"
          >
            AVANTAGES EXCLUSIFS
          </motion.span>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            Tout ce dont vous avez
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
              besoin pour réussir
            </span>
          </h2>

          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            10 avantages puissants inclus dans votre abonnement pour accélérer votre croissance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {membershipBenefits.slice(0, 9).map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {membershipBenefits.slice(9).map((benefit, index) => (
            <BenefitCard key={index + 9} benefit={benefit} index={index + 9} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col gap-4 p-8 bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-xl border border-orange-500/20 rounded-3xl">
            <p className="text-2xl font-bold text-white">
              Tout ça pour seulement <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">50€ par mois</span>
            </p>
            <p className="text-white/60">
              Sans engagement • Résiliation à tout moment • Essai avec visite découverte gratuite
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
