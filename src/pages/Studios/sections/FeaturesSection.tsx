import React from 'react';
import { motion } from 'framer-motion';
import { Users, Coffee, Car, Sparkles, Clock, Shield } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    { icon: Users, label: 'Technicien', desc: 'Sur place' },
    { icon: Coffee, label: 'Café illimité', desc: '& snacks' },
    { icon: Car, label: 'Parking', desc: '2 places' },
    { icon: Sparkles, label: 'Maquillage', desc: 'Loge dédiée' },
    { icon: Clock, label: 'Installation', desc: '30min offert' },
    { icon: Shield, label: 'Transfert', desc: 'Sécurisé' }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
            Toujours inclus
          </h3>
          <p className="text-white/60">Sans frais supplémentaires</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-colors"
              >
                <item.icon className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </motion.div>
              <p className="text-white font-semibold mb-1">{item.label}</p>
              <p className="text-white/40 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}