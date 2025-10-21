import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function ProcessSection() {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-5xl mx-auto px-8">
        <SectionHeader
          title="Opérationnel en"
          highlightedText="3 étapes"
          subtitle="(on s'occupe du reste)"
          className="mb-20"
        />

        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-xl">
                1
              </div>
              <div>
                <div className="text-sm text-orange-400 font-semibold">5 minutes</div>
                <div className="text-white font-bold">Choisissez</div>
              </div>
            </div>
            <div className="ml-16">
              <h3 className="text-xl font-bold text-white mb-3">Choisissez votre formule</h3>
              <p className="text-white/70 mb-4">
                Sélectionnez l'offre adaptée à vos besoins. Paiement sécurisé par CB ou virement.
              </p>
            </div>

            <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-xl">
                2
              </div>
              <div>
                <div className="text-sm text-orange-400 font-semibold">2 heures</div>
                <div className="text-white font-bold">Documents</div>
              </div>
            </div>
            <div className="ml-16">
              <h3 className="text-xl font-bold text-white mb-3">Envoyez vos documents</h3>
              <p className="text-white/70 mb-4">Par email :</p>
              <ul className="text-sm text-white/60 space-y-1">
                <li>• Photo pièce d'identité</li>
                <li>• Kbis (si déjà créé) ou récépissé</li>
                <li>• Justificatif domicile perso</li>
              </ul>
            </div>

            <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-black text-xl">
                ✓
              </div>
              <div>
                <div className="text-sm text-green-400 font-semibold">24 heures</div>
                <div className="text-white font-bold">Activation</div>
              </div>
            </div>
            <div className="ml-16">
              <h3 className="text-xl font-bold text-white mb-3">C'est opérationnel !</h3>
              <ul className="text-white/70 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Adresse opérationnelle</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Courrier réceptionné dès J+1</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Téléphone activé</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Attestation envoyée</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
          >
            Démarrer maintenant
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
