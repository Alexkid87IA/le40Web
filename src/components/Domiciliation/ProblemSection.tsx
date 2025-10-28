import { motion } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-6">
            Une adresse ne suffit pas.
            <br />
            <span className="text-white/60">Ce qui compte, c'est ce qui va avec.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-red-950/20 border border-red-900/30 rounded-2xl"
            >
              <div className="text-red-400 font-bold mb-4 flex items-center gap-2">
                <X className="w-5 h-5" />
                DOMICILIATION CLASSIQUE
              </div>
              <ul className="space-y-3 text-white/60">
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Juste une adresse</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Courrier en vrac</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>"Débrouillez-vous"</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Standard générique</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Salle en supplément</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-orange-950/20 to-green-950/20 border border-orange-900/30 rounded-2xl"
            >
              <div className="text-orange-400 font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                LE 40 MARSEILLE
              </div>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Adresse + écosystème complet</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Scan sous 2h + cloud sécurisé</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Conseiller dédié qui connaît votre dossier</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Accueil personnalisé à votre nom</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>2h-8h/mois INCLUSES dans l'abonnement</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <div className="text-6xl font-black text-orange-400 mb-4">5h/mois</div>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              C'est le temps que perdent les entrepreneurs à gérer courrier et paperasse.
              <br />
              <span className="text-white font-bold">Avec nous ? 0 minute. On s'occupe de tout.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
