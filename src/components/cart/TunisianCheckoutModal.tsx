import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Check, ShieldCheck, Truck, CreditCard, Smartphone, Banknote,
  Building2, MapPin, Phone, Mail, User, Sparkles, ExternalLink,
  Receipt, ArrowRight, Loader2, Info, ChevronRight, CheckCircle2
} from 'lucide-react';
import { CartItem, UserProfile } from '../../types';
import { TUNISIAN_GOVERNORATES, TunisianGatewayType } from '../../lib/payments/tunisianPayments';

interface TunisianCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  discount: number;
  discountPercent: number;
  shipping: number;
  total: number;
  user: UserProfile;
  onOrderSuccess: (orderData: any) => void;
}

export const TunisianCheckoutModal: React.FC<TunisianCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  discount,
  discountPercent,
  shipping,
  total,
  user,
  onOrderSuccess
}) => {
  // Form State
  const [fullName, setFullName] = useState(user.fullName || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState('+216 ');
  const [address, setAddress] = useState('');
  const [governorate, setGovernorate] = useState('Tunis');
  const [postalCode, setPostalCode] = useState('1000');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Selected Gateway
  const [selectedGateway, setSelectedGateway] = useState<TunisianGatewayType>('cod');

  // Checkout Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const generatedOrderId = `TN-${Date.now().toString().slice(-6)}`;

    try {
      const response = await fetch('/api/payments/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: generatedOrderId,
          amountTND: total,
          gateway: selectedGateway,
          customer: {
            fullName,
            email,
            phone,
            address,
            governorate,
            postalCode,
            notes: deliveryNotes
          },
          items: cart.map(i => ({
            id: i.product.id,
            title: i.product.title,
            price: i.product.price,
            quantity: i.quantity
          })),
          successUrl: window.location.origin,
          failUrl: window.location.origin
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'initialisation du paiement.');
      }

      setOrderResult({
        ...data,
        itemsCount: cart.reduce((acc, c) => acc + c.quantity, 0),
        totalAmount: total,
        customerName: fullName,
        deliveryGov: governorate,
        deliveryAddr: address
      });

      onOrderSuccess({
        id: generatedOrderId,
        total,
        gateway: selectedGateway,
        customer: { fullName, email, phone, address, governorate }
      });

    } catch (err: any) {
      console.error('Order submission error:', err);
      setErrorMsg(err.message || 'Impossible de traiter la commande.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-auto overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderResult ? (
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                <Truck className="w-4 h-4" />
                <span>Passerelle & Livraison en Tunisie</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Finaliser ma commande
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Expédition garantie sous 24 à 48h partout en Tunisie (Aramex / Yalidine).
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* 1. Coordonnées & Livraison en Tunisie */}
            <div className="space-y-3 bg-stone-50/80 p-4 rounded-2xl border border-stone-200">
              <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>1. Adresse de Livraison (Tunisie)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Nom & Prénom *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Yosra Ben Ali"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-800/30 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Numéro de Téléphone (Tunisie) *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+216 22 952 999"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-800/30 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Adresse complète (Rue, Résidence, N° porte) *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ex: 12 Rue Ibn Khaldoun, Appt 4B"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-800/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Gouvernorat *
                  </label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-800/30 focus:outline-none cursor-pointer"
                  >
                    {TUNISIAN_GOVERNORATES.map((gov) => (
                      <option key={gov} value={gov}>{gov}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Code Postal / Ville
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="1000"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-800/30 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Choix de la Passerelle de Paiement Tunisienne */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-emerald-800" />
                  <span>2. Mode de Règlement Tunisien</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Dinar Tunisien (TND)
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                {/* 1. Cash on Delivery (COD) */}
                <label
                  onClick={() => setSelectedGateway('cod')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                    selectedGateway === 'cod'
                      ? 'border-emerald-800 bg-emerald-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === 'cod'}
                    onChange={() => setSelectedGateway('cod')}
                    className="mt-1 text-emerald-800 focus:ring-emerald-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5 font-bold text-xs text-stone-900">
                      <Banknote className="w-4 h-4 text-emerald-800 shrink-0" />
                      <span>Espèces à la Livraison (COD)</span>
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1 leading-snug">
                      Paiement en liquide lors de la réception du colis. Le plus populaire en Tunisie.
                    </p>
                    <span className="inline-block mt-1.5 text-[9px] font-extrabold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                      Recommandé
                    </span>
                  </div>
                </label>

                {/* 2. Konnect Network */}
                <label
                  onClick={() => setSelectedGateway('konnect')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                    selectedGateway === 'konnect'
                      ? 'border-emerald-800 bg-emerald-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === 'konnect'}
                    onChange={() => setSelectedGateway('konnect')}
                    className="mt-1 text-emerald-800 focus:ring-emerald-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5 font-bold text-xs text-stone-900">
                      <CreditCard className="w-4 h-4 text-purple-700 shrink-0" />
                      <span>Konnect Network</span>
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1 leading-snug">
                      Carte CIB, e-Dinar La Poste, Flouci, Visa & Mastercard sécurisées.
                    </p>
                    <span className="inline-block mt-1.5 text-[9px] font-extrabold text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded">
                      CIB & e-Dinar
                    </span>
                  </div>
                </label>

                {/* 3. Flouci Mobile Wallet */}
                <label
                  onClick={() => setSelectedGateway('flouci')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                    selectedGateway === 'flouci'
                      ? 'border-emerald-800 bg-emerald-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === 'flouci'}
                    onChange={() => setSelectedGateway('flouci')}
                    className="mt-1 text-emerald-800 focus:ring-emerald-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5 font-bold text-xs text-stone-900">
                      <Smartphone className="w-4 h-4 text-teal-700 shrink-0" />
                      <span>Flouci Wallet (Kaoun)</span>
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1 leading-snug">
                      Débit instantané via l'application smartphone Flouci Tunisie ou scan QR code.
                    </p>
                    <span className="inline-block mt-1.5 text-[9px] font-extrabold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                      Scan QR Code
                    </span>
                  </div>
                </label>

                {/* 4. Paymee.tn */}
                <label
                  onClick={() => setSelectedGateway('paymee')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                    selectedGateway === 'paymee'
                      ? 'border-emerald-800 bg-emerald-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === 'paymee'}
                    onChange={() => setSelectedGateway('paymee')}
                    className="mt-1 text-emerald-800 focus:ring-emerald-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5 font-bold text-xs text-stone-900">
                      <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                      <span>Paymee.tn</span>
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1 leading-snug">
                      Passerelle de paiement électronique agréée en dinars tunisiens (TND).
                    </p>
                    <span className="inline-block mt-1.5 text-[9px] font-extrabold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">
                      Passerelle Carte
                    </span>
                  </div>
                </label>

              </div>
            </div>

            {/* 3. Récapitulatif Tarifaire */}
            <div className="p-3.5 bg-stone-100 rounded-2xl text-xs space-y-1.5 text-stone-600">
              <div className="flex justify-between">
                <span>Sous-total articles ({cart.length})</span>
                <span className="font-semibold text-stone-900">{subtotal.toFixed(2).replace('.', ',')} DT</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Remise appliquée (-{discountPercent}%)</span>
                  <span>-{discount.toFixed(2).replace('.', ',')} DT</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Frais d'expédition ({governorate})</span>
                <span className="font-semibold text-stone-900">
                  {shipping === 0 ? <strong className="text-emerald-800">OFFERTE (Dès 35 DT)</strong> : `${shipping.toFixed(2).replace('.', ',')} DT`}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                <span>Total Net à Payer</span>
                <span className="text-base text-emerald-900 font-extrabold">
                  {total.toFixed(2).replace('.', ',')} DT
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50 active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Initialisation du paiement tunisien...</span>
                </>
              ) : (
                <>
                  <span>Confirmer la commande ({total.toFixed(2).replace('.', ',')} DT)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-stone-400 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span>Conforme à la législation tunisienne sur le commerce électronique (Loi n° 2000-83)</span>
            </div>

          </form>
        ) : (
          /* Success Screen & Order Confirmation */
          <div className="space-y-6 py-4 text-center animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
              <Check className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3 py-0.5 rounded-full">
                Commande Enregistrée
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                Mabrouk ! Merci pour votre confiance.
              </h2>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Votre commande a été transmise à notre laboratoire de formulation botanique en Tunisie.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-left text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500 font-medium">Référence Commande</span>
                <span className="font-mono font-bold text-stone-900 bg-stone-200 px-2 py-0.5 rounded text-[11px]">
                  {orderResult.paymentRef || orderResult.orderId}
                </span>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-stone-500 font-medium">Mode de Paiement</span>
                <span className="font-bold text-emerald-900 uppercase text-[11px]">
                  {selectedGateway === 'cod' ? 'Espèces à la Livraison (COD)' : selectedGateway}
                </span>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-stone-500 font-medium">Destinataire</span>
                <span className="font-bold text-stone-900">{fullName}</span>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-stone-500 font-medium">Destination</span>
                <span className="font-semibold text-stone-900">{address}, {governorate}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-200 font-bold text-stone-900 text-sm">
                <span>Montant Total</span>
                <span className="text-emerald-900 font-extrabold text-base">
                  {total.toFixed(2).replace('.', ',')} DT
                </span>
              </div>

              {orderResult.instructions && (
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-[11px] text-amber-900 mt-2 flex items-start space-x-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{orderResult.instructions}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {orderResult.paymentUrl && (
                <a
                  href={orderResult.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-xs"
                >
                  <span>Ouvrir la Passerelle ({selectedGateway})</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={handlePrintReceipt}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2"
              >
                <Receipt className="w-4 h-4" />
                <span>Imprimer le Bon</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Retour à la Boutique</span>
              </button>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
};
