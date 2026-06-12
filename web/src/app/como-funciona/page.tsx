import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Así compras un repuesto usado con garantía en Chivera: pides, inspeccionamos, pagas y lo recibes en tu ciudad en Venezuela.",
};

const steps = [
  {
    title: "1. Pide tu repuesto",
    text: "Búscalo en el catálogo o pídelo por encargo. Nos dices tu vehículo (marca, modelo, año) y tu ciudad en Venezuela.",
  },
  {
    title: "2. Lo conseguimos e inspeccionamos",
    text: "Lo ubicamos en los junkyards de Florida, lo probamos y te mandamos fotos y video de la pieza real antes de que decidas.",
  },
  {
    title: "3. Confirmas y pagas",
    text: "Te cotizamos pieza + envío hasta tu ciudad. Un representante de ventas acuerda contigo la forma de pago. Sin sorpresas.",
  },
  {
    title: "4. Enviamos con garantía",
    text: "Empacamos y despachamos desde Miami: aéreo (≈1-2 semanas) o marítimo (≈3-5 semanas). Te compartimos el seguimiento del envío.",
  },
  {
    title: "5. Recibes y te respaldamos",
    text: "Si la pieza llega con un problema cubierto por la garantía, lo resolvemos: reposición o reembolso. Esa es la diferencia Chivera.",
  },
];

const faqs = [
  {
    q: "¿Los repuestos son originales?",
    a: "Sí. Son piezas originales (OEM) extraídas de vehículos en junkyards de Florida, no réplicas. Cada pieza indica su condición (A, B o C).",
  },
  {
    q: "¿Qué cubre la garantía?",
    a: "Que la pieza llegue funcionando y corresponda a lo publicado. Cada cotización indica el plazo y las condiciones de la garantía de la pieza.",
  },
  {
    q: "¿Cuánto cuesta el envío a Venezuela?",
    a: "Depende del peso, tamaño y modalidad (aéreo o marítimo) y de tu ciudad. Siempre te cotizamos el total antes de que pagues.",
  },
  {
    q: "¿Cómo pago?",
    a: "El representante de ventas acuerda contigo el método disponible (por ejemplo Zelle o transferencia) al confirmar tu pedido.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black text-ink">Cómo funciona</h1>
      <p className="mt-2 text-slate-600">
        De un junkyard en Florida hasta tu puerta en Venezuela, con inspección y garantía en el medio.
      </p>

      <ol className="mt-8 space-y-4">
        {steps.map((s) => (
          <li key={s.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-ink">{s.title}</h2>
            <p className="mt-1 text-slate-600">{s.text}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-12 text-2xl font-bold text-ink">Preguntas frecuentes</h2>
      <div className="mt-4 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-5">
            <summary className="cursor-pointer font-semibold text-ink">{f.q}</summary>
            <p className="mt-2 text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/repuestos"
          className="inline-block rounded-full bg-brand px-6 py-3 font-semibold text-ink hover:bg-amber-400"
        >
          Ver repuestos disponibles
        </Link>
      </div>
    </div>
  );
}
