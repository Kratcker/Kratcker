"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { categoryLabels, type Category } from "@/lib/inventory";
import { getBrowserSupabase } from "@/lib/supabase";
import { AdminShell } from "../../AdminShell";

const inputClass =
  "w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-brand focus:outline-none";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function NewPartForm() {
  const supabase = getBrowserSupabase();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    category: "motor",
    condition: "B",
    priceUsd: "",
    description: "",
    make: "",
    model: "",
    yearFrom: "",
    yearTo: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setError(null);
    try {
      const slug = `${slugify(`${form.title} ${form.make} ${form.model}`)}-${Date.now().toString(36)}`;

      // Sube las fotos primero para guardar el repuesto ya con sus URLs.
      const photos: string[] = [];
      for (const file of Array.from(files ?? [])) {
        const path = `${slug}/${Date.now()}-${slugify(file.name) || "foto"}`;
        const { error: uploadError } = await supabase.storage
          .from("part-photos")
          .upload(path, file);
        if (uploadError) throw new Error(`No se pudo subir la foto: ${uploadError.message}`);
        photos.push(supabase.storage.from("part-photos").getPublicUrl(path).data.publicUrl);
      }

      const { data: part, error: partError } = await supabase
        .from("parts")
        .insert({
          slug,
          title: form.title,
          category: form.category,
          condition: form.condition,
          price_usd: Number(form.priceUsd),
          description: form.description,
          photos,
        })
        .select("id")
        .single();
      if (partError) throw new Error(partError.message);

      const { error: fitError } = await supabase.from("part_fitments").insert({
        part_id: part.id,
        make: form.make,
        model: form.model,
        year_from: Number(form.yearFrom),
        year_to: Number(form.yearTo || form.yearFrom),
      });
      if (fitError) throw new Error(fitError.message);

      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error guardando el repuesto.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      <label className="block text-sm font-medium text-ink">
        Título del repuesto
        <input
          className={inputClass}
          value={form.title}
          onChange={update("title")}
          placeholder="Alternador original Denso"
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm font-medium text-ink">
          Categoría
          <select className={inputClass} value={form.category} onChange={update("category")}>
            {(Object.keys(categoryLabels) as Category[]).map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Condición
          <select className={inputClass} value={form.condition} onChange={update("condition")}>
            <option value="A">A — como nuevo</option>
            <option value="B">B — buen estado</option>
            <option value="C">C — funcional</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Precio base (USD)
          <input
            className={inputClass}
            value={form.priceUsd}
            onChange={update("priceUsd")}
            inputMode="decimal"
            placeholder="85"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <label className="block text-sm font-medium text-ink">
          Marca
          <input className={inputClass} value={form.make} onChange={update("make")} placeholder="Toyota" required />
        </label>
        <label className="block text-sm font-medium text-ink">
          Modelo
          <input className={inputClass} value={form.model} onChange={update("model")} placeholder="Corolla" required />
        </label>
        <label className="block text-sm font-medium text-ink">
          Año desde
          <input className={inputClass} value={form.yearFrom} onChange={update("yearFrom")} inputMode="numeric" placeholder="2009" required />
        </label>
        <label className="block text-sm font-medium text-ink">
          Año hasta
          <input className={inputClass} value={form.yearTo} onChange={update("yearTo")} inputMode="numeric" placeholder="2013" />
        </label>
      </div>

      <label className="block text-sm font-medium text-ink">
        Descripción (estado, pruebas realizadas, kilometraje del donante…)
        <textarea className={inputClass} rows={3} value={form.description} onChange={update("description")} required />
      </label>

      <label className="block text-sm font-medium text-ink">
        Fotos de la pieza
        <input
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={(e) => setFiles(e.target.files)}
          className="mt-1 block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:font-semibold file:text-white"
        />
      </label>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-brand px-8 py-3 font-semibold text-ink hover:bg-amber-400 disabled:bg-slate-300"
      >
        {saving ? "Publicando…" : "Publicar repuesto"}
      </button>
    </form>
  );
}

export default function NewPartPage() {
  return (
    <AdminShell>
      <NewPartForm />
    </AdminShell>
  );
}
