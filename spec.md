
● # evidence.com.co — Landing Spec v1

  Layout specification para construcción en Next.js 15 + Framer Motion.
  Desktop primario 1440px · Tablet 768px · Mobile 375px.

  ---

  ## 0. DESIGN TOKENS

  ### Color (CSS custom properties)
  ```css
  :root {
    /* Mundo Atelier (~80%) */
    --crema-canvas:   #FBF9F7;   /* fondo principal */
    --crema-surface:  #F5EFE8;   /* tarjetas, divisores */
    --ink:            #1A1410;   /* texto sobre crema */
    --ink-muted:      #1A141099; /* 60% — captions, meta */

    /* Mundo Noir (~20%) */
    --noir-bg:        #000000;
    --noir-bg-2:      #0A0A0B;   /* gradiente radial cálido */
    --noir-warm-rim:  #8B7355;   /* halo cálido al producto */
    --on-noir:        #FFFFFF;
    --on-noir-muted:  #FFFFFF99;

    /* Acento — usar SOLO en estados activos */
    --ev-blue:        #1B3A7A;
    --ev-blue-deep:   #0D2D6E;

    /* Motion */
    --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
    --dur-fast:       240ms;
    --dur-base:       560ms;
    --dur-slow:       900ms;
    --dur-beat:       1200ms;
  }

  Reglas duras:
  - Azul Evidence nunca como background, nunca como icono grande, nunca como divider.
  - Cero cyan. Cero verde wellness. Cero medical-cold-blue.
  - Sombras sobre crema: 0 24px 60px -32px #1A141026 (suaves, dirigidas, calientes).

  Tipografía

  Inter Tight       — 100–800, body + UI + headlines.   Escala: 14 / 16 / 18 / 24 / 32 / 48 / 72 / 96 / 128 / 160
  PP Editorial New  — italic 400, frases-momento.       Escala: 28 / 40 / 56 / 80
  JetBrains Mono    — 400/500, readouts y specs.        Escala: 11 / 12 / 14 — uppercase, tracking +0.12em

  Reglas:

  - Wordmark evidence siempre lowercase, tracking +0.24em.
  - PP Editorial New nunca en body, nunca en UI, nunca >2 líneas seguidas.
  - JetBrains Mono solo en números (años, métricas, specs) y micro-labels técnicos.

  Grid

  - Desktop 1440: 12 col · gutter 24 · margen 168 (12% lateral).
  - Tablet 768: 8 col · gutter 16 · margen 48.
  - Mobile 375: 4 col · gutter 12 · margen 24.
  - Max text-width modo Atelier: 720–840px.

  Espaciado vertical entre secciones

  - Desktop: 200px entre bloques principales · 320px en transiciones noir↔crema.
  - Mobile: 96px / 144px respectivamente.

  ---
  1. HERO NOCTURNO  ·  modo Cinematic
  
  Fondo: --noir-bg con gradiente radial centrado: radial-gradient(ellipse at 50% 55%, #1A1410 0%, #0A0A0B 60%, #000000 100%). Halo cálido --noir-warm-rim al 12% opacity detrás del producto.

  Layout desktop 1440 × 900 viewport:

  ┌──────────────────────────────────────────────────────────────┐
  │  evidence            líneas · pro · taller · respaldo · ES  │  ← nav 72px, transparente
  │                                                              │
  │                                                              │
  │       Evidence Pro.              ┌──────────────┐           │
  │       10 programas.              │              │           │
  │       ────────────              │  EVIDENCE    │  ← display│
  │  inter tight 160                │  PRO         │  panel    │
  │  line-height 0.92               │              │  mono 14  │
  │  letter-spacing -0.04           │  10/10       │  uppercase│
  │                                  │  programas   │           │
  │                                  └──────────────┘           │
  │                                                              │
  │              [Evidence Pro · oversized · centered            │
  │               slightly tilted 4°, emerges from black]        │
  │                                                              │
  │  Fabricado por las manos                                    │
  │  que después responden el teléfono.       Agende demostración → │
  │  ↑ PP Editorial New italic 40              ↑ inter tight 16 │
  │    pushed bottom-left col 1–5              bottom-right     │
  │                              ↓ scroll                        │
  └──────────────────────────────────────────────────────────────┘
  
  Producto: 60% del viewport-height, centrado horizontal, eje vertical en 52% (no 50% — deja respiro arriba para wordmark). Tilt 4° eje Y. Drop shadow 0 80px 200px -40px #000.

  Display readout (mono panel a la derecha del producto): box 220×140px, fondo #0E0E10, border 1px solid #1F1F22, padding 20px. Contenido: "EVIDENCE PRO" (mono 11, --on-noir-muted) + "10/10 PROGRAMAS" (mono 14, --on-noir) + barra de progreso 10/10 amarilla cálida.

  Motion (Framer Motion):

  - Producto: entrada opacity 0→1, scale 1.04→1.00, y 24→0, dur 1200ms, ease cinematic.
  - Display readout fade-in dur 600ms con delay 1400ms.
  - Subhead italic fade-up dur 800ms delay 1600ms.
  - Hover/parallax: producto sigue mouse ±12px con spring stiffness 60, damping 14.

  ---
  2. TRANSICIÓN  ·  beat noir → crema
  
  Altura: 80vh desktop · 60vh mobile.

  fondo: --noir-bg en top, gradient lineal a --crema-canvas en bottom (transición ocurre en 40–60% del bloque)

  ┌──────────────────────────────────────────────┐
  │                                              │
  │                                              │
  │            Cuatro disciplinas.              │  ← centered
  │            Un fabricante.                    │  PP Editorial New italic 56
  │            ─────────                         │  color: en top --on-noir, en bottom --ink
  │                                              │  (mid-transition usa --crema-canvas con ink)
  │                                              │
  │                                              │
  └──────────────────────────────────────────────┘

  Beat motion: el texto aparece cuando el background atraviesa 50% transición. Scroll progress 0–1: bg gradient se desplaza 0–100%, texto opacity 0 → 1 entre scroll 0.3–0.6. Duración total scroll ≈ 1 viewport.

  ---
  3. LÍNEAS DE EQUIPOS  ·  modo Atelier (Audemars Piguet pattern)

  Fondo: --crema-canvas.

  Header de sección (col 2–8, mt 200):

  LÍNEAS                                        04 / 04
  ↑ mono 12 uppercase tracking +0.12em          ↑ mono 12, --ink-muted
  Cuatro líneas. Doce instrumentos.
  ↑ inter tight 72, weight 300, --ink
  
  Cada línea = un bloque de 100vh aprox. Asimétrico, alternando lado.

  Línea 1 — Corporal (imagen izquierda)
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  ┌────────────────────────┐                                  │
  │  │                        │   01 / CORPORAL                  │
  │  │   [foto flagship       │   ↑ mono 11, --ink-muted         │
  │  │    Atalanta Plus       │                                  │
  │  │    sobre superficie    │   Línea Corporal                 │
  │  │    mate, luz lateral]  │   ↑ inter tight 48, weight 400   │
  │  │                        │                                  │
  │  │                        │   Contorno, drenaje,             │
  │  │                        │   reafirmación.                  │
  │  └────────────────────────┘   ↑ inter tight 24, --ink        │
  │       col 1–6, ratio 4:5                                     │
  │                              ── tecnologías incluidas        │
  │                              · Cavitación multipolar         │
  │                              · Radiofrecuencia tripolar      │
  │                              · Vacumterapia                  │
  │                              ↑ inter tight 14, list-mono dot │
  │                                col 8–11                      │
  │                                                              │
  │                              Ver Línea Corporal →            │
  │                              ↑ link, --ev-blue underline     │
  └──────────────────────────────────────────────────────────────┘

  Línea 2 — Facial (imagen derecha) → invertir asimetría
  Línea 3 — Láser (imagen izquierda)
  Línea 4 — Soporte (imagen derecha)

  Reglas:

  - Espacio entre líneas: 160px desktop.
  - Cada bloque entra con stagger interno: imagen clip-path: inset(100% 0 0 0) → inset(0 0 0 0) dur 1100ms; texto fade-up dur 700ms delay 200ms.

  Romper ritmo: después de la línea 2, intercalar un divider editorial:
                    "El catálogo no se compra.
                     Se elige por uso."
                    ↑ PP Editorial New italic 40, --ink, centered, col 4–9

  ---
  4. EVIDENCE PRO IN DEPTH  ·  scroll-driven (Richard Mille teardown pattern)
  
  Fondo: --noir-bg-2 con gradient radial sutil.
  Altura del scroll-trigger: 400vh (4 viewport heights — sticky pin del producto).

  ┌──────────────────────────────────────────────────────────────┐
  │  position: sticky; top:0; height:100vh                       │
  │                                                              │
  │   PRO · IN DEPTH                          STATE 01 / 04      │
  │   ↑ mono 12, --on-noir-muted              ↑ mono 12          │
  │                                                              │
  │                                                              │
  │       ┌────────────────┐    Diez programas                   │
  │       │                │    en una sola                       │
  │       │  [Evidence Pro │    plataforma.                       │
  │       │   centered     │    ↑ inter tight 56, --on-noir       │
  │       │   carcasa se   │                                       │
  │       │   desvanece    │    Cuatro modos de entrega.          │
  │       │   progresiv.   │    Pantalla calibrada en planta      │
  │       │   revelando    │    antes de salir.                   │
  │       │   interior]    │    ↑ inter tight 18, --on-noir-muted │
  │       │                │                                       │
  │       └────────────────┘                                      │
  │       col 2–7                col 8–11                         │
  │                                                              │
  │       ── readouts                                            │
  │       FREQ        0.5 – 5 MHz                                │
  │       POWER       60 W max                                   │
  │       MODES       4                                          │
  │       PROGRAMS    10                                         │
  │       ↑ JetBrains Mono 12 uppercase, dotted line baseline    │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  Scroll states (4 anclas en 400vh):

  1. 0–25% — producto cerrado, copy intro.
  3. 50–75% — interior visible. Macro shot lateral del transductor entra desde la derecha (col 8–12), eclipsa parcialmente el producto. Specs en mono.
  4. 75–100% — producto se recompone, label "10 programas" pulsa, transición a próxima sección.

  Motion: usar Framer Motion useScroll + useTransform para mapear scroll progress 0→1 a:

  - Carcasa overlay opacity 1→0 entre progress 0.25–0.5.
  - Macro shot x: 100%→0% entre 0.5–0.75.
  - Texto crossfade entre 4 mensajes, no mover layout — solo opacidad.

  ---
  5. MANUFACTORY  ·  modo Atelier (Patek/Lange pattern)
  
  Fondo: --crema-canvas. Esta sección es el corazón del verbo PROTEGER materializado en lugar físico.

  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  TALLER                                       BOGOTÁ · 1998  │
  │  ↑ mono 12                                    ↑ mono 12      │
  │  ─────────────────────────────────────────────────────────── │
  │                                                              │
  │  Aquí se fabrica.                                            │
  │  ↑ inter tight 96, weight 300, --ink, col 1–8                │
  │                                                              │
  │  Cada Evidence Pro sale de la misma planta                   │
  │  donde se ensamblará el siguiente.                           │
  │  ↑ inter tight 24, --ink-muted, col 1–8                      │
  │                                                              │
  │                                                              │
  │  ┌─────────────────────────────────────────────┐            │
  │  │                                             │            │
  │  │  [foto wide: banco de prueba con técnico   │            │
  │  │   de espaldas, luz lateral fría, manos     │            │
  │  │   sobre equipo. NO frontal. NO sonriendo.] │            │
  │  │                                             │            │
  │  └─────────────────────────────────────────────┘            │
  │       full-bleed minus margen — col 1–12, ratio 16:9         │
  │                                                              │
  │                                                              │
  │        ┌──────────┐  ┌──────────┐  ┌──────────┐             │
  │        │ macro 1  │  │ macro 2  │  │ macro 3  │             │
  │        │ ratio 4:5│  │ ratio 4:5│  │ ratio 4:5│             │
  │        └──────────┘  └──────────┘  └──────────┘             │
  │        col 2–4       col 5–8       col 9–11                  │
  │        soldadura     calibración   embalaje                  │
  │        ↑ mono 11 caption, --ink-muted, mt 12                │
  │                                                              │
  │                                                              │
  │                  "Las manos que ensamblan                   │
  │                   son las que después                       │
  │                   atienden la garantía."                    │
  │                  ↑ PP Editorial New italic 56, centered     │
  │                    col 4–9, --ink                            │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  Reglas de imagen:

  - Luz lateral cálida o fría unidireccional. Sombras pronunciadas.
  - Granularidad fotográfica leve permitida (autenticidad de taller).

  Motion: foto wide entra con clip-path: inset(0 50% 0 50%) → inset(0 0 0 0) dur 1400ms ease cinematic. Macros entran stagger 120ms cuando entran en viewport.

  ---
  6. TIMELINE EDITORIAL  ·  modo Atelier (Rolex History pattern)
  
  Fondo: --crema-surface (sutil shift desde la sección anterior).

  Estructura: 5 hitos verticales, asimetría alternada izq/der. Cada hito = un bloque 80vh.

  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  ARCHIVO                                       05 / 05       │
  │  ──────────────────────────────────────────────────────────  │
  │                                                              │
  │  Hito 01 — izquierda                                         │
  │  ┌──────────────────┐                                        │
  │  │                  │    1998                                │
  │  │  [foto: primer   │    ↑ inter tight 128, weight 200      │
  │  │   equipo de      │       --ink, dropping baseline        │
  │  │   cavitación,    │                                        │
  │  │   formato        │    Primer equipo de cavitación         │
  │  │   editorial,     │    ↑ inter tight 28, weight 500       │
  │  │   sepia opcional]│                                        │
  │  │  4:5             │    Cuatro técnicos.                    │
  │  └──────────────────┘    Un taller en Bogotá.                │
  │  col 1–5                 ↑ inter tight 18, --ink-muted, col 7–10│
  │                                                              │
  │  ── separador 1px solid --ink al 10%, 80px abajo, col 6–12  │
  │                                                              │
  │  Hito 02 — derecha (invertido)                              │
  │  ...                                                         │
  │                                                              │
  │  Hito 03 — izquierda (con romper-ritmo)                     │
  │  En lugar de foto, una cita serif italic full-width:        │
  │  "En 2012 dejamos de pedir trazabilidad al proveedor.       │
  │   Empezamos a producirla."                                  │
  │                                                              │
  │  Hito 04 — derecha                                          │
  │  Hito 05 — izquierda                                        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  Año en inter tight 128: alineación baseline con el texto descriptor — el año "respira" arriba como dato dominante.

  Motion: cada hito entra con año pasando primero (y 40→0, opacity 0→1 dur 800ms), luego foto (clip-path reveal dur 1100ms delay 200ms), luego texto descriptor (fade-up dur 600ms delay 400ms).

  ---
  7. RESPALDO  ·  modo Atelier (verbo PROTEGER materializado)

  Fondo: --crema-canvas.

  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  RESPALDO                                      04 PROMESAS   │
  │  ──────────────────────────────────────────────────────────  │
  │                                                              │
  │  Después de la venta.                                        │
  │  ↑ inter tight 96, weight 300, col 1–8                       │
  │                                                              │
  │                                                              │
  │  ┌──────────────────────────┐  ┌──────────────────────────┐ │
  │  │ 01                       │  │ 02                       │ │
  │  │ ↑ mono 11, --ink-muted   │  │                          │ │
  │  │                          │  │                          │ │
  │  │ Técnicos propios en      │  │ Repuestos en bodega      │ │
  │  │ Bogotá, Medellín, Cali.  │  │ local. Cero importación. │ │
  │  │ ↑ inter tight 24, --ink  │  │                          │ │
  │  │                          │  │                          │ │
  │  │ ── métricas              │  │ ── métricas              │ │
  │  │ TÉCNICOS    14           │  │ SKUS         220+        │ │
  │  │ CIUDADES    3            │  │ STOCK        72 h        │ │
  │  │ ↑ JetBrains Mono 12      │  │                          │ │
  │  └──────────────────────────┘  └──────────────────────────┘ │
  │  col 1–6                       col 7–12                      │
  │                                                              │
  │  ┌──────────────────────────┐  ┌──────────────────────────┐ │
  │  │ 03 Respuesta técnica     │  │ 04 Garantía de 36 meses, │ │
  │  │    en menos de 48 horas. │  │    sin asterisco.        │ │
  │  │ SLA          48 h        │  │ COBERTURA    36 m         │ │
  │  │ ESCALADO     directo     │  │ ASTERISCOS   0            │ │
  │  └──────────────────────────┘  └──────────────────────────┘ │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  Reglas:
  - Cero iconos. Cero check marks. Cero ilustración decorativa.
  - Cada promesa es un número, un lugar, un tiempo. Verificable.
  - Card hover: border-color: transparent → --ev-blue-deep (acento permitido aquí — estado activo); transform translateY(-2px); dur 360ms.

  ---
  8. CONTACTO  ·  modo Atelier
  
  Fondo: --crema-canvas. Bloque compacto antes del footer.

  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  Agende una demostración en su clínica.                      │
  │  ↑ inter tight 56, weight 300, col 1–8                       │
  │                                                              │
  │  Un técnico Evidence visita su cabina con un Pro             │
  │  configurado para sus protocolos.                            │
  │  ↑ inter tight 18, --ink-muted, col 1–8                      │
  │                                                              │
  │  ┌────────────────────────────────┐                          │
  │  │ Nombre                         │                          │
  │  ├────────────────────────────────┤                          │
  │  │ Clínica                        │                          │
  │  ├────────────────────────────────┤                          │
  │  │ Ciudad             │ Teléfono  │                          │
  │  ├────────────────────────────────┤                          │
  │  │                                │                          │
  │  │  Agendar visita →              │                          │
  │  └────────────────────────────────┘                          │
  │  col 1–7, max-width 540                                     │
  │  inputs: borderless top/sides, bottom 1px solid --ink/30,   │
  │  padding-y 16, inter tight 18                                │
  │  CTA button: 56px alto, --noir-bg fill, --on-noir text,      │
  │  inter tight 16 medium, ningún radius                        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  4 campos máximo. Nombre · Clínica · Ciudad · Teléfono. Sin "mensaje". Sin "asunto". Sin checkboxes de consentimiento marketing.

  ---
  9. FOOTER  ·  modo Atelier minimal

  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  evidence                                                    │
  │  ↑ wordmark inter tight 32, lowercase, tracking +0.24em      │
  │                                                              │
  │  Equipos hechos por las                  Bogotá · Medellín   │
  │  mismas manos que los reparan.           Cali                │
  │  ↑ inter tight 14, col 1–4               ↑ mono 12, col 10–12│
  │                                                              │
  │  ──────────────────────────────────────────────────────────  │
  │                                                              │
  │  © Evidence S.A.S · NIT 800.XXX.XXX-X    Aviso legal · Privacidad │
  │  ↑ mono 11, --ink-muted                  ↑ mono 11, link     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  2 columnas máximo. Sin newsletter signup. Sin "follow us en redes". Sin certificaciones-badge-soup.

  ---
  10. RESPONSIVE

  Tablet 768px

  - Modo Hero: producto baja a 50% viewport-height. Display readout pasa abajo del producto, no al lado.
  - Modo Atelier: asimetría se mantiene pero las imágenes pasan a col 1–8 con texto debajo en col 2–7.
  - Timeline: año reduce a inter tight 96, hitos pasan a stack vertical (no alternar izq/der).

  Mobile 375px

  - Modo Hero/Cinematic colapsa a viewport vertical. Producto centrado, escala 70% del width. Headline pasa abajo del producto (no al lado). Display readout fade-in al hacer scroll inicial 100px.
  - Modo Atelier: max-width 100%, padding lateral 24px. Imágenes full-bleed con margen 0. Texto col entera.
  - Timeline mobile: año en inter tight 72, foto encima del texto en stack vertical.
  - Evidence Pro In Depth: scroll-trigger reducido a 200vh (2 estados en vez de 4). Producto pin sticky.
  - Manufactory: macros pasan de 3-grid a carrusel horizontal swipe-able (cero auto-play, swipe manual).
  │  │                                │                          │
  │  │  Agendar visita →              │                          │
  │  └────────────────────────────────┘                          │
  │  col 1–7, max-width 540                                     │
  │  inputs: borderless top/sides, bottom 1px solid --ink/30,   │
  │  padding-y 16, inter tight 18                                │
  │  CTA button: 56px alto, --noir-bg fill, --on-noir text,      │
  │  inter tight 16 medium, ningún radius                        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  4 campos máximo. Nombre · Clínica · Ciudad · Teléfono. Sin "mensaje". Sin "asunto". Sin checkboxes de consentimiento marketing.

  ---
  9. FOOTER  ·  modo Atelier minimal

  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  evidence                                                    │
  │  ↑ wordmark inter tight 32, lowercase, tracking +0.24em      │
  │                                                              │
  │  Equipos hechos por las                  Bogotá · Medellín   │
  │  mismas manos que los reparan.           Cali                │
  │  ↑ inter tight 14, col 1–4               ↑ mono 12, col 10–12│
  │                                                              │
  │  ──────────────────────────────────────────────────────────  │
  │                                                              │
  │  © Evidence S.A.S · NIT 800.XXX.XXX-X    Aviso legal · Privacidad │
  │  ↑ mono 11, --ink-muted                  ↑ mono 11, link     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  2 columnas máximo. Sin newsletter signup. Sin "follow us en redes". Sin certificaciones-badge-soup.

  ---
  10. RESPONSIVE

  Tablet 768px

  - Modo Hero: producto baja a 50% viewport-height. Display readout pasa abajo del producto, no al lado.
  - Modo Atelier: asimetría se mantiene pero las imágenes pasan a col 1–8 con texto debajo en col 2–7.
  - Timeline: año reduce a inter tight 96, hitos pasan a stack vertical (no alternar izq/der).

  Mobile 375px

  - Modo Hero/Cinematic colapsa a viewport vertical. Producto centrado, escala 70% del width. Headline pasa abajo del producto (no al lado). Display readout fade-in al hacer scroll inicial 100px.
  - Modo Atelier: max-width 100%, padding lateral 24px. Imágenes full-bleed con margen 0. Texto col entera.
  - Timeline mobile: año en inter tight 72, foto encima del texto en stack vertical.
  - Evidence Pro In Depth: scroll-trigger reducido a 200vh (2 estados en vez de 4). Producto pin sticky.
  - Manufactory: macros pasan de 3-grid a carrusel horizontal swipe-able (cero auto-play, swipe manual).
  - Respaldo: cards apiladas 1-column, full-width.

  Reduced motion (prefers-reduced-motion: reduce)

  - Todas las entradas Framer Motion dur 0ms (fade simple opacity solamente).
  - Hero parallax mouse-tracking: desactivado.
  - Evidence Pro scroll-driven 3D: reemplazado por secuencia WebP de 10 frames pre-renderizada (./assets/pro-sequence/01.webp … 10.webp), scroll progress mapea linealmente al frame index. Cero scrub R3F.
  - Transiciones noir↔crema: corte simple en lugar del beat dramatizado.

  Mobile pipeline (no R3F)

  - Detección: (max-width: 768px) OR navigator.deviceMemory < 4 → cargar WebP sequence en vez de modelo 3D.
  - Total assets: 10 frames × ~80KB = 800KB precargados con <link rel="preload" as="image">.

  ---
  11. SISTEMA DE NAVEGACIÓN
  
  Nav top, sticky, 72px desktop / 64px mobile:
  - Modo Noir (hero, evidence pro in depth): bg transparente, links --on-noir, hover --on-noir-muted.
  - Modo Atelier (resto): bg --crema-canvas/85 con backdrop-filter: blur(20px), links --ink, hover underline.
  - Transición de modo: detecta sección activa con IntersectionObserver, anima cambio de color 300ms.

  Items: líneas · pro · taller · respaldo + idioma ES / EN a la derecha.

  ---
  12. CHECKLIST PRE-DEV
  
  - [ ] Tokens CSS en globals.css.
  - [ ] Fonts cargadas vía next/font/local para PP Editorial New (licencia OTF) e next/font/google para Inter Tight + JetBrains Mono.
  - [ ] Assets 3D Draco-compressed <2MB cada producto.
  - [ ] WebP fallback sequences pre-generados (10 frames × 3 productos).
  - [ ] Lighthouse target: Performance 90+, AA contraste (ink #1A1410 sobre crema #FBF9F7 = ratio 16.4:1 ✓).
  - [ ] prefers-reduced-motion honrado en todos los componentes.
  - [ ] Nav color-switch funcionando con IntersectionObserver.
  - [ ] Beat transitions con scroll-snap o framer-motion useScroll.
