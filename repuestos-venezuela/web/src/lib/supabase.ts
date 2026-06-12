import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

// Cliente con la clave anónima: catálogo público e inserción de leads.
// Devuelve null mientras Supabase no esté configurado (el sitio funciona
// con el inventario de muestra).
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

let browserClient: SupabaseClient | null = null;

// Cliente para el panel de administración (mantiene la sesión en el navegador).
export function getBrowserSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  browserClient ??= createClient(url, anonKey);
  return browserClient;
}
