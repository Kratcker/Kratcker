import type { Metadata } from "next";
import { EncargoForm } from "./EncargoForm";

export const metadata: Metadata = {
  title: "Pide tu repuesto por encargo",
  description:
    "¿No encuentras tu repuesto? Dinos tu vehículo y la pieza que necesitas y la buscamos en los junkyards de Florida.",
};

export default function EncargoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-black text-ink">Pídelo por encargo</h1>
      <p className="mt-2 text-slate-600">
        Dinos qué necesitas y nuestro equipo lo busca en los junkyards de Florida. Cuando lo
        encontremos, lo inspeccionamos, te mandamos fotos y te cotizamos con envío incluido. Sin
        compromiso.
      </p>
      <EncargoForm />
    </div>
  );
}
