import React, { useState, useMemo } from 'react';
import { Plant, PlantCategory, UserProfile } from '../../types';
import { PlantCard } from './PlantCard';
import { PlantDetailModal } from './PlantDetailModal';
import { Search, Filter, Leaf, Sparkles, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface PlantCatalogProps {
  plants: Plant[];
  user: UserProfile;
  savedPlantIds: string[];
  onToggleSavePlant: (plantId: string) => void;
  onCraftRemedyWithPlant: (plant: Plant) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const PlantCatalog: React.FC<PlantCatalogProps> = ({
  plants,
  user,
  savedPlantIds,
  onToggleSavePlant,
  onCraftRemedyWithPlant,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activePlantModal, setActivePlantModal] = useState<Plant | null>(null);
  const [filterSafeForPregnancy, setFilterSafeForPregnancy] = useState(false);

  const categories = [
    { id: 'todos', label: 'Todas las Plantas' },
    { id: 'digestivo', label: 'Digestivo' },
    { id: 'relajante', label: 'Relajante / Sueño' },
    { id: 'inmunologico', label: 'Inmune & Defensas' },
    { id: 'antiinflamatorio', label: 'Antiinflamatorio' },
    { id: 'respiratorio', label: 'Respiratorio & Tos' },
    { id: 'circulatorio', label: 'Circulatorio' },
    { id: 'depurativo', label: 'Depurativo & Detox' },
    { id: 'piel', label: 'Cuidado de Piel' }
  ];

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      // Category match
      if (selectedCategory !== 'todos' && plant.category !== selectedCategory) {
        return false;
      }
      // Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = plant.name.toLowerCase().includes(q);
        const matchesScientific = plant.scientificName.toLowerCase().includes(q);
        const matchesTags = plant.tags.some(t => t.toLowerCase().includes(q));
        const matchesBenefits = plant.benefits.some(b => b.toLowerCase().includes(q));
        if (!matchesName && !matchesScientific && !matchesTags && !matchesBenefits) {
          return false;
        }
      }
      // Safety filter
      if (filterSafeForPregnancy) {
        const hasPregnancyWarning = plant.contraindications.some(
          c => c.toLowerCase().includes('embarazo') || c.toLowerCase().includes('gestante')
        );
        if (hasPregnancyWarning) return false;
      }
      return true;
    });
  }, [plants, selectedCategory, searchQuery, filterSafeForPregnancy]);

  return (
    <div className="space-y-6">
      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-8 sm:p-10 text-stone-100 shadow-lg border border-emerald-800/40">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold">
            <Leaf className="w-3.5 h-3.5" />
            <span>Herboristería Digital & Botánica Médica</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            Catálogo de Plantas Medicinales
          </h1>
          <p className="text-sm text-stone-300 leading-relaxed font-sans">
            Explora las propiedades terapéuticas, fitoquímicos y métodos de infusión tradicionales validados por nuestro motor de Inteligencia Artificial.
          </p>
        </div>
      </div>

      {/* Filter Controls & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-100/80 p-4 rounded-2xl border border-stone-200">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-stone-50 shadow-xs'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Safety checkbox filter */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="flex items-center space-x-2 text-xs font-semibold text-stone-700 bg-white/80 px-3 py-1.5 rounded-xl border border-stone-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filterSafeForPregnancy}
              onChange={(e) => setFilterSafeForPregnancy(e.target.checked)}
              className="w-3.5 h-3.5 text-emerald-800 rounded border-stone-300 focus:ring-emerald-700"
            />
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Apto Embarazo/Lactancia
            </span>
          </label>
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onSelect={(p) => setActivePlantModal(p)}
            onCraftRemedyWithPlant={onCraftRemedyWithPlant}
            isSaved={savedPlantIds.includes(plant.id)}
          />
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-16 bg-stone-100/60 rounded-2xl border border-dashed border-stone-300 p-8 space-y-3">
          <Leaf className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-lg font-bold font-serif text-stone-800">No se encontraron plantas medicinales</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Prueba a cambiar tu término de búsqueda o desactivar los filtros de seguridad.
          </p>
        </div>
      )}

      {/* Plant Detail Modal */}
      <PlantDetailModal
        plant={activePlantModal}
        isOpen={!!activePlantModal}
        onClose={() => setActivePlantModal(null)}
        onToggleSavePlant={onToggleSavePlant}
        isSaved={activePlantModal ? savedPlantIds.includes(activePlantModal.id) : false}
        onCraftRemedyWithPlant={onCraftRemedyWithPlant}
        user={user}
      />
    </div>
  );
};
