import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.part_requested) {
    return NextResponse.json({ error: "Falta la pieza solicitada." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (supabase) {
    await supabase.from("leads").insert({
      name: body.name ?? null,
      city: body.city ?? null,
      phone: body.phone ?? null,
      vehicle: body.vehicle ?? null,
      part_requested: body.part_requested,
      details: body.details ?? null,
      source: body.source ?? "encargo-web",
    });
  }
  return NextResponse.json({ ok: true });
}
