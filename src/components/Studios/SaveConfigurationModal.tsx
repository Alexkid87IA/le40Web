import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Share2, Check, Copy, Heart, Download } from 'lucide-react';
import { useStudioConfiguration, type StudioConfiguration } from '../../hooks/useStudioConfiguration';

interface SaveConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  configuration: Omit<StudioConfiguration, 'id'>;
  onSaved?: (shareToken: string) => void;
}

export default function SaveConfigurationModal({
  isOpen,
  onClose,
  configuration,
  onSaved
}: SaveConfigurationModalProps) {
  const [configName, setConfigName] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { saveConfiguration, loading } = useStudioConfiguration();

  const handleSave = async () => {
    const token = await saveConfiguration({
      ...configuration,
      configurationName: configName || `Config ${new Date().toLocaleDateString()}`,
      isFavorite
    });

    if (token) {
      setShareToken(token);
      if (onSaved) onSaved(token);
    }
  };

  const getShareUrl = () => {
    if (!shareToken) return '';
    return `${window.location.origin}/studios?config=${shareToken}`;
  };

  const copyShareLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadConfig = () => {
    const configData = {
      ...configuration,
      name: configName,
      savedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studio-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl border-2 border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full transition-colors border border-white/20"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="p-8">
                  {!shareToken ? (
                    <>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <Save className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-montserrat font-black text-white">
                            Sauvegarder la configuration
                          </h2>
                          <p className="text-white/60 font-inter text-sm">
                            Retrouvez et partagez facilement votre configuration
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
                        <h3 className="text-lg font-montserrat font-bold text-white mb-4">
                          Résumé de la configuration
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-white/60 font-inter">Studio:</span>
                            <p className="text-white font-inter font-bold">{configuration.studioId}</p>
                          </div>
                          <div>
                            <span className="text-white/60 font-inter">Formule:</span>
                            <p className="text-white font-inter font-bold">{configuration.formulaId}</p>
                          </div>
                          <div>
                            <span className="text-white/60 font-inter">Durée:</span>
                            <p className="text-white font-inter font-bold">{configuration.durationHours}h</p>
                          </div>
                          <div>
                            <span className="text-white/60 font-inter">Total:</span>
                            <p className="text-2xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                              {configuration.totalPrice}€
                            </p>
                          </div>
                        </div>
                        {Object.keys(configuration.selectedOptions).length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <span className="text-white/60 font-inter text-sm">
                              {Object.keys(configuration.selectedOptions).length} options sélectionnées
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-white font-inter font-medium mb-2">
                            Nom de la configuration
                          </label>
                          <input
                            type="text"
                            value={configName}
                            onChange={(e) => setConfigName(e.target.value)}
                            placeholder="Ma config studio parfaite..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 font-inter focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsFavorite(!isFavorite)}
                          className={`w-full p-4 rounded-xl border-2 transition-all ${
                            isFavorite
                              ? 'bg-pink-500/10 border-pink-500'
                              : 'bg-white/5 border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Heart className={`w-5 h-5 ${isFavorite ? 'text-pink-500 fill-pink-500' : 'text-white/60'}`} />
                            <div className="text-left flex-1">
                              <p className="text-white font-inter font-bold">Ajouter aux favoris</p>
                              <p className="text-white/60 text-sm font-inter">Accès rapide à cette configuration</p>
                            </div>
                            {isFavorite && <Check className="w-5 h-5 text-pink-500" />}
                          </div>
                        </motion.button>
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={downloadConfig}
                          className="flex-1 bg-white/10 hover:bg-white/15 text-white py-4 rounded-xl font-montserrat font-bold border border-white/20 flex items-center justify-center gap-2"
                        >
                          <Download className="w-5 h-5" />
                          Télécharger
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSave}
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-montserrat font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <Save className="w-5 h-5" />
                          {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center mb-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.1 }}
                          className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <Check className="w-10 h-10 text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-montserrat font-black text-white mb-2">
                          Configuration sauvegardée !
                        </h2>
                        <p className="text-white/60 font-inter">
                          Votre configuration est prête à être partagée
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Share2 className="w-6 h-6 text-blue-400" />
                          <h3 className="text-xl font-montserrat font-black text-white">
                            Lien de partage
                          </h3>
                        </div>
                        <div className="bg-black/30 backdrop-blur-xl rounded-lg p-4 mb-4 break-all">
                          <code className="text-cyan-400 font-mono text-sm">
                            {getShareUrl()}
                          </code>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={copyShareLink}
                          className={`w-full py-3 rounded-xl font-montserrat font-bold flex items-center justify-center gap-2 transition-all ${
                            copied
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                          }`}
                        >
                          {copied ? (
                            <>
                              <Check className="w-5 h-5" />
                              Copié !
                            </>
                          ) : (
                            <>
                              <Copy className="w-5 h-5" />
                              Copier le lien
                            </>
                          )}
                        </motion.button>
                      </div>

                      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 mb-6">
                        <p className="text-white/80 font-inter text-sm leading-relaxed">
                          <strong className="text-white">Astuce:</strong> Partagez ce lien avec vos collègues ou sauvegardez-le pour retrouver rapidement cette configuration lors de votre prochaine réservation.
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-montserrat font-bold"
                      >
                        Terminer
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
