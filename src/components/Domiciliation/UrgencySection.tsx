import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Clock, Users, Zap } from 'lucide-react';

export default function UrgencySection() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-white/10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] bg-red-600/20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -80, 0],
            y: [0, -60, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 mb-8"
          >
            <AlertCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-montserrat leading-tight">
            Nous limitons volontairement
            <br />
            nos domiciliations
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-white/95 mb-12 max-w-2xl mx-auto font-inter leading-relaxed"
          >
            Pourquoi ? Parce qu'on s'engage à scanner votre courrier en 2h,
            vous répondre en moins d'1h, et personnaliser l'accueil téléphonique.
            <br />
            <strong className="font-bold">Pour tenir cette promesse, on ne peut pas accepter tout le monde.</strong>
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12 max-w-3xl mx-auto">
            {[
              { label: 'BUSINESS', count: 7, icon: Users, color: 'from-white/20 to-white/10' },
              { label: 'STARTER', count: 12, icon: Zap, color: 'from-white/15 to-white/5' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>

                <div className={`relative p-8 lg:p-10 bg-gradient-to-br ${item.color} backdrop-blur-xl rounded-2xl border border-white/30 group-hover:border-white/50 transition-all duration-500 overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <item.icon className="w-5 h-5 text-white/90" />
                      <div className="text-sm font-bold text-white/90 font-montserrat tracking-wider">
                        {item.label}
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-6xl lg:text-7xl font-black text-white mb-3 font-montserrat"
                    >
                      {item.count}
                    </motion.div>

                    <div className="text-white/90 font-inter font-medium">
                      places restantes ce mois-ci
                    </div>

                    <motion.div
                      className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-white/10 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8"
          >
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-12 py-6 bg-white text-orange-600 font-black text-lg lg:text-xl rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 font-montserrat">Réserver ma place maintenant</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/90 font-inter"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Activation sous 24h</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Sans engagement</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Sans CB</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </section>
  );
}
