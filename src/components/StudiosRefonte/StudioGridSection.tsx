import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  X,
  Clock,
  Users,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Video,
  Mic,
  Camera,
  Monitor,
  Radio,
  Film,
  Tv,
  Shield,
  Calendar,
  Headphones,
  Lightbulb,
  Square
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import { useShopifyCheckout } from '../../hooks/useShopifyCheckout';
import type { ShopifyProduct, ShopifyEdge, ShopifyVariant } from '../../types';

// ============================================
// IMAGES DE STOCK PAR TYPE DE STUDIO
// ============================================
const stockImageSets: Record<string, string[]> = {
  'face-cam': [
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80',
    'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=800&q=80',
    'https://images.unsplash.com/photo-1593697821028-7cc59cfd7399?w=800&q=80',
  ],
  'podcast': [
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
    'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&q=80',
    'https://images.unsplash.com/photo-1598550473359-433795503a0f?w=800&q=80',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
  ],
  'interview': [
    'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  ],
  'stream': [
    'https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?w=800&q=80',
    'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  ],
  'video': [
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    'https://images.unsplash.com/photo-1540655037529-dec987208707?w=800&q=80',
  ],
  'photo': [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80',
    'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
  ],
  'plateau': [
    'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=800&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  ],
  'vertical': [
    'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
    'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800&q=80',
  ],
  'default': [
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
  ]
};

// ============================================
// ÉQUIPEMENTS PAR TYPE DE STUDIO
// ============================================
const equipmentByType: Record<string, Array<{ icon: LucideIcon; label: string }>> = {
  'face-cam': [
    { icon: Video, label: 'Caméra Sony FX3 4K' },
    { icon: Lightbulb, label: 'Éclairage LED pro' },
    { icon: Mic, label: 'Micro cravate HF' },
    { icon: Monitor, label: 'Téléprompter inclus' },
  ],
  'podcast': [
    { icon: Mic, label: '2-4 micros Shure SM7B' },
    { icon: Headphones, label: 'Casques monitoring' },
    { icon: Square, label: 'Traitement acoustique' },
    { icon: Monitor, label: 'Enregistrement multi-pistes' },
  ],
  'interview': [
    { icon: Video, label: '2 caméras 4K' },
    { icon: Lightbulb, label: 'Éclairage cinéma' },
    { icon: Mic, label: 'Micros HF Sennheiser' },
    { icon: Users, label: 'Setup 2-3 personnes' },
  ],
  'stream': [
    { icon: Radio, label: 'Régie ATEM Mini Pro' },
    { icon: Video, label: 'Multi-caméras' },
    { icon: Monitor, label: 'Retours écran' },
    { icon: Tv, label: 'Overlay & transitions' },
  ],
  'plateau': [
    { icon: Film, label: 'Décors modulables' },
    { icon: Video, label: '3+ caméras 4K' },
    { icon: Lightbulb, label: 'Éclairage broadcast' },
    { icon: Users, label: 'Capacité 10+ personnes' },
  ],
  'vertical': [
    { icon: Camera, label: 'Setup vertical optimisé' },
    { icon: Lightbulb, label: 'Ring light pro' },
    { icon: Monitor, label: 'Prompteur vertical' },
    { icon: Sparkles, label: 'Fonds tendance' },
  ],
  'default': [
    { icon: Video, label: 'Caméra 4K' },
    { icon: Lightbulb, label: 'Éclairage pro' },
    { icon: Mic, label: 'Audio professionnel' },
    { icon: Monitor, label: 'Moniteur de retour' },
  ],
};

// ============================================
// HELPERS
// ============================================
const getStudioType = (title: string): string => {
  const lower = title.toLowerCase();
  if (lower.includes('podcast')) return 'podcast';
  if (lower.includes('face') || lower.includes('cam') || lower.includes('youtube')) return 'face-cam';
  if (lower.includes('interview')) return 'interview';
  if (lower.includes('stream') || lower.includes('twitch') || lower.includes('live')) return 'stream';
  if (lower.includes('plateau') || lower.includes('talk') || lower.includes('émission')) return 'plateau';
  if (lower.includes('vertical') || lower.includes('tiktok') || lower.includes('reels') || lower.includes('short')) return 'vertical';
  if (lower.includes('photo')) return 'photo';
  if (lower.includes('video') || lower.includes('vidéo')) return 'video';
  return 'default';
};

const getStudioImages = (product: ShopifyProduct): string[] => {
  // D'abord, essayer les images Shopify
  const shopifyImages = product.images?.edges?.map((e) => e.node.url) || [];
  if (shopifyImages.length >= 2) return shopifyImages.slice(0, 4);

  // Sinon, utiliser les images stock
  const type = getStudioType(product.title);
  return stockImageSets[type] || stockImageSets.default;
};

const getStudioIcon = (title: string) => {
  const type = getStudioType(title);
  switch (type) {
    case 'podcast': return Mic;
    case 'face-cam': return Video;
    case 'interview': return Users;
    case 'stream': return Radio;
    case 'plateau': return Film;
    case 'vertical': return Camera;
    case 'photo': return Camera;
    default: return Monitor;
  }
};

const getStudioGradient = (title: string): string => {
  const type = getStudioType(title);
  switch (type) {
    case 'podcast': return 'from-purple-600 to-violet-600';
    case 'face-cam': return 'from-emerald-600 to-teal-600';
    case 'interview': return 'from-cyan-600 to-blue-600';
    case 'stream': return 'from-pink-600 to-rose-600';
    case 'plateau': return 'from-red-600 to-orange-600';
    case 'vertical': return 'from-fuchsia-600 to-pink-600';
    case 'photo': return 'from-amber-600 to-orange-600';
    default: return 'from-teal-600 to-cyan-600';
  }
};

const getEquipment = (title: string) => {
  const type = getStudioType(title);
  return equipmentByType[type] || equipmentByType.default;
};

const getBasePrice = (product: ShopifyProduct): number => {
  const variants = product.variants?.edges || [];
  if (variants.length === 0) return 0;

  let minPricePerHour = Infinity;

  variants.forEach((v: ShopifyEdge<ShopifyVariant>) => {
    const price = parseFloat(v.node.price?.amount || '0');
    const title = v.node.title?.toLowerCase() || '';

    let hours = 1;
    if (title.includes('8') || title.includes('journée')) hours = 8;
    else if (title.includes('4') || title.includes('demi')) hours = 4;
    else if (title.includes('3')) hours = 3;
    else if (title.includes('2')) hours = 2;

    const pricePerHour = price / hours;
    if (pricePerHour < minPricePerHour && pricePerHour > 0) {
      minPricePerHour = pricePerHour;
    }
  });

  return minPricePerHour === Infinity ? 0 : Math.round(minPricePerHour);
};

const hasLaunchOffer = (product: ShopifyProduct): boolean => {
  const tags = product.tags || [];
  return tags.some((tag: string) =>
    tag.toLowerCase().includes('lancement') ||
    tag.toLowerCase().includes('offre')
  );
};

const getCapacity = (product: ShopifyProduct): string => {
  const desc = product.description?.toLowerCase() || '';
  const title = product.title.toLowerCase();

  if (desc.includes('1-2') || title.includes('solo')) return '1-2 pers.';
  if (desc.includes('2-3') || title.includes('duo')) return '2-3 pers.';
  if (desc.includes('2-4')) return '2-4 pers.';
  if (desc.includes('4-6')) return '4-6 pers.';
  if (desc.includes('10') || title.includes('plateau')) return '10+ pers.';
  return '1-4 pers.';
};

// ============================================
// STUDIO CARD
// ============================================
interface StudioCardProps {
  product: ShopifyProduct;
  onSelect: () => void;
}

function StudioCard({ product, onSelect }: StudioCardProps) {
  const Icon = getStudioIcon(product.title);
  const gradient = getStudioGradient(product.title);
  const basePrice = getBasePrice(product);
  const isLaunch = hasLaunchOffer(product);
  const images = getStudioImages(product);
  const capacity = getCapacity(product);
  
  // Nettoyer le titre
  const cleanTitle = product.title
    .replace('Le 40', '')
    .replace('Studio', '')
    .replace(' - ', ' · ')
    .trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
      className="group relative bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-300 h-full flex flex-col"
    >
      {/* Badge offre de lancement */}
      {isLaunch && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3 h-3" />
          Offre de lancement
        </div>
      )}

      {/* Image - HAUTEUR FIXE */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent"></div>
        
        {/* Prix */}
        <div className="absolute bottom-4 right-4">
          <div className={`px-4 py-2 bg-gradient-to-r ${gradient} rounded-xl text-white font-bold shadow-xl`}>
            {basePrice}€<span className="text-sm font-normal opacity-80">/h</span>
          </div>
        </div>

        {/* Capacité */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg">
          <Users className="w-3.5 h-3.5 text-white/80" />
          <span className="text-xs text-white/80 font-medium">{capacity}</span>
        </div>
      </div>

      {/* Contenu - FLEX GROW pour égaliser les hauteurs */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base font-montserrat font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
            {cleanTitle}
          </h3>
        </div>

        {/* Variants - HAUTEUR FIXE */}
        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[32px]">
          {product.variants?.edges?.slice(0, 3).map((v: ShopifyEdge<ShopifyVariant>, idx: number) => (
            <span 
              key={idx}
              className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60"
            >
              {v.node.title}
            </span>
          ))}
        </div>

        {/* Spacer pour pousser le bouton en bas */}
        <div className="flex-grow"></div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 bg-gradient-to-r ${gradient} rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all`}
        >
          <span>Voir le studio</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================
// MODAL DÉTAILLÉ AVEC GALERIE
// ============================================
interface StudioModalProps {
  product: ShopifyProduct;
  onClose: () => void;
}

function StudioModal({ product, onClose }: StudioModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { initCheckout, loading: checkoutLoading } = useShopifyCheckout();
  
  const Icon = getStudioIcon(product.title);
  const gradient = getStudioGradient(product.title);
  const images = getStudioImages(product);
  const equipment = getEquipment(product.title);
  const variants = product.variants?.edges || [];
  const capacity = getCapacity(product);

  const cleanTitle = product.title
    .replace('Le 40', '')
    .replace('Studio', '')
    .trim();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCheckout = async () => {
    if (!selectedVariant) return;
    
    try {
      const checkout = await initCheckout([
        { variantId: selectedVariant, quantity: 1 }
      ]);
      if (checkout?.webUrl) {
        window.location.href = checkout.webUrl;
      }
    } catch {
      // Checkout failed, user stays on page
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl border border-white/20 shadow-2xl overflow-hidden my-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* GALERIE PHOTOS */}
          <div className="relative">
            {/* Image principale */}
            <div className="relative h-72 lg:h-full lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`${product.title} - Photo ${currentImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Navigation flèches */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex 
                          ? 'w-6 bg-white' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="hidden lg:flex gap-2 p-4 bg-black/50">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all ${
                      idx === currentImageIndex 
                        ? 'ring-2 ring-emerald-500' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DÉTAILS */}
          <div className="p-6 lg:p-8 flex flex-col">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-montserrat font-black text-white mb-1">
                  {cleanTitle}
                </h2>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {capacity}
                  </span>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                Équipement inclus
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {equipment.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                    <item.icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-white/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sélection durée */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Choisissez votre durée
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {variants.map((variant: ShopifyEdge<ShopifyVariant>) => {
                  const isSelected = selectedVariant === variant.node.id;
                  const price = parseFloat(variant.node.price?.amount || '0');
                  
                  return (
                    <motion.button
                      key={variant.node.id}
                      onClick={() => setSelectedVariant(variant.node.id)}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-500/10' 
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {!isSelected && (
                          <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
                        )}
                        <span className="font-medium text-white">{variant.node.title}</span>
                      </div>
                      <span className="text-xl font-black text-white">{price}€</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Réassurance */}
            <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                Annulation 24h
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Équipement inclus
              </span>
            </div>

            {/* CTA */}
            <motion.button
              onClick={handleCheckout}
              disabled={!selectedVariant || checkoutLoading}
              whileHover={{ scale: selectedVariant ? 1.02 : 1 }}
              whileTap={{ scale: selectedVariant ? 0.98 : 1 }}
              className={`w-full py-4 rounded-xl font-montserrat font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                selectedVariant
                  ? `bg-gradient-to-r ${gradient} text-white shadow-xl cursor-pointer`
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {checkoutLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Redirection...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  <span>{selectedVariant ? 'Réserver maintenant' : 'Sélectionnez une durée'}</span>
                  {selectedVariant && <ArrowRight className="w-5 h-5" />}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SECTION PRINCIPALE
// ============================================
export default function StudioGridSection() {
  const { products, loading, error } = useShopifyCollection('studios-creatifs');
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'face', label: 'YouTube' },
    { id: 'podcast', label: 'Podcast' },
    { id: 'stream', label: 'Streaming' },
    { id: 'interview', label: 'Interview' },
  ];

  const filteredProducts = products.filter((product: ShopifyProduct) => {
    if (filter === 'all') return true;
    return product.title.toLowerCase().includes(filter);
  });

  if (loading) {
    return (
      <section className="relative py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-400" />
            <span className="text-white/60 font-inter">Chargement des studios...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-400 mb-2">Erreur lors du chargement</p>
          <p className="text-white/40 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative py-20 md:py-32 bg-black">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-white mb-3">
              NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">STUDIOS</span>
            </h2>
            <p className="text-white/60 font-inter">
              {products.length} configurations professionnelles · Équipement 4K inclus
            </p>
          </motion.div>

          {/* Filtres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2.5 rounded-full font-inter font-medium text-sm transition-all ${
                  filter === f.id
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Grille */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: ShopifyProduct) => (
              <StudioCard
                key={product.id}
                product={product}
                onSelect={() => setSelectedProduct(product)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60">Aucun studio trouvé pour ce filtre</p>
            </div>
          )}

          {/* Réassurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
          >
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Équipement pro inclus
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Annulation gratuite 24h
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Confirmation immédiate
            </span>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <StudioModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}