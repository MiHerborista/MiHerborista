import React from 'react';
import { Sparkles, MapPin, ChevronDown } from 'lucide-react';

interface TopNoticeBarProps {
  onOpenSoniaChat: () => void;
  onOpenSkinDiagnosis: () => void;
}

export const TopNoticeBar: React.FC<TopNoticeBarProps> = ({
  onOpenSoniaChat,
  onOpenSkinDiagnosis
}) => {
  return (
    <div className="bg-[#0f291e] text-stone-100 text-xs py-2 px-4 border-b border-emerald-950">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Notice */}
        <div className="flex items-center space-x-2 font-medium tracking-wide">
          <span className="text-emerald-400">🌱</span>
          <span>
            <strong>LIVRAISON OFFERTE</strong> dès 35 DT d'achat sur toute la Tunisie
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4 text-[11px]">
          <button
            onClick={onOpenSoniaChat}
            className="flex items-center space-x-1.5 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-100">Conseillère IA Sonia</span>
          </button>

          <span className="text-emerald-800">|</span>

          <button
            onClick={onOpenSkinDiagnosis}
            className="flex items-center space-x-1 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span>Diagnostic de peau</span>
          </button>

          <span className="text-emerald-800">|</span>

          <div className="hidden md:flex items-center space-x-1 text-stone-300 hover:text-white cursor-pointer">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>Boutiques Tunisie</span>
          </div>

          <span className="hidden md:inline text-emerald-800">|</span>

          <div className="flex items-center space-x-1 font-bold text-emerald-200 cursor-pointer">
            <span>TN / DT</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
