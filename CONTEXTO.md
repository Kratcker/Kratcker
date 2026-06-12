# Contexto del proyecto Chivera (para Claude y el equipo)

Resumen de todo lo decidido y construido hasta ahora. Leer junto con
`PLAN.md` (el plan por fases) y `TAREAS.md` (checklist de lanzamiento).

## El negocio

Alfonso compra repuestos usados en junkyards de Florida (EE.UU.) y los vende
a clientes en Venezuela, con envío desde Miami (aéreo ~1-2 semanas, marítimo
~3-5). El objetivo es ofrecer precios justos y estables frente a los precios
abusivos del mercado venezolano, construyendo una marca de confianza.

## La marca

- **Nombre:** Chivera ("chivera" es la palabra venezolana para junkyard).
- **Eslogan:** "Encuentra tu parte".
- **Posicionamiento:** "La chivera en la que sí puedes confiar".
- **Diferenciadores:** cada pieza pasa inspección documentada (fotos/video)
  antes del envío + garantía real (reposición o reembolso) + precios justos.
- Pendiente: verificar dominio (chivera.com / somoschivera.com /
  chiveramiami.com) y marca en USPTO/SAPI.

## Modelo de venta

Catálogo público con precio base en USD → el cliente solicita por WhatsApp,
formulario o (futuro) chat IA → un representante de ventas cierra precio
final, envío y forma de pago (Zelle, etc.). Sin pagos en línea por ahora.

## Lo construido (Fases 1 y 2 — código en `web/`)

- Next.js 15 + Tailwind 4, español (es-VE), mobile-first, desplegable en
  Vercel gratis. Catálogo con filtros, fichas con JSON-LD, página "Cómo
  funciona", formulario de encargo que abre WhatsApp con mensaje pre-armado.
- Supabase (esquema en `web/supabase/migrations/0001_init.sql`): tablas
  `parts`, `part_fitments`, `leads`, `subscribers`, con RLS y bucket de fotos.
- Panel admin en `/admin` (Supabase Auth): publicar repuestos con fotos desde
  el teléfono, bandeja de solicitudes y contactos.
- Popup de captura: "10% de descuento en tu primera compra" — pide nombre,
  apellido, correo y WhatsApp; entrega el código CHIVERA10 y guarda el
  contacto en `subscribers` para remarketing.
- Sin Supabase configurado, el sitio funciona con inventario de muestra
  (`web/src/lib/inventory.ts`).

## Estado del lanzamiento

Ver `TAREAS.md`. Resumen: falta conectar Vercel (importar este repo, Root
Directory = `web`, variables de entorno) y configurar Supabase (correr la
migración, crear usuario admin, copiar las claves a Vercel).

## Historia del repositorio

El proyecto nació dentro de `Kratcker/Kratcker` (carpeta
`repuestos-venezuela/`) y se migró a este repositorio dedicado desde la rama
`chivera-main` de aquel repo. La copia vieja en Kratcker queda como respaldo
y se puede borrar cuando este repo esté desplegado.

## Próximas fases (ver PLAN.md)

- **Fase 3:** chat IA en la web (Claude API) que califica al cliente
  (vehículo, pieza, ciudad), consulta el catálogo real, guarda el lead y
  notifica al vendedor; + agente que redacta/publica fichas de inventario.
- **Fase 4:** SEO continuo (landing pages por búsqueda, contenido, Search
  Console) y skill de Cowork para mantener catálogo y SEO actualizados.
