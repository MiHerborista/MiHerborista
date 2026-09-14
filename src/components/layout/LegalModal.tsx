import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Scale, Lock, MapPin, Mail, PhoneCall } from 'lucide-react';

export type LegalDocType = 'mentions' | 'privacy' | 'cgv';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'mentions'
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-8 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-[#0f291e] text-white p-5 sm:p-6 flex items-center justify-between shrink-0 border-b border-emerald-950">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/80 border border-emerald-800/60 text-emerald-300 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Informations Juridiques & Légales
                </h3>
                <p className="text-xs text-stone-300 mt-0.5">
                  MiHerborista Tunisie — Cosmétique Botanique & Herboristerie
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-emerald-900/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-stone-100/90 border-b border-stone-200 px-4 sm:px-6 flex space-x-2 overflow-x-auto shrink-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('mentions')}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'mentions'
                  ? 'border-[#0f291e] text-[#0f291e] bg-white'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Mentions Légales</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'privacy'
                  ? 'border-[#0f291e] text-[#0f291e] bg-white'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Politique de Confidentialité</span>
            </button>

            <button
              onClick={() => setActiveTab('cgv')}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'cgv'
                  ? 'border-[#0f291e] text-[#0f291e] bg-white'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>CGV Tunisie</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
            {activeTab === 'mentions' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">1. Éditeur du Site</h4>
                  <p className="text-stone-600">
                    Le présent site web, accessible à l’adresse <span className="font-semibold text-stone-900">www.miherborista.com</span>, est édité par la société <strong>MiHerborista SARL</strong>, laboratoire spécialisé en herboristerie et cosmétique naturelle en Tunisie.
                  </p>
                  <ul className="mt-3 space-y-1.5 bg-stone-50 p-4 rounded-xl border border-stone-200 text-stone-700 text-xs">
                    <li><strong>Dénomination sociale :</strong> MiHerborista Tunisie SARL</li>
                    <li><strong>Siège social :</strong> Rue Botanique, Tunis, Tunisie</li>
                    <li><strong>Registre du Commerce (RNE Tunisie) :</strong> B0123456782026</li>
                    <li><strong>Matricule Fiscal :</strong> 1689452/A/M/000</li>
                    <li><strong>Téléphone :</strong> +216 22 952 999</li>
                    <li><strong>Email de contact :</strong> contact@miherborista.com</li>
                    <li><strong>Directeur de publication :</strong> Direction Générale MiHerborista</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">2. Hébergement</h4>
                  <p className="text-stone-600">
                    Le site est hébergé sur une infrastructure cloud sécurisée de haute disponibilité conforme aux normes de protection des données et d'accessibilité internationale.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">3. Propriété Intellectuelle</h4>
                  <p className="text-stone-600">
                    L'ensemble des éléments figurant sur le site MiHerborista (marques, logos, visuels de plantes, recettes cosmétiques, textes, identité graphique, algorithmes du diagnostic et de l'assistant IA Sonia) sont protégés par le droit d'auteur et la propriété intellectuelle en Tunisie et à l’international. Toute reproduction ou représentation, totale ou partielle, sans autorisation expresse écrite est strictement interdite.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">4. Responsabilité & Produits Botaniques</h4>
                  <p className="text-stone-600">
                    Les conseils et formulations proposés sur le site (y compris via notre conseillère IA Sonia et le Diagnostic de Peau) sont présentés à titre d'information cosmétique et de bien-être végétal. Ils ne constituent en aucun cas une ordonnance médicale ni un traitement thérapeutique. En cas de doute ou de pathologie dermatologique spécifique, il est recommandé de consulter un professionnel de santé.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">1. Collecte des Données Personnelles</h4>
                  <p className="text-stone-600">
                    Conformément à la législation tunisienne relative à la protection des données à caractère personnel (Loi organique n° 2004-63), MiHerborista s’engage à protéger la vie privée de ses utilisateurs. Les informations recueillies sur le site (nom, prénom, adresse email, adresse de livraison en Tunisie, numéro de téléphone et réponses aux questionnaires de diagnostic) sont nécessaires à la gestion des commandes et à la personnalisation des conseils cosmétiques.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">2. Utilisation & Traitement des Données</h4>
                  <p className="text-stone-600 mb-2">
                    Vos données sont strictement réservées à un usage interne par MiHerborista pour :
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 pl-2">
                    <li>La préparation et le suivi de la livraison de vos commandes.</li>
                    <li>L’élaboration personnalisée de votre profil de peau lors du diagnostic.</li>
                    <li>L'amélioration des réponses botaniques de notre conseillère IA Sonia.</li>
                    <li>L'envoi d'offres promotionnelles ou nouveautés (avec votre accord préalable).</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">3. Confidentialité & Sécurité</h4>
                  <p className="text-stone-600">
                    MiHerborista applique des mesures de sécurité techniques et organisationnelles renforcées pour empêcher l'accès non autorisé, l'altération ou la fuite de vos données personnelles. Aucune donnée personnelle n'est vendue, louée ou cédée à des tiers.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">4. Vos Droits & Exercice</h4>
                  <p className="text-stone-600">
                    Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données personnelles. Pour exercer ce droit, il vous suffit de nous contacter par courrier électronique à <span className="font-bold text-[#0f291e]">contact@miherborista.com</span> ou par téléphone au <strong>+216 22 952 999</strong>.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">5. Cookies & Témoins de Navigation</h4>
                  <p className="text-stone-600">
                    Notre site utilise des cookies techniques légers pour maintenir votre panier, vos favoris et vos préférences de navigation. Vous pouvez configurer votre navigateur pour refuser ou supprimer les cookies à tout moment.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'cgv' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">1. Champ d’Application</h4>
                  <p className="text-stone-600">
                    Les présentes Conditions Générales de Vente (CGV) régissent toutes les ventes de produits cosmétiques, huiles végétales, huiles essentielles, hydrolats et kits DIY conclues sur le site e-commerce <strong>MiHerborista Tunisie</strong> par des acheteurs résidant en Tunisie.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">2. Produits et Tarifs (Dinar Tunisien - DT)</h4>
                  <p className="text-stone-600">
                    Tous les prix figurant sur notre catalogue sont indiqués en <strong>Dinars Tunisiens (DT)</strong> toutes taxes comprises (TTC). MiHerborista se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">3. Commande & Modes de Paiement</h4>
                  <p className="text-stone-600">
                    La validation de la commande implique l'acceptation intégrale des présentes CGV. Nous proposons les modes de paiement sécurisés suivants en Tunisie :
                  </p>
                  <ul className="mt-2 space-y-1 text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs">
                    <li>💵 <strong>Paiement à la livraison (Cash on Delivery) :</strong> Règlement en espèces auprès du livreur lors de la réception du colis.</li>
                    <li>💳 <strong>Carte Bancaire Tunisienne :</strong> Paiement en ligne sécurisé par passerelle monétique nationale.</li>
                    <li>📱 <strong>D17 / Wallet Mobile :</strong> Virement mobile direct pour un règlement instantané.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">4. Livraison en Tunisie</h4>
                  <p className="text-stone-600">
                    Nous livrons sur l'ensemble du territoire tunisien (Grand Tunis, Sousse, Sfax, Nabeul, Bizerte, Gabès et l'ensemble des gouvernorats).
                  </p>
                  <ul className="mt-2 space-y-1 text-stone-600 pl-2 list-disc list-inside">
                    <li><strong>Délai de livraison :</strong> 24h à 48h ouvrables selon la zone géographique.</li>
                    <li><strong>Frais de livraison :</strong> Forfait de 7 DT (Gratuit dès 35 DT d'achat).</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">5. Droit de Rétractation & Retours</h4>
                  <p className="text-stone-600">
                    Pour des raisons d'hygiène et de sécurité des produits cosmétiques et de santé, les flacons ou pot scellés ou ouverts ne peuvent faire l'objet d'un retour. En cas de produit endommagé lors du transport, MiHerborista s'engage à échanger ou rembourser l'article sous 7 jours suivant réception.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f291e] mb-2">6. Service Client & Réclamations</h4>
                  <p className="text-stone-600">
                    Notre équipe service client reste à votre disposition pour toute question ou réclamation du Lundi au Samedi de 8h30 à 18h00 au <strong>+216 22 952 999</strong> ou à <strong>contact@miherborista.com</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-stone-50 p-4 px-6 border-t border-stone-200 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-stone-500">
              Dernière mise à jour : Septembre 2026 — Document conforme au droit tunisien.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#0f291e] hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
