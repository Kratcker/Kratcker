import {
  parts as seedParts,
  type CatalogFilters,
  type Category,
  type Condition,
  type Part,
} from "@/lib/inventory";
import { getSupabase } from "@/lib/supabase";

interface PartRow {
  slug: string;
  title: string;
  category: string;
  condition: string;
  price_usd: number;
  description: string;
  photos: string[];
  available: boolean;
  inspected: boolean;
  part_fitments: {
    make: string;
    model: string;
    year_from: number;
    year_to: number;
  }[];
}

function rowToPart(row: PartRow): Part {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category as Category,
    condition: row.condition as Condition,
    priceUsd: Number(row.price_usd),
    description: row.description,
    photos: row.photos ?? [],
    available: row.available,
    inspected: row.inspected,
    fitments: row.part_fitments.map((f) => ({
      make: f.make,
      model: f.model,
      yearFrom: f.year_from,
      yearTo: f.year_to,
    })),
  };
}

// Devuelve el inventario real (Supabase) o el de muestra si la base de
// datos aún no está configurada o no responde.
export async function getParts(): Promise<Part[]> {
  const supabase = getSupabase();
  if (!supabase) return seedParts;
  const { data, error } = await supabase
    .from("parts")
    .select("*, part_fitments(*)")
    .eq("available", true)
    .order("created_at", { ascending: false });
  if (error || !data) return seedParts;
  return (data as PartRow[]).map(rowToPart);
}

export async function getPart(slug: string): Promise<Part | undefined> {
  const all = await getParts();
  return all.find((p) => p.slug === slug);
}

export async function getMakes(): Promise<string[]> {
  const all = await getParts();
  return [...new Set(all.flatMap((p) => p.fitments.map((f) => f.make)))].sort();
}

export async function filterParts(filters: CatalogFilters): Promise<Part[]> {
  const { q, make, category } = filters;
  const all = await getParts();
  return all.filter((p) => {
    if (make && !p.fitments.some((f) => f.make === make)) return false;
    if (category && p.category !== category) return false;
    if (q) {
      const haystack = [
        p.title,
        p.description,
        ...p.fitments.map((f) => `${f.make} ${f.model}`),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q.toLowerCase())) return false;
    }
    return true;
  });
}
