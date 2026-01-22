import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Lock, ArrowLeft, AlertCircle, ShoppingCart, Loader2,
  Calendar, Clock, MapPin, Building2, Shield, BadgeCheck,
  Users, Video, Monitor, ArrowRight, Trash2, Bell, Phone, Calendar as CalendarIcon
} from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import type { UnifiedCartItem } from '../contexts/UnifiedCartContext';
import { createCart } from '../lib/shopify';

// Import centralized Shopify variant mappings
import {
  ALL_VARIANTS,
  DOMICILIATION_VARIANTS,
  findVariantId,
  findDomiciliationVariant,
} from '../data/shopify/variantMappings';

// =============================================================================
// CONFIGURATION UI
// =============================================================================

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'domiciliation': <Building2 className="w-6 h-6" />,
  'meeting-room': <Users className="w-6 h-6" />,
  'studio': <Video className="w-6 h-6" />,
  'coworking': <Monitor className="w-6 h-6" />,
  'private-office': <Building2 className="w-6 h-6" />,
  'event': <CalendarIcon className="w-6 h-6" />,
  'shopify': <ShoppingCart className="w-6 h-6" />,
};

const SERVICE_COLORS: Record<string, string> = {
  'domiciliation': 'from-orange-500 to-amber-500',
  'meeting-room': 'from-blue-500 to-cyan-500',
  'studio': 'from-purple-500 to-fuchsia-500',
  'coworking': 'from-emerald-500 to-teal-500',
  'private-office': 'from-indigo-500 to-violet-500',
  'event': 'from-rose-500 to-pink-500',
  'shopify': 'from-green-500 to-emerald-500',
};

const SERVICE_LABELS: Record<string, string> = {
  'domiciliation': 'Domiciliation',
  'meeting-room': 'Salle de réunion',
  'studio': 'Studio créatif',
  'coworking': 'Espace coworking',
  'private-office': 'Bureau privatif',
  'event': 'Événement',
  'shopify': 'Produit',
};

// =============================================================================
// COMPOSANT PRINCIPAL
// =============================================================================

// MODE BIENTÔT DISPONIBLE
const IS_COMING_SOON = true;

