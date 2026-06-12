export type Condition = "A" | "B" | "C";

export type Category =
  | "motor"
  | "transmision"
  | "suspension"
  | "frenos"
  | "electrico"
  | "carroceria"
  | "aire-acondicionado"
  | "accesorios";

export interface Fitment {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
}

export interface Part {
  slug: string;
  title: string;
  category: Category;
  condition: Condition;
  priceUsd: number;
  description: string;
  fitments: Fitment[];
  available: boolean;
  inspected: boolean;
}

export const categoryLabels: Record<Category, string> = {
  motor: "Motor",
  transmision: "Transmisión",
  suspension: "Suspensión y dirección",
  frenos: "Frenos",
  electrico: "Eléctrico",
  carroceria: "Carrocería y luces",
  "aire-acondicionado": "Aire acondicionado",
  accesorios: "Accesorios",
};

export const conditionLabels: Record<Condition, string> = {
  A: "Condición A — como nuevo",
  B: "Condición B — buen estado",
  C: "Condición C — funcional",
};

// Inventario de muestra. En la Fase 2 esto se reemplaza por la base de
// datos (Supabase) administrada desde el panel.
export const parts: Part[] = [
  {
    slug: "alternador-toyota-corolla-2009-2013",
    title: "Alternador original Denso",
    category: "electrico",
    condition: "A",
    priceUsd: 85,
    description:
      "Alternador original Denso extraído de un Corolla 2011 con bajo kilometraje. Probado en banco: carga estable a 14.2V.",
    fitments: [{ make: "Toyota", model: "Corolla", yearFrom: 2009, yearTo: 2013 }],
    available: true,
    inspected: true,
  },
  {
    slug: "compresor-aa-chevrolet-aveo-2006-2011",
    title: "Compresor de aire acondicionado",
    category: "aire-acondicionado",
    condition: "B",
    priceUsd: 110,
    description:
      "Compresor de A/A para Chevrolet Aveo. Embrague y polea en buen estado, sin fugas. Incluye válvulas.",
    fitments: [{ make: "Chevrolet", model: "Aveo", yearFrom: 2006, yearTo: 2011 }],
    available: true,
    inspected: true,
  },
  {
    slug: "faro-delantero-derecho-ford-explorer-2011-2015",
    title: "Faro delantero derecho",
    category: "carroceria",
    condition: "A",
    priceUsd: 95,
    description:
      "Faro delantero lado pasajero, mica transparente sin rayones ni humedad. Anclajes completos.",
    fitments: [{ make: "Ford", model: "Explorer", yearFrom: 2011, yearTo: 2015 }],
    available: true,
    inspected: true,
  },
  {
    slug: "bomba-gasolina-toyota-hilux-2006-2014",
    title: "Bomba de gasolina completa",
    category: "motor",
    condition: "B",
    priceUsd: 70,
    description:
      "Módulo de bomba de gasolina con flotador. Probada con presión correcta de fábrica.",
    fitments: [{ make: "Toyota", model: "Hilux", yearFrom: 2006, yearTo: 2014 }],
    available: true,
    inspected: true,
  },
  {
    slug: "caja-direccion-hidraulica-chevrolet-optra-2004-2010",
    title: "Caja de dirección hidráulica",
    category: "suspension",
    condition: "B",
    priceUsd: 130,
    description:
      "Cajetín de dirección hidráulica sin fugas, cremallera en buen estado. Ideal para reemplazo directo.",
    fitments: [{ make: "Chevrolet", model: "Optra", yearFrom: 2004, yearTo: 2010 }],
    available: true,
    inspected: true,
  },
  {
    slug: "modulo-abs-jeep-grand-cherokee-2005-2010",
    title: "Módulo de ABS",
    category: "frenos",
    condition: "A",
    priceUsd: 160,
    description:
      "Unidad hidráulica de ABS con módulo electrónico. Retirada de vehículo en funcionamiento, sin códigos de falla.",
    fitments: [{ make: "Jeep", model: "Grand Cherokee", yearFrom: 2005, yearTo: 2010 }],
    available: true,
    inspected: true,
  },
  {
    slug: "espejo-retrovisor-izquierdo-toyota-hilux-2016-2020",
    title: "Espejo retrovisor eléctrico izquierdo",
    category: "carroceria",
    condition: "A",
    priceUsd: 75,
    description:
      "Retrovisor eléctrico lado conductor, vidrio y carcasa impecables, motor de ajuste operativo.",
    fitments: [{ make: "Toyota", model: "Hilux", yearFrom: 2016, yearTo: 2020 }],
    available: true,
    inspected: true,
  },
  {
    slug: "caja-automatica-ford-fiesta-2011-2016",
    title: "Caja automática PowerShift",
    category: "transmision",
    condition: "B",
    priceUsd: 450,
    description:
      "Transmisión automática completa, extraída de vehículo chocado por detrás con 60k millas. Se envía drenada y sellada.",
    fitments: [{ make: "Ford", model: "Fiesta", yearFrom: 2011, yearTo: 2016 }],
    available: true,
    inspected: true,
  },
];

export function getPart(slug: string): Part | undefined {
  return parts.find((p) => p.slug === slug);
}

export function allMakes(): string[] {
  return [...new Set(parts.flatMap((p) => p.fitments.map((f) => f.make)))].sort();
}

export interface CatalogFilters {
  q?: string;
  make?: string;
  category?: string;
}

export function searchParts({ q, make, category }: CatalogFilters): Part[] {
  return parts.filter((p) => {
    if (make && !p.fitments.some((f) => f.make === make)) return false;
    if (category && p.category !== category) return false;
    if (q) {
      const haystack = [
        p.title,
        p.description,
        categoryLabels[p.category],
        ...p.fitments.map((f) => `${f.make} ${f.model}`),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q.toLowerCase())) return false;
    }
    return true;
  });
}
