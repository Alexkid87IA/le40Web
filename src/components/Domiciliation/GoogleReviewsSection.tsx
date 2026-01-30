import { motion } from 'framer-motion';
import { Star, ArrowRight, Globe } from 'lucide-react';

export default function GoogleReviewsSection() {
  const reviews = [
    {
      author: 'Sophie M.',
      role: 'E-commerce',
      rating: 5,
      date: 'Il y a 2 semaines',
      text: 'Service impeccable ! Le scan du courrier en 2h est vraiment respecté. L\'équipe est réactive et professionnelle. Je recommande vivement.'
    },
    {
      author: 'Marc D.',
      role: 'Consultant',
      rating: 5,
      date: 'Il y a 1 mois',
      text: 'Excellent rapport qualité/prix. Le standard téléphonique fonctionne parfaitement et l\'accueil de mes clients est toujours professionnel.'
    },
    {
      author: 'Julie R.',
      role: 'Startup',
      rating: 5,
      date: 'Il y a 3 semaines',
      text: 'Très satisfaite de la prestation. Les salles de réunion sont bien équipées et le conseiller dédié répond toujours rapidement.'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-white font-montserrat">4.9/5</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2 font-montserrat">
              Ce que disent nos clients sur Google
            </h2>
            <a
              href="https://www.google.com/search?q=le+40+marseille+avis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-2 font-inter"
            >
              Voir tous les avis
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white font-inter">{review.author}</div>
                      <div className="text-xs text-white/60 font-inter">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-3 font-inter">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-2 text-xs text-white/60 font-inter">
                  <Globe className="w-3 h-3" />
                  Publié sur Google
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/60 mb-4 font-inter">Vous êtes client ? Partagez votre expérience</p>
            <a
              href="https://www.google.com/search?q=le+40+marseille"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10 font-montserrat"
            >
              Laisser un avis Google
              <Star className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
