import { motion } from 'framer-motion';
import { Video, Mic, Camera, Check, TrendingDown, Loader2, Calendar } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';

interface StudioProductsSectionProps {
  onSelectStudio?: (studioType: 'podcast' | 'video' | 'photo') => void;
}

export default function StudioProductsSection({ onSelectStudio }: StudioProductsSectionProps) {
  const { products, loading } = useShopifyCollection('studios-location');

  const getStudioIcon = (title: string) => {
    if (title.toLowerCase().includes('podcast')) return Mic;
    if (title.toLowerCase().includes('vidéo') || title.toLowerCase().includes('video')) return Video;
    if (title.toLowerCase().includes('photo')) return Camera;
    return Video;
  };

  const getStudioType = (title: string): 'podcast' | 'video' | 'photo' => {
    if (title.toLowerCase().includes('podcast')) return 'podcast';
    if (title.toLowerCase().includes('vidéo') || title.toLowerCase().includes('video')) return 'video';
    return 'photo';
  };

  const getGradient = (type: 'podcast' | 'video' | 'photo'): string => {
    switch (type) {
      case 'podcast':
        return 'from-purple-600 via-violet-600 to-purple-600';
      case 'video':
        return 'from-emerald-600 via-teal-600 to-cyan-600';
      case 'photo':
        return 'from-blue-600 via-cyan-600 to-blue-600';
    }
  };

  const extractEquipment = (description: string): string[] => {
    const lines = description.split('\n').filter(line => line.trim());
    const equipment: string[] = [];

    lines.forEach(line => {
      if (line.includes('•')) {
        const item = line.replace(/•/g, '').trim();
        if (item && !item.toLowerCase().includes('prix') && !item.toLowerCase().includes('heures')) {
          equipment.push(item);
        }
      }
    });

    return equipment.slice(0, 5);
  };

  const getBasePrice = (product: any): number => {
    const variants = product.variants.edges;
    if (variants.length === 0) return 0;

    const firstVariant = variants[0].node;
    const price = parseFloat(firstVariant.price.amount);
    const title = firstVariant.title.toLowerCase();

    if (title.includes('2') || title.includes('deux')) {
      return price / 2;
    }

    return price;
  };

  const getMaxDiscount = (product: any): number => {
    const variants = product.variants.edges;
    if (variants.length < 2) return 0;

    const prices = variants.map((v: any) => {
      const price = parseFloat(v.node.price.amount);
      const title = v.node.title.toLowerCase();
      let hours = 2;

      if (title.includes('4')) hours = 4;
      else if (title.includes('8')) hours = 8;

      return price / hours;
    });

    const basePrice = Math.max(...prices);
    const bestPrice = Math.min(...prices);
    const discount = ((basePrice - bestPrice) / basePrice) * 100;

    return Math.round(discount);
  };

  if (loading) {
    return (
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex items-center justify-center">
          <div className="flex items-center gap-3 text-white">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
            <span className="text-lg font-inter">Chargement des studios...</span>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/60 font-inter">Aucun studio disponible pour le moment</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6">
            NOS
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              STUDIOS
            </span>
          </h2>
          <p className="text-lg md:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Équipements professionnels, tarifs dégressifs, réservation en ligne simplifiée
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => {
            const Icon = getStudioIcon(product.title);
            const studioType = getStudioType(product.title);
            const gradient = getGradient(studioType);
            const equipment = extractEquipment(product.description);
            const basePrice = getBasePrice(product);
            const maxDiscount = getMaxDiscount(product);
            const image = product.images.edges[0]?.node.url;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                {maxDiscount > 0 && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className={`bg-gradient-to-r ${gradient} text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl`}>
                      <TrendingDown className="w-3.5 h-3.5" />
                      Jusqu'à -{maxDiscount}%
                    </div>
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative h-full"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />

                  <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500 h-full flex flex-col">
                    {image && (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                      </div>
                    )}

                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-montserrat font-bold text-white">
                          {product.title.replace('Le 40', '').trim()}
                        </h3>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className={`text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
                            {basePrice.toFixed(0)}€
                          </span>
                          <span className="text-white/60 font-inter text-sm">/heure</span>
                        </div>
                        {maxDiscount > 0 && (
                          <p className="text-emerald-400 text-sm font-semibold">
                            Prix dégressif jusqu'à -{maxDiscount}%
                          </p>
                        )}
                      </div>

                      <div className="space-y-3 mb-6 flex-1">
                        {equipment.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${gradient.includes('purple') ? 'text-purple-400' : gradient.includes('emerald') ? 'text-emerald-400' : 'text-blue-400'}`} />
                            <span className="text-white/80 font-inter text-sm">{item}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => onSelectStudio?.(studioType)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 bg-gradient-to-r ${gradient} text-white rounded-xl font-montserrat font-bold text-base shadow-xl flex items-center justify-center gap-2 group/btn`}
                      >
                        <Calendar className="w-5 h-5" />
                        <span>Réserver</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
