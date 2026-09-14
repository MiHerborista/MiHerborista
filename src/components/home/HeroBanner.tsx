import React from 'react';
import { Star, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Product } from '../../types';

interface HeroBannerProps {
  featuredProduct: Product;
  onAddToCart: (p: Product) => void;
  onOpenSkinDiagnosis: () => void;
  onOpenSoniaChat: () => void;
  onExploreSerums: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredProduct,
  onAddToCart,
  onOpenSkinDiagnosis,
  onOpenSoniaChat,
  onExploreSerums
}) => {
  return (
    <section className="bg-[#f8f6f0] py-10 sm:py-14 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white border border-stone-200 rounded-full text-xs font-semibold text-stone-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-stone-800"></span>
              <span>L'expertise naturelle au juste prix depuis 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.15] font-bold tracking-tight">
              Prenez soin de vous <br className="hidden sm:inline" />
              avec <span className="italic font-normal font-serif text-[#0f291e]">la puissance du végétal.</span>
            </h1>

            {/* Paragraph Subtitle */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Sérums ultra-concentrés, huiles pures bio certifiées et bases personnalisables : des soins d'une efficacité clinique sans compromis, développés dans notre laboratoire en Tunisie.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreSerums}
                className="px-6 py-3.5 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all flex items-center space-x-2 shadow-md cursor-pointer"
              >
                <span>DÉCOUVRIR LES SÉRUMS CULTES</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSkinDiagnosis}
                className="px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-semibold text-xs sm:text-sm rounded-lg transition-all flex items-center space-x-2 shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Faire mon diagnostic de peau</span>
              </button>

              <button
                onClick={onOpenSoniaChat}
                className="px-4 py-3.5 bg-stone-200/80 hover:bg-stone-300/80 text-stone-900 font-medium text-xs sm:text-sm rounded-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Conseillère IA Sonia</span>
              </button>
            </div>

            {/* Ticks List */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs font-semibold text-stone-700 border-t border-stone-200/80">
              <div className="flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-800" />
                <span>100% d'origine naturelle</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-800" />
                <span>Formulé en Tunisie</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-800" />
                <span>Dès 3,90 DT</span>
              </div>
            </div>

          </div>

          {/* Right Featured Product Card Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-md relative group overflow-hidden">
              
              {/* Badge Top Right */}
              <div className="absolute top-7 right-7 z-20 bg-black text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-sm tracking-wider shadow-sm">
                N°1 DES VENTES TUNISIE
              </div>

              {/* Product Image */}
              <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-stone-100">
                <img
                  src={featuredProduct.imageUrl}
                  alt={featuredProduct.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Glass Overlay Info Bar at Bottom of Image */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-stone-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                      {featuredProduct.title}
                    </h3>
                    <div className="flex items-center space-x-1 mt-0.5 text-xs text-stone-600 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-stone-900">{featuredProduct.rating}/5</span>
                      <span className="text-stone-400 text-[11px]">({featuredProduct.reviewCount.toLocaleString()} avis clients)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-[#0f291e]">
                      {featuredProduct.price.toFixed(2).replace('.', ',')} DT
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Bottom Details & Add Button */}
              <div className="mt-4 flex items-center justify-between px-1">
                <span className="text-xs text-stone-500 font-medium">
                  {featuredProduct.subtitle}
                </span>

                <button
                  onClick={() => onAddToCart(featuredProduct)}
                  className="px-5 py-2 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer"
                >
                  <span>Ajouter</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
