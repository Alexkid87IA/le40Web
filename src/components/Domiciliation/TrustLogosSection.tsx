import { motion } from 'framer-motion';
import { Rocket, Briefcase, Leaf, Palette, BarChart3, Smartphone } from 'lucide-react';

export default function TrustLogosSection() {
  const clients = [
    { name: 'TechStart', Icon: Rocket },
    { name: 'ConseilPro', Icon: Briefcase },
    { name: 'EcoDesign', Icon: Leaf },
    { name: 'CreativeHub', Icon: Palette },
    { name: 'DataFlow', Icon: BarChart3 },
    { name: 'MediaCorp', Icon: Smartphone }
  ];

  const stats = [
    { value: '120+', label: 'Entreprises actives' },
    { value: '98%', label: 'Taux de satisfaction' },
    { value: '24h', label: 'Activation moyenne' }
  ];

  return (
    <section className="py-16 bg-zinc-900/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-center mb-8 text-sm font-medium font-montserrat tracking-wide">
            ILS NOUS FONT CONFIANCE
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                <client.Icon className="w-12 h-12 text-white/60" />
                <div className="text-white/60 text-xs font-semibold font-inter">{client.name}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-orange-400 mb-1 font-montserrat">{stat.value}</div>
                <div className="text-white/60 text-sm font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
