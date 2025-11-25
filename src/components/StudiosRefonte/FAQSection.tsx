import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

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
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-black to-zinc-950">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/70 font-inter">Questions fréquentes</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-white">
            Des questions ?
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-zinc-900/80 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-base font-inter font-medium text-white">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === index
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-white/60 mb-4">
            Vous ne trouvez pas votre réponse ?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-inter font-medium transition-all"
          >
            <span>Contactez-nous</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}