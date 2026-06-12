import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryLabels, conditionLabels, getPart, parts } from "@/lib/inventory";
import { whatsappLink } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return parts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const part = getPart(slug);
  if (!part) return {};
  const fitment = part.fitments[0];
  return {
    title: `${part.title} — ${fitment.make} ${fitment.model} ${fitment.yearFrom}-${fitment.yearTo} (usado, con garantía)`,
    description: part.description,
  };
}

export default async function PartPage({ params }: Props) {
  const { slug } = await params;
  const part = getPart(slug);
  if (!part) notFound();

  const message = `Hola, me interesa este repuesto de la página de Chivera: ${part.title} (${part.fitments
    .map((f) => `${f.make} ${f.model} ${f.yearFrom}-${f.yearTo}`)
    .join(", ")}) — precio base $${part.priceUsd}. ¿Sigue disponible?`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: part.title,
    description: part.description,
    itemCondition: "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: part.priceUsd,
      availability: part.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-sm font-medium uppercase tracking-wide text-brand-dark">
        {categoryLabels[part.category]}
      </p>
      <h1 className="mt-1 text-3xl font-black text-ink">{part.title}</h1>

      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-7xl">
          🔧
        </div>
        <div>
          <p className="text-3xl font-black text-ink">
            ${part.priceUsd} <span className="text-base font-medium text-slate-500">USD precio base</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">El envío se cotiza según tu ciudad y modalidad (aéreo o marítimo).</p>

          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold text-ink">Condición:</dt>
              <dd>{conditionLabels[part.condition]}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-ink">Compatible con:</dt>
              <dd>
                {part.fitments
                  .map((f) => `${f.make} ${f.model} ${f.yearFrom}–${f.yearTo}`)
                  .join(" · ")}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              ✓ Inspeccionado antes del envío
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">🛡️ Con garantía</span>
          </div>

          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block rounded-full bg-green-600 px-6 py-3 text-center font-semibold text-white shadow hover:bg-green-700"
          >
            Solicitar por WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-ink">Descripción</h2>
        <p className="mt-2 text-slate-700">{part.description}</p>
      </div>
    </div>
  );
}
