import { motion } from 'framer-motion';
import { Scale, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-32 pb-20 px-4">
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-montserrat font-black text-white">
                  Mentions Légales
                </h1>
                <p className="text-white/60 mt-2">Dernière mise à jour : Janvier 2026</p>
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
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">1. Éditeur du site</h2>
                <div className="text-white/80 leading-relaxed space-y-2">
                  <p><strong>Raison sociale :</strong> Le 40</p>
                  <p><strong>Forme juridique :</strong> SAS</p>
                  <p><strong>Adresse du siège social :</strong> 40 Avenue de Saint Antoine, 13015 Marseille</p>
                  <p><strong>Téléphone :</strong> 04 91 96 21 51</p>
                  <p><strong>Email :</strong> contact@bureauxle40.fr</p>
                  <p><strong>SIRET :</strong> [À compléter]</p>
                  <p><strong>TVA Intracommunautaire :</strong> [À compléter]</p>
                  <p><strong>Directeur de la publication :</strong> [À compléter]</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">2. Hébergement</h2>
                <div className="text-white/80 leading-relaxed space-y-2">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                  <p><strong>Site web :</strong> vercel.com</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">3. Propriété intellectuelle</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, icônes, etc.)
                  est la propriété exclusive de Le 40 ou de ses partenaires et est protégé par les lois
                  françaises et internationales relatives à la propriété intellectuelle.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Toute reproduction, représentation, modification, publication, transmission ou dénaturation,
                  totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit, et sur
                  quelque support que ce soit, est interdite sans l'autorisation écrite préalable de Le 40.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">4. Données personnelles</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                  Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de
                  suppression et de portabilité de vos données personnelles.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  Pour exercer ces droits ou pour toute question relative à vos données personnelles,
                  vous pouvez nous contacter à : contact@bureauxle40.fr
                </p>
                <p className="text-white/80 leading-relaxed">
                  Pour plus d'informations, consultez notre{' '}
                  <Link to="/politique-confidentialite" className="text-amber-400 hover:text-amber-300 underline">
                    Politique de Confidentialité
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">5. Cookies</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Ce site utilise des cookies pour améliorer votre expérience de navigation, réaliser
                  des statistiques de visites et vous proposer des contenus adaptés.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Vous pouvez à tout moment modifier vos préférences en matière de cookies via les
                  paramètres de votre navigateur.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">6. Liens hypertextes</h2>
                <p className="text-white/80 leading-relaxed">
                  Le site peut contenir des liens vers d'autres sites internet. Le 40 n'exerce aucun
                  contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou aux
                  éventuels dommages résultant de leur utilisation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">7. Limitation de responsabilité</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Le 40 s'efforce de fournir des informations exactes et à jour sur ce site. Toutefois,
                  des erreurs ou omissions peuvent survenir. Le 40 ne saurait être tenu responsable des
                  dommages directs ou indirects résultant de l'utilisation de ce site.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Le 40 se réserve le droit de modifier, corriger ou supprimer le contenu du site à
                  tout moment et sans préavis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">8. Droit applicable</h2>
                <p className="text-white/80 leading-relaxed">
                  Les présentes mentions légales sont régies par le droit français. En cas de litige,
                  et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">9. Contact</h2>
                <p className="text-white/80 leading-relaxed">
                  Pour toute question concernant ces mentions légales :
                </p>
                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-white/80">Email : contact@bureauxle40.fr</p>
                  <p className="text-white/80">Téléphone : 04 91 96 21 51</p>
                  <p className="text-white/80">Adresse : 40 Avenue de Saint Antoine, 13015 Marseille</p>
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
