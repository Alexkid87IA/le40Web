import { motion } from 'framer-motion';
import { Shield, FileText, Building2, Globe, Check, ArrowRight } from 'lucide-react';

export default function OfficialOrganizationsSection() {
  const organizations = [
    { name: 'URSSAF', icon: Shield, color: 'text-blue-400' },
    { name: 'Infogreffe', icon: FileText, color: 'text-orange-400' },
    { name: 'Impôts', icon: Building2, color: 'text-purple-400' },
    { name: 'Banques', icon: Globe, color: 'text-orange-400' },
    { name: 'Préfecture', icon: Shield, color: 'text-red-400' }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 font-montserrat text-balance">
            Reconnu et accepté par tous les organismes
          </h3>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto font-inter">
            Notre agrément préfectoral garantit que votre domiciliation est acceptée
            par l'administration, les banques et tous les organismes officiels
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center mb-12">
            {organizations.map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
              >
                <org.icon className={`w-8 h-8 ${org.color}`} />
                <div className="text-white/80 text-sm font-semibold text-center font-inter">{org.name}</div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-orange-950/40 to-orange-900/20 border border-orange-900/30 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="text-orange-400 font-bold mb-2 flex items-center gap-2 font-montserrat">
                  <Shield className="w-4 h-4" />
                  Agrément Préfectoral N° [NUMERO]
                </div>
                <p className="text-white/70 text-sm font-inter">
                  Notre société de domiciliation est officiellement agréée par la Préfecture
                  des Bouches-du-Rhône. Cet agrément garantit la conformité totale de votre domiciliation
                  et son acceptation par tous les organismes administratifs et financiers.
                </p>
                <button className="mt-4 text-orange-400 text-sm font-semibold hover:text-orange-300 transition-colors flex items-center gap-2 font-montserrat">
                  Voir l'attestation d'agrément
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
