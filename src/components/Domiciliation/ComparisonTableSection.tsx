import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function ComparisonTableSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-6xl mx-auto px-8">
        <SectionHeader
          title="Pourquoi nos clients"
          highlightedText="ne partent pas"
          className="mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/60 font-semibold">Critère</th>
                  <th className="text-center py-4 px-4 text-orange-400 font-bold">Le 40</th>
                  <th className="text-center py-4 px-4 text-white/40 font-semibold">Concurrent A</th>
                  <th className="text-center py-4 px-4 text-white/40 font-semibold">Concurrent B</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4">Scan courrier</td>
                  <td className="text-center py-4 px-4">
                    <div className="inline-flex items-center gap-2 text-green-400 font-semibold">
                      <Check className="w-5 h-5" />
                      2h
                    </div>
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <span className="text-orange-400">⚠️</span> Hebdo
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <X className="w-5 h-5 inline text-red-400" /> Pas de scan
                  </td>
                </tr>

                <tr className="border-b border-white/5">
                  <td className="py-4 px-4">Standard inclus</td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 inline text-green-400" />
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <X className="w-5 h-5 inline text-red-400" /> En option
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <X className="w-5 h-5 inline text-red-400" /> En option
                  </td>
                </tr>

                <tr className="border-b border-white/5">
                  <td className="py-4 px-4">Salle incluse</td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 inline text-green-400" />
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <X className="w-5 h-5 inline text-red-400" /> Payant
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <X className="w-5 h-5 inline text-red-400" /> Payant
                  </td>
                </tr>

                <tr className="border-b border-white/5">
                  <td className="py-4 px-4">Conseiller dédié</td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 inline text-green-400" />
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <X className="w-5 h-5 inline text-red-400" /> Support générique
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <X className="w-5 h-5 inline text-red-400" /> FAQ seulement
                  </td>
                </tr>

                <tr className="border-b border-white/5">
                  <td className="py-4 px-4">Agrément Préfecture</td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 inline text-green-400" />
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <Check className="w-5 h-5 inline text-green-400" />
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    <span className="text-orange-400">⚠️</span> À vérifier
                  </td>
                </tr>

                <tr className="border-b border-white/5">
                  <td className="py-4 px-4">Résiliation</td>
                  <td className="text-center py-4 px-4">
                    <div className="inline-flex items-center gap-2 text-green-400 font-semibold">
                      <Check className="w-5 h-5" />
                      1 clic
                    </div>
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    Engagement 12 mois
                  </td>
                  <td className="text-center py-4 px-4 text-white/40">
                    Préavis 3 mois
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Le prix n'est <strong className="text-white">PAS</strong> le seul critère.
              <br />
              Ce qui compte : <strong className="text-orange-400">le service après l'achat</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
