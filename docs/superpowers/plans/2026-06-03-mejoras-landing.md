# Mejoras Landing Evidence — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolver los 8 problemas del landing (SEO, responsive/perf, favicon, i18n, CTAs, coherencia visual, overflow mobile, header) + critique final de agencia, según `docs/superpowers/specs/2026-06-03-mejoras-landing-design.md`.

**Architecture:** Single-page Next.js App Router. i18n por contexto React client-side (sin next-intl): dos diccionarios JSON tipados, `LocaleProvider` con localStorage. Los componentes client cambian `import { copy }` por hook `useCopy()` — el resto de referencias `copy.x` quedan intactas. Header se reescribe una sola vez (microcaps C + menú móvil + toggle). Form vía Server Action + Resend.

**Tech Stack:** Next.js (App Router) · Tailwind v4 tokens en `globals.css` · framer-motion · pnpm · Playwright MCP (verificación) · ImageMagick (favicon/sampling) · Resend (única dependencia nueva).

**Testing note:** El proyecto no tiene test runner y el spec prohíbe dependencias nuevas (salvo `resend`). La verificación es: `pnpm build` (types + prerender) + asserts con Playwright MCP contra `pnpm dev` (localhost:3000). Cada tarea incluye su verificación explícita. Aplicar karpathy-guidelines: cambios quirúrgicos, cero refactors no pedidos.

**Reglas globales:**
- Solo pnpm. NO tocar `next.config.ts` ni `.env*`. `package.json`/lockfile solo cambian por `resend`.
- Preguntar al usuario antes de: generar con Higgsfield, reemplazar assets de `public/`, deploy.
- Datos placeholder se quedan tal cual, EXCEPTO los confirmados: fundación **1995**, tel **+57 310 3247091**, dirección Carrera 72B #49A-70, ISO 9001/13485 (fuente: §4.3 del REVISION doc).

---

## FASE 1 — AUDITORÍA (solo lectura, sin cambios de código)

### Task 1: Crawl responsive + perf con Playwright

**Files:** ninguno (solo lectura). Output: informe en conversación.

