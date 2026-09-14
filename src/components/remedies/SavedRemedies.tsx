import React, { useState } from 'react';
import { RemedyRecipe, UserProfile } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { BookmarkCheck, Clock, Flame, ShieldAlert, Bell, Trash2, Printer, Sparkles, CheckCircle2 } from 'lucide-react';

interface SavedRemediesProps {
  remedies: RemedyRecipe[];
  user: UserProfile;
  onRemoveRemedy: (remedyId: string) => void;
  onNavigateToGenerator: () => void;
}

export const SavedRemedies: React.FC<SavedRemediesProps> = ({
  remedies,
  user,
  onRemoveRemedy,
  onNavigateToGenerator
}) => {
  const [scheduledSuccessId, setScheduledSuccessId] = useState<string | null>(null);

  const handleScheduleInngestReminder = (remedy: RemedyRecipe) => {
    setScheduledSuccessId(remedy.id);
    setTimeout(() => {
      setScheduledSuccessId(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-6 sm:p-8 rounded-3xl text-stone-100 flex items-center justify-between shadow-md border border-emerald-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Recetario Personal y Fórmulas Guardadas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Mis Remedios e Infusiones
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Gestiona tus fórmulas artesanales, programa avisos automáticos de toma con Inngest Workflows e imprime tus fichas medicinales.
          </p>
        </div>

        <Button variant="accent" size="md" onClick={onNavigateToGenerator} className="hidden sm:inline-flex">
          <Sparkles className="w-4 h-4" />
          <span>Formular Nuevo</span>
        </Button>
      </div>

      {remedies.length === 0 ? (
        <div className="text-center py-16 bg-stone-100/60 rounded-2xl border border-dashed border-stone-300 p-8 space-y-4">
          <BookmarkCheck className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-stone-800">No tienes remedios guardados aún</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Explora el Generador de Remedios IA para crear tus propias fórmulas botánicas e infusiones personalizadas.
          </p>
          <Button variant="primary" size="sm" onClick={onNavigateToGenerator}>
            Ir al Generador de Remedios IA
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {remedies.map((remedy) => (
            <Card key={remedy.id} className="p-6 space-y-4 border-emerald-900/15 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={remedy.isAiGenerated ? 'emerald' : 'amber'} className="text-[10px] uppercase font-bold">
                        {remedy.isAiGenerated ? 'Fórmula IA' : 'Receta Tradicional'}
                      </Badge>
                      <span className="text-[11px] text-stone-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {remedy.prepTimeMinutes} min
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-stone-900">{remedy.title}</CardTitle>
                    <p className="text-xs text-stone-600 mt-0.5">{remedy.subtitle}</p>
                  </div>

                  <button
                    onClick={() => onRemoveRemedy(remedy.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Eliminar de mi recetario"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Ingredients */}
                <div className="bg-stone-100 p-3.5 rounded-xl text-xs space-y-1.5 border border-stone-200">
                  <span className="font-bold text-stone-900 block">Ingredientes & Dosis:</span>
                  <ul className="space-y-1 text-stone-700">
                    {remedy.ingredients.map((ing, i) => (
                      <li key={i} className="flex justify-between items-center text-[11px]">
                        <span>• {ing.plantName}</span>
                        <span className="font-mono font-semibold text-emerald-900">{ing.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation Steps Summary */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-stone-900 block flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-700" /> Preparación:
                  </span>
                  <p className="text-stone-600 text-[11px] line-clamp-3 leading-relaxed">
                    {remedy.preparationSteps.join(' ')}
                  </p>
                </div>

                <div className="text-[11px] text-emerald-950 font-medium bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <strong>Pauta:</strong> {remedy.dosageAndUsage} ({remedy.bestTime})
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="text-[11px]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Imprimir Ficha</span>
                </Button>

                {scheduledSuccessId === remedy.id ? (
                  <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" /> ¡Aviso programado con Inngest!
                  </span>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleScheduleInngestReminder(remedy)}
                    className="text-[11px]"
                  >
                    <Bell className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Programar Recordatorio Inngest</span>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
