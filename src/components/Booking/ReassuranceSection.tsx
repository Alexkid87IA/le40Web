import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle, HeadphonesIcon, ChevronDown, Star, Quote } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Sophie Martin',
    company: 'Digital Agency',
    role: 'CEO',
    text: 'Le 40 a transformé notre façon de travailler. Les espaces sont exceptionnels et la communauté est incroyable.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  },
  {
    name: 'Thomas Dubois',
    company: 'Tech Startup',
    role: 'Fondateur',
    text: 'Flexibilité totale, équipements premium et équipe au top. Je recommande à 100% !',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    name: 'Marie Lambert',
    company: 'Freelance Designer',
    role: 'Designer',
    text: "Un lieu inspirant où j'ai fait de belles rencontres professionnelles. Le réseau est vraiment précieux.",
    rating: 5,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  }
];

const trustBadges = [
  {
    icon: Shield,
    title: 'Paiement Sécurisé',
    description: 'Transactions protégées SSL'
  },
  {
    icon: Clock,
    title: 'Annulation Flexible',
    description: 'Gratuite jusqu\'à 24h avant'
  },
  {
    icon: CheckCircle,
    title: 'Confirmation Immédiate',
    description: 'Par email et SMS'
  },
  {
    icon: HeadphonesIcon,
    title: 'Support 7j/7',
    description: 'Équipe disponible'
  }
];

const faqs = [
  {
    question: 'Comment se déroule la réservation ?',
    answer: 'La réservation est instantanée. Sélectionnez votre espace, choisissez votre créneau, validez le paiement et recevez votre confirmation par email. Simple et rapide !'
  },
  {
    question: 'Puis-je annuler ou modifier ma réservation ?',
    answer: 'Oui ! Vous pouvez annuler gratuitement jusqu\'à 24h avant votre réservation et la modifier jusqu\'à 2h avant. Contactez-nous pour toute modification.'
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer: 'Nous acceptons toutes les cartes bancaires (Visa, Mastercard, Amex), virements bancaires et paiements en plusieurs fois pour les abonnements.'
  },
  {
    question: 'Y a-t-il un engagement minimum ?',
    answer: 'Aucun engagement ! Réservez à l\'heure, à la journée, au mois ou à l\'année selon vos besoins. Flexibilité totale pour s\'adapter à votre activité.'
  },
  {
    question: 'Les espaces sont-ils équipés ?',
    answer: 'Tous nos espaces sont entièrement équipés : wifi ultra-rapide, mobilier ergonomique, écrans, café, imprimante et services sur demande.'
  }
];

export default function ReassuranceSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 text-center"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <badge.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-sm md:text-base font-montserrat font-bold text-white mb-1 md:mb-2">
                {badge.title}
              </h3>
              <p className="text-xs md:text-sm text-white/60 font-inter">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-2 md:mb-4 text-center">
            Ils Nous Font Confiance
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/60 font-inter text-center mb-8 md:mb-12">
            Rejoignez plus de 120 entrepreneurs satisfaits
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 relative overflow-hidden group"
              >
                <div className="absolute top-4 right-4 text-white/10 group-hover:text-white/20 transition-colors">
                  <Quote className="w-12 h-12 md:w-16 md:h-16" />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white/20"
                    />
                    <div>
                      <h4 className="text-base md:text-lg font-montserrat font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs md:text-sm text-white/60 font-inter">
                        {testimonial.role} - {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm md:text-base text-white/70 font-inter leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-2 md:mb-4 text-center">
            Questions Fréquentes
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/60 font-inter text-center mb-8 md:mb-10">
            Tout ce que vous devez savoir sur nos réservations
          </p>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl md:rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-montserrat font-bold text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/60" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFaqIndex === index ? 'auto' : 0,
                    opacity: openFaqIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 md:p-6 pt-0 md:pt-0">
                    <p className="text-sm md:text-base text-white/70 font-inter leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
