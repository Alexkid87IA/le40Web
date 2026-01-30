import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Building2 } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import SEOHead from '../components/SEO/SEOHead';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <SEOHead
        title="Page non trouvée"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        noindex={true}
      />
      <HeaderNav />
      <MobileBurger />
      
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* 404 Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="text-8xl sm:text-9xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text">
                404
              </div>
              <div className="absolute inset-0 text-8xl sm:text-9xl font-bold text-white/5">
                404
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Page introuvable
              </h1>
              <p className="text-xl text-gray-300 max-w-lg mx-auto">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </p>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="py-8"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
                <Building2 className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                <Home className="w-5 h-5 mr-2" />
                Retour à l'accueil
              </motion.a>
              
              <motion.button
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Page précédente
              </motion.button>
            </motion.div>

            {/* Search Suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="pt-8"
            >
              <p className="text-gray-400 mb-4">
                Ou explorez nos services :
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { name: 'Coworking', href: '/coworking' },
                  { name: 'Domiciliation', href: '/domiciliation' },
                  { name: 'Salles', href: '/salles' },
                  { name: 'Studios', href: '/studios' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contact', href: '/contact' }
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 text-sm"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Help Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="pt-8 border-t border-white/10"
            >
              <p className="text-sm text-gray-400">
                Besoin d'aide{'\u00A0'}? <a href="/contact" className="text-orange-400 hover:text-orange-300 transition-colors">Contactez-nous</a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}