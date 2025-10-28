import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Settings } from 'lucide-react';
import { logger } from '../../utils/logger';

interface ConsentPreferences {
  necessary: boolean; // Always true, can't be disabled
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_KEY = 'le40_cookie_consent';
const CONSENT_VERSION = '1.0';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem(CONSENT_KEY);

    if (!savedConsent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);

        // Check if consent version matches
        if (parsed.version === CONSENT_VERSION) {
          setPreferences(parsed.preferences);
          applyConsent(parsed.preferences);
        } else {
          // Version mismatch, ask for consent again
          setShowBanner(true);
        }
      } catch (error) {
        logger.error('Failed to parse consent preferences', error);
        setShowBanner(true);
      }
    }
  }, []);

  const applyConsent = (prefs: ConsentPreferences) => {
    // Apply analytics consent
    if (prefs.analytics) {
      // Enable analytics tracking
      logger.info('Analytics tracking enabled');
      // TODO: Initialize analytics (Google Analytics, Plausible, etc.)
    } else {
      logger.info('Analytics tracking disabled');
    }

    // Apply marketing consent
    if (prefs.marketing) {
      logger.info('Marketing tracking enabled');
      // TODO: Initialize marketing pixels (Facebook, LinkedIn, etc.)
    } else {
      logger.info('Marketing tracking disabled');
    }
  };

  const saveConsent = (prefs: ConsentPreferences) => {
    const consent = {
      version: CONSENT_VERSION,
      preferences: prefs,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    applyConsent(prefs);
    setShowBanner(false);
    logger.info('Cookie consent saved', { preferences: prefs });
  };

  const handleAcceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(necessaryOnly);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const handleReject = () => {
    handleAcceptNecessary();
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              {/* Main banner */}
              {!showDetails ? (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="p-3 bg-orange-100 rounded-2xl">
                        <Cookie className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-montserrat font-bold text-gray-900">
                          Respect de votre vie privée
                        </h3>
                        <p className="text-sm text-gray-600">
                          Conforme RGPD
                        </p>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex-grow">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser le contenu.
                        Vous pouvez accepter tous les cookies ou personnaliser vos préférences.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
                      <button
                        onClick={() => setShowDetails(true)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Personnaliser
                      </button>

                      <button
                        onClick={handleReject}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        Refuser
                      </button>

                      <button
                        onClick={handleAcceptAll}
                        className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all shadow-lg hover:shadow-xl"
                      >
                        Tout accepter
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Detailed preferences
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-orange-600" />
                      <h3 className="text-xl font-montserrat font-bold text-gray-900">
                        Paramètres de confidentialité
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Fermer les paramètres"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Necessary cookies - Always on */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900">Cookies nécessaires</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Essentiels au fonctionnement du site (panier, authentification, préférences).
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span className="text-xs font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                            Toujours actif
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Analytics cookies */}
                    <label className="p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors block">
                      <div className="flex items-center justify-between">
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900">Cookies analytiques</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Nous aident à comprendre comment vous utilisez le site pour l'améliorer.
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) =>
                              setPreferences({ ...preferences, analytics: e.target.checked })
                            }
                            className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </label>

                    {/* Marketing cookies */}
                    <label className="p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors block">
                      <div className="flex items-center justify-between">
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900">Cookies marketing</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Utilisés pour afficher des publicités pertinentes et mesurer l'efficacité des campagnes.
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) =>
                              setPreferences({ ...preferences, marketing: e.target.checked })
                            }
                            className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAcceptNecessary}
                      className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      Accepter uniquement les nécessaires
                    </button>

                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      Enregistrer mes préférences
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    En savoir plus sur notre{' '}
                    <a href="/politique-confidentialite" className="text-orange-600 hover:underline">
                      politique de confidentialité
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
