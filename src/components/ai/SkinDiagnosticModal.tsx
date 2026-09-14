import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, RefreshCw, ShoppingBag, Gift } from 'lucide-react';
import { Product, SkinDiagnosticAnswers, SkinDiagnosticResult } from '../../types';

interface SkinDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (p: Product) => void;
}

export const SkinDiagnosticModal: React.FC<SkinDiagnosticModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<SkinDiagnosticAnswers>({
    skinType: 'mixte',
    primaryConcern: 'imperfections',
    routinePreference: 'simple'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SkinDiagnosticResult | null>(null);

  if (!isOpen) return null;

  const handleGenerateDiagnosis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Find matching products
      let recommended: Product[] = [];
      if (answers.skinType === 'seche' || answers.primaryConcern === 'deshydratation') {
        recommended = products.filter(p => p.id === 'serum-acide-hyaluronique-35' || p.id === 'huile-argan-pure-bio' || p.id === 'beurre-karite-brut-100g');
      } else if (answers.primaryConcern === 'imperfections' || answers.skinType === 'grasse') {
        recommended = products.filter(p => p.id === 'serum-niacinamide-zinc' || p.id === 'argile-verte-tunisie' || p.id === 'hydrolat-fleur-oranger-bio');
      } else {
        recommended = products.filter(p => p.id === 'serum-acide-hyaluronique-35' || p.id === 'hydrolat-fleur-oranger-bio' || p.id === 'he-lavande-vraie-bio');
      }

      setResult({
        skinProfileTitle: `Profil : Peau ${answers.skinType.toUpperCase()} • Ciblage ${answers.primaryConcern.toUpperCase()}`,
        description: 'D’après l’analyse de Sonia notre experte botaniste, votre barrière cutanée bénéficiera d’une hydratation biomimétique et d’actifs régulateurs sans aucun produit chimique agressif.',
        recommendedProducts: recommended.length > 0 ? recommended : products.slice(0, 3),
        aiAdvice: [
          'Appliquez l’hydrolat de fleur d’oranger sur peau nettoyée pour rééquilibrer le pH.',
          'Superposez le sérum sur peau encore légèrement humide pour sceller l’hydratation.',
          'Buvez au moins 1,5L d’eau infusée aux plantes par jour.'
        ],
        discountCode: 'BIENVENUE10'
      });
      setIsAnalyzing(false);
      setStep(4);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-[#0f291e] text-emerald-300 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Diagnostic de Peau Sur-Mesure IA
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                Sonia • Experte Botaniste MiHerborista
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          
          {step === 1 && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Étape 1 sur 3 : Votre type de peau
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Comment qualifiez-vous le ressenti quotidien de votre peau ?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { key: 'seche', title: 'Peau Sèche', desc: 'Tiraillements fréquents, zones rudes, inconfort' },
                  { key: 'grasse', title: 'Peau Grasse', desc: 'Brillances, pores dilatés, excès de sébum' },
                  { key: 'mixte', title: 'Peau Mixte', desc: 'Zone T brillante, joues normales ou sèches' },
                  { key: 'sensible', title: 'Peau Sensible', desc: 'Rougeurs, réagit rapidement aux agressions' },
                  { key: 'dehydratee', title: 'Déshydratée', desc: 'Manque d’eau, ridules de déshydratation' },
                  { key: 'mature', title: 'Peau Mature', desc: 'Perte de fermeté, besoin de densité et nutrition' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setAnswers({ ...answers, skinType: opt.key as any });
                      setStep(2);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      answers.skinType === opt.key
                        ? 'border-[#0f291e] bg-emerald-50/60 ring-2 ring-[#0f291e]/20'
                        : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                    }`}
                  >
                    <h4 className="font-serif font-bold text-sm text-stone-900">{opt.title}</h4>
                    <p className="text-xs text-stone-500 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Étape 2 sur 3 : Votre priorité absolue
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Quel objectif souhaitez-vous traiter en priorité ?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { key: 'imperfections', title: 'Imperfections & Pores', desc: 'Boutons, points noirs, excès de sébum' },
                  { key: 'deshydratation', title: 'Hydratation Intense', desc: 'Repulper, lisser et adoucir les tissus' },
                  { key: 'eclat', title: 'Éclat & Teint unifié', desc: 'Corriger le teint terne et fatigué' },
                  { key: 'taches', title: 'Taches Pigmentaires', desc: 'Atténuer les marques et taches solaires' },
                  { key: 'rides', title: 'Anti-Âge & Fermeté', desc: 'Prévenir et lisser les rides et ridules' },
                  { key: 'rougeurs', title: 'Apaisement Rougeurs', desc: 'Calmer les échauffements et réactivité' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setAnswers({ ...answers, primaryConcern: opt.key as any });
                      setStep(3);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      answers.primaryConcern === opt.key
                        ? 'border-[#0f291e] bg-emerald-50/60 ring-2 ring-[#0f291e]/20'
                        : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                    }`}
                  >
                    <h4 className="font-serif font-bold text-sm text-stone-900">{opt.title}</h4>
                    <p className="text-xs text-stone-500 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Étape 3 sur 3 : Format de Soin
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Quel format de soin préférez-vous au quotidien ?
              </h3>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {[
                  { key: 'simple', title: 'Soins Prêts à l’Emploi', desc: 'Sérums et huiles botaniques prêts en flacon pour un rituel rapide' },
                  { key: 'diy', title: 'Recettes Cosmétiques DIY', desc: 'Fabriquer vous-même vos soins à partir de nos bases bio' },
                  { key: 'complete', title: 'Rituel Mixte & Complet', desc: 'Sérums ciblés + masques maison minute' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setAnswers({ ...answers, routinePreference: opt.key as any });
                      handleGenerateDiagnosis();
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      answers.routinePreference === opt.key
                        ? 'border-[#0f291e] bg-emerald-50/60 ring-2 ring-[#0f291e]/20'
                        : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                    }`}
                  >
                    <h4 className="font-serif font-bold text-sm text-stone-900">{opt.title}</h4>
                    <p className="text-xs text-stone-500 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="py-16 text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-emerald-800 animate-spin mx-auto" />
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Sonia formule votre Diagnostic Botanique...
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Analyse des principes actifs ciblés et compatibilité des soins végétaux MiHerborista.
              </p>
            </div>
          )}

          {step === 4 && result && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Profile Card */}
              <div className="bg-[#0f291e] text-white p-5 rounded-2xl">
                <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Diagnostic Validé</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {result.skinProfileTitle}
                </h3>
                <p className="text-xs text-stone-200 mt-2 leading-relaxed font-normal">
                  {result.description}
                </p>
              </div>

              {/* Coupon Box */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Gift className="w-6 h-6 text-emerald-800 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-emerald-950">
                      Offre Spéciale Premier Diagnostic
                    </h4>
                    <p className="text-[11px] text-emerald-800">
                      Profitez de <strong>-10% de réduction</strong> sur votre commande avec le code :
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-800 text-white font-mono font-bold text-xs rounded-lg">
                  {result.discountCode}
                </span>
              </div>

              {/* Recommended Products */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-stone-900">
                  Votre Routine Sur-Mesure Recommandée :
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex gap-3 items-center"
                    >
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-16 h-16 object-cover rounded-xl bg-white border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif font-bold text-xs text-stone-900 truncate">
                          {prod.title}
                        </h5>
                        <span className="text-[10px] text-stone-500 block">
                          {prod.subtitle}
                        </span>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-extrabold text-xs text-[#0f291e]">
                            {prod.price.toFixed(2).replace('.', ',')} DT
                          </span>
                          <button
                            onClick={() => onAddToCart(prod)}
                            className="px-3 py-1 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-[10px] rounded-lg cursor-pointer"
                          >
                            + Ajouter
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Advice list */}
              <div className="bg-stone-100 p-4 rounded-2xl space-y-2">
                <h5 className="font-bold text-xs text-stone-900">
                  Conseils d'Application de Sonia :
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {result.aiAdvice.map((adv, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-800 font-bold">•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        {step === 4 && (
          <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
            <button
              onClick={() => {
                setStep(1);
                setResult(null);
              }}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center space-x-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refaire le diagnostic</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Fermer et Découvrir la boutique
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
