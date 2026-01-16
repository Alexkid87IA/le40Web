import { motion } from 'framer-motion';
import { eventTypes } from '../../data/salles/eventTypes';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EventTypesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-4 md:mb-6 px-4">
            TOUS VOS
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              ÉVÉNEMENTS
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto px-4">
            Des espaces adaptés à chaque type d'événement professionnel
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {eventTypes.map((event, index) => (
            <Link
              key={index}
              to="#spaces"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('spaces')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                animate={{
                  y: hoveredCard === index ? -10 : 0
                }}
                className="relative group cursor-pointer h-full"
              >
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${event.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                />

                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <motion.div
                      animate={{
                        scale: hoveredCard === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent`}></div>

                    <motion.div
                      animate={{
                        rotate: hoveredCard === index ? 360 : 0,
                        scale: hoveredCard === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute top-4 right-4"
                    >
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${event.gradient} flex items-center justify-center backdrop-blur-sm`}>
                        <event.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-5 md:p-6 lg:p-8 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-2 md:mb-3">
                      {event.title}
                    </h3>
                    <p className="text-white/70 font-inter leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                      {event.description}
                    </p>

                    <div className="mb-4 md:mb-6">
                      <h4 className="text-xs md:text-sm font-inter font-bold text-white/80 mb-2 md:mb-3 uppercase tracking-wider">
                        Exemples d'utilisation
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {event.examples.map((example, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-inter text-white/70"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <h4 className="text-xs md:text-sm font-inter font-bold text-white/80 mb-2 md:mb-3 uppercase tracking-wider">
                        Salles recommandées
                      </h4>
                      <div className="space-y-2">
                        {event.recommendedSpaces.map((space, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${event.gradient}`}></div>
                            <span className="text-white/80 font-inter text-xs md:text-sm">{space}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      className="mt-6 flex items-center gap-2 text-white font-inter font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        x: hoveredCard === index ? 5 : 0
                      }}
                    >
                      <span>Voir les salles</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
