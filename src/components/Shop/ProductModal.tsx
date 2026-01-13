import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Check, AlertCircle, Loader2 } from 'lucide-react';
import { ShopifyProduct } from '../../lib/shopify';
import { requiresCalendarSync, getResourceName, getResourceType, getDurationHours } from '../../hooks/useShopifyProducts';
import { useShopifyCheckout } from '../../hooks/useShopifyCheckout';
import { createTemporaryHold } from '../../hooks/useCalendarAvailability';
import CalendarPicker from './CalendarPicker';
import { sanitizeHtml } from '../../lib/sanitize';

interface ProductModalProps {
  product: ShopifyProduct;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem, checkoutId } = useShopifyCheckout();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants.edges[0]?.node.id || '');
  const [quantity, setQuantity] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; startTime: string; endTime: string } | null>(null);
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const needsCalendar = requiresCalendarSync(product);
  const resourceName = getResourceName(product);
  const resourceType = getResourceType(product);
  const durationHours = getDurationHours(product);

  const selectedVariant = product.variants.edges.find(v => v.node.id === selectedVariantId)?.node;
  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const priceHT = price;
  const priceTTC = priceHT * 1.2;

  const handleSelectSlot = (date: string, startTime: string, endTime: string) => {
    setSelectedSlot({ date, startTime, endTime });
    setShowCalendar(false);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    if (needsCalendar && !selectedSlot) {
      setShowCalendar(true);
      return;
    }

    setAdding(true);
    setStatus(null);

    try {
      const customAttributes: Array<{ key: string; value: string }> = [];

      if (needsCalendar && selectedSlot && resourceName && resourceType) {
        const currentCheckoutId = checkoutId || `temp-${Date.now()}`;

        const holdResult = await createTemporaryHold(
          product.id,
          selectedVariant.id,
          resourceName,
          resourceType,
          selectedSlot.date,
          selectedSlot.startTime,
          selectedSlot.endTime,
          currentCheckoutId
        );

        if (!holdResult.success) {
          throw new Error(holdResult.error || 'Impossible de réserver ce créneau');
        }

        customAttributes.push(
          { key: 'booking_date', value: selectedSlot.date },
          { key: 'start_time', value: selectedSlot.startTime },
          { key: 'end_time', value: selectedSlot.endTime },
          { key: 'resource_name', value: resourceName },
          { key: 'hold_id', value: holdResult.holdId || '' }
        );
      }

      await addItem(selectedVariant.id, quantity, customAttributes.length > 0 ? customAttributes : undefined);

      setStatus({ type: 'success', message: 'Ajouté au panier!' });
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Erreur lors de l\'ajout au panier'
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-montserrat font-bold text-white">
            {product.title}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {product.images.edges.length > 0 && (
                <div className="rounded-xl overflow-hidden bg-black/20">
                  <img
                    src={product.images.edges[0].node.url}
                    alt={product.images.edges[0].node.altText || product.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {product.images.edges.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.images.edges.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden bg-black/20 aspect-square">
                      <img
                        src={img.node.url}
                        alt={img.node.altText || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  {priceTTC.toFixed(2)}€ <span className="text-base text-white/40 font-normal">TTC</span>
                </div>
                <div className="text-sm text-white/60">
                  {priceHT.toFixed(2)}€ HT
                </div>
              </div>

              <div
                className="text-white/80 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.descriptionHtml) }}
              />

              {product.variants.edges.length > 1 && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Variante
                  </label>
                  <select
                    value={selectedVariantId}
                    onChange={(e) => setSelectedVariantId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    {product.variants.edges.map(({ node }) => (
                      <option key={node.id} value={node.id}>
                        {node.title} - {(parseFloat(node.price.amount) * 1.2).toFixed(2)}€
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {!needsCalendar && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Quantité
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              )}

              {needsCalendar && !showCalendar && selectedSlot && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">Créneau sélectionné</span>
                  </div>
                  <div className="text-sm text-white/80">
                    {new Date(selectedSlot.date).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="text-sm text-white/60">
                    De {selectedSlot.startTime} à {selectedSlot.endTime}
                  </div>
                  <button
                    onClick={() => setShowCalendar(true)}
                    className="text-xs text-violet-400 hover:text-violet-300 mt-2 underline"
                  >
                    Modifier
                  </button>
                </div>
              )}

              {needsCalendar && showCalendar && resourceName && resourceType && (
                <CalendarPicker
                  resourceName={resourceName}
                  resourceType={resourceType}
                  durationHours={durationHours}
                  onSelect={handleSelectSlot}
                  onCancel={() => setShowCalendar(false)}
                />
              )}

              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`
                      flex items-center gap-2 p-4 rounded-xl
                      ${status.type === 'success'
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                      }
                    `}
                  >
                    {status.type === 'success' ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium">{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showCalendar && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={adding || !selectedVariant || (needsCalendar && !selectedSlot)}
                  className={`
                    w-full px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
                    ${adding || !selectedVariant || (needsCalendar && !selectedSlot)
                      ? 'bg-white/10 text-white/40 cursor-not-allowed'
                      : 'bg-gradient-to-r from-rose-500 to-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/25'
                    }
                  `}
                >
                  {adding ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Ajout en cours...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      {needsCalendar && !selectedSlot ? 'Sélectionner un créneau' : 'Ajouter au panier'}
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
