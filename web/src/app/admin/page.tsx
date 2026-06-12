"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { categoryLabels, type Category } from "@/lib/inventory";
import { getBrowserSupabase } from "@/lib/supabase";
import { AdminShell } from "./AdminShell";

interface Row {
  id: string;
  slug: string;
  title: string;
  category: Category;
  price_usd: number;
  available: boolean;
  created_at: string;
}

function InventoryList() {
  const supabase = getBrowserSupabase();
  const [rows, setRows] = useState<Row[] | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("parts")
      .select("id, slug, title, category, price_usd, available, created_at")
      .order("created_at", { ascending: false });
    setRows((data as Row[]) ?? []);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = async (row: Row) => {
    await supabase?.from("parts").update({ available: !row.available }).eq("id", row.id);
    load();
  };

  const remove = async (row: Row) => {
    if (!confirm(`¿Eliminar "${row.title}"? Esta acción no se puede deshacer.`)) return;
    await supabase?.from("parts").delete().eq("id", row.id);
    load();
  };

  if (!rows) return <p className="text-slate-500">Cargando inventario…</p>;

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <p className="font-semibold text-ink">Todavía no hay repuestos en la base de datos.</p>
        <Link href="/admin/repuestos/nuevo" className="mt-2 inline-block text-brand-dark underline">
          Publica el primero →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Repuesto</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100">
              <td className="px-4 py-3 font-medium text-ink">
                <Link href={`/repuestos/${row.slug}`} className="hover:underline" target="_blank">
                  {row.title}
                </Link>
              </td>
              <td className="px-4 py-3">{categoryLabels[row.category] ?? row.category}</td>
              <td className="px-4 py-3">${Number(row.price_usd)}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggle(row)}
                  className={
                    row.available
                      ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                      : "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500"
                  }
                >
                  {row.available ? "Publicado" : "Oculto"}
                </button>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => remove(row)}
                  className="text-xs font-medium text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminShell>
      <InventoryList />
    </AdminShell>
  );
}
