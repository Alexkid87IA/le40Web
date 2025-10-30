import { motion } from 'framer-motion';
import { Flame, Check, Phone } from 'lucide-react';
import { buttons } from '../../utils/designSystem';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { launchOfferConfig } from '../../data/studios/setups';

export default function FinalCTALaunch() {
  const [remainingSlots, setRemainingSlots] = useState(launchOfferConfig.remainingSlots);

  useEffect(() => {
    const fetchRemainingSlots = async () => {
      const { data, error } = await supabase
        .from('launch_offer_tracking')
        .select('remaining_slots, is_active')
        .eq('is_active', true)
        .maybeSingle();

      if (data && !error) {
        setRemainingSlots(data.remaining_slots);
      }
    };

    fetchRemainingSlots();

    const channel = supabase
      .channel('final-cta-launch-offer')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'launch_offer_tracking'
        },
        (payload: any) => {
          if (payload.new?.remaining_slots !== undefined) {
            setRemainingSlots(payload.new.remaining_slots);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const thisWeek = Math.min(14, remainingSlots);
  const nextTwoWeeks = Math.max(0, remainingSlots - thisWeek);

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-red-600">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
            >
              <Flame className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white font-montserrat tracking-wide uppercase">
                Dernière Chance
              </span>
            </motion.div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-montserrat text-white leading-tight">
              Ne Passez Pas à Côté
              <br />
              de l'Offre Lancement
            </h2>

            <p className="text-2xl sm:text-3xl text-white/90 font-semibold">
              Réservez maintenant et économisez jusqu'à 80€ par session.
            </p>

            <motion.p
              key={remainingSlots}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-xl text-white/90"
            >
              Plus que <span className="font-black text-4xl">{remainingSlots}</span> créneaux à -40%.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <div className="grid sm:grid-cols-2 gap-8 text-white">
              <div className="text-center">
                <div className="text-5xl font-black mb-2">{thisWeek}</div>
                <div className="text-lg">Cette semaine</div>
              </div>
              <div className="text-center border-l border-white/20">
                <div className="text-5xl font-black mb-2">{nextTwoWeeks}</div>
                <div className="text-lg">Les 2 prochaines semaines</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={scrollToTop}
              className="px-16 py-8 bg-white text-orange-600 font-black text-2xl rounded-2xl hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl font-montserrat"
            >
              RÉSERVER MA SESSION -40%
            </button>

            <a
              href="tel:+33600000000"
              className="flex items-center gap-3 px-12 py-8 backdrop-blur-md bg-white/10 text-white font-bold text-xl rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 font-montserrat"
            >
              <Phone className="w-6 h-6" />
              Appeler maintenant
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            {[
              'Confirmation immédiate',
              'Paiement 100% sécurisé',
              'Annulation gratuite 7j'
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-center gap-3 text-white"
              >
                <Check className="w-5 h-5" />
                <span className="font-semibold">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="pt-8 border-t border-white/20 text-white/80 text-sm space-y-1"
          >
            <p className="font-semibold">Le 40 Studio</p>
            <p>40 Rue [Adresse] • 13001 Marseille</p>
            <p>contact@le40studio.fr • 06 XX XX XX XX</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
