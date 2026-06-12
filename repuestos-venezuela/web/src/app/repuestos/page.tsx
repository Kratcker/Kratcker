import type { Metadata } from "next";
import { PartCard } from "@/components/PartCard";
import { filterParts, getMakes } from "@/lib/catalog";
import { categoryLabels, type Category } from "@/lib/inventory";

export const metadata: Metadata = {
  title: "Catálogo de repuestos usados inspeccionados",
  description:
    "Repuestos usados originales con inspección y garantía, listos para enviar desde Florida a Venezuela.",
};

interface Props {
  searchParams: Promise<{ q?: string; make?: string; category?: string }>;
}

export default async function CatalogPage({ searchParams }: Props) {
  const { q, make, category } = await searchParams;
  const results = await filterParts({ q, make, category });
  const makes = await getMakes();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-black text-ink">Catálogo de repuestos</h1>
      <p className="mt-1 text-slate-600">
        Todos inspeccionados antes del envío y con garantía. Los precios son base en USD; el envío se
        cotiza según tu ciudad.
      </p>

      <form className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_auto_auto_auto]">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Busca por pieza o vehículo: alternador, Corolla, Hilux…"
          className="rounded-xl border border-slate-300 px-4 py-2 focus:border-brand focus:outline-none"
        />
        <select
          name="make"
          defaultValue={make ?? ""}
          className="rounded-xl border border-slate-300 px-3 py-2"
        >
          <option value="">Todas las marcas</option>
          {makes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          name="category"
          defaultValue={category ?? ""}
          className="rounded-xl border border-slate-300 px-3 py-2"
        >
          <option value="">Todas las categorías</option>
          {(Object.keys(categoryLabels) as Category[]).map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-ink px-5 py-2 font-semibold text-white hover:bg-slate-800"
        >
          Buscar
        </button>
      </form>

      {results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-ink">No tenemos esa pieza publicada todavía.</p>
          <p className="mt-1 text-slate-600">
            Pero la podemos conseguir: pídela por encargo y la buscamos en los junkyards de Florida.
          </p>
          <a
            href="/encargo"
            className="mt-4 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-ink hover:bg-amber-400"
          >
            Pedir por encargo
          </a>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((part) => (
            <PartCard key={part.slug} part={part} />
          ))}
        </div>
      )}
    </div>
  );
}
