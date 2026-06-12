import type { Metadata } from "next";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Repuestos usados con garantía desde USA a Venezuela`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "repuestos usados",
    "chivera",
    "repuestos Venezuela",
    "repuestos desde Miami",
    "autopartes usadas",
  ],
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "es_VE",
  },
};

const nav = [
  { href: "/repuestos", label: "Repuestos" },
  { href: "/encargo", label: "Pídelo por encargo" },
  { href: "/como-funciona", label: "Cómo funciona" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-VE">
      <body className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tight text-ink">
                Chi<span className="text-brand">vera</span>
              </span>
              <span className="hidden text-xs font-medium text-slate-500 sm:inline">
                {site.tagline}
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hidden text-slate-600 hover:text-ink sm:inline"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={whatsappLink("Hola, vengo de la página de Chivera y necesito un repuesto.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-slate-600 sm:grid-cols-3">
            <div>
              <p className="text-lg font-black text-ink">
                Chi<span className="text-brand">vera</span>
              </p>
              <p className="mt-2">{site.description}</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Navegación</p>
              <ul className="mt-2 space-y-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">Compromiso Chivera</p>
              <ul className="mt-2 space-y-1">
                <li>✓ Inspección antes de cada envío</li>
                <li>✓ Garantía sobre lo que vendemos</li>
                <li>✓ Precios justos y estables</li>
              </ul>
            </div>
          </div>
          <p className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Chivera · Florida, EE.UU. → Venezuela
          </p>
        </footer>
      </body>
    </html>
  );
}
