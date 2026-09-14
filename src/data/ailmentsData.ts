import { Ailment, RemedyRecipe } from '../types';

export const INITIAL_AILMENTS: Ailment[] = [
  {
    id: 'insomnio_ansiedad',
    name: 'Insomnio y Estrés Nervioso',
    bodySystem: 'nervioso',
    description: 'Dificultad para conciliar o mantener el sueño asociada a hiperactividad mental, tensión muscular o preocupación diaria.',
    recommendedHerbs: ['lavanda', 'valeriana', 'manzanilla'],
    lifestyleAdvice: [
      'Evitar pantallas de luz azul 1 hora antes de ir a la cama',
      'Mantener un horario regular de descanso',
      'Tomar la infusión tibia 30 a 45 minutos antes de dormir'
    ],
    warnings: 'Si el insomnio persiste más de 3 semanas o va acompañado de depresión grave, consulte con un profesional médico.'
  },
  {
    id: 'indigestion_gases',
    name: 'Indigestión Pesada y Hinchazón',
    bodySystem: 'digestivo',
    description: 'Sensación de plenitud excesiva tras comer, acumulación de gases, lentitud digestiva o espasmos estomacales.',
    recommendedHerbs: ['manzanilla', 'menta_poleo', 'jengibre', 'diente_de_leon'],
    lifestyleAdvice: [
      'Masticar despacio y comer en un ambiente tranquilo',
      'Evitar bebidas con gas durante la comida',
      'Dar un paseo corto suave tras las comidas principales'
    ],
    warnings: 'Dolores abdominales agudos, punzantes o acompañados de fiebre requieren evaluación médica inmediata.'
  },
  {
    id: 'resfriado_gripe',
    name: 'Gripe, Congestión y Defensas Bajas',
    bodySystem: 'respiratorio',
    description: 'Cuadro estacional con congestión nasal, mucosidad, dolor leve de garganta y sensación de malestar general.',
    recommendedHerbs: ['equinacea', 'tomillo', 'jengibre', 'menta_poleo'],
    lifestyleAdvice: [
      'Mantenerse bien hidratado con infusiones tibias y agua',
      'Realizar vapores de aromaterapia con eucalipto o tomillo',
      'Descansar para permitir al cuerpo enfocar energía en el sistema inmune'
    ],
    warnings: 'Si la fiebre supera los 38.5°C o persiste más de 3 días, consulte a su médico.'
  },
  {
    id: 'dolor_articular',
    name: 'Dolor y Rigidez Articular',
    bodySystem: 'muscular',
    description: 'Tensión en articulaciones, inflamación por esfuerzo físico, cambios de clima o desgaste progresivo.',
    recommendedHerbs: ['jengibre', 'romero', 'calendula'],
    lifestyleAdvice: [
      'Aplicar compresas calientes con infusión de jengibre y romero',
      'Realizar estiramientos suaves y movilidad articular matutina',
      'Mantener una dieta rica en antioxidantes naturales'
    ],
    warnings: 'En caso de inflamación roja, caliente e incapacitante, descarte infección o gota con su especialista.'
  },
  {
    id: 'irritacion_piel',
    name: 'Irritación Cutánea y Quemaduras Leves',
    bodySystem: 'dermatologico',
    description: 'Enrojecimiento por exposición solar, pequeñas quemaduras domésticas o eccemas leves en la piel.',
    recommendedHerbs: ['calendula', 'manzanilla', 'lavanda'],
    lifestyleAdvice: [
      'Evitar jabones agresivos con sulfatos',
      'Aplicar compresas frías empapadas en infusión de caléndula',
      'No frotar ni rcar la zona afectada'
    ],
    warnings: 'Quemaduras de segundo o tercer grado con ampollas abiertas exigen curación en centro sanitario.'
  }
];

