import React from 'react';
import { X, User, ShieldCheck, Mail, Heart, Sparkles, KeyRound } from 'lucide-react';
import { UserProfile } from '../../types';

interface ClerkAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (u: UserProfile) => void;
}

export const ClerkAuthModal: React.FC<ClerkAuthModalProps> = ({
  isOpen,
  onClose,
  user
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0f291e] text-white flex items-center justify-center mx-auto text-xl font-bold font-serif shadow-md">
              {user.fullName.slice(0, 2).toUpperCase()}
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Espace Client Clerk Auth
            </h2>
            <p className="text-xs text-emerald-800 font-semibold bg-emerald-50 py-1 px-3 rounded-full w-fit mx-auto">
              Compte client authentifié
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-stone-200">
              <span className="text-stone-500 font-medium">Nom complet</span>
              <span className="font-bold text-stone-900">{user.fullName}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-stone-200">
              <span className="text-stone-500 font-medium">Adresse Email</span>
              <span className="font-bold text-stone-900">{user.email}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-stone-200">
              <span className="text-stone-500 font-medium">Identifiant Clerk</span>
              <span className="font-mono text-[10px] text-stone-600">{user.id}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-stone-500 font-medium">Produits Favoris</span>
              <span className="font-bold text-emerald-800">{user.savedProductIds.length} enregistrés</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Fermer mon espace
          </button>

        </div>

      </div>
    </div>
  );
};
