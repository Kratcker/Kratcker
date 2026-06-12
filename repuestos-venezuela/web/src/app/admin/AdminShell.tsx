"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase";

const nav = [
  { href: "/admin", label: "Inventario" },
  { href: "/admin/repuestos/nuevo", label: "+ Nuevo repuesto" },
  { href: "/admin/leads", label: "Solicitudes y contactos" },
];

// Envuelve todas las páginas del panel: exige sesión iniciada y muestra la
// navegación interna. La seguridad real de los datos la imponen las
// políticas RLS de Supabase; esto es la puerta de entrada.
export function AdminShell({ children }: { children: React.ReactNode }) {
  const supabase = getBrowserSupabase();
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<"cargando" | "autenticado">("cargando");

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStatus("autenticado");
      else router.replace("/admin/login");
    });
  }, [supabase, router]);

  if (!supabase) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-ink">Supabase no está configurado</h1>
        <p className="mt-2 text-slate-600">
          Define <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para activar el panel de administración.
          Instrucciones en el README.
        </p>
      </div>
    );
  }

  if (status === "cargando") {
    return <div className="py-20 text-center text-slate-500">Cargando panel…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <h1 className="text-xl font-black text-ink">Panel Chivera</h1>
        <nav className="flex flex-wrap gap-3 text-sm font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? "rounded-full bg-ink px-4 py-1.5 text-white"
                  : "rounded-full px-4 py-1.5 text-slate-600 hover:bg-slate-100"
              }
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/admin/login");
            }}
            className="rounded-full px-4 py-1.5 text-red-600 hover:bg-red-50"
          >
            Salir
          </button>
        </nav>
      </div>
      <div className="py-6">{children}</div>
    </div>
  );
}
