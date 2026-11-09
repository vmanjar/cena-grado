export const SIDE_OPTIONS = [
  'Papas a la francesa',
  'Ensalada básica',
  'Papas y Ensalada'
];

export const DONENESS_OPTIONS = [
  'Término medio (1/2)',
  'Tres cuartos (3/4)',
  'Bien asado'
];

export const menuCourses = [
  {
    id: 'tiempo-1',
    title: 'Plato Fuerte',
    shortTitle: 'Plato fuerte',
    subtitle: 'Selecciona tu plato principal o salta este paso si prefieres no pedir fuerte',
    items: [
      {
        id: 'fuerte-antonia',
        name: 'Sándwich Antonia',
        description: 'Pan Ciabatta, Jamón de Pavo, Crema de Stracciatella, Rúgula, Tomates Secos, Tomate fresco, Vinagre Balsámico, Pesto de Albahaca y Pistachos.',
        price: 39500,
        requiresSide: true
      },
      {
        id: 'fuerte-mediterraneo-veggie',
        name: 'Sándwich Mediterráneo Veggie',
        description: 'Pan Ciabatta con Vegetales Asados, Tzatziki con Aceitunas Negras, Cebolla Roja encurtida, Rúgula, Albahaca, Tomate Milano y Queso Feta.',
        price: 32000,
        requiresSide: true
      },
      {
        id: 'fuerte-ameli',
        name: 'Hamburguesa Ameli',
        description: 'Carne de Res 170 gr asada al carbón en el término que desee, con Queso Gouda, Arándanos en reducción de vino tinto, Tocineta y Mayonesa de Trufa Negra en Pan suave con ajonjolí.',
        price: 43000,
        requiresSide: true,
        requiresDoneness: true
      },
      {
        id: 'fuerte-lomo-setas',
        name: 'Medallones de Lomo de Res con Setas',
        description: 'Dos Medallones de Lomo de 250 gr terminados en horno de carbón, con setas salteadas en vino tinto y crema de leche. Acompañados de Papas en casco y ensalada rústica.',
        price: 45000,
        requiresDoneness: true
      },
      {
        id: 'fuerte-salmon',
        name: 'Salmón de la Casa',
        description: 'Filete de salmón sellado a la parrilla con salsa de maracuyá y toque de hierbas frescas. Acompañado de papitas artesanales y ensalada del día.',
        price: 45000
      }
    ]
  },
  {
    id: 'tiempo-2',
    title: 'Bebida de Mesa',
    shortTitle: 'Bebida de mesa',
    subtitle: 'Bebida fría servida para acompañar la cena',
    items: [
      {
        id: 'bebida-soda-rojos',
        name: 'Soda de Frutos Rojos',
        description: 'Agua carbonatada refrescante con infusión y reducción natural de frutos del bosque.',
        price: 12000
      },
      {
        id: 'bebida-soda-amarillos',
        name: 'Soda de Frutos Amarillos',
        description: 'Soda artesanal fresca con reducción natural de maracuyá, mango y frutas amarillas.',
        price: 12000
      },
      {
        id: 'bebida-limonada-coco',
        name: 'Limonada de Coco',
        description: 'Cremosa preparación clásica a base de leche y pulpa de coco natural con zumo de limón.',
        price: 12000
      },
      {
        id: 'bebida-limonada-lychees',
        name: 'Limonada de Lychees',
        description: 'Limonada natural combinada con la suavidad aromática y dulce de la fruta lychee.',
        price: 12000
      },
      {
        id: 'bebida-jugo-natural',
        name: 'Jugo Natural del Día',
        description: 'Zumo recién preparado con fruta fresca de temporada en agua.',
        price: 8500
      },
      {
        id: 'bebida-limonada-hierbabuena',
        name: 'Limonada de Hierbabuena',
        description: 'Limonada tradicional macerada al momento con hojas frescas de hierbabuena y hielo.',
        price: 7500
      },
      {
        id: 'bebida-cerveza-stella',
        name: 'Cerveza Stella Artois',
        description: 'Cerveza rubia lager europea servida bien fría en botella de 330 ml.',
        price: 10000
      },
      {
        id: 'bebida-cerveza-corona',
        name: 'Cerveza Corona',
        description: 'Clásica cerveza clara mexicana servida en botella con rodaja de limón.',
        price: 10000
      },
      {
        id: 'bebida-cerveza-club',
        name: 'Cerveza Club Colombia',
        description: 'Cerveza tipo lager dorada tradicional servida fría en botella.',
        price: 8000
      }
    ]
  },
  {
    id: 'tiempo-3',
    title: 'Cóctel de Brindis',
    shortTitle: 'Cóctel de brindis',
    subtitle: 'Cóctel de autor para el momento de celebración',
    items: [
      {
        id: 'coctel-aperol',
        name: 'Aperol Spritz',
        description: 'Aperol, vino Prosecco espumoso, golpe de soda y rodaja de naranja fresca.',
        price: 32000,
        effectivePrice: 21300
      },
      {
        id: 'coctel-mojito',
        name: 'Mojito Collage',
        description: 'Ron Bacardí Añejo, Triple Sec, hierbabuena macerada al momento y zumo de limón.',
        price: 34000,
        effectivePrice: 22600
      },
      {
        id: 'coctel-margarita',
        name: 'Margarita Tradicional',
        description: 'Tequila Jose Cuervo, Triple Sec, jugo de limón y naranja con escarchado de sal de la casa.',
        price: 35000,
        effectivePrice: 23300
      },
      {
        id: 'coctel-lychee-martini',
        name: 'Lychee Martini',
        description: 'Gin Gordon’s, licor dulce de lychees Soho y Vermut Dry.',
        price: 35000,
        effectivePrice: 23300
      },
      {
        id: 'coctel-gin-tonic',
        name: 'Gin Tonic Botánico',
        description: 'Gin Gordon’s con tónica premium, infusionado con hierbas aromáticas y frutos frescos a elección.',
        price: 36000,
        effectivePrice: 24000
      },
      {
        id: 'coctel-negroni',
        name: 'Negroni Clásico',
        description: 'Gin Gordon’s, Campari, Vermut Rosso y piel de naranja macerada.',
        price: 38000,
        effectivePrice: 25300
      },
      {
        id: 'coctel-new-york-sour',
        name: 'New York Sour',
        description: 'Whisky Jameson, zumo de limón fresco, sirope simple y flotador superior de vino tinto.',
        price: 38000,
        effectivePrice: 25300
      }
    ]
  },
  {
    id: 'tiempo-4',
    title: 'Postre Artesanal',
    shortTitle: 'Postre artesanal',
    subtitle: 'Cierre dulce para compartir en la mesa',
    items: [
      {
        id: 'postre-almojabana',
        name: 'Torta Almojábana',
        description: 'Receta tradicional horneada, húmeda, esponjosa y 100% libre de gluten.',
        price: 13000
      },
      {
        id: 'postre-volcan-baileys',
        name: 'Volcán de Baileys y Chocolate',
        description: 'Bizcocho tibio de chocolate amargo con centro líquido cremoso infundido en crema de whisky Baileys.',
        price: 12500
      },
      {
        id: 'postre-tiramisu',
        name: 'Tiramisú Tradicional',
        description: 'Capas de bizcocho embebidas en café de origen con suave crema de mascarpone y cacao fino.',
        price: 12000
      },
      {
        id: 'postre-cheesecake',
        name: 'Cheesecake de Frutos Rojos',
        description: 'Base crocante de galleta con crema suave de queso horneada y mermelada natural de moras y arándanos.',
        price: 12000
      },
      {
        id: 'postre-torta-vegana',
        name: 'Torta Vegana de Amapola y Frutos',
        description: 'Preparación dulce 100% de origen vegetal a base de semillas de amapola y frutos secos.',
        price: 12000
      }
    ]
  },
  {
    id: 'tiempo-5',
    title: 'Bebida Caliente',
    shortTitle: 'Bebida caliente',
    subtitle: 'Café o infusión digestiva para la sobremesa',
    items: [
      {
        id: 'caliente-capuccino',
        name: 'Capuccino Tradicional',
        description: 'Extracción balanceada de café espresso con leche vaporizada y microespuma densa.',
        price: 9000
      },
      {
        id: 'caliente-latte',
        name: 'Café Latte',
        description: 'Bebida láctea suave y cremosa con una dosis sutil de café espresso.',
        price: 8500
      },
      {
        id: 'caliente-americano',
        name: 'Café Americano',
        description: 'Taza larga de café filtrado colombiano, aromático y de cuerpo ligero.',
        price: 7000
      },
      {
        id: 'caliente-chai',
        name: 'Té Chai Caliente',
        description: 'Té negro infusionado con cardamomo, clavo, canela y leche caliente espumada.',
        price: 9500
      },
      {
        id: 'caliente-aromatica',
        name: 'Aromática de Hierbabuena y Frutas',
        description: 'Infusión natural relajante con hojas de hierbabuena fresca y trozos de fruta deshidratada macerada.',
        price: 7500
      }
    ]
  }
];
