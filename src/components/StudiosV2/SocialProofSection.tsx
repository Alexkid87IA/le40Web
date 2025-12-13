import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { socialProofData, testimonials } from '../../data/studiosLaunch/config';
import { Star } from 'lucide-react';

export default function SocialProofSection() {
  const [counts, setCounts] = useState({
    equipment: 0,
    delivery: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const animateCounter = (target: number, setter: (val: number) => void, duration: number = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounter(15000, (val) => setCounts(prev => ({ ...prev, equipment: val })));
          animateCounter(48, (val) => setCounts(prev => ({ ...prev, delivery: val })));
          animateCounter(100, (val) => setCounts(prev => ({ ...prev, satisfaction: val })));
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('social-proof');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const activities = [
    { name: 'Marc de Lyon', action: 'a réservé le Studio Face Cam', time: 'Il y a 2h' },
    { name: 'Sarah', action: 'vient de télécharger son devis', time: 'Il y a 4h' },
    { name: 'TechCorp', action: 'a réservé une journée complète', time: 'Il y a 7h' }
  ];

  return (
    <section id="social-proof" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Des Résultats Qui Parlent d'Eux-Mêmes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 text-center"
          >
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 mb-2">
              {counts.equipment.toLocaleString()}€
            </div>
            <p className="text-slate-400">
              d'équipement Sony pro
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 text-center"
          >
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 mb-2">
              {counts.delivery}h
            </div>
            <p className="text-slate-400">
              de livraison garantie
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 text-center"
          >
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 mb-2">
              {counts.satisfaction}%
            </div>
            <p className="text-slate-400">
              satisfait ou remboursé
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-violet-900/20 to-pink-900/20 border border-violet-500/30 rounded-2xl p-8 lg:p-12 mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">OM</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Origines Media</h3>
              <p className="text-violet-300">580K abonnés YouTube</p>
            </div>
          </div>

          <blockquote className="text-lg text-slate-200 mb-6 italic">
            "On a produit le contenu de lancement du studio avec Origines Media (580K abonnés YouTube). Résultat : 3 vidéos tournées en 1 journée, qualité broadcast, montage livré en 48h."
          </blockquote>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] bg-black/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Studio utilisé</p>
              <p className="text-white font-semibold">Multi-Caméras Pro</p>
            </div>
            <div className="flex-1 min-w-[200px] bg-black/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Formule</p>
              <p className="text-white font-semibold">Solution Clé en Main</p>
            </div>
          </div>

          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all">
            Voir d'autres contenus produits
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <p className="text-center text-slate-400 font-semibold mb-4">
            Activité récente
          </p>
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-center gap-3"
            >
              <span className="text-2xl">💬</span>
              <p className="text-slate-300 flex-1">
                <strong className="text-white">{activity.name}</strong> {activity.action}
              </p>
              <span className="text-slate-500 text-sm">{activity.time}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
