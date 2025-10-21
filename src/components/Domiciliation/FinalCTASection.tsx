import { motion } from 'framer-motion';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTASection() {
  return (
    <section className="py-32 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Prêt pour une domiciliation
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              qui fait vraiment le job ?
            </span>
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <div className="flex items-center gap-2 text-white/80">
              <Check className="w-5 h-5 text-green-400" />
              <span>Courrier géré, scanné, notifié</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Check className="w-5 h-5 text-green-400" />
              <span>Standard pro + salle incluse</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Check className="w-5 h-5 text-green-400" />
              <span>Zéro paperasse</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Choisir ma formule
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Poser une question
            </Link>
          </div>

          <p className="text-white/40 text-sm">
            Rejoignez les 120+ entreprises qui nous font confiance
          </p>
        </motion.div>
      </div>
    </section>
  );
}
