import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ContactBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contacts = [
    {
      icon: Phone,
      label: 'Appeler',
      href: 'tel:+33413252640',
      color: 'from-blue-600 to-cyan-600',
      hoverColor: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/33413252640',
      color: 'from-green-600 to-emerald-600',
      hoverColor: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:contact@le40.fr',
      color: 'from-orange-600 to-amber-600',
      hoverColor: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
            <div className="pointer-events-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-4 sm:p-6">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base md:text-lg font-montserrat font-bold text-white">
                      Besoin d'aide pour réserver ?
                    </p>
                    <p className="text-xs sm:text-sm text-white/60 font-inter hidden sm:block">
                      Notre équipe est disponible pour vous accompagner
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {contacts.map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r ${contact.color} hover:${contact.hoverColor} px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg`}
                    >
                      <contact.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base text-white font-inter font-semibold whitespace-nowrap">
                        {contact.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-orange-600" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
