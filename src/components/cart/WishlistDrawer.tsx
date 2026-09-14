import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { Product, UserProfile } from '../../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProductIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (p: Product) => void;
  onOpenProductDetail: (p: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  savedProductIds,
  products,
  onToggleWishlist,
  onAddToCart,
  onOpenProductDetail,
}) => {
  const savedProducts = products.filter((p) => savedProductIds.includes(p.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => onAddToCart(p));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[#0f291e] text-white flex items-center justify-between border-b border-emerald-950 shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-red-400">
                  <Heart className="w-4 h-4 fill-red-400" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold leading-tight">
                    Vos Coups de Cœur ({savedProducts.length})
                  </h2>
                  <p className="text-[11px] text-emerald-200">
                    Vos soins & actifs botaniques sauvegardés
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-emerald-900/80 rounded-full text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf8f5]">
              {savedProducts.length === 0 ? (
                <div className="text-center py-20 text-stone-500 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto shadow-inner">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Aucun coup de cœur enregistré
                    </h3>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 leading-relaxed">
                      Cliquez sur le petit cœur des produits qui vous inspirent pour constituer votre rituel beauté personnalisé.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-[#0f291e] text-white text-xs font-bold rounded-xl hover:bg-emerald-950 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Explorer la boutique
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {savedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 bg-white rounded-2xl border border-stone-200/90 shadow-2xs flex items-center justify-between gap-3 group hover:border-emerald-300 transition-colors"
                    >
                      {/* Image Thumbnail */}
                      <div
                        onClick={() => {
                          onOpenProductDetail(product);
                          onClose();
                        }}
                        className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/70 shrink-0 cursor-pointer"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Meta */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800">
                          {product.categoryLabel}
                        </span>
                        <h4
                          onClick={() => {
                            onOpenProductDetail(product);
                            onClose();
                          }}
                          className="font-serif font-bold text-xs text-stone-900 truncate hover:text-emerald-900 cursor-pointer"
                        >
                          {product.title}
                        </h4>
                        <span className="text-[10px] text-stone-500 truncate block mt-0.5">
                          {product.subtitle}
                        </span>
                        <div className="text-xs font-extrabold text-[#0f291e] mt-1">
                          {product.price.toFixed(2).replace('.', ',')} DT
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col items-end space-y-2 shrink-0">
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          title="Retirer des favoris"
                          className="p-1 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-2.5 py-1.5 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-[11px] rounded-lg flex items-center space-x-1 cursor-pointer transition-transform active:scale-95 shadow-2xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Ajouter</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {savedProducts.length > 0 && (
              <div className="p-4 bg-white border-t border-stone-200 space-y-2.5 shrink-0">
                <button
                  onClick={handleAddAllToCart}
                  className="w-full py-3 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Tout ajouter au panier ({savedProducts.length} soins)</span>
                </button>

                <p className="text-[10px] text-center text-stone-500 font-medium">
                  Besoin d'un conseil ? Discutez avec <strong>Sonia</strong> notre experte IA Botanique.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
