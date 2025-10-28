import { motion } from 'framer-motion';
import { X, Check, Sparkles, Home, Users, TrendingDown, TrendingUp } from 'lucide-react';

export default function ProblemSolutionSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-6">
            Votre équipe grandit.
            <br />
            <span className="text-white/60">Mais où installer tout le monde ?</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Le télétravail a ses limites. La location classique est trop rigide et coûteuse.
            <br />
            <span className="text-emerald-400 font-bold">Il existe une 3ème voie.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-red-950/20 border border-red-900/30 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <X className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="text-red-400 font-montserrat font-bold text-lg">
                  LES PROBLÈMES CLASSIQUES
                </div>
                <div className="text-white/50 text-sm font-inter">
                  Ce que vivent les équipes aujourd'hui
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-black/30 rounded-xl">
                <Home className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1">Télétravail isolant</div>
                  <div className="text-white/60 text-sm">
                    Perte de cohésion d'équipe, créativité en baisse, réunions Zoom interminables. Impossible de recevoir des clients professionnellement.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-black/30 rounded-xl">
                <TrendingDown className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1">Location classique trop lourde</div>
                  <div className="text-white/60 text-sm">
                    Bail 3-6-9 ans, 15-25k€ d'aménagement, charges cachées, maintenance à gérer. Risque financier énorme si l'équipe évolue.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-black/30 rounded-xl">
                <Users className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1">Coworking bruyant</div>
                  <div className="text-white/60 text-sm">
                    Zéro confidentialité pour les appels clients, distractions constantes, impossible de laisser son matériel. Pas d'espace dédié à votre équipe.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-950/30 rounded-xl border border-red-900/20">
              <div className="text-center">
                <div className="text-4xl font-black text-red-400 mb-2">2500-3500€/mois</div>
                <div className="text-white/70 text-sm">
                  C'est le coût réel d'un bureau classique (loyer + charges + aménagement + maintenance)
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border border-emerald-900/30 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-emerald-400 font-montserrat font-bold text-lg">
                  LA SOLUTION LE 40
                </div>
                <div className="text-white/50 text-sm font-inter">
                  Le meilleur des deux mondes
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-emerald-500/20">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1">Bureau privé dédié à votre équipe</div>
                  <div className="text-white/80 text-sm">
                    Confidentialité totale, espace personnalisé, matériel en sécurité. Votre QG professionnel où recevoir clients et investisseurs.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-emerald-500/20">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1">Zéro gestion, tout inclus</div>
                  <div className="text-white/80 text-sm">
                    Mobilier fourni, fibre 1 Gb/s, ménage hebdo, salles de réunion, maintenance. Vous arrivez avec votre laptop, c'est tout.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-emerald-500/20">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-1">Flexibilité & communauté</div>
                  <div className="text-white/80 text-sm">
                    Contrat 1 mois minimum, upgrade/downgrade facile. Networking avec 120+ entrepreneurs pour booster votre croissance.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-950/50 to-teal-950/50 rounded-xl border border-emerald-500/30">
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-400 mb-2">
                  699€/mois
                  <span className="text-lg text-white/60 ml-2">tout inclus</span>
                </div>
                <div className="text-white/80 text-sm font-semibold">
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
          className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center"
        >
          <TrendingUp className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
          <h3 className="text-3xl font-montserrat font-black text-white mb-4">
            127 équipes ont fait le choix Le 40
          </h3>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-6">
            Startups tech, agences, cabinets conseil, studios créatifs... toutes ont trouvé leur QG idéal sans s'engager sur 9 ans ni dépenser 30k€ en aménagement.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-black text-emerald-400">-70%</div>
              <div className="text-white/60 text-sm">vs location classique</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-emerald-400">48h</div>
              <div className="text-white/60 text-sm">pour emménager</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-emerald-400">0€</div>
              <div className="text-white/60 text-sm">frais d'aménagement</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
