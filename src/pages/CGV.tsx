import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import SEOHead from '../components/SEO/SEOHead';

export default function CGV() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Conditions Générales de Vente"
        description="Consultez les conditions générales de vente du 40, espace de coworking à Marseille. CGV applicables à nos services de domiciliation, bureaux et salles."
        noindex={true}
      />
      <HeaderNav />
      <MobileBurger />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-violet-600 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-montserrat font-black text-white">
                  Conditions Générales de Vente
                </h1>
                <p className="text-white/60 mt-2">Dernière mise à jour : Octobre 2025</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-8">
              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">1. Objet</h2>
                <p className="text-white/80 leading-relaxed">
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre
                  Le 40, espace de coworking et studios situé au 40 Avenue de Saint Antoine, 13015 Marseille, et ses clients
                  pour la réservation et l'utilisation de ses services (espaces de coworking, bureaux privés,
                  salles de réunion, studios créatifs et services associés).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">2. Identification</h2>
                <div className="text-white/80 leading-relaxed space-y-2">
                  <p><strong>Raison sociale :</strong> Le 40</p>
                  <p><strong>Adresse :</strong> 40 Avenue de Saint Antoine, 13015 Marseille</p>
                  <p><strong>Téléphone :</strong> 04 91 96 21 51</p>
                  <p><strong>Email :</strong> contact@bureauxle40.fr</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">3. Services proposés</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Le 40 propose différents types de services :
                </p>
                <ul className="text-white/80 space-y-2 list-disc list-inside">
                  <li>Espaces de coworking (hot desk et bureaux dédiés)</li>
                  <li>Bureaux privés à la journée, semaine ou mois</li>
                  <li>Salles de réunion équipées</li>
                  <li>Studios créatifs pour production audiovisuelle</li>
                  <li>Services de domiciliation commerciale</li>
                  <li>Événements et ateliers professionnels</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">4. Tarifs et paiement</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Les tarifs sont indiqués en euros hors taxes (HT). La TVA française au taux en vigueur (20%)
                  s'applique sur tous nos services.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  Le paiement s'effectue en ligne par carte bancaire via notre plateforme sécurisée Stripe.
                  Le paiement est exigible immédiatement lors de la réservation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">5. Réservation et confirmation</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  La réservation est confirmée après réception du paiement intégral. Un email de confirmation
                  est envoyé automatiquement au client avec tous les détails de la réservation et un numéro
                  de commande unique.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">6. Annulation et modification</h2>
                <div className="text-white/80 leading-relaxed space-y-3">
                  <p><strong>Annulation gratuite :</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Annulation gratuite jusqu'à 24 heures avant le début de la réservation</li>
                    <li>Remboursement intégral sous 5 à 7 jours ouvrés</li>
                  </ul>
                  <p className="mt-4"><strong>Annulation tardive :</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Moins de 24h avant : aucun remboursement</li>
                    <li>Non-présentation : aucun remboursement</li>
                  </ul>
                  <p className="mt-4"><strong>Modification :</strong></p>
                  <p>
                    Les modifications de réservation sont possibles sous réserve de disponibilité.
                    Contactez-nous au 04 91 96 21 51 ou par email.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">7. Accès et utilisation</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  L'accès aux espaces est réservé aux personnes ayant effectué une réservation valide.
                  Le client s'engage à respecter le règlement intérieur du lieu et à utiliser les espaces
                  de manière conforme à leur destination.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">8. Responsabilité</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Le 40 ne saurait être tenu responsable des dommages indirects, pertes de données ou
                  préjudices commerciaux. Chaque client est responsable de ses effets personnels et de
                  son matériel.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">9. Données personnelles</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Conformément au RGPD, les données personnelles collectées sont utilisées uniquement
                  pour la gestion des réservations et la communication avec nos clients. Vous disposez
                  d'un droit d'accès, de rectification et de suppression de vos données.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">10. Litiges</h2>
                <p className="text-white/80 leading-relaxed">
                  En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
                  À défaut, les tribunaux français seront seuls compétents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">11. Contact</h2>
                <p className="text-white/80 leading-relaxed">
                  Pour toute question relative aux présentes CGV, contactez-nous :
                </p>
                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-white/80">📧 Email : contact@bureauxle40.fr</p>
                  <p className="text-white/80">📞 Téléphone : 04 91 96 21 51</p>
                  <p className="text-white/80">📍 Adresse : 40 Avenue de Saint Antoine, 13015 Marseille</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
