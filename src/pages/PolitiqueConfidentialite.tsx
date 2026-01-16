import { motion } from 'framer-motion';
import { Shield, Eye, Lock, FileText, Mail, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import SEOHead from '../components/SEO/SEOHead';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Politique de Confidentialité | Le 40 Coworking Marseille"
        description="Politique de confidentialité et protection des données personnelles pour Le 40 Coworking à Marseille."
      />
      <HeaderNav />
      <MobileBurger />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-violet-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-montserrat font-black text-white">
                  Politique de Confidentialité
                </h1>
                <p className="text-white/60 mt-2">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
            <p className="text-xl text-white/70">
              Le 40 Coworking s'engage à protéger vos données personnelles et votre vie privée.
            </p>
          </motion.div>

          <div className="space-y-8">
            <Section
              icon={Eye}
              title="1. Données Collectées"
              content={
                <div className="space-y-4">
                  <p>Nous collectons les données personnelles suivantes :</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Identité :</strong> Nom, prénom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Contact :</strong> Email, téléphone, adresse postale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Professionnel :</strong> Nom de l'entreprise, numéro SIRET</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Paiement :</strong> Informations de facturation (traitées de manière sécurisée via Stripe)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Navigation :</strong> Cookies, adresse IP, données de connexion</span>
                    </li>
                  </ul>
                </div>
              }
            />

            <Section
              icon={FileText}
              title="2. Utilisation des Données"
              content={
                <div className="space-y-4">
                  <p>Vos données personnelles sont utilisées pour :</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Gérer vos réservations et commandes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Traiter vos paiements de manière sécurisée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Vous envoyer des confirmations et rappels de réservation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Gérer votre compte membre et vos accès aux espaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Vous informer de nos événements et nouveautés (avec votre consentement)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Améliorer nos services et votre expérience</span>
                    </li>
                  </ul>
                </div>
              }
            />

            <Section
              icon={Lock}
              title="3. Protection des Données"
              content={
                <div className="space-y-4">
                  <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Chiffrement SSL/TLS pour toutes les communications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Stockage sécurisé sur des serveurs protégés (Supabase)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Paiements sécurisés via Stripe (certifié PCI-DSS)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Accès restreint aux données personnelles (personnel autorisé uniquement)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span>Sauvegardes régulières et plans de reprise d'activité</span>
                    </li>
                  </ul>
                </div>
              }
            />

            <Section
              icon={Eye}
              title="4. Partage des Données"
              content={
                <div className="space-y-4">
                  <p>Vos données personnelles ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement avec :</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Stripe :</strong> Pour le traitement sécurisé des paiements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Supabase :</strong> Pour l'hébergement sécurisé de la base de données</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Services email :</strong> Pour l'envoi de communications transactionnelles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Autorités légales :</strong> En cas de réquisition judiciaire</span>
                    </li>
                  </ul>
                </div>
              }
            />

            <Section
              icon={Clock}
              title="5. Conservation des Données"
              content={
                <div className="space-y-4">
                  <p>Nous conservons vos données personnelles pendant les durées suivantes :</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Données de compte :</strong> Tant que votre compte est actif + 3 ans après la dernière activité</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Données de facturation :</strong> 10 ans (obligation légale comptable)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Données marketing :</strong> 3 ans après le dernier contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Cookies :</strong> Maximum 13 mois</span>
                    </li>
                  </ul>
                </div>
              }
            />

            <Section
              icon={Shield}
              title="6. Vos Droits"
              content={
                <div className="space-y-4">
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Droit d'accès :</strong> Obtenir une copie de vos données</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Droit de rectification :</strong> Corriger vos données inexactes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Droit à l'effacement :</strong> Supprimer vos données (sous conditions)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Droit de retirer votre consentement :</strong> À tout moment</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    Pour exercer vos droits, contactez-nous à <a href="mailto:contact@bureauxle40.fr" className="text-fuchsia-400 hover:underline">contact@bureauxle40.fr</a>
                  </p>
                </div>
              }
            />

            <Section
              icon={FileText}
              title="7. Cookies"
              content={
                <div className="space-y-4">
                  <p>Notre site utilise des cookies pour :</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Cookies essentiels :</strong> Fonctionnement du site et sécurité (obligatoires)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Cookies de performance :</strong> Analyse de l'utilisation du site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span>
                      <span><strong>Cookies de préférences :</strong> Mémorisation de vos choix</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    Vous pouvez gérer vos préférences de cookies depuis les paramètres de votre navigateur.
                  </p>
                </div>
              }
            />

            <Section
              icon={Mail}
              title="8. Contact"
              content={
                <div className="space-y-4">
                  <p>Pour toute question concernant cette politique de confidentialité ou vos données personnelles :</p>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mt-4">
                    <p className="font-semibold mb-2">Le 40 Coworking</p>
                    <p className="text-white/70 mb-1">40 Avenue de Saint Antoine, 13015 Marseille</p>
                    <p className="text-white/70 mb-1">Email : <a href="mailto:contact@bureauxle40.fr" className="text-fuchsia-400 hover:underline">contact@bureauxle40.fr</a></p>
                    <p className="text-white/70">Téléphone : <a href="tel:+33491962151" className="text-fuchsia-400 hover:underline">04 91 96 21 51</a></p>
                  </div>
                  <p className="mt-4 text-sm text-white/60">
                    Vous avez également le droit de déposer une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:underline">www.cnil.fr</a>
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ icon: Icon, title, content }: { icon: LucideIcon; title: string; content: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-violet-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-montserrat font-bold text-white">{title}</h2>
      </div>
      <div className="text-white/70 leading-relaxed">
        {content}
      </div>
    </motion.div>
  );
}
