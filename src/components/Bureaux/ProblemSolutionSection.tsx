import { motion } from 'framer-motion';
import { X, Check, Sparkles, Home, Users, TrendingDown, TrendingUp } from 'lucide-react';

export default function ProblemSolutionSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4 md:mb-6 px-4">
            Votre équipe grandit.
            <br />
            <span className="text-white/60">Mais où installer tout le monde ?</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto px-4">
            Le télétravail a ses limites. La location classique est trop rigide et coûteuse.
            <br />
            <span className="text-emerald-400 font-bold">Il existe une 3ème voie.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 bg-red-950/20 border border-red-900/30 rounded-xl md:rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg md:rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <X className="w-5 md:w-6 h-5 md:h-6 text-red-400" />
              </div>
              <div>
                <div className="text-red-400 font-montserrat font-bold text-sm md:text-base lg:text-lg">
                  LES PROBLÈMES CLASSIQUES
                </div>
                <div className="text-white/50 text-xs md:text-sm font-inter">
                  Ce que vivent les équipes aujourd'hui
                </div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3 p-3 md:p-4 bg-black/30 rounded-lg md:rounded-xl">
                <Home className="w-4 md:w-5 h-4 md:h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1 text-sm md:text-base">Télétravail isolant</div>
                  <div className="text-white/60 text-xs md:text-sm">
                    Perte de cohésion d'équipe, créativité en baisse, réunions Zoom interminables. Impossible de recevoir des clients professionnellement.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 md:p-4 bg-black/30 rounded-lg md:rounded-xl">
                <TrendingDown className="w-4 md:w-5 h-4 md:h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1 text-sm md:text-base">Location classique trop lourde</div>
                  <div className="text-white/60 text-xs md:text-sm">
                    Bail 3-6-9 ans, 15-25k€ d'aménagement, charges cachées, maintenance à gérer. Risque financier énorme si l'équipe évolue.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 md:p-4 bg-black/30 rounded-lg md:rounded-xl">
                <Users className="w-4 md:w-5 h-4 md:h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1 text-sm md:text-base">Coworking bruyant</div>
                  <div className="text-white/60 text-xs md:text-sm">
                    Zéro confidentialité pour les appels clients, distractions constantes, impossible de laisser son matériel. Pas d'espace dédié à votre équipe.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-950/30 rounded-lg md:rounded-xl border border-red-900/20">
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-red-400 mb-1 md:mb-2">2500-3500€/mois</div>
                <div className="text-white/70 text-xs md:text-sm">
                  C'est le coût réel d'un bureau classique (loyer + charges + aménagement + maintenance)
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border border-emerald-900/30 rounded-xl md:rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg md:rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-emerald-400 font-montserrat font-bold text-sm md:text-base lg:text-lg">
                  LA SOLUTION LE 40
                </div>
                <div className="text-white/50 text-xs md:text-sm font-inter">
                  Le meilleur des deux mondes
                </div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3 p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl border border-emerald-500/20">
                <Check className="w-4 md:w-5 h-4 md:h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1 text-sm md:text-base">Bureau privé dédié à votre équipe</div>
                  <div className="text-white/80 text-xs md:text-sm">
                    Confidentialité totale, espace personnalisé, matériel en sécurité. Votre QG professionnel où recevoir clients et investisseurs.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl border border-emerald-500/20">
                <Check className="w-4 md:w-5 h-4 md:h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1 text-sm md:text-base">Zéro gestion, tout inclus</div>
                  <div className="text-white/80 text-xs md:text-sm">
                    Mobilier fourni, fibre 1 Gb/s, salles de réunion, maintenance. Vous arrivez avec votre laptop, c'est tout.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl border border-emerald-500/20">
                <Check className="w-4 md:w-5 h-4 md:h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1 text-sm md:text-base">Flexibilité & communauté</div>
                  <div className="text-white/80 text-xs md:text-sm">
                    Contrat 1 mois minimum, upgrade/downgrade facile. Networking avec 120+ entrepreneurs pour booster votre croissance.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-emerald-950/50 to-teal-950/50 rounded-lg md:rounded-xl border border-emerald-500/30">
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-emerald-400 mb-1 md:mb-2">
                  499€/mois
                  <span className="text-sm md:text-base lg:text-lg text-white/60 ml-2">tout inclus</span>
                </div>
                <div className="text-white/80 text-xs md:text-sm font-semibold">
                  Bureau 2-4 pers • Économisez jusqu'à 70% vs location classique
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 text-center"
        >
          <TrendingUp className="w-10 md:w-12 h-10 md:h-12 text-emerald-400 mx-auto mb-4 md:mb-6" />
          <h3 className="text-xl md:text-2xl lg:text-3xl font-montserrat font-black text-white mb-3 md:mb-4 px-4">
            127 équipes ont fait le choix Le 40
          </h3>
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto mb-4 md:mb-6 px-4">
            Startups tech, agences, cabinets conseil, studios créatifs... toutes ont trouvé leur QG idéal sans s'engager sur 9 ans ni dépenser 30k€ en aménagement.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-6 md:mt-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-emerald-400">-70%</div>
              <div className="text-white/60 text-xs md:text-sm">vs location classique</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-emerald-400">48h</div>
              <div className="text-white/60 text-xs md:text-sm">pour emménager</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-emerald-400">0€</div>
              <div className="text-white/60 text-xs md:text-sm">frais d'aménagement</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
