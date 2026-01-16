import { motion } from 'framer-motion';
import { RefreshCw, Zap, MessageCircle, Shield } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function GuaranteesSection() {
  const guarantees = [
    {
      icon: RefreshCw,
      title: 'Satisfait ou remboursé',
      description: '30 jours pour tester. Si nos services ne tiennent pas leurs promesses, on vous rembourse. Sans justification.',
      gradient: 'from-orange-500 to-orange-600',
      glowColor: 'rgba(249, 115, 22, 0.2)'
    },
    {
      icon: Zap,
      title: 'Sans engagement',
      description: 'Résiliable en 1 clic depuis votre espace. Pas de courrier recommandé, pas de rappels insistants.',
      gradient: 'from-blue-500 to-blue-600',
      glowColor: 'rgba(59, 130, 246, 0.2)'
    },
    {
      icon: MessageCircle,
      title: 'Réponse en -1h',
      description: 'Un problème ? Une question ? On répond en 52 minutes en moyenne. Pas un robot, une vraie personne.',
      gradient: 'from-cyan-500 to-cyan-600',
      glowColor: 'rgba(6, 182, 212, 0.2)'
    },
    {
      icon: Shield,
      title: 'Conformité garantie',
      description: 'Agrément Préfecture officiel. Si vous avez un problème avec l\'admin, on gère et on rembourse les frais.',
      gradient: 'from-orange-500 to-orange-600',
      glowColor: 'rgba(249, 115, 22, 0.2)'
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Effets lumineux subtils */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 right-1/3 w-96 h-96 rounded-full blur-[120px] bg-orange-500/8"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <SectionHeader
          title="Notre engagement"
          highlightedText="service"
          className="mb-20"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative"
              style={{ transformPerspective: 1000 }}
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full"
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <motion.div
                  className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
                  style={{ backgroundColor: guarantee.glowColor }}
                />

                <div className="relative text-center p-8 lg:p-10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/[0.08] group-hover:border-white/[0.15] rounded-2xl transition-all duration-500 h-full overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative inline-block mb-6"
                  >
                    <div className="absolute -inset-2 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                         style={{ backgroundColor: guarantee.glowColor }}>
                    </div>
                    <div className={`relative w-20 h-20 bg-gradient-to-br ${guarantee.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                      <guarantee.icon className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-4 font-montserrat group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                    {guarantee.title}
                  </h3>

                  <p className="text-white/60 text-sm font-inter leading-relaxed group-hover:text-white/70 transition-colors">
                    {guarantee.description}
                  </p>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundImage: `linear-gradient(to right, transparent, ${guarantee.glowColor}, transparent)` }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 backdrop-blur-xl rounded-xl border border-white/[0.08]">
            <Shield className="w-5 h-5 text-orange-400" />
            <span className="text-white/70 font-inter">
              <strong className="text-white font-semibold">120+ entreprises</strong> nous font confiance depuis 2020
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
