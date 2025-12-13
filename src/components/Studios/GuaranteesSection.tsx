import { motion } from 'framer-motion';
import { Shield, Download, Sparkles, Headphones } from 'lucide-react';
import { cards } from '../../utils/designSystem';

const guarantees = [
  {
    icon: Shield,
    title: 'SATISFAIT OU REMBOURSÉ',
    description: 'Si la qualité du matériel ou du service ne correspond pas à vos attentes, on vous rembourse. Sans discuter.'
  },
  {
    icon: Download,
    title: 'LIVRAISON RUSHS GARANTIE',
    description: 'Vos fichiers sont transférés avant votre départ. Si problème technique, on vous offre la session.'
  },
  {
    icon: Sparkles,
    title: 'MATÉRIEL NEUF & ENTRETENU',
    description: 'Équipement acheté neuf en 2024. Maintenance professionnelle régulière.'
  },
  {
    icon: Headphones,
    title: 'SUPPORT RÉACTIF',
    description: 'Réponse en moins de 2h en semaine. Numéro d\'urgence le jour de votre tournage.'
  }
];

export default function GuaranteesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-black to-slate-950">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-montserrat text-white">
            Notre Engagement Qualité
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-8">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;

            return (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${cards.premium.full} space-y-4`}
              >
                <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 items-center justify-center">
                  <Icon className="w-8 h-8 text-green-400" />
                </div>

                <h3 className="text-xl font-bold text-white font-montserrat">
                  {guarantee.title}
                </h3>

                <p className="text-white/80 leading-relaxed">
                  {guarantee.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
