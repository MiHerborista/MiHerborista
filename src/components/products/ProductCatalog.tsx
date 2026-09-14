import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Filter, Check, Sparkles } from 'lucide-react';
import { Product, ProductCategory, UserProfile } from '../../types';

interface ProductCatalogProps {
  products: Product[];
  user: UserProfile;
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (productId: string) => void;
  searchQuery: string;
  onOpenProductDetail: (p: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  user,
  activeCategory,
  setActiveCategory,
  onAddToCart,
  onToggleWishlist,
  searchQuery,
  onOpenProductDetail
}) => {
  const [selectedBadgeFilter, setSelectedBadgeFilter] = useState<string>('tous');

  // Filter products
  const filteredProducts = products.filter((p) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = p.title.toLowerCase().includes(q);
      const matchesSub = p.subtitle.toLowerCase().includes(q);
      const matchesCategory = p.categoryLabel.toLowerCase().includes(q);
      const matchesIngr = p.ingredients.some(i => i.toLowerCase().includes(q));
      if (!matchesName && !matchesSub && !matchesCategory && !matchesIngr) return false;
    }

    // Category
    if (activeCategory !== 'tous' && p.category !== activeCategory) {
      return false;
    }

    // Badge filter
    if (selectedBadgeFilter === 'bestseller' && !p.isBestSeller) return false;
    if (selectedBadgeFilter === 'organic' && !p.isOrganic) return false;
    if (selectedBadgeFilter === 'tunisian' && !p.isTunisianOrigin) return false;

    return true;
  });

  return (
    <section id="catalog-section" className="py-10 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {activeCategory === 'tous' ? 'Nos Soins & Actifs Botaniques' : `Rayon : ${activeCategory.replace('_', ' ').toUpperCase()}`}
            </h2>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              {filteredProducts.length} référence(s) formulée(s) et développée(s) avec exigence
            </p>
          </div>

          {/* Quick Badges Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-stone-400 font-bold flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtrer :</span>
            </span>

            {[
              { id: 'tous', label: 'Tous' },
              { id: 'bestseller', label: '🔥 Best-Sellers' },
              { id: 'organic', label: '🌿 100% Bio' },
              { id: 'tunisian', label: '🇹🇳 Origine Tunisie' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedBadgeFilter(f.id)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedBadgeFilter === f.id
                    ? 'bg-[#0f291e] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isSaved = user.savedProductIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200/80 p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group relative"
              >
                {/* Wishlist Heart Icon */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-600 shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  title="Ajouter aux favoris"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isSaved ? 'fill-red-500 text-red-500' : 'text-stone-500'
                    }`}
                  />
                </button>

                {/* Badge Top Left */}
                {product.badge && (
                  <span className="absolute top-6 left-6 z-10 bg-black/85 backdrop-blur-xs text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-xs tracking-wider">
                    {product.badge}
                  </span>
                )}

                {/* Image Box */}
                <div>
                  <div
                    onClick={() => onOpenProductDetail(product)}
                    className="aspect-square rounded-xl overflow-hidden bg-stone-100 cursor-pointer relative mb-3 group-hover:opacity-95 transition-opacity"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 bg-white/90 text-stone-900 font-bold text-xs rounded-full shadow-sm flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Aperçu rapide</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      {product.categoryLabel}
                    </span>
                    <h3
                      onClick={() => onOpenProductDetail(product)}
                      className="font-serif font-bold text-base text-stone-900 group-hover:text-[#0f291e] transition-colors cursor-pointer leading-snug line-clamp-2"
                    >
                      {product.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mt-2 text-xs text-stone-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-stone-900">{product.rating}</span>
                    <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
                  </div>
                </div>

                {/* Price & Add to Cart Button */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-base font-extrabold text-[#0f291e]">
                      {product.price.toFixed(2).replace('.', ',')} DT
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-stone-400 line-through">
                        {product.originalPrice.toFixed(2).replace('.', ',')} DT
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Ajouter</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
