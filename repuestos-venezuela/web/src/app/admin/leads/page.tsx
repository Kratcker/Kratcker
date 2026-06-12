"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase";
import { AdminShell } from "../AdminShell";

interface Lead {
  id: string;
  name: string | null;
  city: string | null;
  phone: string | null;
  vehicle: string | null;
  part_requested: string | null;
  details: string | null;
  source: string;
  status: string;
  created_at: string;
}

interface Subscriber {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  discount_code: string;
  created_at: string;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("es-VE", { day: "2-digit", month: "short", year: "numeric" });

function LeadsView() {
  const supabase = getBrowserSupabase();
  const [tab, setTab] = useState<"leads" | "contactos">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subs, setSubs] = useState<Subscriber[]>([]);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setLeads((data as Lead[]) ?? []));
    supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setSubs((data as Subscriber[]) ?? []));
  }, [supabase]);

  return (
    <div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab("leads")}
          className={
            tab === "leads"
              ? "rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white"
              : "rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600"
          }
        >
          Solicitudes de repuestos ({leads.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("contactos")}
          className={
            tab === "contactos"
              ? "rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white"
              : "rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600"
          }
        >
          Contactos del descuento ({subs.length})
        </button>
      </div>

      {tab === "leads" ? (
        leads.length === 0 ? (
          <p className="mt-6 text-slate-500">Aún no hay solicitudes.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-ink">
                    {lead.part_requested ?? "—"}{" "}
                    <span className="font-normal text-slate-500">para {lead.vehicle ?? "—"}</span>
                  </p>
                  <span className="text-xs text-slate-400">
                    {fmt(lead.created_at)} · {lead.source}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {lead.name ?? "Sin nombre"} · {lead.city ?? "Sin ciudad"}
                  {lead.phone ? ` · ${lead.phone}` : ""}
                </p>
                {lead.details && <p className="mt-1 text-sm text-slate-500">{lead.details}</p>}
              </div>
            ))}
          </div>
        )
      ) : subs.length === 0 ? (
        <p className="mt-6 text-slate-500">Aún no hay contactos captados.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium text-ink">
                    {[s.first_name, s.last_name].filter(Boolean).join(" ") || "—"}
                  </td>
                  <td className="px-4 py-3">{s.email ?? "—"}</td>
                  <td className="px-4 py-3">{s.phone ?? "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.discount_code}</td>
                  <td className="px-4 py-3 text-slate-500">{fmt(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminLeadsPage() {
  return (
    <AdminShell>
      <LeadsView />
    </AdminShell>
  );
}
