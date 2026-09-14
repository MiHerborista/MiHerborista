import React from 'react';
import { Plant, UserProfile } from '../../types';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AlertTriangle, ShieldAlert, Sparkles, Bookmark, BookmarkCheck, Beaker, Flame, Thermometer, MapPin } from 'lucide-react';

interface PlantDetailModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleSavePlant: (plantId: string) => void;
  isSaved: boolean;
  onCraftRemedyWithPlant: (plant: Plant) => void;
  user: UserProfile;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  isOpen,
  onClose,
  onToggleSavePlant,
  isSaved,
  onCraftRemedyWithPlant,
  user
}) => {
  if (!plant) return null;

  // Check safety warnings against user profile (pregnancy or allergies)
  const isPregnantWarning = user.isPregnantOrNursing && (
    plant.contraindications.some(c => c.toLowerCase().includes('embarazo') || c.toLowerCase().includes('gestante'))
  );

  const allergyWarnings = user.allergies.filter(allergy =>
    plant.tags.some(t => t.toLowerCase().includes(allergy.toLowerCase())) ||
    plant.contraindications.some(c => c.toLowerCase().includes(allergy.toLowerCase()))
  );

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={plant.name}
      subtitle={plant.scientificName}
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Plant Image & Quick Badges */}
        <div className="relative h-56 w-full rounded-2xl overflow-hidden shadow-sm bg-stone-200">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Badge variant="emerald" className="bg-emerald-800 text-stone-50 font-semibold border-none">
                {plant.category.toUpperCase()}
              </Badge>
              <span className="text-xs text-stone-200 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                Origen: {plant.origin}
              </span>
            </div>
          </div>
        </div>

        {/* Health Warnings Banner if applicable */}
        {(isPregnantWarning || allergyWarnings.length > 0) && (
          <div className="bg-rose-50 border border-rose-300 p-4 rounded-xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-rose-950">Advertencia Personalizada de Salud (Clerk Health Filter)</p>
              {isPregnantWarning && (
                <p className="text-rose-800">• Esta planta contiene contraindicaciones para personas embarazadas o en periodo de lactancia.</p>
              )}
              {allergyWarnings.length > 0 && (
                <p className="text-rose-800">• Se detectó coincidencia con tus alergias registradas: {allergyWarnings.join(', ')}.</p>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-stone-700 leading-relaxed font-sans">
          {plant.description}
        </p>

        {/* Grid Benefits & Active Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-900/10 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              Beneficios Terapeúticos
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-800">
              {plant.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Beaker className="w-4 h-4 text-amber-700" />
              Principios Activos & Sabor
            </h4>
            <div className="text-xs text-stone-700 space-y-1.5">
              <p><strong>Fitoquímicos:</strong> {plant.activePrinciples.join(', ')}</p>
              <p><strong>Perfil Organoléptico:</strong> {plant.flavorProfile}</p>
              <p><strong>Recomendado para:</strong> {plant.recommendedFor.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Preparation & Dosage */}
        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-700" />
            Posología y Formas de Preparación Tradicional
          </h4>
          <p className="text-xs text-stone-800 leading-relaxed">
            {plant.dosage}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-xs text-stone-600 font-medium mr-1">Métodos recomendados:</span>
            {plant.preparationMethods.map((m) => (
              <Badge key={m} variant="amber" className="capitalize">
                {m.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contraindications & Precautions */}
        <div className="p-4 bg-stone-100/90 rounded-xl border border-stone-300 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Contraindicaciones y Precauciones
          </h4>
          <ul className="space-y-1 text-xs text-stone-700">
            {plant.contraindications.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant={isSaved ? 'outline' : 'secondary'}
            size="sm"
            onClick={() => onToggleSavePlant(plant.id)}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-emerald-800" />
                <span>Guardada en Mis Plantas</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-stone-600" />
                <span>Guardar Planta</span>
              </>
            )}
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              onClose();
              onCraftRemedyWithPlant(plant);
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Crear Mezcla Herbal IA con {plant.name}</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
