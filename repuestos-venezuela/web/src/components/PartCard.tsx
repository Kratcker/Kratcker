import Link from "next/link";
import { categoryLabels, type Part } from "@/lib/inventory";

const categoryIcons: Record<Part["category"], string> = {
  motor: "🔧",
  transmision: "⚙️",
  suspension: "🛞",
  frenos: "🛑",
  electrico: "⚡",
  carroceria: "🚗",
  "aire-acondicionado": "❄️",
  accesorios: "🧩",
};

export function PartCard({ part }: { part: Part }) {
  const fitment = part.fitments[0];
  return (
    <Link
      href={`/repuestos/${part.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {part.photos && part.photos.length > 0 ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={part.photos[0]} alt={part.title} className="h-36 w-full object-cover" />
      ) : (
        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-5xl">
          {categoryIcons[part.category]}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-dark">
          {categoryLabels[part.category]}
        </p>
        <h3 className="font-semibold text-ink group-hover:underline">{part.title}</h3>
        <p className="text-sm text-slate-500">
          {fitment.make} {fitment.model} {fitment.yearFrom}–{fitment.yearTo}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-ink">${part.priceUsd}</span>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
            ✓ Inspeccionado
          </span>
        </div>
      </div>
    </Link>
  );
}