export default function CheckoutWithStripe() {
  const navigate = useNavigate();
  const { items, calculateStudioTotal, clearCart, removeItem, getCheckoutUrl } = useUnifiedCart();

  // CORRECTION: Afficher TOUS les items (local + shopify), pas seulement local
  const allItems = items;

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (allItems.length === 0) {
      navigate('/');
    }
  }, [allItems.length, navigate]);

  // Fonction pour trouver le variant ID Shopify d'un item local
  const findShopifyVariantId = (item: UnifiedCartItem): string | null => {
    // Si c'est déjà un item Shopify, retourner son variant ID
    if (item.type === 'shopify') {
      return item.shopifyVariantId;
    }

    const serviceName = item.serviceName;

    // 1. Cas domiciliation - utiliser la fonction utilitaire
    if (item.serviceType === 'domiciliation') {
      const billingPeriod = item.duration === 'year' ? 'annual' : 'monthly';
      const variantId = findDomiciliationVariant(serviceName, billingPeriod);
      if (variantId) return variantId;
    }

    // 2. Cas général - extraire produit et durée du nom du service
    const parts = serviceName.split(' - ');

    if (parts.length >= 2) {
      const duration = parts[parts.length - 1];
      const productName = parts.slice(0, -1).join(' - ');

      // Essayer la recherche avec la fonction utilitaire
      const variantId = findVariantId(productName, duration);
      if (variantId) return variantId;
    }

    // 3. Recherche par nom partiel comme fallback
    for (const [product, variants] of Object.entries(ALL_VARIANTS)) {
      if (serviceName.includes(product.split(' - ')[0]) ||
          product.includes(serviceName.split(' - ')[0])) {
        const firstVariant = Object.values(variants)[0];
        if (firstVariant) return firstVariant;
      }
    }

    return null;
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    setOrderError(null);

    try {
      // Séparer items locaux et Shopify
      const localItems = allItems.filter(item => item.type === 'local');
      const shopifyItems = allItems.filter(item => item.type === 'shopify');

      // Si on a des items Shopify, utiliser le checkout Shopify existant
      if (shopifyItems.length > 0 && localItems.length === 0) {
        const checkoutUrl = getCheckoutUrl();
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }
      }

      // Créer les lignes pour le cart Shopify
      const cartLines: Array<{
        merchandiseId: string;
        quantity: number;
        attributes: Array<{ key: string; value: string }>;
      }> = [];

      for (const item of allItems) {
        let variantId: string | null = null;
        let attributes: Array<{ key: string; value: string }> = [];

        if (item.type === 'shopify') {
          variantId = item.shopifyVariantId;
          attributes = [
            { key: 'Produit', value: item.productTitle },
          ];
        } else {
          variantId = findShopifyVariantId(item);
          attributes = [
            { key: 'Service', value: item.serviceName },
          ];

          if (item.date) {
            attributes.push({ 
              key: 'Date', 
              value: new Date(item.date).toLocaleDateString('fr-FR') 
            });
          }

          if (item.startTime) {
            attributes.push({ key: 'Heure de début', value: item.startTime });
          }

          if (item.endTime) {
            attributes.push({ key: 'Heure de fin', value: item.endTime });
          }
        }

        if (!variantId) {
          throw new Error(`Produit non trouvé. Veuillez réessayer ou nous contacter.`);
        }

        cartLines.push({
          merchandiseId: variantId,
          quantity: item.quantity,
          attributes,
        });
      }

      if (cartLines.length === 0) {
        throw new Error('Aucun produit valide dans le panier');
      }

      const cart = await createCart(cartLines);

      if (cart?.checkoutUrl) {
        clearCart();
        window.location.href = cart.checkoutUrl;
      } else {
        throw new Error('Impossible de créer le panier. Veuillez réessayer.');
      }
    } catch (error: unknown) {
      setOrderError(error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  // Calculer le total
  const totalHT = allItems.reduce((sum, item) => {
    if (item.type === 'local' && item.serviceType === 'studio' && item.studioConfig) {
      return sum + calculateStudioTotal(item);
    }
    return sum + (item.price * item.quantity);
  }, 0);
  
  const totalTVA = totalHT * 0.20;
  const totalTTC = totalHT * 1.20;

  if (allItems.length === 0) {
    return null;
  }

  // Déterminer le type principal de service pour le style
  const firstItem = allItems[0];
  const mainServiceType = firstItem.type === 'local' ? firstItem.serviceType : 'shopify';
  const mainColor = SERVICE_COLORS[mainServiceType] || SERVICE_COLORS['meeting-room'];

  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
              Récapitulatif de votre{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${mainColor}`}>
                réservation
              </span>
            </h1>
            <p className="text-xl text-white/60">
              {allItems.length} article{allItems.length > 1 ? 's' : ''} dans votre panier
            </p>
          </motion.div>

          {/* Liste des items - TOUS LES ITEMS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            {allItems.map((item, index) => {
              // Déterminer le type de service
              let serviceType = 'shopify';
              let serviceName = '';
              let itemImage = '';
              let itemDate = '';
              let itemStartTime = '';
              let itemEndTime = '';

              if (item.type === 'local') {
                serviceType = item.serviceType || 'meeting-room';
                serviceName = item.serviceName;
                itemImage = item.image || '';
                itemDate = item.date || '';
                itemStartTime = item.startTime || '';
                itemEndTime = item.endTime || '';
              } else {
                serviceName = `${item.productTitle} - ${item.variantTitle}`;
                itemImage = item.image || '';
              }

              const color = SERVICE_COLORS[serviceType] || SERVICE_COLORS['meeting-room'];
              const icon = SERVICE_ICONS[serviceType] || SERVICE_ICONS['meeting-room'];
              const label = SERVICE_LABELS[serviceType] || 'Produit';
              
              const itemTotal = item.type === 'local' && item.serviceType === 'studio' && item.studioConfig
                ? calculateStudioTotal(item)
                : item.price * item.quantity;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {itemImage ? (
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={itemImage} 
                            alt={serviceName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center flex-shrink-0`}>
                          {icon}
                        </div>
                      )}

                      <div className="flex-1">
                        <p className="text-white/60 text-sm">{label}</p>
                        <h3 className="text-xl font-bold text-white mb-2">{serviceName}</h3>

                        <div className="flex flex-wrap gap-3 text-sm text-white/60">
                          {itemDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(itemDate).toLocaleDateString('fr-FR', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                          {itemStartTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {itemStartTime}{itemEndTime ? ` - ${itemEndTime}` : ''}
                            </span>
                          )}
                          {item.quantity > 1 && (
                            <span>Quantité: {item.quantity}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
                        {itemTotal.toFixed(0)}€
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-white/40 hover:text-red-400 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Section prix total */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-fuchsia-400" />
                  Détail du prix
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between gap-8 text-white/60">
                    <span>Sous-total HT</span>
                    <span>{totalHT.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between gap-8 text-white/60">
                    <span>TVA (20%)</span>
                    <span>{totalTVA.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between gap-8 text-xl font-bold text-white pt-2 border-t border-white/20">
                    <span>Total TTC</span>
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${mainColor}`}>
                      {totalTTC.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="text-center md:text-right">
                  <p className="text-white/40 text-sm mb-2">À payer maintenant</p>
                  <p className="text-3xl font-black text-white">{totalTTC.toFixed(2)}€</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Garanties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white">Paiement sécurisé</h4>
              </div>
              <p className="text-white/60 text-sm">Vos données bancaires sont protégées</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <BadgeCheck className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="font-bold text-white">Confirmation immédiate</h4>
              </div>
              <p className="text-white/60 text-sm">Recevez votre confirmation par email</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="font-bold text-white">Annulation gratuite</h4>
              </div>
              <p className="text-white/60 text-sm">Jusqu'à 24h avant votre réservation</p>
            </div>
          </motion.div>

          {/* Adresse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 rounded-xl p-5 border border-white/10 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Adresse</p>
                <p className="text-white font-semibold">Le 40 - 40 Avenue de Saint Antoine, 13015 Marseille</p>
              </div>
            </div>
          </motion.div>

          {/* Erreur */}
          {orderError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3 mb-8"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{orderError}</p>
            </motion.div>
          )}

          {/* Bouton CTA ou Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            {IS_COMING_SOON ? (
              /* MODE BIENTÔT DISPONIBLE */
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-6">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 text-sm font-bold uppercase tracking-wider">Paiement en ligne bientôt disponible</span>
                </div>

                <h3 className="text-2xl font-montserrat font-bold text-white mb-4">
                  Finalisez votre réservation par téléphone
                </h3>

                <p className="text-white/70 mb-6 font-inter">
                  Notre système de paiement en ligne arrive bientôt. En attendant, notre équipe est disponible pour finaliser votre réservation.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <motion.a
                    href="tel:+33491962151"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-montserrat font-bold shadow-lg shadow-amber-500/30"
                  >
                    <Phone className="w-5 h-5" />
                    <span>04 91 96 21 51</span>
                  </motion.a>

                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white rounded-xl font-montserrat font-bold transition-all"
                  >
                    Nous contacter
                  </motion.a>
                </div>

                <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                  <Bell className="w-4 h-4" />
                  <span>Le paiement en ligne sera disponible très prochainement</span>
                </div>
              </div>
            ) : (
              /* MODE PAIEMENT ACTIF */
              <>
                <motion.button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  whileHover={!isProcessing ? { scale: 1.02 } : {}}
                  whileTap={!isProcessing ? { scale: 0.98 } : {}}
                  className={`w-full md:w-auto px-12 py-5 bg-gradient-to-r ${mainColor}
                           rounded-2xl font-montserrat font-bold text-white text-lg
                           flex items-center justify-center gap-3 shadow-lg
                           disabled:opacity-50 disabled:cursor-not-allowed transition-all mx-auto`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Redirection vers le paiement...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Procéder au paiement sécurisé
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <div className="flex items-center justify-center gap-2 text-white/40 text-sm mt-4">
                  <Lock className="w-4 h-4" />
                  <span>Paiement 100% sécurisé via Stripe</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}