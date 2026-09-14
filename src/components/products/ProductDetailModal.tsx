import React from 'react';
import { X, Star, Check, ShoppingBag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-2">
          
          {/* Product Image */}
          <div className="md:col-span-5 space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 text-xs text-emerald-950 font-medium space-y-1">
              <div className="flex items-center space-x-1 font-bold">
                <Truck className="w-4 h-4 text-emerald-800" />
                <span>Livraison partout en Tunisie</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                LIVRAISON OFFERTE dès 35 DT d’achat
              </p>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 space-y-4">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                {product.categoryLabel}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                {product.title}
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                {product.subtitle} • Format : {product.volumeOrSize}
              </p>

              <div className="flex items-center space-x-2 mt-2 text-xs text-stone-600">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-stone-900 ml-1">{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviewCount.toLocaleString()} avis vérifiés</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2 border-y border-stone-200 py-3">
              <span className="text-2xl font-extrabold text-[#0f291e]">
                {product.price.toFixed(2).replace('.', ',')} DT
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  {product.originalPrice.toFixed(2).replace('.', ',')} DT
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Benefits list */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider">
                Bénéfices Botaniques :
              </h4>
              <ul className="space-y-1 text-xs text-stone-700">
                {product.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
              <h4 className="font-bold text-xs text-stone-900">
                Actifs & Ingrédients (INCI) :
              </h4>
              <p className="text-[11px] text-stone-600 italic">
                {product.ingredients.join(', ')}
              </p>
            </div>

            {/* How to Use */}
            <div className="text-xs text-stone-700 space-y-1">
              <strong className="block text-stone-900">Conseils d'utilisation :</strong>
              <p>{product.howToUse}</p>
            </div>

            {/* Add button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ajouter au panier ({product.price.toFixed(2).replace('.', ',')} DT)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
