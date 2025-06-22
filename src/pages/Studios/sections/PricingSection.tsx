import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Sparkles, Coffee, Car, Zap, Monitor, Palette, Calendar, Utensils, Layers, Image, Shield } from 'lucide-react';

export default function PricingSection() {
  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6">
            Tarifs{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              transparents
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Composez votre formule sur mesure avec nos packs et options
          </p>
        </motion.div>

        {/* Grille des tarifs de base */}
        <div className="mb-20">
          <h3 className="text-2xl font-montserrat font-bold text-white mb-8 text-center">
            Packs de base (tout inclus)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 font-medium py-4 px-4">Pack</th>
                  <th className="text-center text-white/60 font-medium py-4 px-4">1 heure</th>
                  <th className="text-center text-white/60 font-medium py-4 px-4">3 heures</th>
                  <th className="text-center text-white/60 font-medium py-4 px-4">Journée (7h)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-semibold">Studio</p>
                        <p className="text-white/60 text-sm">Tournage brut</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center text-white font-bold text-xl">119€</td>
                  <td className="text-center text-white font-bold text-xl">329€</td>
                  <td className="text-center text-white font-bold text-xl">599€</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <Film className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-semibold">Post-Prod</p>
                        <p className="text-white/60 text-sm">Tournage + montage simple</p>
                      </div>
                      <span className="ml-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        Best Value
                      </span>
                    </div>
                  </td>
                  <td className="text-center text-white font-bold text-xl">169€</td>
                  <td className="text-center text-white font-bold text-xl">469€</td>
                  <td className="text-center text-white/40">—</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-semibold">Expert</p>
                        <p className="text-white/60 text-sm">Création complète & SEO</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center text-white font-bold text-xl">299€</td>
                  <td className="text-center text-white font-bold text-xl">849€</td>
                  <td className="text-center text-white/40">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/60 text-sm mt-4 text-center">
            Chaque pack inclut : plateau équipé (2 caméras 4K, lumière cinéma, micros), technicien et transfert des rushs
          </p>
        </div>

        {/* Catalogue d'upsells */}
        <div>
          <h3 className="text-2xl font-montserrat font-bold text-white mb-8 text-center">
            Catalogue d'options à la carte
          </h3>
          
          {/* Grille des options par catégorie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Production & Matériel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="text-xl font-montserrat font-bold text-white">Production & Matériel</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Caméra 4K supplémentaire</span>
                  <span className="text-purple-400 font-bold">+49€/h</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Multi-cam live-switch (régie)</span>
                  <span className="text-purple-400 font-bold">+149€/h</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Teleprompteur + iPad</span>
                  <span className="text-purple-400 font-bold">+25€/h</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Carte SD 128 Go à emporter</span>
                  <span className="text-purple-400 font-bold">+19€</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white/80">Backup cloud 30 jours</span>
                  <span className="text-purple-400 font-bold">+29€</span>
                </div>
              </div>
            </motion.div>

            {/* Post-Production avancée */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-2xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Film className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-xl font-montserrat font-bold text-white">Post-Production avancée</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Color grading cinéma</span>
                  <span className="text-blue-400 font-bold">+99€/vidéo</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Sous-titres dynamiques FR/EN</span>
                  <span className="text-blue-400 font-bold">+49€/vidéo</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Motion graphics / lower-thirds</span>
                  <span className="text-blue-400 font-bold">+99€/min</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white/80">Master vertical TikTok/Reels</span>
                  <span className="text-blue-400 font-bold">+25€/export</span>
                </div>
              </div>
            </motion.div>

            {/* Création & Stratégie */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-2xl p-6 border border-emerald-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-xl font-montserrat font-bold text-white">Création & Stratégie</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Coaching storytelling 1h</span>
                  <span className="text-emerald-400 font-bold">+119€</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Script long-form (≤ 10 min)</span>
                  <span className="text-emerald-400 font-bold">+149€</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white/80">Audit & stratégie YouTube 360°</span>
                  <span className="text-emerald-400 font-bold">+299€</span>
                </div>
              </div>
            </motion.div>

            {/* Social Media Assets */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 rounded-2xl p-6 border border-pink-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-600/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-pink-400" />
                </div>
                <h4 className="text-xl font-montserrat font-bold text-white">Social Media Assets</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Pack Shorts : 3 shorts + miniature</span>
                  <span className="text-pink-400 font-bold">149€</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Short supplémentaire</span>
                  <span className="text-pink-400 font-bold">+25€/pièce</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Miniature YouTube</span>
                  <span className="text-pink-400 font-bold">+35€/pièce</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white/80">Calendrier contenu 30 jours</span>
                  <span className="text-pink-400 font-bold">+299€</span>
                </div>
              </div>
            </motion.div>

            {/* Media Buying & Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-2xl p-6 border border-orange-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="text-xl font-montserrat font-bold text-white">Media Buying & Analytics</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Set-up campagnes Ads</span>
                  <span className="text-orange-400 font-bold">249€ + 10% budget</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Boost TikTok 50k vues</span>
                  <span className="text-orange-400 font-bold">+219€</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white/80">Dashboard temps réel</span>
                  <span className="text-orange-400 font-bold">+99€/mois</span>
                </div>
              </div>
            </motion.div>

            {/* Confort & Logistique */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 rounded-2xl p-6 border border-violet-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-violet-400" />
                </div>
                <h4 className="text-xl font-montserrat font-bold text-white">Confort & Logistique</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Café, softs & snacks (1-4 pers.)</span>
                  <span className="text-violet-400 font-bold">29€</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Lunch box gourmet (par personne)</span>
                  <span className="text-violet-400 font-bold">19€</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Buffet journée (≤ 6 pers.)</span>
                  <span className="text-violet-400 font-bold">99€</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Transport Gare ↔ studio</span>
                  <span className="text-violet-400 font-bold">59€/trajet</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <span className="text-white/80">Transport CDG/Orly ↔ studio</span>
                    <p className="text-white/50 text-xs">Aller + retour : -10%</p>
                  </div>
                  <span className="text-violet-400 font-bold">79€/trajet</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Exemple de parcours client */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl p-8 border border-purple-500/20"
        >
          <h4 className="text-xl font-montserrat font-bold text-white mb-6">
            💡 Exemple de parcours client
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                1
              </div>
              <p className="text-white/80">Pack Post-Prod 3h</p>
              <p className="text-purple-400 font-bold text-xl">469€</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                2
              </div>
              <p className="text-white/80">Options choisies</p>
              <p className="text-white/60 text-sm">Téléprompteur (75€)<br/>Pack Shorts (149€)<br/>Transport A/R (106€)</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                3
              </div>
              <p className="text-white/80">Total prévisionnel</p>
              <p className="text-purple-400 font-bold text-2xl">799€ HT</p>
            </div>
          </div>
          <p className="text-white/60 text-center">
            Solution « prête à poster » avec confort logistique inclus
          </p>
        </motion.div>
      </div>
    </section>
  );
}