- [ ] **Step 1.1:** Arrancar dev server en background: `pnpm dev` (puerto 3000). Esperar a "Ready".
- [ ] **Step 1.2:** Con Playwright MCP: `browser_navigate` a `http://localhost:3000`. Para cada viewport **375x812, 768x1024, 1440x900** (`browser_resize`):
  - Scroll por toda la página (la sección #pro mide 400vh — scrollear completo para disparar los beats).
  - `browser_take_screenshot` de cada sección: `#top`, `#lineas`, `#pro`, taller (ManufactorySection), `#archivo`, respaldo, `#contacto`, footer.
  - Detectar overflow horizontal con `browser_evaluate`:
    ```js
    () => {
      const bad = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > window.innerWidth + 1 || r.left < -1) {
          if (el.children.length === 0 && el.textContent?.trim()) bad.push({ tag: el.tagName, text: el.textContent.slice(0, 40), right: Math.round(r.right) });
        }
      });
      return { scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, offenders: bad.slice(0, 20) };
    }
    ```
- [ ] **Step 1.3:** `browser_console_messages` (capturar errores) y `browser_network_requests` (anotar peso de `evidence-pro-teardown.mp4` ~2.85MB con `preload="auto"`, `evidence-pro-turntable.mp4` ~1.27MB, total transferido).
- [ ] **Step 1.4:** Verificar tap targets del nav a 375px: confirmar que NO hay navegación visible en móvil (links `hidden md:flex` — R1 del REVISION doc).
- [ ] **Step 1.5:** Compilar tabla: viewport → sección → problema → severidad. Marcar cada texto desbordado con su componente exacto.

### Task 2: Auditoría de coherencia visual (assets vs fondos)

**Files:** ninguno. Output: tabla ΔE en conversación.

- [ ] **Step 2.1:** Fondos reales por sección con `browser_evaluate`:
    ```js
    () => [...document.querySelectorAll('section, footer')].map(s => ({
      id: s.id || s.className.slice(0, 40),
      bg: getComputedStyle(s).backgroundColor,
      mode: s.getAttribute('data-mode')
    }))
    ```
    Referencia esperada: crema `#E9D8C0` (rgb(233,216,192)), surface `#E2CFB4`, noir `#000`/`#0A0A0B`.
- [ ] **Step 2.2:** Muestrear bordes de cada asset visible (esquinas + bordes, donde el asset toca el fondo de sección):
    ```bash
    for f in public/img/lineas/*.webp public/img/manufactory/*.webp public/img/timeline/*.webp; do
      echo "== $f"
      magick "$f" -gravity NorthWest -crop 8x8+0+0 +repage -resize 1x1 txt:- | tail -1
      magick "$f" -gravity SouthEast -crop 8x8+0+0 +repage -resize 1x1 txt:- | tail -1
    done
    ```
    Para videos (hero turntable, teardown): extraer frame y muestrear igual:
    ```bash
    ffmpeg -y -i public/video/evidence-pro-turntable.mp4 -frames:v 1 /tmp/hero-frame.png 2>/dev/null
    magick /tmp/hero-frame.png -gravity NorthWest -crop 12x12+0+0 +repage -resize 1x1 txt:- | tail -1
    ```
- [ ] **Step 2.3:** Calcular diferencia perceptual por asset (RMSE como proxy de ΔE):
    ```bash
    # crear swatch del fondo de la sección y comparar con el borde del asset
    magick -size 1x1 xc:'#E9D8C0' /tmp/section-bg.png
    magick compare -metric RMSE /tmp/asset-edge.png /tmp/section-bg.png null: 2>&1
    ```
    Umbral: RMSE < 5% = fundido OK · 5–12% = arreglable con CSS · >12% = candidato a regenerar.
- [ ] **Step 2.4:** Tabla final: sección → asset → color de fondo sección → color de borde asset → RMSE → veredicto (`ok` / `css` / `regen`). Las secciones noir comparan contra negro; crema contra `#E9D8C0` (o `#E2CFB4` en #archivo que usa `--crema-surface`).

### Task 3: Auditoría SEO + mapa de CTAs

**Files:** ninguno. Output: informe + tabla CTAs.

- [ ] **Step 3.1:** `WebFetch` a `https://www.tododeia.com/community/claude-seo-ai` — extraer prácticas SEO aplicables a una landing one-page. Si la página no carga, continuar con las prácticas estándar (no bloquea).
- [ ] **Step 3.2:** Auditar estado actual: `app/layout.tsx:19-30` (metadata mínima, sin robots, sin twitter card, metadataBase apunta a evidence.com.co que es el sitio viejo), inexistencia de `app/sitemap.ts`/`app/robots.ts`, JSON-LD ausente. Inventariar `alt` de todas las imágenes (`grep -rn 'alt=' components/ app/`). Verificar jerarquía: h1 único en HeroNoir, h2 por sección, h3 anidados.
- [ ] **Step 3.3:** Mapa de CTAs — verificar con Playwright click + estado conocido del código:
    | CTA | Ubicación | Estado esperado |
    |---|---|---|
    | Nav links ×5 | `Nav.tsx:38-44` | anchors — verificar que `#taller` y `#respaldo` tengan `id` en sus secciones |
    | Logo → `#top` | `Nav.tsx:71` | OK (HeroNoir id="top") |
    | "ES / EN" | `Nav.tsx:97-106` | MUERTO — span decorativo |
    | "Agende demostración" → `#contacto` | `HeroNoir.tsx:114` | OK (ContactForm id="contacto") |
    | Submit form | `ContactForm.tsx:12-19` | FALSO — simula envío, no manda nada |
    | Tel `+57 1 000 0000` | `ContactForm.tsx:92` | placeholder, sin href |
    | `#legal` / `#privacidad` | `Footer.tsx:40-45` | ROTOS — no existen |
- [ ] **Step 3.4:** Entregar **informe de auditoría consolidado** (Tasks 1+2+3) en la conversación y esperar OK del usuario antes de Fase 2.

---

## FASE 2 — FUNDACIÓN i18n

### Task 4: Diccionario ES (`copy.es.json`)

**Files:**
- Create: `content/copy.es.json`
- (NO borrar `content/copy.json` todavía — se elimina en Task 6 cuando nada lo importe)

- [ ] **Step 4.1:** Crear `content/copy.es.json` con TODO el contenido actual de `content/copy.json` MÁS el bloque `ui` nuevo (strings hoy hardcodeados). Contenido completo:

```json
{
  "hero_headline": "Evidence Pro. 10 programas.",
  "hero_subheadline": "Fabricado por las manos que después responden el teléfono.",
  "seccion_lineas_headline": "Cuatro líneas. Doce instrumentos.",
  "lineas_descriptors": [
    { "nombre": "Línea Corporal", "descriptor": "Contorno, drenaje, reafirmación. Plataformas de alta intensidad.", "tecnologias": ["Cavitación multipolar", "Radiofrecuencia tripolar", "Vacumterapia"] },
    { "nombre": "Línea Facial", "descriptor": "Rejuvenecimiento sin pinchazo. Resultado visible en cabina.", "tecnologias": ["Microcorrientes", "HIFU facial", "Mesoterapia virtual"] },
    { "nombre": "Línea Láser", "descriptor": "Pigmento, vascular, depilación. Multi-longitud de onda.", "tecnologias": ["Diodo 808 nm", "Nd:YAG 1064 nm", "IPL multibanda"] },
    { "nombre": "Línea Soporte", "descriptor": "Higienización, oxigenación, mantenimiento de cabina.", "tecnologias": ["Hidrolimpieza", "Oxigeno-presoterapia", "Esterilización UV-C"] }
  ],
  "evidence_pro_detail_intro": "Diez programas en una sola plataforma. Cuatro modos de entrega. Pantalla calibrada en planta antes de salir. Esto no es un equipo armado para catálogo. Es el que probamos seis meses antes de venderlo.",
  "evidence_pro_specs": [
    { "label": "FREQ", "value": "0.5 – 5 MHz" },
    { "label": "POWER", "value": "60 W max" },
    { "label": "MODES", "value": "4" },
    { "label": "PROGRAMS", "value": "10" }
  ],
  "manufactory_headline": "Aquí se fabrica.",
  "manufactory_subhead": "Cada Evidence Pro sale de la misma planta donde se ensamblará el siguiente.",
  "manufactory_quote": "Las manos que ensamblan son las que después atienden la garantía.",
  "timeline_milestones": [
    { "anio": "1998", "objeto": "Primer equipo de cavitación", "frase": "Cuatro técnicos. Un taller en Bogotá." },
    { "anio": "2005", "objeto": "Línea Corporal completa", "frase": "Veintidós clínicas en cinco ciudades." },
    { "anio": "2012", "objeto": "Certificación INVIMA total", "frase": "Cada equipo registrado y trazable." },
    { "anio": "2018", "objeto": "Red técnica nacional", "frase": "Bogotá, Medellín, Cali, Barranquilla." },
    { "anio": "2024", "objeto": "Evidence Pro lanzamiento", "frase": "Tres años de desarrollo interno." }
  ],
  "respaldo_headline": "Después de la venta.",
  "respaldo_concrete_promises": [
    { "index": "01", "claim": "Técnicos propios en Bogotá, Medellín, Cali.", "metrics": [{ "label": "TÉCNICOS", "value": "14" }, { "label": "CIUDADES", "value": "3" }] },
    { "index": "02", "claim": "Repuestos en bodega local. Cero importación.", "metrics": [{ "label": "SKUS", "value": "220+" }, { "label": "STOCK", "value": "72 h" }] },
    { "index": "03", "claim": "Respuesta técnica en menos de 48 horas.", "metrics": [{ "label": "SLA", "value": "48 h" }, { "label": "ESCALADO", "value": "DIRECTO" }] },
    { "index": "04", "claim": "Garantía de 36 meses, sin asterisco.", "metrics": [{ "label": "COBERTURA", "value": "36 m" }, { "label": "ASTERISCOS", "value": "0" }] }
  ],
  "cta_primary": "Agende demostración",
  "cta_secondary": "Hable con técnico",
  "footer_line": "Evidence. Equipos hechos por las mismas manos que los reparan.",
  "ui": {
    "nav_links": [
      { "href": "#lineas", "label": "líneas" },
      { "href": "#pro", "label": "pro" },
      { "href": "#taller", "label": "taller" },
      { "href": "#archivo", "label": "archivo" },
      { "href": "#respaldo", "label": "respaldo" }
    ],
    "nav_menu_open": "Abrir menú",
    "nav_menu_close": "Cerrar menú",
    "hero_meta_location": "ESTUDIO ESTÉTICO · BOGOTÁ",
    "hero_meta_film": "FILM 01 / 06",
    "hero_readout_lines": ["EV / PRO · S/N 0000-0001", "10 PROGRAMAS · 4 MODOS · 0.5–5 MHz", "CALIBRADO EN PLANTA · BOGOTÁ"],
    "hero_scroll_cue": "↓ desplazar",
    "beat_whisper": "Cuatro disciplinas. Un fabricante.",
    "teardown_eyebrow": "PRO · IN DEPTH",
    "teardown_scroll_label": "SCROLL",
    "teardown_beats": [
      { "eyebrow": "ESTADO 01 / 04 · EXTERIOR", "title": "Diez programas en una sola plataforma.", "body": "Cuatro modos de entrega. Pantalla calibrada en planta antes de salir." },
      { "eyebrow": "ESTADO 02 / 04 · INTERIOR", "title": "Lo que no se vende: la calibración.", "body": "Cada Pro pasa por seis meses de pruebas internas antes de entrar al inventario." },
      { "eyebrow": "ESTADO 03 / 04 · TRANSDUCTOR", "title": "Manípulo de uso clínico.", "body": "Refrigeración líquida. Acople cerámico. Reemplazo modular en planta." },
      { "eyebrow": "ESTADO 04 / 04 · MEMORIA", "title": "10 programas, recordados.", "body": "Esto es Evidence Pro. El equipo que diseñamos para usarlo todos los días." }
    ],
    "manufactory_eyebrow": "BOGOTÁ · 1995",
    "manufactory_captions": ["01 · SOLDADURA SMD · LÍNEA A", "02 · CALIBRACIÓN · BANCO 03", "03 · EMBALAJE · DESPACHO MED"],
    "timeline_eyebrow": "ARCHIVO",
    "timeline_counter": "05 / 05",
    "timeline_headline": "Veintiséis años, en cinco objetos.",
    "timeline_quote": "En 2012 dejamos de pedir trazabilidad al proveedor. Empezamos a producirla.",
    "timeline_hito_label": "HITO",
    "timeline_year_aria": "Año",
    "timeline_alts": {
      "1998": "Primer equipo Evidence, taller en Bogotá",
      "2005": "Línea corporal Evidence",
      "2012": "Certificación de equipo médico",
      "2018": "Red técnica nacional Evidence",
      "2024": "Evidence Pro, lanzamiento"
    },
    "respaldo_eyebrow": "04 PROMESAS",
    "contact_headline": "Agende una demostración en su clínica.",
    "contact_body": "Un técnico Evidence visita su cabina con un Pro configurado para sus protocolos.",
    "contact_cities_label": "— CIUDADES CON COBERTURA",
    "contact_cities": "Bogotá · Medellín · Cali · Barranquilla",
    "contact_fields": { "nombre": "Nombre", "clinica": "Clínica", "ciudad": "Ciudad", "telefono": "Teléfono" },
    "contact_submit": "Agendar visita",
    "contact_sending": "Enviando…",
    "contact_success_eyebrow": "SOLICITUD RECIBIDA",
    "contact_success_msg": "Un técnico de Evidence se comunicará con usted en menos de 48 horas hábiles.",
    "contact_error_msg": "No pudimos enviar su solicitud. Intente de nuevo o llámenos.",
    "contact_phone": "+57 310 3247091",
    "footer_sedes_label": "Sedes",
    "footer_cities": ["Bogotá", "Medellín", "Cali"],
    "footer_copyright": "© Evidence S.A.S · NIT 800.XXX.XXX-X"
  }
}
```

  Nota: `manufactory_eyebrow` corrige 1998→**1995** (dato confirmado §4.3). El resto de placeholders quedan tal cual.
- [ ] **Step 4.2:** Validar JSON: `node -e "JSON.parse(require('fs').readFileSync('content/copy.es.json','utf8')); console.log('OK')"` → `OK`.
- [ ] **Step 4.3:** Commit: `git add content/copy.es.json && git commit -m "feat(i18n): diccionario ES con strings de UI centralizados"`

### Task 5: Diccionario EN (`copy.en.json`)

**Files:**
- Create: `content/copy.en.json`

- [ ] **Step 5.1:** Crear `content/copy.en.json` — mismo schema, contenido completo:

```json
{
  "hero_headline": "Evidence Pro. 10 programs.",
  "hero_subheadline": "Built by the same hands that answer the phone afterward.",
  "seccion_lineas_headline": "Four lines. Twelve instruments.",
  "lineas_descriptors": [
    { "nombre": "Body Line", "descriptor": "Contouring, drainage, firming. High-intensity platforms.", "tecnologias": ["Multipolar cavitation", "Tripolar radiofrequency", "Vacuum therapy"] },
    { "nombre": "Facial Line", "descriptor": "Needle-free rejuvenation. Visible results in-cabin.", "tecnologias": ["Microcurrents", "Facial HIFU", "Virtual mesotherapy"] },
    { "nombre": "Laser Line", "descriptor": "Pigment, vascular, hair removal. Multi-wavelength.", "tecnologias": ["808 nm diode", "Nd:YAG 1064 nm", "Multiband IPL"] },
    { "nombre": "Support Line", "descriptor": "Sanitation, oxygenation, cabin upkeep.", "tecnologias": ["Hydro-cleansing", "Oxygen pressotherapy", "UV-C sterilization"] }
  ],
  "evidence_pro_detail_intro": "Ten programs on a single platform. Four delivery modes. Screen calibrated at the plant before it ships. This is not a unit assembled for a catalog. It is the one we tested for six months before selling it.",
  "evidence_pro_specs": [
    { "label": "FREQ", "value": "0.5 – 5 MHz" },
    { "label": "POWER", "value": "60 W max" },
    { "label": "MODES", "value": "4" },
    { "label": "PROGRAMS", "value": "10" }
  ],
  "manufactory_headline": "Built here.",
  "manufactory_subhead": "Every Evidence Pro leaves the same plant where the next one will be assembled.",
  "manufactory_quote": "The hands that assemble are the hands that honor the warranty.",
  "timeline_milestones": [
    { "anio": "1998", "objeto": "First cavitation device", "frase": "Four technicians. A workshop in Bogotá." },
    { "anio": "2005", "objeto": "Complete Body line", "frase": "Twenty-two clinics across five cities." },
    { "anio": "2012", "objeto": "Full INVIMA certification", "frase": "Every device registered and traceable." },
    { "anio": "2018", "objeto": "Nationwide technical network", "frase": "Bogotá, Medellín, Cali, Barranquilla." },
    { "anio": "2024", "objeto": "Evidence Pro launch", "frase": "Three years of in-house development." }
  ],
  "respaldo_headline": "After the sale.",
  "respaldo_concrete_promises": [
    { "index": "01", "claim": "In-house technicians in Bogotá, Medellín, Cali.", "metrics": [{ "label": "TECHNICIANS", "value": "14" }, { "label": "CITIES", "value": "3" }] },
    { "index": "02", "claim": "Spare parts in local stock. Zero imports.", "metrics": [{ "label": "SKUS", "value": "220+" }, { "label": "STOCK", "value": "72 h" }] },
    { "index": "03", "claim": "Technical response in under 48 hours.", "metrics": [{ "label": "SLA", "value": "48 h" }, { "label": "ESCALATION", "value": "DIRECT" }] },
    { "index": "04", "claim": "36-month warranty, no asterisk.", "metrics": [{ "label": "COVERAGE", "value": "36 m" }, { "label": "ASTERISKS", "value": "0" }] }
  ],
  "cta_primary": "Book a demo",
  "cta_secondary": "Talk to a technician",
  "footer_line": "Evidence. Equipment built by the same hands that repair it.",
  "ui": {
    "nav_links": [
      { "href": "#lineas", "label": "lines" },
      { "href": "#pro", "label": "pro" },
      { "href": "#taller", "label": "workshop" },
      { "href": "#archivo", "label": "archive" },
      { "href": "#respaldo", "label": "support" }
    ],
    "nav_menu_open": "Open menu",
    "nav_menu_close": "Close menu",
    "hero_meta_location": "AESTHETIC STUDIO · BOGOTÁ",
    "hero_meta_film": "FILM 01 / 06",
    "hero_readout_lines": ["EV / PRO · S/N 0000-0001", "10 PROGRAMS · 4 MODES · 0.5–5 MHz", "CALIBRATED AT THE PLANT · BOGOTÁ"],
    "hero_scroll_cue": "↓ scroll",
    "beat_whisper": "Four disciplines. One manufacturer.",
    "teardown_eyebrow": "PRO · IN DEPTH",
    "teardown_scroll_label": "SCROLL",
    "teardown_beats": [
      { "eyebrow": "STATE 01 / 04 · EXTERIOR", "title": "Ten programs on a single platform.", "body": "Four delivery modes. Screen calibrated at the plant before shipping." },
      { "eyebrow": "STATE 02 / 04 · INTERIOR", "title": "What is not for sale: the calibration.", "body": "Every Pro goes through six months of internal testing before entering inventory." },
      { "eyebrow": "STATE 03 / 04 · TRANSDUCER", "title": "A handpiece built for clinical use.", "body": "Liquid cooling. Ceramic coupling. Modular replacement at the plant." },
      { "eyebrow": "STATE 04 / 04 · MEMORY", "title": "10 programs, remembered.", "body": "This is Evidence Pro. The device we designed to be used every day." }
    ],
    "manufactory_eyebrow": "BOGOTÁ · 1995",
    "manufactory_captions": ["01 · SMD SOLDERING · LINE A", "02 · CALIBRATION · BENCH 03", "03 · PACKAGING · MED DISPATCH"],
    "timeline_eyebrow": "ARCHIVE",
    "timeline_counter": "05 / 05",
    "timeline_headline": "Twenty-six years, in five objects.",
    "timeline_quote": "In 2012 we stopped asking suppliers for traceability. We started producing it.",
    "timeline_hito_label": "MILESTONE",
    "timeline_year_aria": "Year",
    "timeline_alts": {
      "1998": "First Evidence device, workshop in Bogotá",
      "2005": "Evidence body line",
      "2012": "Medical device certification",
      "2018": "Evidence nationwide technical network",
      "2024": "Evidence Pro, launch"
    },
    "respaldo_eyebrow": "04 PROMISES",
    "contact_headline": "Book a demonstration at your clinic.",
    "contact_body": "An Evidence technician visits your cabin with a Pro configured for your protocols.",
    "contact_cities_label": "— CITIES COVERED",
    "contact_cities": "Bogotá · Medellín · Cali · Barranquilla",
    "contact_fields": { "nombre": "Name", "clinica": "Clinic", "ciudad": "City", "telefono": "Phone" },
    "contact_submit": "Book a visit",
    "contact_sending": "Sending…",
    "contact_success_eyebrow": "REQUEST RECEIVED",
    "contact_success_msg": "An Evidence technician will contact you within 48 business hours.",
    "contact_error_msg": "We could not send your request. Try again or call us.",
    "contact_phone": "+57 310 3247091",
    "footer_sedes_label": "Locations",
    "footer_cities": ["Bogotá", "Medellín", "Cali"],
    "footer_copyright": "© Evidence S.A.S · NIT 800.XXX.XXX-X"
  }
}
```

- [ ] **Step 5.2:** Validar que ambos diccionarios tienen las mismas keys:
    ```bash
    node -e "
    const es = require('./content/copy.es.json'), en = require('./content/copy.en.json');
    const keys = o => JSON.stringify(Object.keys(o).sort()) + JSON.stringify(Object.keys(o.ui).sort());
    console.log(keys(es) === keys(en) ? 'KEYS OK' : 'KEYS MISMATCH');
    "
    ```
    Expected: `KEYS OK`
- [ ] **Step 5.3:** Commit: `git add content/copy.en.json && git commit -m "feat(i18n): diccionario EN"`

### Task 6: Tipos + LocaleProvider + wiring en layout

**Files:**
- Modify: `lib/copy.ts` (reescritura completa)
- Create: `lib/i18n.tsx`
- Modify: `app/layout.tsx` (envolver children)
- Delete: `content/copy.json` (al final, cuando nada lo importe — verificar con grep)

- [ ] **Step 6.1:** Reescribir `lib/copy.ts` completo (agrega tipo `UiCopy`, apunta a copy.es.json):

```ts
import es from "@/content/copy.es.json";

export type LineaDescriptor = {
  nombre: string;
  descriptor: string;
  tecnologias: string[];
};

export type TimelineMilestone = {
  anio: string;
  objeto: string;
  frase: string;
};

export type RespaldoPromise = {
  index: string;
  claim: string;
  metrics: { label: string; value: string }[];
};

export type EvidenceSpec = { label: string; value: string };

export type TeardownBeat = { eyebrow: string; title: string; body: string };

export type UiCopy = {
  nav_links: { href: string; label: string }[];
  nav_menu_open: string;
  nav_menu_close: string;
  hero_meta_location: string;
  hero_meta_film: string;
  hero_readout_lines: string[];
  hero_scroll_cue: string;
  beat_whisper: string;
  teardown_eyebrow: string;
  teardown_scroll_label: string;
  teardown_beats: TeardownBeat[];
  manufactory_eyebrow: string;
  manufactory_captions: string[];
  timeline_eyebrow: string;
  timeline_counter: string;
  timeline_headline: string;
  timeline_quote: string;
  timeline_hito_label: string;
  timeline_year_aria: string;
  timeline_alts: Record<string, string>;
  respaldo_eyebrow: string;
  contact_headline: string;
  contact_body: string;
  contact_cities_label: string;
  contact_cities: string;
  contact_fields: { nombre: string; clinica: string; ciudad: string; telefono: string };
  contact_submit: string;
  contact_sending: string;
  contact_success_eyebrow: string;
  contact_success_msg: string;
  contact_error_msg: string;
  contact_phone: string;
  footer_sedes_label: string;
  footer_cities: string[];
  footer_copyright: string;
};

export type Copy = {
  hero_headline: string;
  hero_subheadline: string;
  seccion_lineas_headline: string;
  lineas_descriptors: LineaDescriptor[];
  evidence_pro_detail_intro: string;
  evidence_pro_specs: EvidenceSpec[];
  manufactory_headline: string;
  manufactory_subhead: string;
  manufactory_quote: string;
  timeline_milestones: TimelineMilestone[];
  respaldo_headline: string;
  respaldo_concrete_promises: RespaldoPromise[];
  cta_primary: string;
  cta_secondary: string;
  footer_line: string;
  ui: UiCopy;
};

/** Default (ES) copy — para contextos server/no-reactivos. Componentes client usan useCopy(). */
export const copy = es as Copy;
```

- [ ] **Step 6.2:** Crear `lib/i18n.tsx` completo:

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import esData from "@/content/copy.es.json";
import enData from "@/content/copy.en.json";
import type { Copy } from "@/lib/copy";

export type Locale = "es" | "en";

const DICTIONARIES: Record<Locale, Copy> = {
  es: esData as Copy,
  en: enData as Copy,
};

const STORAGE_KEY = "ev-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "es",
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  // Hydrate persisted choice after mount (SSR siempre renderiza ES).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") setLocale(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "es" ? "es-CO" : "en";
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

export function useCopy(): Copy {
  return DICTIONARIES[useContext(LocaleContext).locale];
}
```

- [ ] **Step 6.3:** En `app/layout.tsx`, importar y envolver (solo el body cambia):

```tsx
import { LocaleProvider } from "@/lib/i18n";
```
```tsx
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
```

- [ ] **Step 6.4:** `pnpm build` → debe pasar sin errores (nada consume `ui` aún, pero tipos y JSON quedan validados).
- [ ] **Step 6.5:** Commit: `git add lib/copy.ts lib/i18n.tsx app/layout.tsx && git commit -m "feat(i18n): LocaleProvider + tipos UiCopy"`

### Task 7: Migrar componentes client a `useCopy()`

**Files (Modify):** `components/hero/HeroNoir.tsx`, `components/evidence-pro-detail/TeardownSequence.tsx`, `components/timeline/TimelineEditorial.tsx`, `components/timeline/MilestoneVisual.tsx`, `components/manufactory/ManufactorySection.tsx`, `components/respaldo/RespaldoSection.tsx`, `components/lineas/LineasSection.tsx`, `components/ui/SectionBeat.tsx`, `components/ui/Footer.tsx`, `app/page.tsx`
- Delete: `content/copy.json`

Patrón general por componente client: cambiar `import { copy } from "@/lib/copy"` → `import { useCopy } from "@/lib/i18n"` y agregar `const copy = useCopy();` como primera línea del componente. Todas las referencias `copy.x` existentes siguen funcionando. Luego reemplazar los strings hardcodeados por `copy.ui.*`.

- [ ] **Step 7.1 — HeroNoir.tsx:** aplicar patrón general + 5 swaps:
  - `ESTUDIO ESTÉTICO · BOGOTÁ` → `{copy.ui.hero_meta_location}`
  - `FILM 01 / 06` → `{copy.ui.hero_meta_film}`
  - Las 3 líneas del panel mono (`EV / PRO · S/N…`, `10 PROGRAMAS…`, `CALIBRADO…`) →
    ```tsx
    {copy.ui.hero_readout_lines.map((line, i) => (
      <span key={i} className={i === 2 ? "text-white/35" : undefined}>{line}</span>
    ))}
    ```
  - `↓ desplazar` → `{copy.ui.hero_scroll_cue}`
  - Nota: `HeadlineWithBlur` tokeniza sobre `"10"` — funciona igual en EN ("10 programs").
- [ ] **Step 7.2 — TeardownSequence.tsx:** patrón general (ya importa `copy`; cambiar a hook). Borrar el array `beats` hardcodeado (líneas 25-46) y usar `const beats = copy.ui.teardown_beats;`. Swaps: `PRO · IN DEPTH` → `{copy.ui.teardown_eyebrow}`, `SCROLL` (en ProgressIndicator) → pasar como prop `label={copy.ui.teardown_scroll_label}`.
- [ ] **Step 7.3 — TimelineEditorial.tsx:** patrón general + swaps: `ARCHIVO` → `{copy.ui.timeline_eyebrow}`, `05 / 05` → `{copy.ui.timeline_counter}`, `Veintiséis años, en cinco objetos.` → `{copy.ui.timeline_headline}`, quote del SerifQuote → `{copy.ui.timeline_quote}`, `HITO {…} / 05` → `` {`${copy.ui.timeline_hito_label} ${String(index + 1).padStart(2, "0")} / 05`} ``, `aria-label={\`Año ${m.anio}\`}` → `` aria-label={`${copy.ui.timeline_year_aria} ${m.anio}`} ``. `MilestoneRow` necesita el copy: o pasar `ui` como prop o llamar `useCopy()` dentro (preferir hook dentro, es client).
- [ ] **Step 7.4 — MilestoneVisual.tsx:** el mapa `ALT` hardcodeado (líneas 14-20) → `const alts = useCopy().ui.timeline_alts;` y usar `alts[variant]`.
- [ ] **Step 7.5 — ManufactorySection.tsx:** patrón general + swaps: `BOGOTÁ · 1998` → `{copy.ui.manufactory_eyebrow}` (corrige a 1995), los 3 `caption="…"` → `caption={copy.ui.manufactory_captions[0]}` / `[1]` / `[2]`.
- [ ] **Step 7.6 — RespaldoSection.tsx:** patrón general + swap `04 PROMESAS` → `{copy.ui.respaldo_eyebrow}`.
- [ ] **Step 7.7 — LineasSection.tsx:** patrón general (usa `copy.lineas_descriptors` y `copy.seccion_lineas_headline`). OJO línea 110: `linea.nombre.replace("Línea ", "")` — en EN los nombres son "Body Line" etc. Cambiar a un derivado robusto: `linea.nombre.replace(/Línea |\s?Line/g, "").trim().toUpperCase()`.
- [ ] **Step 7.8 — SectionBeat.tsx:** quitar prop `whisper` del tipo y leer del copy:
    ```tsx
    import { useCopy } from "@/lib/i18n";
    // dentro del componente:
    const whisper = useCopy().ui.beat_whisper;
    ```
    En `app/page.tsx` cambiar `<SectionBeat direction="noir-to-crema" whisper="Cuatro disciplinas. Un fabricante." />` → `<SectionBeat direction="noir-to-crema" />`.
- [ ] **Step 7.9 — Footer.tsx:** agregar `"use client";` arriba + patrón general + swaps: `Sedes` → `{copy.ui.footer_sedes_label}`, las 3 `<li>` ciudades → `{copy.ui.footer_cities.map((c) => <li key={c}>{c}</li>)}`, `© Evidence S.A.S · NIT…` → `{copy.ui.footer_copyright}`. (Los links legales se quitan en Task 10.)
- [ ] **Step 7.10:** Verificar que nada importa el JSON viejo: `grep -rn 'content/copy.json' app components lib --include='*.ts*'` → sin resultados (solo `copy.es.json`/`copy.en.json` via lib). Borrar: `git rm content/copy.json`.
- [ ] **Step 7.11:** `pnpm build` → PASS. `pnpm dev` + Playwright: screenshot del hero y timeline — textos idénticos a antes (ES default), y eyebrow taller dice **BOGOTÁ · 1995**.
- [ ] **Step 7.12:** Commit: `git add -A && git commit -m "feat(i18n): componentes consumen useCopy(), copy hardcodeado centralizado"`

---

## FASE 3 — FIXES

### Task 8: Nav nuevo — microcaps C + menú móvil + toggle ES/EN funcional

**Files:**
- Modify: `components/ui/Nav.tsx` (reescritura completa)

- [ ] **Step 8.1:** Reemplazar `components/ui/Nav.tsx` completo con:

```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCopy, useLocale, type Locale } from "@/lib/i18n";

type Mode = "noir" | "crema";

export function Nav() {
  const [mode, setMode] = useState<Mode>("noir");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = useCopy();
  const { locale, setLocale } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const m = entry.target.getAttribute("data-mode") as Mode | null;
            if (m) setMode(m);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    document.querySelectorAll<HTMLElement>("[data-mode]").forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isNoir = mode === "noir";
  const links = copy.ui.nav_links;

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isNoir
          ? scrolled
            ? "rgba(0,0,0,0.72)"
            : "rgba(0,0,0,0)"
          : scrolled
            ? "rgba(251,249,247,0.82)"
            : "rgba(251,249,247,0)",
        color: isNoir ? "#FFFFFF" : "#1A1410",
        borderBottomColor: isNoir
          ? scrolled
            ? "rgba(38,38,38,1)"
            : "rgba(38,38,38,0)"
          : scrolled
            ? "rgba(26,20,16,0.08)"
            : "rgba(26,20,16,0)",
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ backdropFilter: scrolled ? "blur(18px)" : "blur(0px)" }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <nav className="section-frame flex h-[72px] items-center justify-between md:h-[72px]">
        <a href="#top" aria-label="evidence — inicio" className="flex items-center">
          <Image
            src={isNoir ? "/img/brand/evidence-wordmark-white.png" : "/img/brand/evidence-wordmark.png"}
            alt="evidence"
            width={107}
            height={36}
            priority
            className="h-[28px] w-auto md:h-[34px]"
          />
        </a>

        {/* Desktop — microcaps editoriales (opción C) */}
        <ul className="hidden items-center md:flex">
          {links.map((l, i) => (
            <li key={l.href} className="flex items-center">
              {i > 0 ? (
                <span aria-hidden className="mx-4 opacity-40">
                  ·
                </span>
              ) : null}
              <a
                href={l.href}
                className="text-[10px] font-medium uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <LocaleToggle locale={locale} setLocale={setLocale} />

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? copy.ui.nav_menu_close : copy.ui.nav_menu_open}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-[10px] w-[22px]">
              <span
                className="absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300"
                style={{ transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }}
              />
              <span
                className="absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-300"
                style={{ transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu — noir editorial */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[72px] z-40 flex flex-col justify-between bg-black px-6 pb-8 pt-10 text-white md:hidden"
          >
            <ul className="flex flex-col gap-7">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-3 font-display text-[34px] font-light leading-none"
                  >
                    <sup className="font-mono-readout text-[10px] text-[color:var(--ev-blue-ice)]">
                      {String(i + 1).padStart(2, "0")}
                    </sup>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="font-mono-readout flex items-center justify-between border-t border-white/15 pt-5 text-[10px] text-white/65">
              <LocaleToggle locale={locale} setLocale={setLocale} />
              <a href={`tel:${copy.ui.contact_phone.replace(/\s/g, "")}`}>{copy.ui.contact_phone} · BOGOTÁ</a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function LocaleToggle({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  return (
    <div className="font-mono-readout flex items-center gap-1 text-[11px]">
      {(["es", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 ? <span className="opacity-40">/</span> : null}
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={`min-h-11 px-1 uppercase transition-opacity ${
              locale === l ? "font-bold opacity-100" : "opacity-50 hover:opacity-80"
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 8.2:** Verificar anchors: `grep -n 'id="' components/manufactory/ManufactorySection.tsx components/respaldo/RespaldoSection.tsx` — si `#taller` o `#respaldo` no existen como `id`, agregar `id="taller"` / `id="respaldo"` al `<section>` correspondiente.
- [ ] **Step 8.3:** `pnpm build` → PASS.
- [ ] **Step 8.4:** Verificación Playwright:
  - 1440px: links en microcaps con `·`; click en cada link navega a su sección.
  - Click "EN" → hero dice "Evidence Pro. 10 programs."; recargar página → sigue en EN (localStorage); click "ES" → vuelve.
  - 375px: hamburguesa visible; abrir → overlay noir con 5 links + tel; click en link → cierra y navega; body no scrollea con menú abierto.
- [ ] **Step 8.5:** Commit: `git add components/ui/Nav.tsx components/manufactory/ManufactorySection.tsx components/respaldo/RespaldoSection.tsx && git commit -m "feat(nav): microcaps editoriales, menú móvil overlay, toggle ES/EN funcional"`

### Task 9: Formulario real — Server Action + Resend

**Files:**
- Create: `app/actions/contact.ts`
- Modify: `components/contact/ContactForm.tsx`
- Modify: `package.json` + lockfile (solo `resend`)

- [ ] **Step 9.1:** `pnpm add resend` (única dependencia aprobada).
- [ ] **Step 9.2:** Crear `app/actions/contact.ts`:

```ts
"use server";

import { Resend } from "resend";

export type ContactState = { ok: true } | { ok: false; error: "invalid" | "send" } | null;

const MAX = 200;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const field = (k: string) => String(formData.get(k) ?? "").trim().slice(0, MAX);

  const nombre = field("nombre");
  const clinica = field("clinica");
  const ciudad = field("ciudad");
  const telefono = field("telefono");

  if (!nombre || !clinica || !ciudad || !/^[+\d][\d\s().-]{6,}$/.test(telefono)) {
    return { ok: false, error: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("contact: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return { ok: false, error: "send" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Evidence Landing <onboarding@resend.dev>",
    to,
    subject: `Solicitud de demostración — ${clinica} (${ciudad})`,
    text: [
      `Nombre:   ${nombre}`,
      `Clínica:  ${clinica}`,
      `Ciudad:   ${ciudad}`,
      `Teléfono: ${telefono}`,
      "",
      "Enviado desde evidence-rebrand.vercel.app",
    ].join("\n"),
  });

  if (error) {
    console.error("contact: resend error", error);
    return { ok: false, error: "send" };
  }
  return { ok: true };
}
```

  Notas: `CONTACT_TO_EMAIL` como env var porque con Resend sin dominio verificado solo se puede enviar al email del dueño de la cuenta; cuando se verifique dominio se cambia a `servicioalcliente@evidence.com.co` sin tocar código. `from` usa el remitente sandbox de Resend hasta verificar dominio.
- [ ] **Step 9.3:** Reescribir el manejo de submit en `components/contact/ContactForm.tsx`: quitar el fake (`onSubmit`, `busy`, `submitted`, líneas 8-19) y usar `useActionState`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useActionState } from "react";
import { CINEMATIC_EASE } from "@/lib/motion";
import { useCopy } from "@/lib/i18n";
import { sendContact, type ContactState } from "@/app/actions/contact";

export function ContactForm() {
  const copy = useCopy();
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendContact, null);
  const submitted = state?.ok === true;
```

  El JSX existente se conserva con estos cambios puntuales:
  - `<form onSubmit={onSubmit}` → `<form action={formAction}`
  - `disabled={busy}` → `disabled={pending}`; `{busy ? "Enviando…" : "Agendar visita"}` → `{pending ? copy.ui.contact_sending : copy.ui.contact_submit}`
  - Headline/body/labels/success → sus keys: `copy.ui.contact_headline`, `copy.ui.contact_body`, `copy.ui.contact_cities_label`, `copy.ui.contact_cities`, `copy.ui.contact_success_eyebrow`, `copy.ui.contact_success_msg`; `<Field label="Nombre" …>` → `label={copy.ui.contact_fields.nombre}` (ídem clinica/ciudad/telefono).
  - Mensaje de error debajo del botón:
    ```tsx
    {state && !state.ok ? (
      <p role="alert" className="mt-4 text-[13px] text-[#A33B2E]">
        {copy.ui.contact_error_msg}
      </p>
    ) : null}
    ```
  - Teléfono placeholder → real y clickeable:
    ```tsx
    <p className="font-mono-readout mt-6 text-[10px] text-[color:var(--crema-fg)]/45">
      {copy.cta_secondary.toUpperCase()} ·{" "}
      <a href={`tel:${copy.ui.contact_phone.replace(/\s/g, "")}`} className="hover:opacity-100">
        {copy.ui.contact_phone}
      </a>
    </p>
    ```
- [ ] **Step 9.4:** Pedir al usuario la `RESEND_API_KEY` (cuenta resend.com) y su email para `CONTACT_TO_EMAIL`. Configurar: `vercel env add RESEND_API_KEY` y `vercel env add CONTACT_TO_EMAIL` (production+preview+development) y crear `.env.local` local (ya está en .gitignore de Next por defecto — verificar). **No commitear claves.**
- [ ] **Step 9.5:** `pnpm build` → PASS. Prueba manual con Playwright: llenar el form en localhost y enviar → estado éxito visible y email recibido (o, si el usuario aún no da la key, verificar que aparece el mensaje de error con `role="alert"` y dejarlo anotado como pendiente-de-key).
- [ ] **Step 9.6:** Commit: `git add app/actions/contact.ts components/contact/ContactForm.tsx package.json pnpm-lock.yaml && git commit -m "feat(contact): server action + Resend, tel real, estados de error"`

### Task 10: Footer — quitar links legales

**Files:**
- Modify: `components/ui/Footer.tsx`

- [ ] **Step 10.1:** Eliminar el bloque de links (líneas 39-46 del original):
    ```tsx
    <div className="flex gap-6 font-mono-readout opacity-60">
      <a href="#legal" className="hover:opacity-100">Aviso legal</a>
      <a href="#privacidad" className="hover:opacity-100">Privacidad</a>
    </div>
    ```
    → se borra el `<div>` completo. El `©` queda solo en esa fila.
- [ ] **Step 10.2:** `pnpm build` → PASS. Commit: `git add components/ui/Footer.tsx && git commit -m "fix(footer): quitar links legales rotos hasta tener textos reales"`

### Task 11: Performance — video teardown lazy

**Files:**
- Modify: `components/evidence-pro-detail/TeardownSequence.tsx` (componente `TeardownScrubVideo`, línea ~136)

- [ ] **Step 11.1:** En `TeardownScrubVideo`, cambiar `preload="auto"` → `preload="metadata"`. El scrub por `currentTime` fuerza la descarga progresiva al entrar; los 2.85MB dejan de cargarse en el load inicial.
- [ ] **Step 11.2:** Verificar con Playwright `browser_network_requests` tras recargar: `evidence-pro-teardown.mp4` ya no descarga completo antes de scrollear a #pro. Verificar que el scrub sigue funcionando al scrollear (el video hace seek progresivo).
- [ ] **Step 11.3:** Commit: `git add components/evidence-pro-detail/TeardownSequence.tsx && git commit -m "perf(teardown): preload metadata en video scrubbeado"`

### Task 12: Overflow mobile — fixes de la auditoría

**Files:**
- Modify: según hallazgos de Task 1 (candidatos conocidos: `app/globals.css` `.hero-number`, headlines de `LineasSection.tsx`, `TimelineEditorial.tsx`)

- [ ] **Step 12.1:** Por cada offender de la tabla de Task 1, aplicar el fix mínimo en su componente. Recetas (elegir según el caso, no aplicar todas):
  - Headline con tamaño fijo que desborda: convertir a `clamp()` — ej. `text-[44px]` → `text-[clamp(34px,9vw,44px)]`.
  - String largo sin cortes (mono readouts con `·`): permitir wrap → agregar `break-words` o reducir a `text-[10px]` en mobile.
  - Elemento con ancho fijo: `max-w-full`.
  - El hero ya usa `clamp(96px,14vw,160px)` en `.hero-number` (globals.css) — verificar a 360px; si desborda, bajar piso: `clamp(72px,13vw,160px)`.
- [ ] **Step 12.2:** Re-verificar con Playwright a 375px y 360px: el evaluate de overflow del Task 1 Step 1.2 devuelve `offenders: []` y `scrollWidth === innerWidth`.
- [ ] **Step 12.3:** `pnpm build` → PASS. Commit: `git add -A && git commit -m "fix(responsive): textos desbordados en mobile"`

### Task 13: SEO — noindex + infraestructura completa

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`, `app/robots.ts`
- Modify: alt texts según inventario de Task 3 (archivos que indique la auditoría)

- [ ] **Step 13.1:** Reemplazar el bloque `metadata` de `app/layout.tsx` por:

```ts
const SITE_URL = "https://evidence-rebrand.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "evidence — equipos para medicina estética",
    template: "%s · evidence",
  },
  description:
    "Equipos para medicina estética fabricados en Bogotá desde 1995. Cuatro líneas, fabricación propia, servicio técnico directo. ISO 9001 · ISO 13485 · INVIMA.",
  metadataBase: new URL(SITE_URL),
  // noindex mientras haya specs placeholder públicas y no haya dominio definitivo.
  // Al conectar dominio real: borrar `robots`, actualizar SITE_URL y listo.
  robots: { index: false, follow: true },
  openGraph: {
    title: "evidence — equipos para medicina estética",
    description: "Equipos hechos por las mismas manos que los reparan. Bogotá, desde 1995.",
    url: SITE_URL,
    siteName: "evidence",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "evidence — equipos para medicina estética",
    description: "Equipos hechos por las mismas manos que los reparan.",
  },
};
```

- [ ] **Step 13.2:** JSON-LD Organization en el body del layout (datos reales confirmados §4.3):

```tsx
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Evidence S.A.S",
  url: "https://evidence-rebrand.vercel.app",
  logo: "https://evidence-rebrand.vercel.app/img/brand/evidence-wordmark.png",
  foundingDate: "1995-02-15",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrera 72B #49A-70",
    addressLocality: "Bogotá",
    addressCountry: "CO",
  },
  telephone: "+57 310 3247091",
  email: "servicioalcliente@evidence.com.co",
};
```
```tsx
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
```

- [ ] **Step 13.3:** Crear `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://evidence-rebrand.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 13.4:** Crear `app/robots.ts` (permitir crawl para que el noindex meta sea visible):

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://evidence-rebrand.vercel.app/sitemap.xml",
  };
}
```

- [ ] **Step 13.5:** Alt texts: aplicar el inventario de Task 3. Mínimo conocido: `Nav.tsx` logo `alt="evidence"` (OK), `Footer.tsx` wordmark (OK), `HeroNoir.tsx:74` `alt="Evidence Pro"` → `alt="Evidence Pro — electroestimulador multicanal"`; videos: agregar `aria-label="Evidence Pro girando"` al `<video>` del hero y `aria-label="Despiece del Evidence Pro"` al del teardown. Imágenes de secciones (lineas/manufactory/timeline) reciben alt desde sus captions/alts ya migrados en Task 7.
- [ ] **Step 13.6:** Verificar: `pnpm build` → PASS; `curl -s localhost:3000/robots.txt` y `curl -s localhost:3000/sitemap.xml` responden; `curl -s localhost:3000 | grep -o 'noindex'` → `noindex`; validar JSON-LD pegándolo en el validador de schema.org (o `node -e` parse).
- [ ] **Step 13.7:** Commit: `git add app/ components/ && git commit -m "feat(seo): noindex temporal + metadata completa, sitemap, robots, JSON-LD, alts"`

---

## FASE 4 — ASSETS

### Task 14: Favicon edge-to-edge

**Files:**
- Modify: `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`
- (Originales se respaldan en `/tmp` antes — son regenerables desde `public/img/brand/icon-onda.png`)

- [ ] **Step 14.1:** Backup: `cp app/favicon.ico app/icon.png app/apple-icon.png /tmp/favicon-backup/` (crear dir).
- [ ] **Step 14.2:** Generar versión edge-to-edge desde el icono onda (recortar transparencia y escalar al ~95% del canvas):
    ```bash
    magick public/img/brand/icon-onda.png -trim +repage /tmp/onda-trimmed.png
    # icon.png — 512px, onda al 95%
    magick /tmp/onda-trimmed.png -resize 486x486 -gravity center -background none -extent 512x512 app/icon.png
    # apple-icon — iOS no respeta transparencia: fondo crema de marca
    magick /tmp/onda-trimmed.png -resize 152x152 -gravity center -background "#E9D8C0" -extent 180x180 app/apple-icon.png
    # favicon.ico multi-resolución
    magick /tmp/onda-trimmed.png -resize 48x48 -gravity center -background none -extent 48x48 /tmp/f48.png
    magick /tmp/onda-trimmed.png -resize 32x32 -gravity center -background none -extent 32x32 /tmp/f32.png
    magick /tmp/onda-trimmed.png -resize 16x16 -gravity center -background none -extent 16x16 /tmp/f16.png
    magick /tmp/f16.png /tmp/f32.png /tmp/f48.png app/favicon.ico
    ```
- [ ] **Step 14.3:** Test de legibilidad a 16px: `magick /tmp/f16.png -filter point -resize 800% /tmp/f16-zoom.png` y mirar el resultado (Read del PNG). **Si la onda no se distingue** a 16px: PARAR y preguntar al usuario si genera versión simplificada con Higgsfield (créditos) o se acepta la actual.
- [ ] **Step 14.4:** Verificar en navegador: `pnpm dev` + Playwright a localhost → screenshot; revisar `curl -sI localhost:3000/icon.png` (200). Pestaña muestra el icono nuevo (puede requerir hard reload).
- [ ] **Step 14.5:** Commit: `git add app/favicon.ico app/icon.png app/apple-icon.png && git commit -m "feat(brand): favicon edge-to-edge desde icono onda"`

### Task 15: Coherencia visual — fundir assets con sus secciones

**Files:** según tabla ΔE de Task 2. Candidatos típicos: `components/lineas/LineaPlaceholder.tsx`, `components/manufactory/ManufactoryPlaceholder.tsx`, `components/timeline/MilestoneVisual.tsx`, `app/globals.css` (clase utilitaria nueva).

- [ ] **Step 15.1:** Para cada asset con veredicto `css` (RMSE 5–12%), aplicar la receta menos invasiva, en orden:
  1. **Máscara de fundido** (preferida — funde los bordes del asset al fondo):
     ```css
     /* app/globals.css */
     .asset-blend {
       -webkit-mask-image: radial-gradient(ellipse 92% 92% at 50% 50%, #000 72%, transparent 100%);
       mask-image: radial-gradient(ellipse 92% 92% at 50% 50%, #000 72%, transparent 100%);
     }
     ```
     y agregar `className="asset-blend"` al `<Image>`/`<img>` correspondiente.
  2. **Multiply sobre crema** (si el fondo del asset es más claro que la sección): `mix-blend-mode: multiply` — solo en secciones crema, verificar que no oscurezca el producto.
  3. **Ajuste de tinte** (si el asset tiene cast de color leve): `filter: sepia(0.06) saturate(0.97)` afinado a ojo con screenshot AB.
- [ ] **Step 15.2:** Para cada asset con veredicto `regen` (RMSE >12%): listar al usuario (asset, sección, colores, por qué CSS no alcanza) y **preguntar antes de cada generación Higgsfield**. Prompt de generación debe incluir: `"seamless background exactly #E9D8C0 (warm cream), object floats on flat background, no vignette, no gradient"` (o `#000000` para secciones noir; `#E2CFB4` para #archivo). Pipeline tras aprobar: generar → descargar → `magick <raw> -resize 1280x -quality 88 <dest>.webp` → reemplazar en `public/img/<seccion>/` (con backup previo en `/tmp`).
- [ ] **Step 15.3:** Verificación AB: re-correr el muestreo del Task 2 (RMSE < 5% en todos) + screenshots Playwright por sección, comparar antes/después. Mostrar al usuario.
- [ ] **Step 15.4:** `pnpm build` → PASS. Commit: `git add -A && git commit -m "fix(visual): assets fundidos con el fondo de su sección"`

---

## FASE 5 — RE-REVISIÓN DE AGENCIA

### Task 16: Deploy preview + critique experto

**Files:** ninguno (informe). Posibles quick-wins como tareas nuevas aprobadas por el usuario.

- [ ] **Step 16.1:** Preguntar al usuario antes de deployar. Con OK: `vercel` (preview, NO `--prod`). Anotar URL del preview.
- [ ] **Step 16.2:** Re-crawl Playwright del preview: screenshots de todas las secciones en 375/768/1440, en ES y EN.
- [ ] **Step 16.3:** Invocar `ui-ux-pro-max` y `frontend-design` como lentes de evaluación y producir el **critique de agencia**, cubriendo:
  - *Estético:* jerarquía visual por sección, ritmo del scroll (¿los beats respiran o frenan?), consistencia tipográfica (display vs mono vs serif), uso del color (¿el azul Evidence aparece lo suficiente como acento?), microinteracciones, calidad percibida vs. referentes premium (Bang & Olufsen, Leica, Aesop).
  - *Estructural — qué falta:* social proof (logos/testimonios de clínicas), certificaciones como badges visuales (ISO 9001/13485, INVIMA — hoy solo texto en timeline), FAQ/objeciones de compra (precio, financiación, capacitación), sección "por qué Evidence vs importado", protocolos/casos de uso por línea, captura de lead secundaria (newsletter/WhatsApp).
  - *Conversión:* ¿un solo CTA path (#contacto) es suficiente? ¿el form pide muy poco/mucho? ¿hay fricción en móvil?
- [ ] **Step 16.4:** Entregar informe priorizado: **P0 duele / P1 pulir / P2 backlog**, cada item con esfuerzo estimado y archivo(s) afectado(s). Implementar solo los quick-wins que el usuario apruebe explícitamente (cada uno como mini-tarea: cambio → build → commit). El resto queda como backlog accionable al final del informe.
- [ ] **Step 16.5:** Cierre: resumen de los 8 features originales → estado (✓ resuelto / pendiente-de-qué), actualizar `REVISION-Y-PHASE-2.md` §5 marcando los items completados de P0/P1/P2. Commit final: `git add REVISION-Y-PHASE-2.md && git commit -m "docs: actualizar backlog Phase 2 tras mejoras"`. Preguntar si push/deploy a producción.

---

## Self-review del plan (hecho)

- **Cobertura del spec:** SEO→T3+T13 · responsive/perf→T1+T11+T12 · favicon→T14 · i18n→T4-T7+T8(toggle) · CTAs→T3+T8(anchors)+T9+T10 · coherencia visual→T2+T15 · overflow→T1+T12 · header→T8 · critique→T16. ✓
- **Placeholders:** Tasks 12 y 15 dependen de hallazgos de auditoría por diseño; incluyen recetas concretas y criterio de verificación binario (offenders=[], RMSE<5%). El resto tiene código completo. ✓
- **Consistencia de tipos:** `Copy.ui: UiCopy` (T6) ↔ keys de copy.es/en.json (T4/T5) ↔ usos `copy.ui.*` (T7/T8/T9) verificados uno a uno. `useActionState` requiere React 19 (Next 15+/16 — el repo usa App Router reciente; si build falla, fallback documentado: `useFormState` de `react-dom`). ✓
