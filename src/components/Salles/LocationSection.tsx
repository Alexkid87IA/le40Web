import { motion } from 'framer-motion';
import { MapPin, Train, Car, PlaneTakeoff, Clock, Navigation } from 'lucide-react';

export default function LocationSection() {
  const transportOptions = [
    {
      icon: Train,
      title: 'Métro & RER',
      description: 'Station République',
      time: '2 min à pied',
      lines: ['Lignes 3, 5, 8, 9, 11'],
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Car,
      title: 'Voiture',
      description: 'Parking à proximité',
      time: 'Parking République',
      lines: ['300 places', 'Tarif préférentiel'],
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      icon: PlaneTakeoff,
      title: 'Aéroport CDG',
      description: 'RER B direct',
      time: '35 min',
      lines: ['Navette disponible', 'Service VIP'],
      gradient: 'from-violet-600 to-purple-600'
    }
  ];

  return (
    <section className="relative py-32 bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 font-montserrat font-medium text-sm tracking-wider uppercase">
              Localisation Premium
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6">
            AU CŒUR DE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              PARIS
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Un emplacement stratégique accessible depuis toute l'Île-de-France
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"
              />
              <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-cyan-600/20"></div>
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
                    <h3 className="text-3xl font-montserrat font-bold text-white mb-4">
                      40 Rue de la République
                    </h3>
                    <p className="text-xl text-white/80 font-inter mb-6">
                      75003 Paris, France
                    </p>
                    <motion.a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-inter font-medium shadow-xl"
                    >
                      <Navigation className="w-5 h-5" />
                      Ouvrir dans Google Maps
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {transportOptions.map((transport, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ x: 10 }}
                className="relative group"
              >
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${transport.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                />
                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 group-hover:border-white/30 transition-all">
                  <div className="flex items-start gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${transport.gradient} flex items-center justify-center`}>
                      <transport.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-montserrat font-bold text-white">
                          {transport.title}
                        </h3>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-white/80 font-inter text-sm font-medium">
                            {transport.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-white/70 font-inter mb-3">
                        {transport.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {transport.lines.map((line, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-inter text-white/60"
                          >
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: MapPin,
              title: 'Quartier République',
              description: 'Centre névralgique de Paris',
              gradient: 'from-cyan-600 to-blue-600'
            },
            {
              icon: Train,
              title: 'Hyper connecté',
              description: '5 lignes de métro à proximité',
              gradient: 'from-emerald-600 to-teal-600'
            },
            {
              icon: Car,
              title: 'Parking sécurisé',
              description: 'Tarif préférentiel pour nos clients',
              gradient: 'from-violet-600 to-purple-600'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
              />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 group-hover:border-white/20 transition-all text-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <feature.icon className="w-12 h-12 text-emerald-400 mx-auto" />
                </motion.div>
                <h3 className="text-xl font-montserrat font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70 font-inter">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
