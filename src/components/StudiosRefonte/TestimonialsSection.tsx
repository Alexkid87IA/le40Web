import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { studioTestimonials } from '../../data/studios/studioTestimonials';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % studioTestimonials.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + studioTestimonials.length) % studioTestimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6">
            ILS NOUS FONT
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              CONFIANCE
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Des créateurs satisfaits partagent leur expérience
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <div className="flex items-start gap-8 mb-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0"
                >
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${studioTestimonials[currentIndex].gradient} p-1`}>
                    <img
                      src={studioTestimonials[currentIndex].image}
                      alt={studioTestimonials[currentIndex].name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(studioTestimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <h3 className="text-2xl font-montserrat font-bold text-white mb-1">
                    {studioTestimonials[currentIndex].name}
                  </h3>
                  <p className="text-white/60 font-inter mb-1">
                    {studioTestimonials[currentIndex].role}
                  </p>
                  <p className="text-white/40 text-sm font-inter">
                    {studioTestimonials[currentIndex].company}
                  </p>
                </div>

                <Quote className="w-16 h-16 text-white/10" />
              </div>

              <p className="text-xl text-white/80 font-inter leading-relaxed mb-6">
                "{studioTestimonials[currentIndex].content}"
              </p>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${studioTestimonials[currentIndex].gradient} bg-opacity-20 border border-white/20`}>
                <span className="text-white/80 text-sm font-inter">
                  Studio: <span className="font-bold text-white">{studioTestimonials[currentIndex].studioUsed}</span>
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-between mt-8">
            <motion.button
              onClick={previous}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            <div className="flex items-center gap-3">
              {studioTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-12 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
