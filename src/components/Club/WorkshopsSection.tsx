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
      <div className="absolute -inset-1 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

      <div className="relative h-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl group-hover:border-white/20 transition-all">
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

        <div className="p-8">
          <h3 className="text-2xl font-montserrat font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-rose-400 transition-all">
            {workshop.title}
          </h3>

          <p className="text-white/70 mb-6 leading-relaxed">
            {workshop.description}
          </p>

          <div className="flex items-center gap-6 text-sm text-white/60 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{workshop.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{workshop.maxParticipants} places max</span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {workshop.benefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
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
    <section className="py-32 bg-gradient-to-b from-black to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
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
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-sm font-semibold text-red-400 mb-6"
          >
            NOS ATELIERS & ÉVÉNEMENTS
          </motion.span>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
            Des Événements
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">
              pour Progresser
            </span>
          </h2>

          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Plus de 15 événements par mois pour développer vos compétences, votre réseau et faire croître votre entreprise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="inline-flex items-center gap-8 px-8 py-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl">
            <div className="text-center">
              <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">
                15+
              </div>
              <div className="text-sm text-white/60 font-inter font-semibold">Événements/mois</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">
                100%
              </div>
              <div className="text-sm text-white/60 font-inter font-semibold">Inclus</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">
                ∞
              </div>
              <div className="text-sm text-white/60 font-inter font-semibold">Sans limite</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
