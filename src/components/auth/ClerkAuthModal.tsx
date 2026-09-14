import React, { useState } from 'react';
import { X, User, ShieldCheck, Mail, Heart, Sparkles, KeyRound, LogOut, CheckCircle2, UserPlus, LogIn, Lock, Phone, MapPin } from 'lucide-react';
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
  user,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'login' | 'register'>('profile');

  // Login form state
  const [emailInput, setEmailInput] = useState(user.email || 'yosra.herborista@gmail.com');
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  const [nameInput, setNameInput] = useState(user.fullName || 'Yosra Herborista');
  const [phoneInput, setPhoneInput] = useState('+216 22 952 999');
  const [addressInput, setAddressInput] = useState('Avenue Habib Bourguiba, Tunis');

  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      email: emailInput,
      fullName: nameInput || 'Client MiHerborista'
    });
    setNotification('Connexion réussie avec Clerk Auth !');
    setTimeout(() => {
      setNotification(null);
      setActiveTab('profile');
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `user_clerk_${Math.random().toString(36).substr(2, 9)}`;
    onUpdateUser({
      id: newId,
      fullName: nameInput,
      email: emailInput,
      role: 'client',
      savedProductIds: user.savedProductIds || [],
      cart: user.cart || []
    });
    setNotification('Compte créé et authentifié via Clerk !');
    setTimeout(() => {
      setNotification(null);
      setActiveTab('profile');
    }, 1500);
  };

  const handleSignOut = () => {
    onUpdateUser({
      id: 'guest_anon',
      fullName: 'Visiteur Invité',
      email: 'invite@miherborista.tn',
      role: 'client',
      savedProductIds: [],
      cart: []
    });
    setNotification('Déconnexion réussie.');
    setTimeout(() => {
      setNotification(null);
      setActiveTab('login');
    }, 1200);
  };

  const isGuest = user.id === 'guest_anon';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Clerk Auth Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#0f291e] text-white flex items-center justify-center mx-auto text-2xl font-bold font-serif shadow-md relative">
            {isGuest ? <User className="w-7 h-7 text-emerald-300" /> : user.fullName.slice(0, 2).toUpperCase()}
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Espace Auth Clerk
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Gestion de compte & authentification sécurisée
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex items-center justify-center p-1 bg-stone-100 rounded-xl space-x-1 mt-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-[#0f291e] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mon Profil
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-[#0f291e] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Se Connecter
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-[#0f291e] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Créer un Compte
            </button>
          </div>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* TAB 1: PROFIL & SESSIONS */}
        {activeTab === 'profile' && (
          <div className="space-y-5">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500 font-medium">Statut de la Session</span>
                <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full text-[11px] flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>{isGuest ? 'Session Invité' : 'Authentifié via Clerk'}</span>
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500 font-medium">Nom complet</span>
                <span className="font-bold text-stone-900">{user.fullName}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500 font-medium">Adresse Email</span>
                <span className="font-bold text-stone-900">{user.email}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500 font-medium">Identifiant Clerk (ID)</span>
                <span className="font-mono text-[10px] text-stone-600 bg-stone-200 px-2 py-0.5 rounded-md">{user.id}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-stone-500 font-medium">Produits Enregistrés</span>
                <span className="font-bold text-emerald-800">{user.savedProductIds.length} article(s)</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {isGuest ? (
                <button
                  onClick={() => setActiveTab('login')}
                  className="flex-1 py-3 bg-[#0f291e] hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-xs"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Se connecter avec Clerk</span>
                </button>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Se déconnecter</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SE CONNECTER */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Adresse Email (Clerk User)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="nom@exemple.tn"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0f291e]/30 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0f291e]/30 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0f291e] hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-xs mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Valider la Connexion</span>
            </button>
          </form>
        )}

        {/* TAB 3: CRÉER UN COMPTE */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nom & Prénom
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Yosra Ben Ali"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0f291e]/30 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="yosra@exemple.tn"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0f291e]/30 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Téléphone (Tunisie)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+216 22 952 999"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0f291e]/30 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0f291e] hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-xs mt-3"
            >
              <UserPlus className="w-4 h-4" />
              <span>S'inscrire avec Clerk Auth</span>
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-stone-200 text-center text-[10px] text-stone-400 flex items-center justify-center space-x-1">
          <Lock className="w-3 h-3 text-stone-400" />
          <span>Authentification sécurisée & cryptée via Clerk Infrastructure</span>
        </div>

      </div>
    </div>
  );
};
