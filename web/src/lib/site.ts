export const site = {
  name: "Chivera",
  tagline: "Encuentra tu parte",
  description:
    "Repuestos usados originales, inspeccionados y con garantía, directo desde los junkyards de Florida hasta tu puerta en Venezuela.",
  // Número de WhatsApp del equipo de ventas, en formato internacional sin "+".
  // Se configura en Vercel como variable de entorno.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "10000000000",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chivera.vercel.app",
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
