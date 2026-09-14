import React, { useState } from 'react';
import { Ailment, Plant } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { HeartPulse, ShieldAlert, Sparkles, ArrowRight, Activity, Brain, Stethoscope, Sparkle } from 'lucide-react';

interface AilmentEncyclopediaProps {
  ailments: Ailment[];
  plants: Plant[];
  onSelectHerb: (plant: Plant) => void;
  onCraftRemedyForAilment: (ailmentName: string) => void;
}

export const AilmentEncyclopedia: React.FC<AilmentEncyclopediaProps> = ({
  ailments,
  plants,
  onSelectHerb,
  onCraftRemedyForAilment
}) => {
  const [selectedSystem, setSelectedSystem] = useState<string>('todos');

  const systems = [
    { id: 'todos', label: 'Todos los Sistemas' },
    { id: 'nervioso', label: 'Sistema Nervioso & Ensueño' },
    { id: 'digestivo', label: 'Sistema Digestivo & Hepático' },
    { id: 'respiratorio', label: 'Sistema Respiratorio' },
    { id: 'muscular', label: 'Sistema Muscular & Articular' },
    { id: 'dermatologico', label: 'Piel & Dermatología' }
  ];

  const filteredAilments = ailments.filter(a =>
    selectedSystem === 'todos' ? true : a.bodySystem === selectedSystem
  );

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-emerald-900 to-emerald-950 p-6 sm:p-8 rounded-3xl text-stone-100 shadow-md border border-emerald-800/40 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-semibold">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Guía Clínica de Síntomas & Fitoterapia</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Enciclopedia de Síntomas y Dolencias
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
          Navega por sistemas corporales para descubrir plantas medicinales de acción comprobada, pautas de vida saludable y contraindicaciones importantes.
        </p>
      </div>

      {/* System Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none bg-stone-100 p-2.5 rounded-2xl border border-stone-200">
        {systems.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSystem(s.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedSystem === s.id
                ? 'bg-emerald-800 text-stone-50 font-bold shadow-xs'
                : 'bg-stone-200/60 text-stone-700 hover:bg-stone-300/80'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Ailments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAilments.map((ailment) => {
          const matchedPlants = plants.filter(p => ailment.recommendedHerbs.includes(p.id));

          return (
            <Card key={ailment.id} className="p-6 space-y-4 border-emerald-900/10">
              <div className="flex items-start justify-between border-b border-stone-200 pb-3">
                <div>
                  <Badge variant="emerald" className="uppercase text-[10px] font-bold mb-1">
                    {ailment.bodySystem}
                  </Badge>
                  <CardTitle className="text-xl font-bold text-stone-900">
                    {ailment.name}
                  </CardTitle>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCraftRemedyForAilment(ailment.name)}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Formular IA</span>
                </Button>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {ailment.description}
              </p>

              {/* Recommended Herbs */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                  Plantas Medicinales Recomendadas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {matchedPlants.map((plant) => (
                    <button
                      key={plant.id}
                      onClick={() => onSelectHerb(plant)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-100/80 text-emerald-950 border border-emerald-200/80 hover:bg-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>🌿 {plant.name}</span>
                      <ArrowRight className="w-3 h-3 text-emerald-700" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Lifestyle Advice */}
              <div className="bg-stone-100 p-3.5 rounded-xl text-xs space-y-1.5 border border-stone-200">
                <span className="font-bold text-stone-900 block">Hábitos y Consejos Recomendados:</span>
                <ul className="space-y-1 text-stone-700">
                  {ailment.lifestyleAdvice.map((advice, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-800 font-bold">•</span>
                      <span>{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warnings */}
              <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 border border-amber-200/80 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{ailment.warnings}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
