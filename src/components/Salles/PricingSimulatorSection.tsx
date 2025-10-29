import { motion } from 'framer-motion';
import { useState } from 'react';
import { spaces } from '../../data/salles/spaces';
import { Calculator, Clock, Users, Calendar } from 'lucide-react';

export default function PricingSimulatorSection() {
  const [selectedSpace, setSelectedSpace] = useState(spaces[0].id);
  const [duration, setDuration] = useState(2);
  const [attendees, setAttendees] = useState(10);
  const [addCatering, setAddCatering] = useState(false);
  const [addSupport, setAddSupport] = useState(false);

  const currentSpace = spaces.find(s => s.id === selectedSpace) || spaces[0];
  const basePrice = currentSpace.price * duration;
  const cateringPrice = addCatering ? attendees * 25 : 0;
  const supportPrice = addSupport ? 150 : 0;
  const totalPrice = basePrice + cateringPrice + supportPrice;
  const savings = addCatering && addSupport ? totalPrice * 0.1 : 0;
  const finalPrice = totalPrice - savings;

  return (
    <section className="relative py-32 bg-gradient-to-b from-zinc-900 to-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
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
            <Calculator className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 font-montserrat font-medium text-sm tracking-wider uppercase">
              Simulateur de prix
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6">
            ESTIMEZ VOTRE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              BUDGET
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Calculez le coût de votre événement en temps réel
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-montserrat font-bold text-white mb-8">
                Configurez votre événement
              </h3>

              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-3 text-white font-inter font-medium mb-4">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    Choisissez votre espace
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {spaces.map((space) => (
                      <motion.button
                        key={space.id}
                        onClick={() => setSelectedSpace(space.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedSpace === space.id
                            ? `border-emerald-400 bg-gradient-to-r ${space.gradient} bg-opacity-20`
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <space.icon className={`w-5 h-5 ${selectedSpace === space.id ? 'text-emerald-400' : 'text-white/60'}`} />
                          <span className={`font-inter font-medium text-sm ${selectedSpace === space.id ? 'text-white' : 'text-white/70'}`}>
                            {space.title}
                          </span>
                        </div>
                        <div className="text-left">
                          <span className={`text-lg font-montserrat font-bold ${selectedSpace === space.id ? 'text-emerald-400' : 'text-white/50'}`}>
                            {space.price}€
                          </span>
                          <span className="text-white/40 text-xs ml-1">/h</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 text-white font-inter font-medium mb-4">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    Durée: {duration} heure{duration > 1 ? 's' : ''}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-white/40 text-xs mt-2">
                    <span>1h</span>
                    <span>6h</span>
                    <span>12h</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 text-white font-inter font-medium mb-4">
                    <Users className="w-5 h-5 text-emerald-400" />
                    Nombre de participants: {attendees}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={attendees}
                    onChange={(e) => setAttendees(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-white/40 text-xs mt-2">
                    <span>1</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-white font-inter font-medium mb-4">Services additionnels</h4>

                  <div className="space-y-3">
                    <motion.label
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={addCatering}
                          onChange={(e) => setAddCatering(e.target.checked)}
                          className="w-5 h-5 accent-emerald-400"
                        />
                        <div>
                          <span className="text-white font-inter font-medium block">Service traiteur</span>
                          <span className="text-white/50 text-sm">25€/personne</span>
                        </div>
                      </div>
                      <span className="text-emerald-400 font-montserrat font-bold">
                        +{attendees * 25}€
                      </span>
                    </motion.label>

                    <motion.label
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={addSupport}
                          onChange={(e) => setAddSupport(e.target.checked)}
                          className="w-5 h-5 accent-emerald-400"
                        />
                        <div>
                          <span className="text-white font-inter font-medium block">Support technique</span>
                          <span className="text-white/50 text-sm">Demi-journée</span>
                        </div>
                      </div>
                      <span className="text-emerald-400 font-montserrat font-bold">
                        +150€
                      </span>
                    </motion.label>
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
          >
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-zinc-900 to-black backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-montserrat font-bold text-white mb-8">
                  Récapitulatif
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <span className="text-white/80 font-inter block">{currentSpace.title}</span>
                      <span className="text-white/50 text-sm">{duration} heure{duration > 1 ? 's' : ''}</span>
                    </div>
                    <span className="text-white font-montserrat font-bold text-lg">
                      {basePrice}€
                    </span>
                  </div>

                  {addCatering && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center justify-between py-3 border-b border-white/10"
                    >
                      <div>
                        <span className="text-white/80 font-inter block">Service traiteur</span>
                        <span className="text-white/50 text-sm">{attendees} personne{attendees > 1 ? 's' : ''}</span>
                      </div>
                      <span className="text-white font-montserrat font-bold text-lg">
                        {cateringPrice}€
                      </span>
                    </motion.div>
                  )}

                  {addSupport && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center justify-between py-3 border-b border-white/10"
                    >
                      <span className="text-white/80 font-inter">Support technique</span>
                      <span className="text-white font-montserrat font-bold text-lg">
                        {supportPrice}€
                      </span>
                    </motion.div>
                  )}

                  {savings > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between py-3 border-b border-white/10"
                    >
                      <div>
                        <span className="text-emerald-400 font-inter block">Réduction pack</span>
                        <span className="text-white/50 text-sm">-10% sur services</span>
                      </div>
                      <span className="text-emerald-400 font-montserrat font-bold text-lg">
                        -{savings.toFixed(0)}€
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-2xl p-6 border border-emerald-400/30 mb-8">
                  <div className="flex items-baseline justify-between">
                    <span className="text-white/80 font-inter text-lg">Total HT</span>
                    <div className="text-right">
                      <motion.span
                        key={finalPrice}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 block"
                      >
                        {finalPrice.toFixed(0)}€
                      </motion.span>
                      <span className="text-white/50 text-sm">TVA 20% en sus</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-2xl font-montserrat font-bold text-lg shadow-2xl mb-4"
                >
                  Réserver maintenant
                </motion.button>

                <p className="text-white/50 text-center text-sm font-inter">
                  Paiement sécurisé • Confirmation immédiate
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
