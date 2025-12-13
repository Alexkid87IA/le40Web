import { motion } from 'framer-motion';
import { Camera, Mic, Lightbulb, Monitor, Sparkles } from 'lucide-react';
import { cards } from '../../utils/designSystem';
import { equipmentShowcase } from '../../data/studios/setups';

export default function EquipmentShowcase() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return Camera;
      case 'Mic':
        return Mic;
      case 'Lightbulb':
        return Lightbulb;
      case 'Monitor':
        return Monitor;
      default:
        return Camera;
    }
  };

  return (
    <section className="py-32 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-6"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-montserrat text-white">
            120 000€ de Matériel Professionnel
          </h2>
          <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto">
            Le même équipement que les studios parisiens à 400€/h
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {equipmentShowcase.map((category, index) => {
            const Icon = getIcon(category.icon);

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${cards.premium.full} space-y-6`}
              >
                <div>
                  <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-montserrat mb-2">
                    {category.category}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-white/60">{category.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="pb-4 border-b border-white/10 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                        <span className="text-orange-400 font-bold text-sm whitespace-nowrap">
                          {item.value}€
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-white/60 italic">
                          "{item.description}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`${cards.minimal.full} text-center max-w-2xl mx-auto`}
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white font-montserrat">
              Matériel acheté neuf en 2024
            </h3>
          </div>
          <p className="text-white/70">
            Garantie et maintenance assurées
          </p>
        </motion.div>
      </div>
    </section>
  );
}
