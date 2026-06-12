"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const supabase = getBrowserSupabase();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  if (!supabase) {
    return (
      <p className="py-20 text-center text-slate-600">
        Configura Supabase para activar el panel (ver README).
      </p>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSending(false);
    if (error) {
      setError("Credenciales incorrectas.");
      return;
    }
    router.replace("/admin");
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-center text-2xl font-black text-ink">Panel Chivera</h1>
      <form
        onSubmit={submit}
        className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-brand focus:outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-brand focus:outline-none"
        />
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-ink px-6 py-2.5 font-semibold text-white hover:bg-slate-800 disabled:bg-slate-300"
        >
          {sending ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
