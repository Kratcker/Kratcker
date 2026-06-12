# ✅ Tareas para poner Chivera en línea

Lista para hacer de corrido. Tiempo total estimado: **30–45 minutos**.
Todo es gratis salvo donde se indica.

## Parte 1 — Publicar el código (GitHub, 5 min)

- [ ] 1.1 Entra a github.com/Kratcker/Kratcker y abre la pestaña **Pull requests**.
- [ ] 1.2 Crea el pull request de la rama
      `claude/used-parts-marketplace-venezuela-seak2p` hacia `main`
      (GitHub te lo sugiere con un botón amarillo) y dale **Merge**.
      Así la página queda en la rama principal, que es la que Vercel publicará.

## Parte 2 — Vercel: poner la página en internet (10 min)

- [ ] 2.1 Crea tu cuenta en [vercel.com](https://vercel.com) → **Sign up with GitHub**
      (usa tu cuenta de GitHub, así Vercel ve tu repositorio).
- [ ] 2.2 Clic en **Add New → Project** e importa el repositorio `Kratcker/Kratcker`.
- [ ] 2.3 ⚠️ El paso clave: en **Root Directory** haz clic en *Edit* y selecciona
      `repuestos-venezuela/web`. (Si no haces esto, el deploy falla.)
- [ ] 2.4 En **Environment Variables** agrega:
      - `NEXT_PUBLIC_WHATSAPP_NUMBER` = tu número de ventas en formato
        internacional sin el `+`. Ejemplo: si tu número es +1 (786) 555-1234,
        pon `17865551234`.
- [ ] 2.5 Clic en **Deploy** y espera 1-2 minutos.
- [ ] 2.6 Vercel te da la dirección (algo como `chivera.vercel.app` o similar).
      Ábrela en tu teléfono y prueba: catálogo, botón de WhatsApp
      (debe abrir un chat contigo) y el popup del descuento.
- [ ] 2.7 Vuelve a **Settings → Environment Variables** y agrega
      `NEXT_PUBLIC_SITE_URL` = la dirección que te dio Vercel
      (ej. `https://chivera.vercel.app`). Luego **Deployments → Redeploy**.

## Parte 3 — Supabase: base de datos y panel admin (15 min)

- [ ] 3.1 Crea tu cuenta en [supabase.com](https://supabase.com) (con GitHub también).
- [ ] 3.2 **New project**: nombre `chivera`, región **East US (North Virginia)**
      (la más cercana a Florida), y guarda bien la contraseña de la base de datos.
- [ ] 3.3 En el menú izquierdo abre **SQL Editor → New query**, copia TODO el
      contenido del archivo `repuestos-venezuela/web/supabase/migrations/0001_init.sql`
      del repositorio, pégalo y dale **Run**. Debe decir "Success".
      (Esto crea las tablas de repuestos, solicitudes y contactos, las reglas
      de seguridad y el almacén de fotos.)
- [ ] 3.4 En **Authentication → Users → Add user → Create new user**:
      tu correo y una contraseña fuerte, y marca **Auto Confirm User**.
      Este será tu acceso al panel de administración.
- [ ] 3.5 En **Settings → API** copia dos valores:
      - **Project URL** (ej. `https://abcd1234.supabase.co`)
      - **anon public** key (un texto largo que empieza por `eyJ...`)
- [ ] 3.6 En Vercel → **Settings → Environment Variables** agrégalos:
      - `NEXT_PUBLIC_SUPABASE_URL` = el Project URL
      - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = la anon key
- [ ] 3.7 **Deployments → Redeploy** para que tome las variables.

## Parte 4 — Probar que todo funciona (10 min)

- [ ] 4.1 Entra a `tu-direccion.vercel.app/admin/login` con el usuario del paso 3.4.
- [ ] 4.2 Publica tu primer repuesto real: **+ Nuevo repuesto**, llena los datos
      y súbele fotos desde el teléfono. Verifica que aparece en el catálogo
      público (tarda máximo 1 minuto).
- [ ] 4.3 Abre la página en una ventana de incógnito, espera el popup del
      descuento, déjale un nombre, correo y teléfono de prueba.
- [ ] 4.4 En el panel → **Solicitudes y contactos → Contactos del descuento**,
      confirma que apareció tu prueba con nombre y apellido.
- [ ] 4.5 Haz un pedido por encargo de prueba y confirma que (a) se abre
      WhatsApp con el mensaje armado y (b) la solicitud aparece en el panel.

## Parte 5 — Pendientes del negocio (sin apuro)

- [ ] 5.1 Verificar dominio: busca `chivera.com` en [namecheap.com](https://namecheap.com);
      si está tomado, alternativas: `somoschivera.com`, `chiveramiami.com`,
      `chivera.com.ve`. (~$10-12/año, único gasto real.)
- [ ] 5.2 Cuando tengas dominio: Vercel → Settings → Domains → agregarlo,
      y actualizar `NEXT_PUBLIC_SITE_URL`.
- [ ] 5.3 Instalar **WhatsApp Business** (gratis) en el teléfono de ventas:
      perfil con logo, catálogo y respuestas rápidas.
- [ ] 5.4 Registrar la página en [Google Search Console](https://search.google.com/search-console)
      para empezar a aparecer en Google (enviar el sitemap: `/sitemap.xml`).
- [ ] 5.5 Confirmar con el courier (ej. SuperEnvios, Continental Suppliers)
      tarifas y requisitos de aduana para repuestos usados, antes de
      prometer tiempos de entrega.

---

Cuando termines la Parte 3, avísame y seguimos con la **Fase 3**: el chat de
inteligencia artificial que atiende a los clientes y le pasa el resumen al
vendedor.
