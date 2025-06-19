import React from 'react';
import { motion } from 'framer-motion';
import { Users, Coffee, Calendar, ArrowRight, Heart, Sparkles, Zap, Target, Award, Star, Network, Handshake } from 'lucide-react';

const communityImages = [
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=400", 
  "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=400"
];

const communityFeatures = [
  {
    icon: Users,
    title: "Communauté active",
    description: "Plus de 200 entrepreneurs passionnés et visionnaires",
    color: "from-community to-green-600"
  },
  {
    icon: Coffee,
    title: "Événements réguliers", 
    description: "Afterworks, conférences et ateliers exclusifs",
    color: "from-domiciliation to-orange-600"
  },
  {
    icon: Calendar,
    title: "Networking premium",
    description: "Opportunités de collaboration quotidiennes",
    color: "from-blog to-teal-600"
  },
  {
    icon: Heart,
    title: "Entraide & mentoring",
    description: "Partage d'expériences et conseils d'experts",
    color: "from-violet-400 to-fuchsia-400"
  }
];

const communityStats = [
  { number: "200+", label: "Membres actifs", icon: Users, color: "text-community" },
  { number: "50+", label: "Événements/an", icon: Calendar, color: "text-blog" },
  { number: "15+", label: "Partenaires", icon: Handshake, color: "text-fuchsia-400" },
  { number: "4.9★", label: "Satisfaction", icon: Sparkles, color: "text-violet-400" }
];

export default function Community() {
  return (
    <section id="community" className="min-h-screen bg-gradient-to-br from-black-deep via-black-nuanced to-black-deep relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-community" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-community)" />
        </svg>
      </div>

      {/* Film grain texture */}
      <div className="absolute inset-0 film-grain"></div>

      <div className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Badge "Acte 5" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-community"></div>
                <span className="text-sm font-inter font-medium text-community tracking-[0.3em] uppercase">ACTE 5</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-community to-transparent"></div>
              </div>
            </motion.div>

            {/* Titre principal avec animation mot par mot */}
            <div className="mb-8">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-hero font-montserrat font-black text-white leading-none tracking-tight"
              >
                {['NOTRE', 'COMMUNAUTÉ'].map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                    className={`inline-block mr-6 ${word === 'COMMUNAUTÉ' ? 'bg-gradient-to-r from-community to-green-600 bg-clip-text text-transparent' : ''}`}
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-body-large font-inter text-white/70 max-w-4xl mx-auto leading-relaxed"
            >
              Des éclats d'humanité qui nourrissent l'innovation et transforment les visions en réalités partagées
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            {/* Left: Features avec design "Fragments" */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="glass-effect border border-white/10 rounded-4xl p-8 hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-community/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-4xl"></div>
                    
                    <div className="relative flex items-start space-x-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-montserrat font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-community group-hover:to-green-600 group-hover:bg-clip-text transition-all duration-500">
                          {feature.title}
                        </h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-community to-green-600 rounded-full mb-4 group-hover:w-24 transition-all duration-500"></div>
                        <p className="text-white/70 font-inter leading-relaxed text-lg group-hover:text-white/90 transition-colors duration-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-8"
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-community to-green-600 text-white font-montserrat font-semibold text-lg rounded-2xl hover:shadow-lg transition-all duration-500 relative overflow-hidden glow-effect"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center">
                    <span className="tracking-wide">Rejoindre la communauté</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right: Image Gallery avec design "Fragments" */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {communityImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, rotate: 2, y: -5 }}
                  className={`relative overflow-hidden rounded-4xl group cursor-pointer ${
                    index % 3 === 0 ? 'col-span-2 md:col-span-1' : ''
                  } ${index === 1 ? 'md:mt-12' : ''} ${index === 4 ? 'md:-mt-12' : ''}`}
                >
                  <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-500 relative">
                    <img
                      src={image}
                      alt={`Communauté Le 40 - ${index + 1}`}
                      className="w-full h-64 object-cover ken-burns group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-deep/60 via-transparent to-black-nuanced/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-community/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating number */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 glass-effect rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-white font-playfair font-bold text-sm">{index + 1}</span>
                    </div>

                    {/* Hover icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-90 transition-all duration-500">
                      <div className="w-16 h-16 bg-gradient-to-r from-community to-green-600 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats Section avec design "Fragments" */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {communityStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="glass-effect border border-white/10 rounded-4xl p-8 hover:border-white/20 transition-all duration-500 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  <div className="relative">
                    <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`} />
                    <div className="text-4xl font-montserrat font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all duration-500">
                      {stat.number}
                    </div>
                    <div className="text-white/70 font-inter text-sm tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center"
          >
            <div className="glass-effect border border-white/10 rounded-4xl p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-community/10 to-green-600/10 opacity-50"></div>
              <div className="relative">
                <Heart className="w-12 h-12 text-community mx-auto mb-6" />
                <h3 className="text-3xl font-montserrat font-bold text-white mb-6">
                  Prêt à rejoindre notre écosystème ?
                </h3>
                <p className="text-white/70 font-inter mb-8 max-w-3xl mx-auto leading-relaxed text-lg">
                  Devenez membre de notre communauté premium et accédez à un réseau d'entrepreneurs visionnaires, 
                  d'événements exclusifs et d'opportunités de collaboration uniques.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-community to-green-600 text-white font-montserrat font-semibold text-lg rounded-2xl hover:shadow-lg transition-all duration-500 relative overflow-hidden glow-effect"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    <div className="relative flex items-center">
                      <Users className="w-6 h-6 mr-3" />
                      <span className="tracking-wide">Rejoindre maintenant</span>
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="/coworking"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center px-10 py-5 glass-effect text-white font-montserrat font-semibold text-lg rounded-2xl border border-community/30 hover:bg-community/10 hover:border-community transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-community/10 to-green-600/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    <div className="relative flex items-center">
                      <span className="tracking-wide">Découvrir nos espaces</span>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}