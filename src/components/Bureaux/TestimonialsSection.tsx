import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Morgan Aiwekhoe',
    role: 'CEO',
    company: 'South Management',
    image: '/images/testimonials/morgane.jpeg',
    quote: 'En 3 ans au 40, notre société a pris un tournant incroyable. On a explosé le chiffre d\'affaires et constitué une équipe de presque 10 personnes. L\'environnement et le réseau ont été déterminants.',
    bio: 'Morgan dirige South Management, une agence de talents basée à Marseille. Il a trouvé au 40 bien plus qu\'un bureau : un vrai écosystème pour développer son activité.',
  },
  {
    name: 'Alexandre Quilghini',
    role: 'Président',
    company: 'Origines Média',
    image: '/images/testimonials/alexandre.jpeg',
    quote: 'Le 40 nous a permis de professionnaliser notre image dès le lancement. L\'adresse, les salles de réunion, la fibre — tout est inclus et ça change tout quand on reçoit des clients.',
    bio: 'Alexandre est le président d\'Origines Média, une agence de communication et production audiovisuelle. Il a choisi Le 40 pour ancrer son entreprise dans un lieu qui reflète son ambition.',
  },
  {
    name: 'Djamal Biyou',
    role: 'Fondateur',
    company: 'Biyoo',
    image: '/images/testimonials/djamal.jpeg',
    quote: 'Ce qui m\'a convaincu c\'est la flexibilité. Pas de bail rigide, un bureau prêt en 48h, et une équipe réactive. Quand on est entrepreneur, ce gain de temps est inestimable.',
    bio: 'Djamal a fondé Biyoo, une entreprise spécialisée dans les services aux professionnels. Il a rejoint Le 40 pour bénéficier d\'un bureau clé en main sans les contraintes d\'un bail classique.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4 md:mb-6 px-4">
            ILS ONT TROUVÉ LEUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400">QG IDÉAL</span>
          </h2>
          <p className="text-base md:text-lg font-inter text-white/60 max-w-2xl mx-auto px-4">
            Découvrez comment ces entrepreneurs ont transformé leur façon de travailler avec un bureau privé au Le 40
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 group-hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col">
                <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-10 md:w-12 h-10 md:h-12 text-blue-400" />
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="text-white/90 font-inter text-sm md:text-base leading-relaxed mb-6 flex-1">
                  "{testimonial.quote}"
                </blockquote>

                <p className="text-white/50 font-inter text-xs leading-relaxed mb-6">
                  {testimonial.bio}
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 md:w-14 h-12 md:h-14 rounded-full object-cover border-2 border-blue-500/30"
                  />
                  <div>
                    <div className="font-montserrat font-bold text-white text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-blue-400 text-xs font-inter font-semibold">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-16 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-6 px-6 md:px-8 py-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-blue-400">127</div>
              <div className="text-white/60 text-xs md:text-sm">Entreprises hébergées</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-blue-400">4.9/5</div>
              <div className="text-white/60 text-xs md:text-sm">Satisfaction moyenne</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-blue-400">98%</div>
              <div className="text-white/60 text-xs md:text-sm">Renouvellent leur contrat</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
