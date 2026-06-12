"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

const inputClass =
  "w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-brand focus:outline-none";

export function EncargoForm() {
  const [form, setForm] = useState({
    nombre: "",
    ciudad: "",
    marca: "",
    modelo: "",
    anio: "",
    pieza: "",
    detalles: "",
  });

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const message = [
    `Hola, soy ${form.nombre || "…"} desde ${form.ciudad || "…"} y quiero pedir un repuesto por encargo en Chivera:`,
    `• Vehículo: ${form.marca} ${form.modelo} ${form.anio}`,
    `• Pieza: ${form.pieza}`,
    form.detalles ? `• Detalles: ${form.detalles}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const ready = form.nombre && form.ciudad && form.marca && form.modelo && form.anio && form.pieza;

  return (
    <form
      className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Tu nombre
          <input className={inputClass} value={form.nombre} onChange={update("nombre")} required />
        </label>
        <label className="block text-sm font-medium text-ink">
          Ciudad en Venezuela
          <input
            className={inputClass}
            value={form.ciudad}
            onChange={update("ciudad")}
            placeholder="Caracas, Maracaibo, Valencia…"
            required
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Marca del vehículo
          <input className={inputClass} value={form.marca} onChange={update("marca")} placeholder="Toyota" required />
        </label>
        <label className="block text-sm font-medium text-ink">
          Modelo
          <input className={inputClass} value={form.modelo} onChange={update("modelo")} placeholder="Corolla" required />
        </label>
        <label className="block text-sm font-medium text-ink">
          Año
          <input
            className={inputClass}
            value={form.anio}
            onChange={update("anio")}
            placeholder="2011"
            inputMode="numeric"
            required
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Pieza que necesitas
          <input
            className={inputClass}
            value={form.pieza}
            onChange={update("pieza")}
            placeholder="Alternador, faro derecho…"
            required
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-ink">
        Detalles adicionales (opcional)
        <textarea
          className={inputClass}
          rows={3}
          value={form.detalles}
          onChange={update("detalles")}
          placeholder="Número de parte, lado, versión del motor, urgencia…"
        />
      </label>
      <button
        type="submit"
        disabled={!ready}
        className="w-full rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Enviar solicitud por WhatsApp
      </button>
      <p className="text-center text-xs text-slate-500">
        Se abrirá WhatsApp con tu solicitud lista para enviar a nuestro equipo de ventas.
      </p>
    </form>
  );
}
