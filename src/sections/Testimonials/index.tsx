import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Heart } from 'lucide-react';
import { testimonials } from '../../data/mockData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-black-deep to-black-nuanced relative film-grain">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 glass-effect rounded-full border border-white/20 mb-8"
          >
            <Heart className="w-4 h-4 text-fuchsia-400 mr-2" />
            <span className="text-sm font-inter font-medium text-white/80 tracking-wide">TÉMOIGNAGES CLIENTS</span>
          </motion.div>

          <h2 className="text-section-title font-montserrat font-black text-white mb-8">
            Ils nous font <span className="gradient-text">confiance</span>
          </h2>
          <p className="text-body-large font-inter text-white/70 max-w-4xl mx-auto leading-relaxed">
            Découvrez les témoignages authentiques de nos membres qui ont trouvé leur environnement de travail idéal et transformé leur vision en réalité
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group h-full"
            >
              <div className="glass-effect border border-white/10 rounded-4xl p-8 hover:border-white/20 transition-all duration-500 h-full relative overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-4xl"></div>
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Stars */}
                <div className="flex mb-8">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-violet-400 fill-current group-hover:text-fuchsia-400 transition-colors duration-300" />
                  ))}
                </div>

                {/* Comment */}
                <blockquote className="text-white/80 font-inter mb-10 leading-relaxed text-lg italic relative">
                  <span className="text-2xl text-violet-400 font-playfair absolute -top-2 -left-2">"</span>
                  {testimonial.comment}
                  <span className="text-2xl text-fuchsia-400 font-playfair">"</span>
                </blockquote>

                {/* Author */}
                <div className="flex items-center relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-6 ring-2 ring-violet-400/30 group-hover:ring-fuchsia-400/50 transition-all duration-500">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover ken-burns"
                    />
                  </div>
                  <div>
                    <div className="font-montserrat font-bold text-white text-lg group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                      {testimonial.name}
                    </div>
                    <div className="font-inter text-sm text-white/60 tracking-wide">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats/Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="glass-effect border border-white/10 rounded-4xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                {[
                  { value: "4.9/5", label: "Note moyenne", icon: Star, color: "text-violet-400" },
                  { value: "98%", label: "Recommandent Le 40", icon: Heart, color: "text-fuchsia-400" },
                  { value: "200+", label: "Avis positifs", icon: Star, color: "text-community" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group"
                  >
                    <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                    <div className="text-4xl font-montserrat font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                      {stat.value}
                    </div>
                    <div className="text-white/70 font-inter tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}