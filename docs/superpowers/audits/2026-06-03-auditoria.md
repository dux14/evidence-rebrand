# Auditoría Fase 1 — Evidence Landing (2026-06-03)

Método: Chrome headless + playwright-core (el MCP de Playwright no pudo lanzar Chrome headed en Wayland — 3 timeouts de 180s; mismo resultado por CDP directo). Muestreo de color con Pillow + ffmpeg. Screenshots en `/tmp/ev-audit/out/`.

## 1. Responsive / Overflow

| Viewport | scrollWidth/innerWidth | Offenders | Nav |
|---|---|---|---|
| 375×812 | 360/375 ✓ | **hero headline desborda**: "Evidence" → right 391px, "programas" → right 458px (clip visual, `.hero-number` clamp floor 96px es muy grande) | **`display:none` — SIN navegación móvil** |
| 768×1024 | 753/768 ✓ | ninguno | flex ✓ |
| 1440×900 | 1425/1440 ✓ | ninguno | flex ✓ |

- Consola: **0 errores / 0 warnings** en los 3 viewports.
- Anclas: `#top #lineas #pro #taller #archivo #respaldo #contacto` **todas existen** ✓ (no hace falta el fix de anchors previsto en Task 8.2).

## 2. Performance (carga inicial @375)

| Asset | Peso | Problema |
|---|---|---|
| `/video/evidence-pro-teardown.mp4` | **2.85 MB** | `preload="auto"` — descarga ansiosa aunque #pro esté lejos |
| `/video/evidence-pro-turntable.mp4` | 1.28 MB | autoplay hero — aceptable (LCP probable) |
| **Total transferido** | **4.42 MB** | mayoría es video |

→ Fix planificado T11: `preload="metadata"` en teardown.

## 3. Coherencia visual (RMSE borde-asset vs fondo-sección)

Fondos reales medidos: lineas/taller/respaldo/contacto/footer `rgb(233,216,192)` = `#E9D8C0` ✓ · archivo `rgb(226,207,180)` = `#E2CFB4` ✓ · hero/pro negro ✓.

| Asset | Peor RMSE | Veredicto |
|---|---|---|
| lineas/corporal.webp | 0.7% | ok |
| lineas/soporte.webp | 3.4% | ok |
| lineas/laser.webp | 9.9% | **css** (máscara de fundido) |
| lineas/facial.webp | 11.0% | **css** (máscara de fundido) |
| timeline/2005.webp | 8.8% | **css** (multiply) |
| timeline/2012.webp | 11.8% | **css** (multiply) |
| timeline/1998.webp | 15.6% | **css probable** (bg blanco-crema; multiply lo lleva exacto a crema) |
| timeline/2024.webp | 16.9% | **css a probar** (bg blanco frío; multiply le da cast cálido — validar AB) |
| timeline/2018.webp | 30.3% | **css a probar** (mapa tonos naranjas; multiply = efecto print) |
| manufactory/wide.webp | 83.3% | **fotos NOIR sobre sección CREMA** |
| manufactory/solder.webp | 81.9% | ídem |
| manufactory/calibration.webp | 82.8% | ídem |
| manufactory/pack.webp | 80.6% | ídem |
| video turntable / teardown / poster | 0.3–0.4% | ok (funden al negro) |

**Decisión manufactory (la mayor incoherencia de la página):** las 4 fotos son macro-fotografía oscura de taller — irrecuperables por CSS sobre crema. Dos salidas:
- **A (aplicada, costo cero, reversible):** pasar la sección Taller a tratamiento noir (`data-mode="noir"`, bg negro). Ritmo resultante: pro(noir) → taller(noir) → archivo(crema) — coherente.
- **B (alternativa, requiere créditos Higgsfield + OK del usuario):** regenerar las 4 fotos como taller iluminado cálido con fondo `#E9D8C0`.

## 4. SEO — estado actual

- `metadata` mínima: sin `robots`, sin twitter card, sin canonical; `metadataBase` apunta a `evidence.com.co` (sitio viejo del cliente) ≠ host real `evidence-rebrand.vercel.app`.
- **No existen** `sitemap.ts`, `robots.ts`, JSON-LD.
- Headings: h1 único (hero) ✓, h2 por sección ✓.
- Alts: logos ✓; lineas/manufactory/timeline tienen alt internos ✓ (productos reales nombrados); hero `alt="Evidence Pro"` mejorable; videos sin `aria-label`.
- Referencia (tododeia.com/community/claude-seo-ai) — aplicable: JSON-LD, robots correcto, sitemap, bloques de respuesta extraíbles (→ va al critique F5 como recomendación de contenido), permitir bots de citación IA (OAI-SearchBot, Claude-SearchBot, PerplexityBot) en robots, E-E-A-T (certificaciones visibles), Core Web Vitals.
- `hreflang`: N/A — i18n es client-side sin URLs por idioma (decisión de spec); anotado para cuando haya dominio + SEO real.

## 5. CTAs

| CTA | Ubicación | Estado |
|---|---|---|
| Nav links ×5 | Nav.tsx | OK (anclas existen) — pero invisibles en móvil |
| Logo → #top | Nav.tsx | OK |
| "ES / EN" | Nav.tsx:97 | **MUERTO** (span decorativo) |
| "Agende demostración" → #contacto | HeroNoir.tsx:114 | OK |
| Submit formulario | ContactForm.tsx:12 | **FALSO** (simula éxito, no envía) |
| Tel "+57 1 000 0000" | ContactForm.tsx:92 | **placeholder**, sin `href` |
| #legal / #privacidad | Footer.tsx:40-45 | **ROTOS** |
