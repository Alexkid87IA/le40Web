import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Check, AlertCircle, Loader2, ArrowRight, Mic, Video, Camera } from 'lucide-react';
import { useStudioAvailability } from '../../hooks/useStudioAvailability';
import { useShopifyCheckout } from '../../hooks/useShopifyCheckout';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';

interface StudioBookingSectionProps {
  selectedStudio?: 'podcast' | 'video' | 'photo';
}

export default function StudioBookingSection({ selectedStudio }: StudioBookingSectionProps) {
  const [studioType, setStudioType] = useState<'podcast' | 'video' | 'photo'>(selectedStudio || 'podcast');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [duration, setDuration] = useState<2 | 4 | 8>(2);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const { availableSlots, loading: slotsLoading, createBooking } = useStudioAvailability(studioType, selectedDate);
  const { products } = useShopifyCollection('studios-location');
  const { createCheckout, loading: checkoutLoading } = useShopifyCheckout();

  const getStudioProduct = () => {
    return products.find(p => p.title.toLowerCase().includes(studioType));
  };

  const getVariantForDuration = (product: any) => {
    return product.variants.edges.find((v: any) => {
      const title = v.node.title.toLowerCase();
      if (duration === 2) return title.includes('2');
      if (duration === 4) return title.includes('4');
      if (duration === 8) return title.includes('8');
      return false;
    });
  };

  const getStudioIcon = () => {
    switch (studioType) {
      case 'podcast': return Mic;
      case 'video': return Video;
      case 'photo': return Camera;
    }
  };

  const getGradient = () => {
    switch (studioType) {
      case 'podcast': return 'from-purple-600 to-violet-600';
      case 'video': return 'from-emerald-600 to-cyan-600';
      case 'photo': return 'from-blue-600 to-cyan-600';
    }
  };

  const generateNextDays = (count: number): Date[] => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const handleBooking = async () => {
    if (!selectedSlot || !customerName || !customerEmail) return;

    const product = getStudioProduct();
    if (!product) return;

    const variant = getVariantForDuration(product);
    if (!variant) return;

    const [startTime] = selectedSlot.split('-');
    const endHour = parseInt(startTime.split(':')[0]) + duration;
    const endTime = `${endHour.toString().padStart(2, '0')}:00`;

    const price = parseFloat(variant.node.price.amount);

    const bookingResult = await createBooking({
      studioType,
      date: selectedDate,
      startTime,
      endTime,
      duration,
      customerEmail,
      customerName,
      customerPhone: customerPhone || undefined,
      totalPrice: price,
      shopifyVariantId: variant.node.id,
    });

    if (bookingResult.success) {
      const checkoutUrl = await createCheckout([{
        variantId: variant.node.id,
        quantity: 1,
      }]);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    }
  };

  const Icon = getStudioIcon();
  const gradient = getGradient();
  const availableDays = generateNextDays(14);
  const product = getStudioProduct();
  const variant = product ? getVariantForDuration(product) : null;
  const price = variant ? parseFloat(variant.node.price.amount) : 0;

  const canBook = selectedSlot && customerName && customerEmail && !checkoutLoading;

  return (
    <section id="booking" className="relative py-16 md:py-24 bg-gradient-to-b from-black to-zinc-950">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
            RÉSERVEZ
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              VOTRE STUDIO
            </span>
          </h2>
          <p className="text-lg text-white/60 font-inter">
            Choisissez votre créneau et réservez en ligne
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-montserrat font-bold text-white mb-4 flex items-center gap-2">
                <Icon className="w-6 h-6" />
                Choisissez un studio
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {['podcast', 'video', 'photo'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setStudioType(type as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      studioType === type
                        ? `border-${type === 'podcast' ? 'purple' : type === 'video' ? 'emerald' : 'blue'}-500 bg-${type === 'podcast' ? 'purple' : type === 'video' ? 'emerald' : 'blue'}-500/10`
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-center">
                      {type === 'podcast' && <Mic className="w-8 h-8 mx-auto mb-2 text-purple-400" />}
                      {type === 'video' && <Video className="w-8 h-8 mx-auto mb-2 text-emerald-400" />}
                      {type === 'photo' && <Camera className="w-8 h-8 mx-auto mb-2 text-blue-400" />}
                      <div className="text-white text-sm font-semibold capitalize">{type}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-montserrat font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Sélectionnez une date
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {availableDays.map((day, idx) => {
                  const isSelected = day.toDateString() === selectedDate.toDateString();
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(day)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        isSelected
                          ? `bg-gradient-to-br ${gradient} text-white`
                          : 'bg-white/5 hover:bg-white/10 text-white/60'
                      }`}
                    >
                      <div className="text-xs font-bold">{formatDate(day).split(' ')[0]}</div>
                      <div className="text-lg font-bold">{day.getDate()}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-montserrat font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Durée de location
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[2, 4, 8].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setDuration(hours as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      duration === hours
                        ? `border-emerald-500 bg-emerald-500/10`
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{hours}h</div>
                      <div className="text-xs text-white/60">{hours === 2 ? 'Standard' : hours === 4 ? 'Demi-journée' : 'Journée'}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-montserrat font-bold text-white mb-4">
                Créneaux disponibles
              </h3>
              {slotsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-8 text-white/60">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2" />
                  <p>Aucun créneau disponible ce jour</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.start}
                      onClick={() => slot.available && setSelectedSlot(`${slot.start}-${slot.end}`)}
                      disabled={!slot.available}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedSlot === `${slot.start}-${slot.end}`
                          ? `border-emerald-500 bg-emerald-500/10`
                          : slot.available
                          ? 'border-white/10 hover:border-white/30'
                          : 'border-white/5 bg-white/5 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-white font-semibold">{slot.start}</div>
                      <div className="text-xs text-white/60">{duration}h</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-montserrat font-bold text-white mb-4">
                Vos informations
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Nom complet *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6`}>
              <h3 className="text-xl font-montserrat font-bold text-white mb-4">
                Récapitulatif
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-white/90">
                  <span>Studio</span>
                  <span className="font-semibold capitalize">{studioType}</span>
                </div>
                <div className="flex justify-between items-center text-white/90">
                  <span>Date</span>
                  <span className="font-semibold">{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between items-center text-white/90">
                  <span>Créneau</span>
                  <span className="font-semibold">{selectedSlot || 'Non sélectionné'}</span>
                </div>
                <div className="flex justify-between items-center text-white/90">
                  <span>Durée</span>
                  <span className="font-semibold">{duration}h</span>
                </div>
                <div className="border-t border-white/20 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-lg font-bold">Total</span>
                    <span className="text-white text-2xl font-black">{price.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleBooking}
                disabled={!canBook}
                whileHover={canBook ? { scale: 1.02 } : {}}
                whileTap={canBook ? { scale: 0.98 } : {}}
                className={`w-full mt-6 py-4 rounded-xl font-montserrat font-bold text-base flex items-center justify-center gap-2 transition-all ${
                  canBook
                    ? 'bg-white text-black shadow-xl hover:shadow-2xl'
                    : 'bg-white/20 text-white/40 cursor-not-allowed'
                }`}
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Traitement...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Confirmer et payer</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              <p className="text-white/60 text-xs text-center mt-4">
                Paiement sécurisé via Shopify
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
