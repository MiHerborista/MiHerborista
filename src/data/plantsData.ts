import { Plant } from '../types';

export const INITIAL_PLANTS: Plant[] = [
  {
    id: 'manzanilla',
    name: 'Manzanilla',
    scientificName: 'Matricaria chamomilla',
    category: 'digestivo',
    tags: ['Digestión', 'Calmante', 'Espasmos', 'Antiinflamatorio'],
    description: 'Planta medicinal ampliamente valorada por sus propiedades carminativas, sedantes suaves y antiinflamatorias digestivas.',
    benefits: [
      'Alivia las digestiones pesadas y los espasmos estomacales',
      'Promueve un sueño reparador y reduce la ansiedad leve',
      'Propiedades antiinflamatorias para mucosas y piel',
      'Calma los cólicos intestinales y menstruales'
    ],
    preparationMethods: ['infusion', 'cataplasma', 'vaho'],
    dosage: '1 cucharada de flores secas por taza de agua caliente (85°C), infusionar durante 5-8 minutos. 2 a 3 tazas al día.',
    contraindications: [
      'Alergia a las asteráceas (compuestas)',
      'Interacción potencial con anticoagulantes en dosis extremadamente altas'
    ],
    activePrinciples: ['Bisabolol', 'Camazuleno', 'Apigenina', 'Flavonoides'],
    flavorProfile: 'Dulce, floral con matices terrosos y suaves',
    origin: 'Europa y Asia Occidental',
    recommendedFor: ['Indigestión', 'Insomnio leve', 'Gases e hinchazón', 'Estrés'],
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'lavanda',
    name: 'Lavanda',
    scientificName: 'Lavandula angustifolia',
    category: 'relajante',
    tags: ['Relajante', 'Ansiedad', 'Sueño', 'Aromaterapia'],
    description: 'Emblemática flor aromática mediterránea conocida por sus efectos neurocalmantes, ansiolíticos y cicatrizantes.',
    benefits: [
      'Reduce notablemente los niveles de cortisol y el estrés',
      'Induce un estado de relajación propicio para combatir el insomnio',
      'Alivia cefaleas tensionales mediante infusión o aromaterapia',
      'Propiedades antisépticas para pequeñas irritaciones cutáneas'
    ],
    preparationMethods: ['infusion', 'aceite_esencial', 'vaho', 'tintura'],
    dosage: '1 cucharadita de flores secas por taza de agua. Infusionar tapado durante 10 minutos antes de dormir.',
    contraindications: [
      'Evitar aceite esencial puro por vía oral en niños y gestantes',
      'Sensibilidad cutánea en aplicación directa del aceite concentrado'
    ],
    activePrinciples: ['Linalool', 'Acetato de linalilo', 'Taninos', 'Cumarinas'],
    flavorProfile: 'Floral intenso, algo alcanforado y dulce',
    origin: 'Cuenca Mediterránea',
    recommendedFor: ['Insomnio', 'Estrés y Ansiedad', 'Dolor de cabeza', 'Tensión muscular'],
    imageUrl: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'valeriana',
    name: 'Valeriana',
    scientificName: 'Valeriana officinalis',
    category: 'relajante',
    tags: ['Insomnio Grave', 'Sedante', 'Ansiolítico', 'Raíz'],
    description: 'La raíz de valeriana es una de las plantas sedantes más eficaces y estudiadas en la fitoterapia tradicional y moderna.',
    benefits: [
      'Disminuye el tiempo necesario para conciliar el sueño',
      'Mejora la calidad de las fases profundas del descanso nocturno',
      'Alivia la agitación nerviosa, el nerviosismo y la irritabilidad',
      'Efecto antiespasmódico sobre la musculatura lisa'
    ],
    preparationMethods: ['decoccion', 'tintura'],
    dosage: '1 cucharadita de raíz troceada hervida a fuego lento 5 minutos en agua, o 30-40 gotas de tintura 30 min antes de dormir.',
    contraindications: [
      'No combinar con sedantes sintéticos o alcohol',
      'Evitar en el embarazo y lactancia sin supervisión',
      'No conducir tras su consumo'
    ],
    activePrinciples: ['Ácido valerénico', 'Valepotriatos', 'GABA fitoquímico'],
    flavorProfile: 'Intenso, terroso, penetrante y leñoso',
    origin: 'Europa y parte de Asia',
    recommendedFor: ['Insomnio rebelde', 'Ansiedad aguda', 'Taquicardia nerviosa', 'Espasmos'],
    imageUrl: 'https://images.unsplash.com/photo-1544830728-8d4850d53cfa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'menta_poleo',
    name: 'Menta Piperita',
    scientificName: 'Mentha x piperita',
    category: 'digestivo',
    tags: ['Menta', 'Refrescante', 'Espasmos', 'Digestivo'],
    description: 'Planta aromática con alto contenido en mentol que estimula la secreción biliar, alivia el estreñimiento tónico y despeja las vías respiratorias.',
    benefits: [
      'Facilita la digestión de grasas estimulando el flujo biliar',
      'Alivia náuseas, mareos y pesantez abdominal',
      'Efecto refrescante que ayuda en resfriados y congestión nasal',
      'Ayuda a calmar dolores cefálicos tensionales'
    ],
    preparationMethods: ['infusion', 'aceite_esencial', 'vaho'],
    dosage: '1 cucharada de hojas por taza. Infusionar 5 minutos tapado para conservar aceites volátiles.',
    contraindications: [
      'Reflujo gastroesofágico (puede relajar el esfínter esofágico)',
      'Cálculos biliares graves (por efecto colagogo)'
    ],
    activePrinciples: ['Mentol', 'Mentona', 'Acetato de mentilo', 'Flavonoides'],
    flavorProfile: 'Refrescante, balsámico, mentolado penetrante',
    origin: 'Europa',
    recommendedFor: ['Pesadez estomacal', 'Gases', 'Congestión nasal', 'Cefaleas'],
    imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'equinacea',
    name: 'Equinácea',
    scientificName: 'Echinacea purpurea',
    category: 'inmunologico',
    tags: ['Defensas', 'Inmunidad', 'Gripe', 'Prevención'],
    description: 'Potente inmunoestimulante natural que ayuda al organismo a prevenir y acortar la duración de resfriados e infecciones respiratorias.',
    benefits: [
      'Estimula la actividad de los fagocitos y leucocitos',
      'Disminuye la intensidad y duración de los síntomas gripales',
      'Acción antiviral y antibacteriana suave',
      'Refuerza las defensas en cambios de estación'
    ],
    preparationMethods: ['decoccion', 'tintura'],
    dosage: 'Decocción de raíz/planta seca: 1-2g por taza. Tratamientos discontinuos (máximo 8 semanas seguidas).',
    contraindications: [
      'Enfermedades autoinmunes (Lupus, Esclerosis Múltiple)',
      'Alergia a la familia de las compuestas'
    ],
    activePrinciples: ['Alquilamidas', 'Ácido chicórico', 'Polisacáridos complejos'],
    flavorProfile: 'Ligeramente picante, astringente con leve cosquilleo en lengua',
    origin: 'Norteamérica',
    recommendedFor: ['Defensas bajas', 'Gripe y Resfriado', 'Infecciones recurrentes', 'Farinitis'],
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'jengibre',
    name: 'Jengibre',
    scientificName: 'Zingiber officinale',
    category: 'antiinflamatorio',
    tags: ['Calor', 'Digestión', 'Náuseas', 'Articulaciones'],
    description: 'Rizoma milenario con extraordinario poder termogénico, antiemético, analgésico natural y protector cardiovascular.',
    benefits: [
      'Elimina eficazmente el mareo, las náuseas de viaje y matutinas',
      'Reduce la inflamación articular en artrosis y artritis',
      'Activa el metabolismo y favorece la circulación sanguínea',
      'Alivia la congestión pulmonar y el resfrío'
    ],
    preparationMethods: ['decoccion', 'infusion', 'cataplasma'],
    dosage: 'Rizoma fresco rallado (1 cm) o en polvo (0.5g) hervido durante 5-10 minutos con limón y miel.',
    contraindications: [
      'Úlceras gástricas activas o hemorragias',
      'Dosis muy elevadas con anticoagulantes'
    ],
    activePrinciples: ['Gingeroles', 'Sogaoles', 'Zingibereno', 'Aceites esenciales'],
    flavorProfile: 'Picante, cálido, cítrico y picante sostenido',
    origin: 'Sudeste Asiático',
    recommendedFor: ['Náuseas', 'Dolor articular', 'Mala circulación', 'Resfriado frío'],
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'romero',
    name: 'Romero',
    scientificName: 'Salvia rosmarinus',
    category: 'circulatorio',
    tags: ['Tónico', 'Memoria', 'Circulación', 'Digestión'],
    description: 'Arbusto mediterráneo considerado tónico cerebral, hepático y vigorizante. Estimula la concentración y combate la fatiga física y mental.',
    benefits: [
      'Aumenta la irrigación cerebral mejorando el estado de alerta',
      'Protector hepático y estimulante de la producción de hiel',
      'Tonificante venoso para piernas cansadas y mala circulación',
      'Potente antioxidante natural'
    ],
    preparationMethods: ['infusion', 'tintura', 'vaho', 'aceite_esencial'],
    dosage: '1 cucharadita de hojas secas por taza de agua hirviendo. Tomar por la mañana o temprano en la tarde.',
    contraindications: [
      'Hipertensión severa sin controlar (en altas dosis)',
      'Epilepsia (para aceite esencial concentrado)'
    ],
    activePrinciples: ['Ácido rosmarínico', 'Cineol', 'Cánfora', 'Carnasol'],
    flavorProfile: 'Resinoso, pino, aromático fresco y algo amargo',
    origin: 'Región Mediterránea',
    recommendedFor: ['Cansancio mental', 'Digestión lenta', 'Piernas cansadas', 'Caída de cabello'],
    imageUrl: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tomillo',
    name: 'Tomillo',
    scientificName: 'Thymus vulgaris',
    category: 'respiratorio',
    tags: ['Antiséptico', 'Tos', 'Pulmones', 'Infección'],
    description: 'Planta antiséptica por excelencia. El timol otorga una acción desinfectante profunda sobre las vías respiratorias y el sistema digestivo.',
    benefits: [
      'Poderoso antiséptico y expectorante en bronquitis y tos productiva',
      'Calma los espasmos de tos seca e irritativa',
      'Eficaz en enjuagues para llagas bucales y encías inflamadas',
      'Fortalece la flora intestinal ante parásitos'
    ],
    preparationMethods: ['infusion', 'vaho', 'jarabe'],
    dosage: '1 cucharadita de sumidades floridas por taza de agua. Infusionar 8 minutos. Ideal con miel de tomillo.',
    contraindications: [
      'Alergia al timol o lamiáceas',
      'Gastritis aguda en dosis concentradas'
    ],
    activePrinciples: ['Timol', 'Carvacrol', 'Flavonoides (Luteolina)', 'Ácido caféico'],
    flavorProfile: 'Aromático, terroso, penetrante y ligeramente picante',
    origin: 'Cuenca Mediterránea',
    recommendedFor: ['Tos irritativa', 'Bronquitis', 'Infección de garganta', 'Gases'],
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'diente_de_leon',
    name: 'Diente de León',
    scientificName: 'Taraxacum officinale',
    category: 'depurativo',
    tags: ['Hígado', 'Detox', 'Diurético', 'Digestivo'],
    description: 'Planta silvestre depurativa excepcional que estimula la función hepato-biliar y renal sin pérdida excesiva de potasio.',
    benefits: [
      'Estimula la eliminación de toxinas a través del hígado y riñones',
      'Acción diurética suave que combate la retención de líquidos',
      'Favorece la eliminación de ácido úrico',
      'Aporta principios amargos que abren el apetito y mejoran la digestión'
    ],
    preparationMethods: ['decoccion', 'infusion'],
    dosage: '1 cucharada de raíz y hojas por taza. Hervir 3 minutos y dejar reposar 5 min. Tomar antes de las comidas.',
    contraindications: [
      'Obstrucción de vías biliares (coledocolitiasis)',
      'Insuficiencia renal severa'
    ],
    activePrinciples: ['Taraxacina', 'Inulina', 'Potasio', 'Flavonoides'],
    flavorProfile: 'Amargo característico, terroso y herbáceo',
    origin: 'Hmisferio Norte',
    recommendedFor: ['Retención de líquidos', 'Sobrecarga hepática', 'Ácido úrico', 'Acné depurativo'],
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'calendula',
    name: 'Caléndula',
    scientificName: 'Calendula officinalis',
    category: 'piel',
    tags: ['Piel', 'Cicatrizante', 'Quemaduras', 'Suave'],
    description: 'Flor dorada apreciada mundialmente por su capacidad para regenerar la piel, calmar irritaciones y cicatrizar heridas.',
    benefits: [
      'Acelera la reepitelización cutánea en quemaduras leves y heridas',
      'Calma la piel atópica, eccemas y dermatitis',
      'Acción antiinflamatoria en mucosas orales e intestinales',
      'Regula el ciclo menstrual y alivia espasmos'
    ],
    preparationMethods: ['infusion', 'cataplasma', 'aceite_esencial'],
    dosage: '1 cucharada de pétalos por taza en infusión, o aplicar compresión externa con la infusión tibia.',
    contraindications: [
      'Alergia a las compuestas',
      'Raras reacciones dermatológicas de contacto'
    ],
    activePrinciples: ['Calendulina', 'Carotenoides', 'Flavonoides', 'Saponinas'],
    flavorProfile: 'Herbáceo suave, ligeramente resinoso y salado',
    origin: 'Sur de Europa',
    recommendedFor: ['Dermatitis', 'Quemaduras solares', 'Cicatrices', 'Irritación de piel'],
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'
  }
];
