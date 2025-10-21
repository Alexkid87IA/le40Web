import { motion } from 'framer-motion';
import { RefreshCw, Zap, MessageCircle, Shield } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function GuaranteesSection() {
  const guarantees = [
    {
      icon: RefreshCw,
      title: 'Satisfait ou remboursé',
      description: '30 jours pour tester. Si nos services ne tiennent pas leurs promesses, on vous rembourse. Sans justification.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Sans engagement',
      description: 'Résiliable en 1 clic depuis votre espace. Pas de courrier recommandé, pas de rappels insistants.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Réponse en -1h',
      description: 'Un problème ? Une question ? On répond en 52 minutes en moyenne. Pas un robot, une vraie personne.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Conformité garantie',
      description: 'Agrément Préfecture officiel. Si vous avez un problème avec l\'admin, on gère et on rembourse les frais.',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-32 bg-black">
      <div className="max-w-6xl mx-auto px-8">
        <SectionHeader
          title="Notre engagement"
          highlightedText="service"
          className="mb-20"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="text-center p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${guarantee.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <guarantee.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {guarantee.title}
              </h3>
              <p className="text-white/60 text-sm">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
