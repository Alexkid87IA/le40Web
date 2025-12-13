import { motion } from 'framer-motion';
import { Zap, TrendingDown } from 'lucide-react';
import { buttons } from '../../utils/designSystem';
import { studioSetups, launchOfferConfig } from '../../data/studios/setups';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function LaunchOfferBanner() {
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
      .channel('launch-offer-changes')
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

  const scrollToConfigurator = () => {
    const configurator = document.getElementById('configurator');
    if (configurator) {
      configurator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pricingComparison = studioSetups.map(setup => ({
    name: setup.name,
    normalPrice: setup.basePrice,
    launchPrice: setup.launchPrice,
    savings: setup.savings
  }));

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-transparent to-red-950/30" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="rounded-3xl border-2 border-orange-500/30 bg-gradient-to-br from-orange-950/50 to-red-950/50 backdrop-blur-xl p-8 lg:p-12 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500/20 border border-orange-400/40"
                >
                  <Zap className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-bold text-orange-400 font-montserrat tracking-wide uppercase">
                    Lancement Exceptionnel
                  </span>
                </motion.div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-montserrat text-white">
                  -40% Sur Tous Les Setups
                </h2>
                <p className="text-xl sm:text-2xl text-orange-400 font-bold">
                  (50 Premiers Créneaux Seulement)
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pricingComparison.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-colors"
                  >
                    <h3 className="font-bold text-white mb-3 text-lg">{item.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-orange-400">
                          {item.launchPrice}€/h
                        </span>
                        <span className="text-lg text-white/40 line-through">
                          {item.normalPrice}€/h
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm font-semibold">-{item.savings}€</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-black/60 rounded-2xl p-6 border border-orange-500/20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-white/60 text-sm mb-2">Créneaux restants à -40%</p>
                    <motion.p
                      key={remainingSlots}
                      initial={{ scale: 1.2, color: '#fb923c' }}
                      animate={{ scale: 1, color: '#ffffff' }}
                      className="text-5xl font-black font-montserrat"
                    >
                      {remainingSlots}
                      <span className="text-2xl text-white/60 ml-2">/ 50</span>
                    </motion.p>
                  </div>

                  <button
                    onClick={scrollToConfigurator}
                    className={`${buttons.primary.full} text-lg px-12 py-6 whitespace-nowrap`}
                  >
                    JE PROFITE DE L'OFFRE →
                  </button>
                </div>
              </div>

              {remainingSlots <= 10 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-red-400 font-bold text-lg animate-pulse">
                    ⚠️ Plus que {remainingSlots} créneaux disponibles !
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
