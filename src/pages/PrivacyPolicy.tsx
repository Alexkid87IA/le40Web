import React from 'react';
import { Shield, Lock, Eye, Trash2, FileText, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: '1. Collecte des données',
      content: `Nous collectons les données suivantes :

• **Données de navigation** : Adresse IP, type de navigateur, pages visitées, durée des visites
• **Données de formulaire** : Nom, prénom, email, téléphone (si vous nous contactez)
• **Données de réservation** : Informations nécessaires pour traiter votre réservation
• **Cookies analytiques** : Uniquement avec votre consentement pour améliorer notre site`,
    },
    {
      icon: Lock,
      title: '2. Utilisation des données',
      content: `Vos données sont utilisées pour :

• Traiter vos demandes de contact et réservations
• Améliorer l'expérience utilisateur de notre site
• Analyser le trafic et l'utilisation de nos services (avec consentement)
• Respecter nos obligations légales

Nous ne vendons jamais vos données à des tiers.`,
    },
    {
      icon: Eye,
      title: '3. Base légale (RGPD)',
      content: `Le traitement de vos données repose sur :

• **Consentement** : Pour les cookies non nécessaires
• **Exécution d'un contrat** : Pour traiter vos réservations
• **Intérêt légitime** : Pour améliorer nos services
• **Obligation légale** : Pour la comptabilité et obligations fiscales`,
    },
    {
      icon: FileText,
      title: '4. Vos droits',
      content: `Conformément au RGPD, vous disposez des droits suivants :

• **Droit d'accès** : Obtenir une copie de vos données
• **Droit de rectification** : Corriger vos données inexactes
• **Droit à l'effacement** : Demander la suppression de vos données
• **Droit à la portabilité** : Recevoir vos données dans un format structuré
• **Droit d'opposition** : Vous opposer au traitement de vos données
• **Droit de retirer votre consentement** : À tout moment

Pour exercer ces droits, contactez-nous à : contact@le40.fr`,
    },
    {
      icon: Trash2,
      title: '5. Conservation des données',
      content: `Nous conservons vos données uniquement le temps nécessaire :

• **Données de contact** : 3 ans après votre dernier contact
• **Données de réservation** : 10 ans (obligations comptables)
• **Données analytiques** : 25 mois maximum
• **Cookies** : Durée maximale de 13 mois

Les données sont automatiquement supprimées après ces délais.`,
    },
    {
      icon: Shield,
      title: '6. Sécurité des données',
      content: `Nous mettons en œuvre des mesures de sécurité appropriées :

• Chiffrement HTTPS pour toutes les communications
• Validation et nettoyage de toutes les données entrantes
• Accès restreint aux données personnelles
• Sauvegardes régulières et sécurisées
• Hébergement chez des prestataires conformes RGPD`,
    },
    {
      icon: Mail,
      title: '7. Cookies',
      content: `Nous utilisons différents types de cookies :

• **Cookies nécessaires** : Essentiels au fonctionnement (panier, préférences)
• **Cookies analytiques** : Comprendre l'utilisation du site (nécessitent votre consentement)
• **Cookies marketing** : Publicités ciblées (nécessitent votre consentement)

Vous pouvez gérer vos préférences de cookies à tout moment via la bannière de consentement.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold">
              Politique de confidentialité
            </h1>
          </div>
          <p className="text-xl text-orange-100">
            Conforme au Règlement Général sur la Protection des Données (RGPD)
          </p>
          <p className="mt-4 text-sm text-orange-200">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le 40 ("nous", "notre", "nos") s'engage à protéger et respecter votre vie privée.
            Cette politique explique comment nous collectons, utilisons, partageons et protégeons
            vos données personnelles lorsque vous utilisez notre site web.
          </p>
          <p className="text-gray-700 leading-relaxed">
            En utilisant notre site, vous acceptez les pratiques décrites dans cette politique.
            Si vous n'acceptez pas cette politique, veuillez ne pas utiliser notre site.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-2xl flex-shrink-0">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-montserrat font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-montserrat font-bold mb-4">
            Questions ou réclamations ?
          </h2>
          <p className="text-orange-100 leading-relaxed mb-6">
            Si vous avez des questions concernant cette politique de confidentialité ou si vous
            souhaitez exercer vos droits, contactez-nous :
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-orange-200" />
              <span>Email : contact@le40.fr</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-orange-200" />
              <span>Responsable DPO : dpo@le40.fr</span>
            </div>
          </div>
          <p className="text-sm text-orange-200 mt-6">
            Vous avez également le droit de déposer une réclamation auprès de la CNIL (Commission
            Nationale de l'Informatique et des Libertés) : www.cnil.fr
          </p>
        </div>

        {/* Modifications */}
        <div className="bg-gray-50 rounded-3xl shadow p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-2">Modifications de cette politique</h3>
          <p className="text-sm text-gray-600">
            Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Toute
            modification sera publiée sur cette page avec une date de mise à jour. Nous vous
            encourageons à consulter régulièrement cette page.
          </p>
        </div>
      </div>
    </div>
  );
}
