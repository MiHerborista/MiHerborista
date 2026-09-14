import React from 'react';
import { BookOpen, Clock, Sparkles, ChefHat, CheckCircle2 } from 'lucide-react';
import { INITIAL_RECIPES } from '../../data/productsData';

export const RecipesAndTutos: React.FC = () => {
  return (
    <section className="py-10 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold">
            <ChefHat className="w-4 h-4 text-emerald-800" />
            <span>Atelier Cosmétique DIY & Herboristerie</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Recettes & Tutoriels Laboratoire
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Formulez vos propres soins naturels à la maison grâce aux guides pas-à-pas rédigés par nos maîtres herboristes en Tunisie.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-16/9 bg-stone-100 overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#0f291e] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                  {recipe.category}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-emerald-800" />
                    <span>Préparation : {recipe.prepTimeMinutes} min</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-stone-100 rounded-md font-bold text-stone-700">
                    Niveau : {recipe.difficulty}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {recipe.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {recipe.summary}
                </p>

                {/* Ingredients needed */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-2">
                  <h4 className="font-bold text-xs text-stone-900">Ingrédients requis :</h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-white p-2 rounded-lg border border-stone-200">
                        <span className="font-medium text-stone-900 truncate">{ing.name}</span>
                        <span className="text-[10px] font-bold text-emerald-800 shrink-0 ml-1">{ing.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation Steps */}
                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-stone-900">Étapes de fabrication :</h4>
                  <ol className="space-y-2 text-xs text-stone-700">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#0f291e] text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
