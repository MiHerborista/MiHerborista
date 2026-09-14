import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PromoBarProps {
  onOpenSoniaChat: () => void;
}

export const PromoBar: React.FC<PromoBarProps> = ({ onOpenSoniaChat }) => {
  return (
    <div className="bg-[#0f291e] text-white py-3.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Left Status */}
        <div className="flex items-center space-x-2 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>
            <strong>Sonia, experte botaniste MiHerborista est en ligne</strong> • Diagnostic express & routines sur-mesure
          </span>
        </div>

        {/* Right CTA */}
        <button
          onClick={onOpenSoniaChat}
          className="inline-flex items-center space-x-1 px-4 py-1.5 bg-stone-100/10 hover:bg-stone-100/20 rounded-full font-bold text-xs text-stone-100 border border-stone-100/20 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Discuter avec Sonia (-10% code BIENVENUE10)</span>
          <ChevronRight className="w-4 h-4 text-emerald-300" />
        </button>

      </div>
    </div>
  );
};
