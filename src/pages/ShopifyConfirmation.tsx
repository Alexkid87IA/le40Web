import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Mail, Phone, ArrowRight, Home, Loader2 } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useShopifyCheckout } from '../hooks/useShopifyCheckout';

export default function ShopifyConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCheckout } = useShopifyCheckout();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    clearCheckout();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [clearCheckout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-montserrat font-black mb-4"
            >
              Commande <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Confirmée</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/60"
            >
              Merci pour votre commande! Vous allez recevoir un email de confirmation.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
          >
            <h2 className="text-2xl font-montserrat font-bold mb-6">Prochaines étapes</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Confirmation par email</h3>
                  <p className="text-white/60 text-sm">
                    Vous recevrez un email de confirmation avec tous les détails de votre commande et vos réservations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Réservations confirmées</h3>
                  <p className="text-white/60 text-sm">
                    Si votre commande comprend des réservations (salles, studios), vos créneaux sont maintenant confirmés.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Besoin d'aide?</h3>
                  <p className="text-white/60 text-sm">
                    Notre équipe est disponible pour répondre à vos questions. Contactez-nous au{' '}
                    <a href="tel:+33491234567" className="text-violet-400 hover:text-violet-300">
                      +33 4 91 23 45 67
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/boutique')}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all flex items-center justify-center gap-2"
            >
              Continuer mes achats
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
