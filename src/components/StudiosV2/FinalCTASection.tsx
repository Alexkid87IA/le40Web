import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, Check } from 'lucide-react';

export default function FinalCTASection() {
  const scrollToConfigurator = () => {
    const configurator = document.getElementById('configurator');
    if (configurator) {
      configurator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🚀</div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Prêt à Démarrer ?
          </h2>

          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Configurez votre studio en 2 minutes et obtenez votre devis instantané avec -30% de réduction
          </p>

          <motion.button
            onClick={scrollToConfigurator}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group w-full sm:w-auto px-12 py-6 bg-white text-violet-600 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transition-all text-lg mb-4"
          >
            <span className="flex items-center justify-center gap-3">
              Configurer Mon Studio Maintenant
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <p className="text-white/80 text-sm mb-12">
            Sans compte requis • Devis gratuit
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/80 font-medium">
                ou
              </span>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <p className="text-white text-lg font-semibold">
              Vous préférez en parler ?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:04XXXXXXXX"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                04 XX XX XX XX • Réponse en 2min
              </a>

              <a
                href="mailto:contact@le40studio.fr"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all"
              >
                <Mail className="w-5 h-5" />
                contact@le40studio.fr
              </a>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {[
                'Annulation gratuite 72h avant',
                'Garantie satisfait ou remboursé',
                'Plus que 11 places à -30% ce mois-ci'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