export const INITIAL_REMEDIES: RemedyRecipe[] = [
  {
    id: 'infusion_noches_serenas',
    title: 'Infusión Noches Serenas',
    subtitle: 'Sinergia calmante de Valeriana, Lavanda y Manzanilla',
    ailmentTarget: 'Insomnio y Estrés Nervioso',
    category: 'relajante',
    prepTimeMinutes: 10,
    ingredients: [
      { plantName: 'Flores de Manzanilla', amount: '1 cucharadita (2g)', purpose: 'Relajar el plexo solar' },
      { plantName: 'Flores de Lavanda', amount: '1/2 cucharadita (1g)', purpose: 'Disminuir la agitación mental' },
      { plantName: 'Raíz de Valeriana', amount: '1/2 cucharadita (1g)', purpose: 'Facilitar el sueño profundo' }
    ],
    preparationSteps: [
      'Hervir 250ml de agua purificada hasta alcanzar ebullición (100°C).',
      'Verter la raíz de valeriana primero y hervir a fuego lento 2 minutos.',
      'Apagar el fuego, añadir la manzanilla y lavanda en la tetera.',
      'Tapar herméticamente y dejar infusionar durante 8 a 10 minutos.',
      'Colar con filtro fino. Opcional: endulzar con media cucharadita de miel de azahar.'
    ],
    dosageAndUsage: '1 taza unos 30-45 minutos antes de acostarse.',
    bestTime: 'Por la noche antes de dormir',
    precautions: [
      'No conducir tras su consumo.',
      'No mezclar con ansiolíticos sintéticos sin supervisión médica.'
    ],
    isAiGenerated: false,
    createdAt: '2026-09-01',
    favorite: true
  },
  {
    id: 'elixir_digestivo_herbal',
    title: 'Elixir Herbal Digestión Ligera',
    subtitle: 'Mezcla aromática de Menta, Jengibre y Diente de León',
    ailmentTarget: 'Indigestión Pesada y Hinchazón',
    category: 'digestivo',
    prepTimeMinutes: 8,
    ingredients: [
      { plantName: 'Hojas de Menta Piperita', amount: '1 cucharada (3g)', purpose: 'Aliviar hinchazón y espasmos' },
      { plantName: 'Rizoma de Jengibre fresco', amount: '2 rodajas finas', purpose: 'Estimular enzimas digestivas' },
      { plantName: 'Hojas de Diente de León', amount: '1/2 cucharadita (1g)', purpose: 'Activar función hepática' }
    ],
    preparationSteps: [
      'Calentar 250ml de agua hasta hervir.',
      'Colocar las rodajas de jengibre en el agua hirviendo por 3 minutos.',
      'Añadir la menta y el diente de león y apagar el fuego inmediatamente.',
      'Tapar durante 6 minutos para evitar la pérdida de mentol evaporado.',
      'Servir con unas gotas de jugo de limón fresco.'
    ],
    dosageAndUsage: '1 taza justo después de comidas copiosas o pesadas.',
    bestTime: 'Post-almuerzo o post-cena',
    precautions: ['Si padece de reflujo grave, reducir la cantidad de menta.'],
    isAiGenerated: false,
    createdAt: '2026-09-02',
    favorite: false
  },
  {
    id: 'balsamo_defensas_vitales',
    title: 'Té Protector Defensas Vitales',
    subtitle: 'Infusión estimulante de Tomillo, Equinácea y Jengibre',
    ailmentTarget: 'Gripe, Congestión y Defensas Bajas',
    category: 'inmunologico',
    prepTimeMinutes: 12,
    ingredients: [
      { plantName: 'Tomillo seco', amount: '1 cucharadita (2g)', purpose: 'Antiséptico de vías respiratorias' },
      { plantName: 'Raíz/Planta de Equinácea', amount: '1 cucharadita (2g)', purpose: 'Estimular defensas naturales' },
      { plantName: 'Jengibre rallado', amount: '1/2 cucharadita', purpose: 'Efecto diaforético y calorífico' }
    ],
    preparationSteps: [
      'Poner a hervir 300ml de agua con el jengibre y la equinácea durante 4 minutos.',
      'Apagar el fuego, incorporar el tomillo seco.',
      'Reposar tapado durante 8 minutos.',
      'Colar bien e incorporar 1 cucharadita de miel pura de tomillo o eucalipto y unas gotas de limón.'
    ],
    dosageAndUsage: '2 a 3 tazas al día durante los primeros días de malestar o cambios de estación.',
    bestTime: 'Por la mañana y a media tarde',
    precautions: ['No tomar equinácea de forma ininterrumpida por más de 8 semanas.'],
    isAiGenerated: false,
    createdAt: '2026-09-05',
    favorite: true
  }
];
