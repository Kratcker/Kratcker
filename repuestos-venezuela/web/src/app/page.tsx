import Link from "next/link";
import { PartCard } from "@/components/PartCard";
import { getParts } from "@/lib/catalog";
import { site, whatsappLink } from "@/lib/site";

export const revalidate = 60;

const promises = [
  {
    icon: "🔍",
    title: "Inspección antes del envío",
    text: "Cada repuesto se prueba y se documenta con fotos y video antes de salir de Florida. Si no pasa la inspección, no se envía.",
  },
  {
    icon: "🛡️",
    title: "Garantía real",
    text: "Respaldamos lo que vendemos. Si el repuesto llega con un problema cubierto, lo resolvemos: reposición o reembolso.",
  },
  {
    icon: "💵",
    title: "Precios justos y estables",
    text: "Compramos directo en los junkyards de Florida, sin cadenas de intermediarios. Eso se nota en el precio final.",
  },
  {
    icon: "📦",
    title: "Envío hasta tu ciudad",
    text: "Aéreo o marítimo desde Miami hasta tu puerta en Venezuela. Te cotizamos el envío antes de que pagues.",
  },
];

export default async function HomePage() {
  const featured = (await getParts()).slice(0, 4);
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            La chivera en la que sí puedes confiar
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
            Encuentra tu parte, <span className="text-brand">inspeccionada y con garantía</span>,
            desde USA hasta Venezuela.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-300">{site.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/repuestos"
              className="rounded-full bg-brand px-6 py-3 font-semibold text-ink shadow hover:bg-amber-400"
            >
              Ver repuestos disponibles
            </Link>
            <a
              href={whatsappLink("Hola, vengo de la página de Chivera y busco un repuesto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-500 px-6 py-3 font-semibold text-white hover:border-white"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-ink">¿Por qué Chivera y no una chivera cualquiera?</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-3 font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold text-ink">Recién llegados del junkyard</h2>
            <Link href="/repuestos" className="text-sm font-semibold text-brand-dark hover:underline">
              Ver todo el catálogo →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((part) => (
              <PartCard key={part.slug} part={part} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 to-amber-400 p-8 text-ink sm:p-12">
          <h2 className="text-2xl font-black sm:text-3xl">¿No encuentras tu repuesto?</h2>
          <p className="mt-2 max-w-xl font-medium">
            Lo buscamos por ti. Dinos tu vehículo y la pieza que necesitas: recorremos los junkyards
            de Florida y te avisamos cuando la tengamos, ya inspeccionada.
          </p>
          <Link
            href="/encargo"
            className="mt-6 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Pedir por encargo
          </Link>
        </div>
      </section>
    </>
  );
}
