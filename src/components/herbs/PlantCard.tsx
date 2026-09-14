import React from 'react';
import { Plant } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Leaf, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onSelect: (plant: Plant) => void;
  onCraftRemedyWithPlant?: (plant: Plant) => void;
  isSaved?: boolean;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  onSelect,
  onCraftRemedyWithPlant,
  isSaved
}) => {
  const categoryVariantMap: Record<string, 'emerald' | 'amber' | 'teal' | 'rose' | 'stone'> = {
    digestivo: 'amber',
    relajante: 'teal',
    inmunologico: 'emerald',
    antiinflamatorio: 'rose',
    respiratorio: 'emerald',
    circulatorio: 'teal',
    depurativo: 'amber',
    piel: 'rose'
  };

  return (
    <Card onClick={() => onSelect(plant)} className="flex flex-col justify-between group h-full">
      <div>
        {/* Plant Image / Banner */}
        <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3 bg-stone-200">
          <img
            src={plant.imageUrl || 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&q=80&w=800'}
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <Badge variant={categoryVariantMap[plant.category] || 'emerald'} className="capitalize font-semibold shadow-xs">
              {plant.category}
            </Badge>
          </div>
          {isSaved && (
            <div className="absolute top-2 right-2 bg-emerald-800 text-stone-50 p-1.5 rounded-lg shadow-sm">
              <Leaf className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Plant Names */}
        <CardHeader className="p-0">
          <div className="flex items-baseline justify-between">
            <CardTitle className="text-xl font-bold group-hover:text-emerald-900 transition-colors">
              {plant.name}
            </CardTitle>
          </div>
          <p className="text-xs italic text-stone-500 font-serif">
            {plant.scientificName}
          </p>
        </CardHeader>

        {/* Short Description */}
        <CardContent className="p-0 mt-2 space-y-2.5">
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {plant.description}
          </p>

          {/* Benefits bullets */}
          <ul className="space-y-1 text-xs text-stone-700">
            {plant.benefits.slice(0, 2).map((benefit, i) => (
              <li key={i} className="flex items-start space-x-1.5">
                <span className="text-emerald-700 font-bold">•</span>
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {plant.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] bg-stone-200/60 text-stone-700 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </div>

      {/* Footer Controls */}
      <CardFooter className="p-0 mt-4 pt-3">
        {plant.contraindications.length > 0 && (
          <span className="text-[10px] text-amber-800 flex items-center gap-1 font-medium bg-amber-50 px-2 py-1 rounded-md border border-amber-200/80">
            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
            {plant.contraindications.length} Precaución
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          className="ml-auto text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(plant);
          }}
        >
          <span>Ficha Completa</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
