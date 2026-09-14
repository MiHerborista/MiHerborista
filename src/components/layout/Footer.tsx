import React from 'react';
import { Leaf, ShieldCheck, Truck, RefreshCw, PhoneCall, Mail, MapPin } from 'lucide-react';
import { LegalDocType } from './LegalModal';

interface FooterProps {
  onOpenLegalModal?: (docType: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  return (
    <footer className="bg-[#0f291e] text-stone-200 pt-12 pb-8 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Guarantees Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-emerald-900/60 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Livraison Rapide Tunisie</h4>
              <p className="text-stone-300 text-[11px]">Gratuite dès 35 DT d'achat</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Ingrédients Biologiques</h4>
              <p className="text-stone-300 text-[11px]">Certifiés sans produits toxiques</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Formules Testées en Labo</h4>
              <p className="text-stone-300 text-[11px]">Efficacité clinique prouvée</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Flaconnage Éco-Responsable</h4>
              <p className="text-stone-300 text-[11px]">Verre ambré 100% recyclable</p>
            </div>
          </div>
        </div>

        {/* Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-stone-300">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <span className="font-serif text-2xl font-bold text-white tracking-tight block">
              MiHerborista
            </span>
            <p className="leading-relaxed text-stone-300">
              Laboratoire de cosmétique naturelle et herboristerie en Tunisie. Nous concevons des soins végétaux ultra-concentrés, respectueux de votre peau et de l'environnement.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-300 font-bold">
              <span>📍 Laboratoire & Boutiques en Tunisie</span>
            </div>
          </div>

          {/* Rayons */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Nos Rayons
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Sérums Visage Bio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Huiles Végétales Pures</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Huiles Essentielles Bio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hydrolats & Eaux Florales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bases & Accessoires DIY</a></li>
            </ul>
          </div>

          {/* AI Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Services & IA
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Conseillère IA Sonia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Diagnostic de Peau Gratuit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ateliers Recettes DIY</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Suivi de Commande Tunisie</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trouver une Boutique</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Contact & Support
            </h4>
            <div className="space-y-2 text-stone-300">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>+216 22 952 999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>contact@miherborista.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Tunis, Tunisie</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-3">
          <p>© 2026 MiHerborista Tunisie. Tous droits réservés. Cosmétique Naturelle & DIY.</p>
          <div className="flex space-x-4">
            <button
              onClick={() => onOpenLegalModal?.('mentions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mentions Légales
            </button>
            <button
              onClick={() => onOpenLegalModal?.('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Politique de Confidentialité
            </button>
            <button
              onClick={() => onOpenLegalModal?.('cgv')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              CGV Tunisie
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
