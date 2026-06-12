# Plan: Marketplace de Repuestos Usados USA → Venezuela

## 1. Visión del negocio

Comprar repuestos usados en junkyards de Florida (EE.UU.), publicarlos en una
página web y venderlos a clientes en Venezuela a precios estables y justos,
construyendo una marca confiable que resuelva el problema de los precios
abusivos de repuestos en Venezuela.

**Modelo de venta:** el cliente ve el catálogo con un precio base, hace una
solicitud (por formulario, chat IA o WhatsApp), un asistente de IA califica la
solicitud y luego un representante de ventas cierra el trato (precio final,
envío, tiempos, forma de pago).

## 2. Decisiones tomadas

| Tema | Decisión |
|---|---|
| **Marca** | **Chivera** — la palabra venezolana para junkyard. Eslogan: "Encuentra tu parte". Posicionamiento: "la chivera en la que sí puedes confiar" |
| Diferenciadores | **Inspección de cada pieza antes del envío** + **garantía** (reposición o reembolso) + precios justos y estables |
| Alcance MVP | Catálogo público + solicitud de pedido (sin pagos en línea al inicio) |
| Inventario | Panel de administración + agente de IA encargado de mantenerlo |
| Contacto / IA | Chat con IA en la web **y** WhatsApp |
| Presupuesto | $0/mes para arrancar (todo en capas gratuitas) |

> Pendiente de verificar fuera de este entorno: disponibilidad del dominio
> (chivera.com / chivera.com.ve u opciones como somoschivera.com) y búsqueda
> de marca en USPTO y SAPI antes de registrar.

## 3. Stack técnico (costo $0 para empezar)

- **Frontend + backend:** Next.js (App Router) desplegado en **Vercel** (plan
  gratuito, dominio `*.vercel.app` al inicio; dominio propio cuando haya ventas).
- **Base de datos + autenticación + fotos:** **Supabase** (plan gratuito:
  Postgres, Auth para el panel admin, Storage para las fotos de los repuestos).
- **Chat IA en la web:** Claude API vía Vercel AI SDK. *Nota: la API tiene un
  costo por uso, muy bajo al inicio (centavos por conversación con Haiku); es el
  único costo variable real.*
- **WhatsApp (fase 1):** botones `wa.me` + WhatsApp Business app (gratis).
  La API oficial de WhatsApp Business (bot automático) queda para una fase
  posterior, cuando el volumen lo justifique.
- **Idioma:** español (es-VE), mobile-first — la mayoría de los clientes en
  Venezuela navegan desde el teléfono con datos limitados, así que la página
  debe ser liviana.

## 4. Fases de desarrollo

### Fase 1 — Catálogo público + contacto (el MVP)
- Landing page con la propuesta de valor de la marca.
- Catálogo de repuestos con búsqueda y filtros por **marca / modelo / año /
  categoría de repuesto** (motor, suspensión, carrocería, eléctrico, etc.).
- Ficha de cada repuesto: fotos, condición (usado A/B/C), compatibilidad de
  vehículos, **precio base en USD**, disponibilidad.
- Botón flotante de WhatsApp en toda la página.
- Formulario "Solicitar este repuesto" y "¿No lo encuentras? Pídelo" (repuesto
  por encargo): vehículo, repuesto, ciudad en Venezuela, teléfono/WhatsApp.
- Página de "Cómo funciona": pedido → confirmación → pago → envío → entrega,
  con tiempos estimados (aéreo vs. marítimo) y preguntas frecuentes.

### Fase 2 — Panel de administración
- Login privado (Supabase Auth).
- Cargar repuestos **desde el teléfono en el junkyard**: fotos con la cámara,
  marca/modelo/año, condición, costo de compra, precio base.
- Estados del repuesto: `disponible → apartado → pagado → enviado → entregado`
  (y `vendido/descartado`).
- Bandeja de solicitudes (leads): ver qué pidió cada cliente, su contacto y el
  estado del seguimiento.
- Métricas básicas: repuestos más buscados, margen por pieza, leads por semana.

### Fase 3 — Asistente de IA
- **Chat en la web:** widget que conversa en español, identifica vehículo
  (marca/modelo/año), repuesto buscado, ciudad y urgencia; consulta el catálogo
  real; si no hay stock, registra el encargo. Al final guarda el lead y
  notifica al representante de ventas (correo/WhatsApp) con el resumen.
- **Agente de inventario:** flujo donde se le mandan fotos y datos de una pieza
  y el agente redacta la ficha (título, descripción, compatibilidad, categoría)
  y la publica en el catálogo para revisión.
- Traspaso a humano: el chat siempre ofrece "hablar con un vendedor" → enlace
  de WhatsApp con el contexto de la conversación.

### Fase 4 — SEO, marca y evolución continua (skill de Cowork)
- SEO técnico desde el día uno: páginas estáticas por repuesto con metadata,
  sitemap.xml, datos estructurados (schema.org `Product`), URLs limpias tipo
  `/repuestos/toyota/corolla/2010/alternador`.
- Páginas de aterrizaje por búsqueda frecuente: "repuestos Toyota usados
  Venezuela", "repuestos originales baratos Maracaibo", etc.
- Contenido: guías cortas ("cómo saber si un alternador usado sirve", "cuánto
  tarda un envío de Miami a Venezuela") que posicionan la marca.
- **Skill de Cowork** (`.claude/skills/`) con tareas recurrentes: actualizar
  catálogo, revisar SEO (títulos, metadescripciones, enlaces rotos), proponer
  contenido nuevo según búsquedas sin resultados en el sitio, y reportar
  métricas. Se puede correr en sesiones programadas.
- Google Search Console + Analytics (gratis) para medir alcance en Venezuela.

## 5. Modelo de datos (inicial)

- `parts` — repuesto: título, descripción, categoría, condición, fotos, costo,
  precio base USD, estado, fecha de compra, junkyard de origen.
- `part_fitments` — compatibilidad: marca, modelo, años (un repuesto puede
  servir a varios vehículos).
- `leads` — solicitudes: cliente (nombre, WhatsApp, ciudad), repuesto pedido
  (del catálogo o por encargo), origen (web/chat/WhatsApp), estado del
  seguimiento, notas del vendedor.
- `conversations` — transcripciones del chat IA vinculadas al lead.
- `users` — administradores y vendedores (roles).

## 6. Logística y precios (para definir con el negocio)

- Precio mostrado = **precio base en USD** del repuesto; el envío se cotiza con
  el vendedor según ciudad y modalidad (aéreo ~1-2 semanas, marítimo ~3-5
  semanas vía couriers Miami→Venezuela).
- Formas de pago a acordar por el vendedor (Zelle, transferencia, etc.) — fuera
  de la web en el MVP.
- ⚠️ Verificar con el courier los requisitos de aduana para repuestos
  automotrices usados hacia Venezuela (peso, declaración, piezas restringidas)
  antes de prometer tiempos de entrega en la página.

## 7. Orden de trabajo propuesto

1. Definir **nombre de marca** (necesario para textos, logo y dominio futuro).
2. Construir Fase 1 (catálogo + contacto) → publicar en Vercel.
3. Fase 2 (panel admin) → empezar a cargar inventario real.
4. Fase 3 (chat IA) → activar cuando haya catálogo con piezas reales.
5. Fase 4 (SEO + skill de Cowork) → iterar continuamente.
