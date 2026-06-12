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
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase (Fase 2). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima (anon/public) del proyecto Supabase (Fase 2). |

## Configurar Supabase (Fase 2 — panel admin y captura de contactos)

1. Crear un proyecto gratuito en [supabase.com](https://supabase.com).
2. En **SQL Editor**, pegar y ejecutar `supabase/migrations/0001_init.sql`
   (crea las tablas, las políticas de seguridad y el bucket de fotos).
3. En **Authentication → Users**, crear el usuario administrador (correo y
   contraseña) con "Auto confirm".
4. Copiar **Project URL** y **anon key** (Settings → API) a las variables de
   entorno de Vercel y redesplegar.
5. Entrar a `/admin/login` con el usuario creado.

Mientras Supabase no esté configurado, el sitio funciona con el inventario de
muestra y el popup de descuento no persiste los contactos.

## Despliegue en Vercel (gratis)

1. Importar el repositorio en [vercel.com](https://vercel.com) y seleccionar el
   directorio raíz `repuestos-venezuela/web`.
2. Configurar las variables de entorno de arriba.
3. Deploy — queda en `https://<proyecto>.vercel.app`.

## Estado actual

- **Fase 1:** catálogo, fichas, encargo y páginas de marca — listo.
- **Fase 2:** panel de administración en `/admin` (inventario con fotos,
  solicitudes y contactos), popup de 10% de descuento que guarda correo y
  WhatsApp en la tabla `subscribers`, y formulario de encargo que registra
  cada solicitud en la tabla `leads` — listo, requiere configurar Supabase.
- El catálogo lee de Supabase cuando está configurado; si no, usa el
  inventario de muestra de `src/lib/inventory.ts`.
- Los botones de WhatsApp generan el mensaje pre-armado: los leads llegan
  directo al teléfono de ventas.
