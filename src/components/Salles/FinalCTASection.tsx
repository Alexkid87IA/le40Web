import { motion } from 'framer-motion';
import { ArrowRight, Phone, Zap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTASection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]">
          <div className="absolute inset-0 bg-emerald-600/20 rounded-full blur-[200px] animate-pulse"></div>
          <div className="absolute inset-0 bg-teal-600/20 rounded-full blur-[200px] animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <Building2 className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 font-montserrat font-medium text-sm tracking-wider uppercase">
              Le 40 Coworking Premium
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6">
            BESOIN D'UN ESPACE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-gradient">
              SUR-MESURE ?
            </span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl font-inter text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Notre équipe vous accompagne pour créer l'événement parfait dans nos espaces modulables
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-black rounded-2xl px-10 py-5 border border-emerald-500/50 flex items-center gap-3"
              >
                <Zap className="w-5 h-5 text-white" />
                <span className="font-montserrat font-semibold text-white">
                  Demander un devis personnalisé
                </span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>

            <motion.a
              href="tel:0123456789"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl px-10 py-5 border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5 text-white" />
              <span className="font-montserrat font-semibold text-white">
                01 23 45 67 89
              </span>
            </motion.a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
            {[
              { number: "500+", label: "Événements organisés" },
              { number: "98%", label: "Clients satisfaits" },
              { number: "24/7", label: "Support disponible" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  {stat.number}
                </div>
                <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
