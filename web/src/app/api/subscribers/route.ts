import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";

  if (!email && !phone) {
    return NextResponse.json(
      { error: "Déjanos al menos tu correo o tu WhatsApp." },
      { status: 400 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "El correo no parece válido." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("subscribers").insert({
      email: email || null,
      phone: phone || null,
      source: "descuento-10",
    });
    if (error) {
      return NextResponse.json(
        { error: "No pudimos guardar tus datos, intenta de nuevo." },
        { status: 500 },
      );
    }
  }
  // Sin Supabase configurado no persistimos, pero no rompemos la experiencia.
  return NextResponse.json({ discountCode: "CHIVERA10" });
}
