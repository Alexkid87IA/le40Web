import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { workshops } from '../../data/club/workshops';

const WorkshopCard = ({ workshop, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <div className="relative h-full overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl group-hover:border-red-500/30 transition-all">
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={workshop.image}
            alt={workshop.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 left-6"
          >
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r ${workshop.gradient}`}>
              {workshop.type.toUpperCase()}
            </span>
          </motion.div>
        </div>

        <div className="p-6">
          <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
            {workshop.title}
          </h3>

          <p className="text-white/60 text-sm font-inter mb-4 leading-relaxed">
            {workshop.description}
          </p>

          <div className="flex items-center gap-6 text-sm text-white/60 font-inter mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{workshop.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{workshop.maxParticipants} places max</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {workshop.benefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-sm font-semibold text-red-400">
              {workshop.frequency}
            </span>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-white font-semibold text-sm group/btn"
            >
              <span>En savoir plus</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function WorkshopsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-sm font-medium text-red-400 mb-6"
          >
            NOS ATELIERS & ÉVÉNEMENTS
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            DES ÉVÉNEMENTS POUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">PROGRESSER</span>
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-inter">
            Plus de 15 événements par mois pour développer vos compétences, votre réseau et faire croître votre entreprise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop, index) => (
            <WorkshopCard key={workshop.id} workshop={workshop} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md sm:max-w-lg mx-auto px-4 sm:px-8 py-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">
                15+
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-inter font-semibold">Événements/mois</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-2xl sm:text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">
                100%
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-inter font-semibold">Inclus</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">
                ∞
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-inter font-semibold">Sans limite</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
