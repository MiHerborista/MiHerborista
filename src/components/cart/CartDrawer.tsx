import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Tag, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const freeShippingThreshold = 35.00;
  const shipping = subtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 5.95;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'BIENVENUE10') {
      setDiscountPercent(10);
      setPromoSuccess('Code BIENVENUE10 appliqué (-10%) !');
      setPromoError('');
    } else {
      setPromoError('Code invalide. Essayez BIENVENUE10');
      setPromoSuccess('');
    }
  };

  const handleSimulateCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Animated Slide-over Panier Drawer */}
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
                <div className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-emerald-300">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold leading-tight">Votre Panier MiHerborista</h2>
                  <p className="text-[11px] text-emerald-200">Laboratoire & soins naturels formulés en Tunisie</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-emerald-900/80 rounded-full text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar with Animated Motion Width */}
            <div className="bg-stone-100 p-3.5 border-b border-stone-200 text-xs shrink-0">
              <div className="flex items-center justify-between font-semibold text-stone-800 mb-1.5">
                <span className="flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-emerald-800" />
                  <span>Livraison en Tunisie</span>
                </span>
                <span>
                  {subtotal >= freeShippingThreshold ? (
                    <strong className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full text-[11px]">
                      LIVRAISON OFFERTE !
                    </strong>
                  ) : (
                    <span className="text-stone-600">
                      Reste <strong className="text-stone-900 font-bold">{(freeShippingThreshold - subtotal).toFixed(2).replace('.', ',')} DT</strong>
                    </span>
                  )}
                </span>
              </div>

              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="bg-emerald-700 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>
            </div>

            {/* Cart Item List with AnimatePresence Item Entrance & Exit */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf8f5]">
              {isOrdered ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-3xl font-bold shadow-md"
                  >
                    <Check className="w-10 h-10 text-emerald-800" />
                  </motion.div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Commande Validée !
                  </h3>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                    Merci pour votre confiance. Notre laboratoire prépare vos soins naturels avec le plus grand soin.
                  </p>
                </motion.div>
              ) : cart.length === 0 ? (
                <div className="text-center py-20 text-stone-500 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Votre panier est vide
                    </h3>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
                      Découvrez nos sérums concentrés, hydrolats purs et huiles végétales bio.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-[#0f291e] text-white text-xs font-bold rounded-xl hover:bg-emerald-950 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Découvrir nos soins botaniques
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -30, scale: 0.95 }}
                      transition={{ duration: 0.22 }}
                      className="p-3 bg-white rounded-2xl border border-stone-200/90 shadow-2xs flex items-center justify-between gap-3 group hover:border-emerald-300 transition-colors"
                    >
                      {/* Product Image */}
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded-xl bg-stone-100 border border-stone-200/70 shrink-0"
                      />

                      {/* Info Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-xs text-stone-900 truncate">
                          {item.product.title}
                        </h4>
                        <span className="text-[10px] text-stone-500 block truncate mt-0.5">
                          {item.product.subtitle}
                        </span>
                        <div className="text-xs font-extrabold text-[#0f291e] mt-1">
                          {item.product.price.toFixed(2).replace('.', ',')} DT
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex flex-col items-end space-y-2 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          title="Supprimer du panier"
                          className="p-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 text-xs font-bold shadow-2xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2 py-1 hover:bg-stone-200 transition-colors cursor-pointer rounded-l-lg"
                          >
                            <Minus className="w-3 h-3 text-stone-700" />
                          </button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            className="px-2.5 py-1 text-stone-900 bg-white"
                          >
                            {item.quantity}
                          </motion.span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2 py-1 hover:bg-stone-200 transition-colors cursor-pointer rounded-r-lg"
                          >
                            <Plus className="w-3 h-3 text-stone-700" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer & Calculations */}
            {cart.length > 0 && !isOrdered && (
              <div className="p-4 bg-white border-t border-stone-200 space-y-3 shrink-0 shadow-lg">
                
                {/* Promo Code Entry */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Code promo (BIENVENUE10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 uppercase font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0f291e]"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3.5 py-1.5 bg-[#0f291e] hover:bg-emerald-950 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs active:scale-95"
                  >
                    Appliquer
                  </button>
                </div>

                {promoSuccess && <p className="text-[11px] text-emerald-800 font-bold flex items-center gap-1"><Sparkles className="w-3 h-3 text-emerald-700" />{promoSuccess}</p>}
                {promoError && <p className="text-[11px] text-red-600 font-semibold">{promoError}</p>}

                {/* Subtotal breakdown */}
                <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-2.5 font-medium">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2).replace('.', ',')} DT</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>Remise promo (-{discountPercent}%)</span>
                      <span>-{discount.toFixed(2).replace('.', ',')} DT</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Livraison (Tunisie)</span>
                    <span>{shipping === 0 ? <strong className="text-emerald-800 font-bold">OFFERTE</strong> : `${shipping.toFixed(2).replace('.', ',')} DT`}</span>
                  </div>

                  <div className="flex justify-between font-bold text-sm text-stone-900 border-t border-stone-200 pt-2">
                    <span>Total TTC</span>
                    <span className="text-[#0f291e] font-extrabold text-base">
                      {total.toFixed(2).replace('.', ',')} DT
                    </span>
                  </div>
                </div>

                {/* Simulated Checkout */}
                <button
                  onClick={handleSimulateCheckout}
                  className="w-full py-3 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer active:scale-98"
                >
                  <span>Passer la commande ({total.toFixed(2).replace('.', ',')} DT)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-stone-500 font-medium pt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Paiement sécurisé & Livraison en 24/48h partout en Tunisie</span>
                </div>

              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
