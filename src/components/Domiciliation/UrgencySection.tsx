import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';

export default function UrgencySection() {
  return (
    <section className="py-32 bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <AlertCircle className="w-16 h-16 text-white mx-auto mb-8" />

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Nous limitons volontairement
            <br />
            nos domiciliations
          </h2>

          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Pourquoi ? Parce qu'on s'engage à scanner votre courrier en 2h,
            vous répondre en moins d'1h, et personnaliser l'accueil téléphonique.
            Pour tenir cette promesse, on ne peut pas accepter tout le monde.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-sm text-white/80 mb-2">BUSINESS</div>
              <div className="text-5xl font-black text-white mb-2">7</div>
              <div className="text-white/80">places restantes ce mois-ci</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-sm text-white/80 mb-2">STARTER</div>
              <div className="text-5xl font-black text-white mb-2">12</div>
              <div className="text-white/80">places restantes ce mois-ci</div>
            </div>
          </div>

          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-12 py-6 bg-white text-orange-600 font-black text-xl rounded-xl hover:scale-105 transition-transform shadow-2xl mb-6"
          >
            Réserver ma place maintenant
            <ArrowRight className="w-6 h-6" />
          </a>

          <p className="text-white/80">
            Sans CB • Activation sous 24h • Sans engagement
          </p>
        </motion.div>
      </div>
    </section>
  );
}
