# Chivera — web (Fase 1)

Catálogo de repuestos usados con inspección y garantía, USA → Venezuela.

## Desarrollo local

```bash
npm install
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp de ventas en formato internacional sin `+` (ej. `17865551234`). |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (para sitemap y SEO). |

## Despliegue en Vercel (gratis)

1. Importar el repositorio en [vercel.com](https://vercel.com) y seleccionar el
   directorio raíz `repuestos-venezuela/web`.
2. Configurar las variables de entorno de arriba.
3. Deploy — queda en `https://<proyecto>.vercel.app`.

## Estado actual

- Inventario en `src/lib/inventory.ts` (datos de muestra). En la Fase 2 se
  reemplaza por Supabase + panel de administración.
- Los formularios y botones generan enlaces de WhatsApp con el mensaje
  pre-armado: los leads llegan directo al teléfono de ventas, sin backend.
