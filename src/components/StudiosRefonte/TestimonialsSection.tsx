import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Témoignages mockés (à remplacer par de vrais avis plus tard)
const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'YouTubeuse Tech',
    company: '@SophieTech',
    content: "Le studio Face-Cam est exactement ce qu'il me fallait. Qualité pro, équipement au top, et l'équipe est super réactive. Je recommande à 100% !",
    rating: 5,
    studioUsed: 'Studio Face-Cam',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    id: 2,
    name: 'Lucas Bernard',
    role: 'Podcaster',
    company: 'Le Podcast du Matin',
    content: "Enfin un vrai studio podcast à Marseille ! L'acoustique est parfaite, le matériel est pro. J'enregistre mes épisodes ici chaque semaine.",
    rating: 5,
    studioUsed: 'Studio Podcast',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    id: 3,
    name: 'Marie Dubois',
    role: 'Consultante',
    company: 'Strategy First',
    content: "J'utilise le studio pour mes webinaires clients. Le rendu est ultra professionnel, mes clients sont bluffés par la qualité.",
    rating: 5,
    studioUsed: 'Studio Interview',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
            Ils nous font
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"> confiance</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-10">
            {/* Quote icon */}
            <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
            
            {/* Content */}
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-emerald-500/50">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Text */}
              <div className="flex-1">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-white/90 font-inter leading-relaxed mb-6">
                  "{current.content}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-white font-montserrat font-bold">
                      {current.name}
                    </div>
                    <div className="text-white/60 text-sm">
                      {current.role} · {current.company}
                    </div>
                  </div>
                  
                  <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                    <span className="text-emerald-400 text-sm font-medium">
                      {current.studioUsed}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            onClick={previous}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((testimonial) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentIndex(testimonials.findIndex(t => t.id === testimonial.id))}
                className={`h-2 rounded-full transition-all duration-300 ${
                  testimonials.findIndex(t => t.id === testimonial.id) === currentIndex
                    ? 'w-8 bg-gradient-to-r from-emerald-500 to-cyan-500'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}