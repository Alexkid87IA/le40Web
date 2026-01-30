import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "Qu'est-ce qui est inclus dans la location ?",
    answer: "Tout l'équipement professionnel est inclus : caméras, micros, éclairages, fond vert, etc. Vous n'avez rien à apporter. Un technicien peut vous accompagner sur demande (option)."
  },
  {
    question: "Dois-je avoir de l'expérience pour utiliser les studios ?",
    answer: "Non ! Nos studios sont conçus pour être accessibles à tous. Nous proposons une prise en main de 15 minutes avant chaque session, et nos techniciens peuvent vous accompagner si besoin."
  },
  {
    question: "Comment se passe la réservation ?",
    answer: "Réservez en ligne en quelques clics, choisissez votre créneau et payez de façon sécurisée. Vous recevez une confirmation immédiate par email avec toutes les infos d'accès."
  },
  {
    question: "Puis-je annuler ou modifier ma réservation ?",
    answer: "Oui, annulation gratuite jusqu'à 24h avant votre session. Modification possible selon disponibilité. Contactez-nous par téléphone ou email."
  },
  {
    question: "Proposez-vous des services de post-production ?",
    answer: "Oui ! Montage vidéo, étalonnage, mixage audio, création de shorts... Nos experts peuvent finaliser vos contenus. Ces services sont disponibles en option lors de la réservation."
  },
  {
    question: "Où êtes-vous situés ?",
    answer: "Le 40 est situé au cœur de Marseille, facilement accessible en transports en commun et en voiture. Parking à proximité. Adresse exacte communiquée après réservation."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-teal-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-400 mb-6"
          >
            QUESTIONS FRÉQUENTES
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            VOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">QUESTIONS</span>
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-inter">
            Trouvez les réponses aux questions les plus fréquentes sur nos studios
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-base font-inter font-medium text-white">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-white/40" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-white/60 font-inter leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl"
        >
          <h3 className="text-2xl font-montserrat font-bold text-white mb-3">
            Vous avez d'autres questions ?
          </h3>
          <p className="text-white/60 font-inter mb-6">
            Notre équipe est là pour répondre à toutes vos interrogations
          </p>
          <motion.a
            href="tel:+33491962151"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-montserrat font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
          >
            Contactez-nous
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}