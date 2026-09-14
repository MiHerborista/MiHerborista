import React, { useState } from 'react';
import { Search, MapPin, User, Heart, ShoppingBag, ChevronDown, Sparkles, Code } from 'lucide-react';
import { UserProfile, ProductCategory } from '../../types';
import { MegaMenu } from './MegaMenu';

interface NavbarProps {
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;
  user: UserProfile;
  onOpenClerkAuth: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSkinDiagnosis: () => void;
  onOpenWishlist: () => void;
  onOpenStackInspector: () => void;
  activeView: 'shop' | 'recettes' | 'diagnostic' | 'stack';
  setActiveView: (view: 'shop' | 'recettes' | 'diagnostic' | 'stack') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  setActiveCategory,
  user,
  onOpenClerkAuth,
  searchQuery,
  setSearchQuery,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSkinDiagnosis,
  onOpenWishlist,
  onOpenStackInspector,
  activeView,
  setActiveView
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeHoverCategory, setActiveHoverCategory] = useState<ProductCategory>('soins_visage');

  const categories: { key: ProductCategory; label: string; isSpecial?: boolean; view?: 'shop' | 'recettes' | 'diagnostic' }[] = [
    { key: 'tous', label: 'Tous les produits', view: 'shop' },
    { key: 'soins_visage', label: 'Soins visage', view: 'shop' },
    { key: 'cheveux', label: 'Cheveux', view: 'shop' },
    { key: 'aromatherapie', label: 'Aromathérapie', view: 'shop' },
    { key: 'diy_ingredients', label: 'DIY & Ingrédients', view: 'shop' },
    { key: 'corps_bain', label: 'Corps & Bain', view: 'shop' },
    { key: 'complements_sante', label: 'Compléments & Santé', view: 'shop' },
    { key: 'maison_ecologie', label: 'Maison & Écologie', view: 'shop' },
    { key: 'recettes_tutos', label: '🔬 Recettes & Tutos', view: 'recettes' },
    { key: 'diagnostic_peau', label: '✨ Diagnostic de peau', isSpecial: true, view: 'diagnostic' }
  ];

  const handleSelectMegaMenuItem = (catKey: ProductCategory, subFilter?: string) => {
    setActiveView('shop');
    setActiveCategory(catKey);
    if (subFilter) {
      setSearchQuery(subFilter);
    } else {
      setSearchQuery('');
    }
    setIsMegaMenuOpen(false);

    // Scroll smoothly to catalog
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs relative">
      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Subtitle */}
          <div 
            className="flex flex-col cursor-pointer shrink-0" 
            onClick={() => {
              setActiveView('shop');
              setActiveCategory('tous');
              setSearchQuery('');
              setIsMegaMenuOpen(false);
            }}
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0f291e] leading-none">
              MiHerborista
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-bold mt-0.5">
              COSMÉTIQUE NATURELLE & DIY
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xl mx-4 relative">
            <div className="relative w-full flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-stone-400" />
              <input
                type="text"
                placeholder="Rechercher un produit, un ingrédient, une recette, un actif..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsMegaMenuOpen(false)}
                className="w-full pl-9 pr-24 py-2 text-xs bg-stone-100/80 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0f291e]/30 text-stone-900 placeholder-stone-400"
              />
              <button
                onClick={() => {
                  setActiveView('shop');
                  setIsMegaMenuOpen(false);
                }}
                className="absolute right-1 px-4 py-1.5 bg-[#0f291e] hover:bg-emerald-900 text-stone-50 text-xs font-semibold rounded-full transition-colors cursor-pointer"
              >
                Chercher
              </button>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-5 text-xs text-stone-700 font-medium">
            {/* Boutiques */}
            <div className="hidden sm:flex flex-col items-center cursor-pointer hover:text-[#0f291e] transition-colors">
              <MapPin className="w-5 h-5 text-stone-600" />
              <span className="text-[11px] mt-0.5">Boutiques</span>
            </div>

            {/* Mon compte */}
            <div 
              onClick={onOpenClerkAuth}
              className="flex flex-col items-center cursor-pointer hover:text-[#0f291e] transition-colors"
            >
              <User className="w-5 h-5 text-stone-600" />
              <span className="text-[11px] mt-0.5 hidden sm:inline">Mon compte</span>
            </div>

            {/* Favoris Wishlist */}
            <div 
              onClick={onOpenWishlist}
              className="relative flex flex-col items-center cursor-pointer hover:text-[#0f291e] transition-colors"
            >
              <Heart className="w-5 h-5 text-stone-600" />
              {user.savedProductIds.length > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-emerald-700 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {user.savedProductIds.length}
                </span>
              )}
            </div>

            {/* Stack Inspector (Tech Dev Modal) */}
            <div 
              onClick={onOpenStackInspector}
              className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#0f291e] transition-colors"
              title="Inspecter l'architecture tRPC, Prisma, Clerk, Inngest"
            >
              <Code className="w-5 h-5 text-stone-600" />
              <span className="text-[10px] text-emerald-800 font-bold mt-0.5">Stack</span>
            </div>

            {/* Panier Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center space-x-2 bg-stone-100 hover:bg-stone-200/80 px-3 py-1.5 rounded-full border border-stone-200 transition-all cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#0f291e]" />
                <span className="absolute -top-2 -right-2 bg-[#0f291e] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="text-left leading-none hidden sm:block">
                <span className="text-[10px] uppercase text-stone-500 font-bold block">Panier</span>
                <span className="text-xs font-bold text-[#0f291e]">
                  {cartTotal.toFixed(2).replace('.', ',')} DT
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="lg:hidden mt-2 relative">
          <input
            type="text"
            placeholder="Rechercher un produit, une recette, un actif..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-20 py-1.5 text-xs bg-stone-100 border border-stone-200 rounded-full focus:outline-none text-stone-900"
          />
          <Search className="w-4 h-4 absolute left-3 top-2 text-stone-400" />
          <button
            onClick={() => setActiveView('shop')}
            className="absolute right-1 top-1 px-3 py-1 bg-[#0f291e] text-white text-[10px] font-bold rounded-full"
          >
            Chercher
          </button>
        </div>
      </div>

      {/* Navigation Bar Categories */}
      <div className="border-t border-stone-200 bg-stone-50/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none text-xs text-stone-700 font-medium">
            {categories.map((cat) => {
              const isCatActive = activeView === 'shop' && activeCategory === cat.key;
              const isViewActive = (cat.view === activeView && cat.view !== 'shop');
              const isActive = isCatActive || isViewActive;
              const isMenuOpenForThisCat = isMegaMenuOpen && (
                activeHoverCategory === cat.key || (cat.key === 'tous' && activeHoverCategory === 'soins_visage')
              );

              if (cat.isSpecial) {
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setIsMegaMenuOpen(false);
                      setActiveView('diagnostic');
                      onOpenSkinDiagnosis();
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-stone-200/80 hover:bg-emerald-800 hover:text-white text-[#0f291e] font-semibold transition-all whitespace-nowrap cursor-pointer shadow-2xs ml-auto"
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    if (cat.view === 'recettes') {
                      setIsMegaMenuOpen(false);
                      setActiveView('recettes');
                    } else {
                      setActiveView('shop');
                      setActiveCategory(cat.key);

                      // If clicking the currently open menu category, toggle it closed
                      if (isMegaMenuOpen && isMenuOpenForThisCat) {
                        setIsMegaMenuOpen(false);
                      } else {
                        // Open mega menu for this category on click
                        setActiveHoverCategory(cat.key === 'tous' ? 'soins_visage' : cat.key);
                        setIsMegaMenuOpen(true);
                      }
                    }
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1 relative z-50 ${
                    isMenuOpenForThisCat
                      ? 'font-bold text-[#0f291e] bg-white border border-stone-300 shadow-xs'
                      : isActive
                      ? 'font-bold text-[#0f291e] border-b-2 border-[#0f291e] bg-stone-100/80'
                      : 'hover:text-[#0f291e] text-stone-700 hover:bg-stone-100/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.view !== 'recettes' && (
                    <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform ${isMenuOpenForThisCat ? 'rotate-180 text-[#0f291e]' : ''}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          activeHoverCategory={activeHoverCategory}
          onSelectCategory={handleSelectMegaMenuItem}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      </div>
    </header>
  );
};

