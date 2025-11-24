import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Users, Wifi, Coffee, Monitor, Phone, Building2, Sparkles } from 'lucide-react';

export default function GalleryVisualSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    {
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Espace Coworking',
      description: 'Espaces de travail modernes et lumineux',
      amenities: ['Wifi haut débit', 'Café gratuit', 'Imprimante'],
      category: 'Coworking'
    },
    {
      image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Salle de réunion Premium',
      description: 'Équipée pour vos meetings professionnels',
      amenities: ['Écran 55"', 'Visio', '8 personnes'],
      category: 'Réunion'
    },
    {
      image: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Accueil & Réception',
      description: 'Un accueil professionnel pour vos clients',
      amenities: ['Hôtesse', 'Café', 'Espace attente'],
      category: 'Accueil'
    },
    {
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Bureau privé',
      description: 'Espaces privatifs équipés et sécurisés',
      amenities: ['Clé privée', 'Wifi', 'Mobilier'],
      category: 'Bureau'
    },
    {
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Espace détente',
      description: 'Zone de relaxation et networking',
      amenities: ['Café', 'Cuisine', 'Lounge'],
      category: 'Détente'
    },
    {
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Cabine téléphonique',
      description: 'Isolée pour vos appels confidentiels',
      amenities: ['Insonorisée', 'Bureau', 'Éclairage'],
      category: 'Appel'
    }
  ];

  const amenityIcons: Record<string, any> = {
    'Wifi haut débit': Wifi,
    'Café gratuit': Coffee,
    'Imprimante': Monitor,
    'Écran 55"': Monitor,
    'Visio': Monitor,
    '8 personnes': Users,
    'Hôtesse': Users,
    'Café': Coffee,
    'Espace attente': Building2,
    'Clé privée': Building2,
    'Wifi': Wifi,
    'Mobilier': Building2,
    'Cuisine': Coffee,
    'Lounge': Building2,
    'Insonorisée': Phone,
    'Bureau': Building2,
    'Éclairage': Sparkles
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-400/20 mb-6">
            <Building2 className="w-4 h-4 text-orange-400" />
            <span className="text-white/90 font-inter text-sm font-semibold">Nos espaces</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4 md:mb-6 leading-tight px-4">
            Découvrez <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">vos espaces</span>
          </h2>
          <p className="text-white/70 font-inter text-sm md:text-base lg:text-lg max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Des locaux modernes au cœur de Marseille, accessibles selon votre formule
          </p>

          <div className="inline-flex items-center gap-2 md:gap-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-3">
            <MapPin className="w-5 h-5 text-orange-400" />
            <span className="text-white font-inter font-semibold text-xs md:text-sm">40 Avenue de Saint Antoine, 13015 Marseille</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedImage(index)}
              className="group relative cursor-pointer"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-50 blur-lg transition-all duration-500"></div>

              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:border-orange-500/50 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                  <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-xl text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {item.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-montserrat font-black text-xl mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/70 font-inter text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {item.amenities.map((amenity, idx) => {
                      const Icon = amenityIcons[amenity] || Building2;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all duration-300"
                        >
                          <Icon className="w-3.5 h-3.5 text-orange-400" />
                          <span className="text-white/80 text-xs font-inter">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 md:mt-16 lg:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 md:gap-8 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-orange-500/30 rounded-xl md:rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-1 md:mb-2 leading-tight">
                  4000m²
                </div>
                <p className="text-white/60 font-inter text-xs md:text-sm leading-tight">d'espaces</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-1 md:mb-2 leading-tight">
                  12
                </div>
                <p className="text-white/60 font-inter text-xs md:text-sm leading-tight">salles équipées</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1 md:mb-2 leading-tight">
                  24/7
                </div>
                <p className="text-white/60 font-inter text-xs md:text-sm leading-tight">accès flexible</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all duration-300 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[selectedImage].image}
                alt={galleryItems[selectedImage].title}
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <h3 className="text-3xl font-montserrat font-black text-white mb-2">
                  {galleryItems[selectedImage].title}
                </h3>
                <p className="text-white/70 font-inter text-lg">
                  {galleryItems[selectedImage].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
