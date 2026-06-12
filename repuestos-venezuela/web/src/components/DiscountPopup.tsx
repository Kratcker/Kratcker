"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "chivera-descuento";
const inputClass =
  "w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:border-brand focus:outline-none";

export function DiscountPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "cerrado");
    setOpen(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email && !phone) {
      setError("Déjanos al menos tu correo o tu WhatsApp.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Algo salió mal, intenta de nuevo.");
        return;
      }
      localStorage.setItem(STORAGE_KEY, "suscrito");
      setCode(data.discountCode);
    } catch {
      setError("Sin conexión, intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Cerrar"
          className="absolute right-4 top-4 text-2xl leading-none text-slate-400 hover:text-ink"
        >
          ×
        </button>

        {code ? (
          <div className="text-center">
            <div className="text-4xl">🎉</div>
            <h2 className="mt-2 text-2xl font-black text-ink">¡Listo!</h2>
            <p className="mt-2 text-slate-600">
              Menciona este código a tu representante de ventas y obtén tu{" "}
              <strong>10% de descuento</strong> en tu primera compra:
            </p>
            <p className="mt-4 rounded-2xl border-2 border-dashed border-brand bg-amber-50 py-3 text-2xl font-black tracking-widest text-brand-dark">
              {code}
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-5 rounded-full bg-ink px-6 py-2 font-semibold text-white hover:bg-slate-800"
            >
              Seguir viendo repuestos
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark">
              Bienvenido a Chivera
            </p>
            <h2 className="mt-1 text-2xl font-black text-ink">
              10% de descuento en tu primera compra 🔧
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Déjanos tu contacto y te enviamos tu código de descuento, además de avisarte cuando
              llegue el repuesto que buscas.
            </p>
            <form className="mt-5 space-y-3" onSubmit={submit}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
              <input
                type="tel"
                placeholder="Tu WhatsApp (ej. 0414-1234567)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
              {error && <p className="text-sm font-medium text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-ink hover:bg-amber-400 disabled:bg-slate-300"
              >
                {sending ? "Guardando…" : "Quiero mi 10%"}
              </button>
            </form>
            <button
              type="button"
              onClick={dismiss}
              className="mt-3 w-full text-center text-xs text-slate-400 hover:text-slate-600"
            >
              No gracias, prefiero pagar precio completo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
