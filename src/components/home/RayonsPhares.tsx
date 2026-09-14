import React from 'react';
import { ChevronRight } from 'lucide-react';
import { RAYONS_PHARES } from '../../data/productsData';
import { ProductCategory } from '../../types';

interface RayonsPharesProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onExploreAll: () => void;
}

export const RayonsPhares: React.FC<RayonsPharesProps> = ({
  onSelectCategory,
  onExploreAll
}) => {
  return (
    <section className="py-10 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-stone-900">
            NOS RAYONS PHARES
          </h2>
          <button
            onClick={onExploreAll}
            className="flex items-center space-x-1 text-xs font-semibold text-stone-700 hover:text-[#0f291e] transition-colors cursor-pointer"
          >
            <span>Tout explorer</span>
            <ChevronRight className="w-4 h-4 text-stone-500" />
          </button>
        </div>

        {/* Circular Category Grid / Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 text-center">
          {RAYONS_PHARES.map((rayon) => (
            <div
              key={rayon.id}
              onClick={() => onSelectCategory(rayon.categoryKey)}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Circle Avatar Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-stone-200 group-hover:border-[#0f291e] transition-all p-1 bg-stone-50 shadow-xs mb-2">
                <img
                  src={rayon.imageUrl}
                  alt={rayon.title}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Category Title */}
              <h3 className="font-semibold text-xs sm:text-sm text-stone-900 group-hover:text-[#0f291e] transition-colors leading-tight">
                {rayon.title}
              </h3>

              {/* Subtitle Badge / Label */}
              <span className="text-[10px] text-stone-500 font-medium mt-0.5">
                {rayon.subtitle}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
