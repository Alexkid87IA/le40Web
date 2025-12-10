import { motion } from 'framer-motion';
import { Check, X, Mic, Video, Camera } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';

export default function ComparisonTableSection() {
  const { products } = useShopifyCollection('studios-location');

  const getStudioData = (type: 'podcast' | 'video' | 'photo') => {
    const product = products.find(p => p.title.toLowerCase().includes(type));
    if (!product) return null;

    const firstVariant = product.variants.edges[0]?.node;
    const price = firstVariant ? parseFloat(firstVariant.price.amount) / 2 : 0;

    return {
      name: product.title.replace('Le 40', '').trim(),
      price,
      icon: type === 'podcast' ? Mic : type === 'video' ? Video : Camera,
      gradient: type === 'podcast'
        ? 'from-purple-600 to-violet-600'
        : type === 'video'
        ? 'from-emerald-600 to-cyan-600'
        : 'from-blue-600 to-cyan-600',
    };
  };

  const podcast = getStudioData('podcast');
  const video = getStudioData('video');
  const photo = getStudioData('photo');

  const studios = [podcast, video, photo].filter(Boolean);

  if (studios.length === 0) {
    return null;
  }

  const comparisonData = [
    {
      feature: 'Prix par heure TTC',
      podcast: podcast ? `${(podcast.price * 1.20).toFixed(0)}€/h` : '-',
      video: video ? `${(video.price * 1.20).toFixed(0)}€/h` : '-',
      photo: photo ? `${(photo.price * 1.20).toFixed(0)}€/h` : '-',
    },
    {
      feature: 'Superficie',
      podcast: '15m²',
      video: '25m²',
      photo: '30m²',
    },
    {
      feature: 'Capacité',
      podcast: '2-3 personnes',
      video: '4-6 personnes',
      photo: '5-8 personnes',
    },
    {
      feature: 'Fond vert',
      podcast: false,
      video: true,
      photo: false,
    },
    {
      feature: 'Éclairage professionnel',
      podcast: false,
      video: true,
      photo: true,
    },
    {
      feature: 'Interface audio',
      podcast: true,
      video: false,
      photo: false,
    },
    {
      feature: 'Caméras 4K',
      podcast: false,
      video: true,
      photo: false,
    },
    {
      feature: 'Kit flash Profoto',
      podcast: false,
      video: false,
      photo: true,
    },
    {
      feature: 'Traitement acoustique',
      podcast: true,
      video: false,
      photo: false,
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-black to-zinc-950">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
            COMPAREZ
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              NOS STUDIOS
            </span>
          </h2>
          <p className="text-lg text-white/60 font-inter">
            Trouvez le studio qui correspond à vos besoins
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left p-4 text-white/60 font-inter text-sm font-medium">
                  Caractéristiques
                </th>
                {studios.map((studio, idx) => {
                  if (!studio) return null;
                  const Icon = studio.icon;
                  return (
                    <th key={idx} className="p-4">
                      <div className="flex flex-col items-center gap-3">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-white font-montserrat font-bold text-lg">
                          {studio.name}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="border-t border-white/10"
                >
                  <td className="p-4 text-white font-inter text-sm">
                    {row.feature}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.podcast === 'boolean' ? (
                      row.podcast ? (
                        <Check className="w-5 h-5 text-purple-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-white/20 mx-auto" />
                      )
                    ) : (
                      <span className="text-white/80 font-inter text-sm">
                        {row.podcast}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.video === 'boolean' ? (
                      row.video ? (
                        <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-white/20 mx-auto" />
                      )
                    ) : (
                      <span className="text-white/80 font-inter text-sm">
                        {row.video}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.photo === 'boolean' ? (
                      row.photo ? (
                        <Check className="w-5 h-5 text-blue-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-white/20 mx-auto" />
                      )
                    ) : (
                      <span className="text-white/80 font-inter text-sm">
                        {row.photo}
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            {studios.map((studio, idx) => {
              if (!studio) return null;
              return (
                <motion.a
                  key={idx}
                  href="#booking"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 bg-gradient-to-r ${studio.gradient} text-white rounded-xl font-montserrat font-bold shadow-xl`}
                >
                  Réserver {studio.name}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
