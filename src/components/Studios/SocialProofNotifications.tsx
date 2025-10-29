import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, TrendingUp, Video, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SocialProofItem {
  id: string;
  proof_type: string;
  customer_name: string;
  customer_type: string;
  action_text: string;
  metrics: any;
  created_at: string;
}

export default function SocialProofNotifications() {
  const [notifications, setNotifications] = useState<SocialProofItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('studio_social_proof_feed')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      if (data && data.length > 0) {
        setNotifications(data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  if (notifications.length === 0) return null;

  const current = notifications[currentIndex];
  if (!current) return null;

  const getIcon = () => {
    switch (current.proof_type) {
      case 'booking':
        return Video;
      case 'review':
        return Star;
      case 'milestone':
        return TrendingUp;
      default:
        return Clock;
    }
  };

  const Icon = getIcon();

  const getTimeAgo = () => {
    if (current.metrics?.minutes_ago) {
      return `il y a ${current.metrics.minutes_ago} min`;
    }
    const date = new Date(current.created_at);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffMinutes < 60) return `il y a ${diffMinutes} min`;
    if (diffMinutes < 1440) return `il y a ${Math.floor(diffMinutes / 60)}h`;
    return `il y a ${Math.floor(diffMinutes / 1440)}j`;
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-50 pointer-events-none"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative group pointer-events-auto"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 rounded-2xl opacity-50 group-hover:opacity-75 blur-lg"
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl max-w-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-montserrat font-bold text-white text-sm">
                      {current.customer_name}
                    </p>
                    <span className="text-xs text-white/50 font-inter whitespace-nowrap">
                      {getTimeAgo()}
                    </span>
                  </div>

                  <p className="text-white/80 font-inter text-sm mb-2">
                    {current.action_text}
                  </p>

                  {current.metrics && (
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      {current.metrics.views && (
                        <div className="flex items-center gap-1 text-cyan-400">
                          <TrendingUp className="w-3 h-3" />
                          <span className="font-semibold">{(current.metrics.views / 1000000).toFixed(0)}M vues</span>
                        </div>
                      )}
                      {current.metrics.rating && (
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(current.metrics.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400" />
                          ))}
                        </div>
                      )}
                      {current.metrics.videos && (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <Video className="w-3 h-3" />
                          <span className="font-semibold">{current.metrics.videos} vidéos</span>
                        </div>
                      )}
                    </div>
                  )}

                  {current.customer_type && (
                    <div className="mt-2">
                      <span className="inline-flex px-2 py-1 bg-white/10 rounded-full text-xs text-white/70 font-inter">
                        {current.customer_type === 'creator' ? 'Créateur' : current.customer_type === 'enterprise' ? 'Entreprise' : 'Agence'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
