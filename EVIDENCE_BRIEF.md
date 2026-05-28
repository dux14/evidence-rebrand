# Evidence — Brief Visual de Rebrand Digital

> Fabricante colombiano legacy de equipos para medicina estética.
> Brief construido con el método Decision Maker — 6 decisiones, 3 buckets de referencia, 3 lógicas de estilo, 4 prompts ejecutables + guía de launch.

---

## I. Las seis decisiones

### 1. La sensación

> **El equipo que el fabricante mismo usaría — autoridad silenciosa de quien lo hace, no de quien lo revende.**

Implicaciones: nada de "líderes en innovación", nada de stock photos de doctores sonriendo con bata, nada de íconos pequeños con check marks. La autoridad silenciosa no grita.

### 2. Audiencia y anti-audiencia

**Para:**
Médica estética de 38–50 años, dueña de su propia clínica de 2–4 cabinas, 10+ años en el mercado. Ya se quemó con un equipo importado que se dañó en 18 meses y nadie le contestó el correo. No quiere lo último, quiere lo que funciona — para pacientes que buscan resultados reales sin esfuerzo.

**No para:**
La clínica que ahorra comprando equipos chinos sin respaldo tecnológico ni garantías reales de acompañamiento.

Implicaciones: nada de precios en hero, nada de "calidad-precio", nada de tablas comparativas, nada de descuentos, nada de badges de "ahorra X%". Sí queda espacio para ingeniería, planta de producción, técnicos, años en el mercado como evidencia visual.

### 3. El objeto héroe

> **Evidence Pro (flagship) — dead center, oversized, tratado como objeto de museo / instrumento clínico. Producto como arte.**

Implicaciones: fotografía/3D nivel Dyson o B&O. Estudio negro o atmósfera monocroma, una sola fuente de luz, sin contexto de clínica, sin manos, sin paciente.

### 4. El trabajo

> **Proteger.**

El sitio no vende, no impresiona, no convence — **protege**. Le baja la ansiedad a una compradora que ya fue traicionada por un proveedor anterior. Tono cálido, casi paternal. Garantías reales, contratos de soporte, técnicos asignados, repuestos en bodega local. *Esta vez va a ser distinto.*

### 5. El corte

**Lo que se elimina:**
- Bloques largos de texto (todo lo que parezca brochure leído)
- Quienes somos / Visión / Misión como secciones
- "Qué nos hace especiales" con números muertos sin contexto
- Grids de productos planos, sin profundidad ni casos reales
- Iconos genéricos
- Copy reciclado de "20 años en el mercado" y premios de 1999
- Testimonios solo-texto
- Banners con foto-stock + texto + descuento
- Publicidad permanente de "15% off"

**Lo que sobrevive (anticipo confirmado en arquitectura):**
- Hero con el equipo flagship
- Sección de líneas (3–4 colecciones agrupando las 12 tecnologías)
- Sección "Evidence Pro in depth" (teardown)
- Sección Manufactory / planta
- Timeline editorial de hitos
- Sección Respaldo (qué pasa después de comprar)
- Contacto / soporte

### 6. El test de tres segundos

> **El Evidence Pro ocupando toda la pantalla, tratado como un instrumento — no como un producto. "10 programas" grande, sola. Sensación: estoy viendo un equipo de hospital, no de feria. Esta marca sabe lo que hace.**

---

## II. Referencias — 16 reglas de diseño

### Bucket 1 — Sensación

1. **Mac Studio (apple.com/mac-studio)** → el equipo se muestra como **extensión de la identidad profesional**, no como producto.
2. **Leica M11 (leica-camera.com)** → calma + **calidez** (luz cálida, no cold-tech-blue). Diferenciador frente a Lumenis/Cynosure.
3. **Hodinkee** → producto como foco absoluto — **cero entorno, cero humanos, cero lifestyle** en el hero.
4. **Patek Philippe Manufacture (patek.com → Manufacture)** → los valores se muestran a través del **detalle de fabricación**, no se enuncian.
5. **A. Lange & Söhne Manufactory (alange-soehne.com)** → **el proceso es la prueba** — cada paso visible, ensamblaje con cuidado.

**Mundo visual cerrado:** objeto único + fondo oscuro cálido + luz suave + macro de manufactura + cero humanos en hero, mucha humanidad en el back-of-house.

### Bucket 2 — Estructural

1. **Mac Studio** → una página entera, hero centrado, scroll dosifica detalles.
2. **Richard Mille (richardmille.com/collections)** → macro detail como sección entera, no como bullet. Zoom obsesivo del producto.
3. **Rolex Land-Dweller (rolex.com/es/watches/land-dweller)** → animación de producto **sutil** (latido, no rotación frenética).
4. **Audemars Piguet (audemarspiguet.com/com/en/watch-collection.html)** → el line-up se organiza por **3–4 líneas/colecciones**, no por 12 productos sueltos. Cada producto con foto perfecta + diferenciador + modelo. Nunca dos iguales.
5. **Rolex History (rolex.com/es/about-rolex/history/1905-1919)** → el legado se cuenta como **timeline editorial** (fecha + objeto + frase), no como párrafo corporativo.
6. **Richard Mille Concept (richardmille.com/page/concept)** → **planos e ingeniería** visibles, no solo producto terminado.

### Bucket 3 — Detalle (territorio Framer Motion)

1. **iPhone 16/17 Pro (apple.com/iphone-17-pro)** → **scroll dissolves carcasa**, revela interior. Para Evidence Pro: el scroll deshace la carcasa y revela transductor, placa, sistema de programas.
2. **Hydroflow / scrollytelling (hydroflowdrink.com)** → **scroll = barra de progreso de la animación**, producto como protagonista único.
3. **Rolex Land-Dweller** → producto como **ancla constante**, todo lo demás aparece y desaparece alrededor.
4. **Richard Mille RM-HJ-02** → **video loop de producto + texto contenido encima**. Atrás siempre hay movimiento sutil; el copy se subordina.
5. **iPhone 17 Pro** → **una sola escena 3D continua**, sin secciones separadas. El producto persiste, el contexto cambia. Regla más ambiciosa: no hay "section 1, section 2" — hay un viaje continuo.

**Reglas no negociables de motion:**
- **Slow** — duraciones 600–900ms, easings out-expo (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Subtle** — cero confetti, cero parallax extremo, cero rotaciones rápidas.
- **Cinematic** — fade + translateY pequeño + stagger 60–120ms. Las cosas aparecen "fundidas" o "deslizadas suaves", no "encajadas".

---

## III. Las tres lógicas

### Lógica de color

> Dos mundos cinematográficos hermanados — heroes nocturnos en negro puro con gradiente radial donde el producto emerge de la oscuridad iluminado solo por su display, y contenido en crema-papel cálida (#FBF9F7 → #F5EFE8) que se siente como atelier diurno con luz lateral. La transición entre ambos no es decorativa, dramatiza el momento. El azul Evidence existe como ADN heredado pero está acotado: aparece solo en estados activos (CTA, focus, indicador) y a un peso visual mínimo. Cero cyan, cero cold-medical-blue, cero verdes wellness. La calidez del crema y la profundidad del negro son la firma.

**Tokens:**

```css
:root {
  /* Crema (80% del sitio) */
  --crema-canvas:  #FBF9F7;
  --crema-surface: #F5EFE8;
  --crema-muted:   #EDE5DA;
  --crema-border:  #D4C9BB;
  --crema-fg:      #1A1410;
  --crema-fg-2:    #5A4A3A;
  --crema-fg-3:    #8A7A6A;

  /* Noir (20% — solo heroes) */
  --noir-bg:       #000000;
  --noir-bg-2:     #0A0A0B;
  --noir-fg:       #FFFFFF;
  --noir-fg-2:     #C8C8C8;
  --noir-hairline: #262626;

  /* Acento Evidence Blue (acotado a estados activos) */
  --ev-blue:       #1B3A7A;
  --ev-blue-deep:  #0D2D6E;
  --ev-blue-ice:   #9CC4FF;

  /* Metálico cálido (detalles) */
  --warm:          #8B7355;
  --warm-light:    #B8A080;

  /* Semánticos */
  --alert:         #C41E3A;
  --success:       #5FB86A;
}
```

**Gradiente hero noir (producto emerge de la oscuridad):**
```css
background: radial-gradient(
  ellipse 80% 70% at 50% 50%,
  #0A1628 0%, #050A14 60%, #020408 100%
);
```

### Lógica tipográfica

> Tres voces, cada una con territorio definido y sin contaminación. (1) Una sans tight (Inter Tight) carga toda la funcionalidad — nav, body, headlines, specs, CTAs — a múltiples tamaños sin tamaños intermedios cómodos, con escala obscena en hero (hasta 160px). (2) Una serif editorial (PP Editorial New, en italic) aparece solo en frases-momento y citas — nunca en body, nunca en UI. (3) Una mono (JetBrains Mono) vive solo en readouts numéricos del producto y specs técnicas, pequeña y trackeada, como display digital del Evidence Pro. El wordmark "evidence" siempre lowercase con tracking expandido — la marca firma con calma, no con autoridad gritada. Title Case prohibido en todo el sistema.

**Familias:**
```
--font-display: "Inter Tight", "Helvetica Neue", Arial, sans-serif
--font-body:    "Inter Tight", "Helvetica Neue", Arial, sans-serif
--font-serif:   "PP Editorial New", "Times New Roman", serif
--font-mono:    "JetBrains Mono", "SF Mono", monospace
```

**Escala:**
```
--t-12:   0.75rem    /* captions, badges */
--t-14:   0.875rem   /* body small, CTAs, labels */
--t-16:   1rem       /* body default */
--t-20:   1.25rem    /* body large, product names */
--t-24:   1.5rem     /* subtítulos */
--t-32:   2rem       /* headlines, editorial */
--t-48:   3rem       /* display small */
--t-72:   4.5rem     /* display medium */
--t-96:   6rem       /* display large */
--t-128:  8rem       /* hero max */
--t-160:  10rem      /* hero extreme (solo desktop) */
```

**Tracking:**
```
--track-tight:    -0.02em   /* títulos grandes */
--track-normal:    0em      /* body */
--track-label:     0.08em   /* section labels, nav items */
--track-wordmark:  0.24em   /* wordmark "evidence" */
--track-mono:      0.12em   /* readouts en mono uppercase */
```

**Reglas de casing:**
- UPPERCASE con tracking: nav items, product names, section labels, CTAs
- Sentence case: body, descriptions, subtitles
- lowercase: wordmark "evidence"
- **Title Case: PROHIBIDO** en todo el sistema

### Lógica espacial

> Dos modos espaciales hermanados, separados por color. (1) **Modo Hero/Cinematic** — Evidence Pro fijo en el centro absoluto del viewport durante toda la primera película; el scroll no mueve el producto, mueve el contexto que lo rodea (copy, specs, background). El producto es ancla, todo lo demás orbita. (2) **Modo Atelier/Editorial** — secciones crema con un solo elemento dominante por bloque, márgenes laterales generosos (mínimo 12% desktop), max-width 720–840px en texto, asimetría controlada nunca grid de columnas iguales. El silencio lateral es la autoridad. Las transiciones entre ambos modos son dramatizadas — un beat antes del cambio, nunca un corte. Y dentro del modo Atelier, nunca tres bloques con el mismo ritmo seguidos: se rompe con una cita en serif italic, un macro shot a sangrado completo, o un dato en mono.

---

## IV. Arquitectura del sitio

Secciones en orden (todas sobreviven al corte):

1. **HERO NOCTURNO** — Evidence Pro centrado oversized, "10 programas" en Inter Tight 160px + JetBrains Mono al lado del producto como display. Nav top transparente. CTA primary esquina inferior derecha. Scroll indicator sutil.
2. **BEAT DE TRANSICIÓN** — frase editorial en PP Editorial New italic, fondo negro fundiéndose a crema.
3. **LÍNEAS DE EQUIPOS** (modo Audemars) — las 12 tecnologías agrupadas en 3–4 líneas/colecciones. Una línea por bloque con foto del flagship + nombre + descriptor + tecnologías que incluye. **Las 12 tecnologías son:** Electroestimulación, Ionización, Alta Frecuencia, Vacuumterapia, Ultrasonido, Presoterapia, Radiofrecuencia, Ozonoterapia, Carboxiterapia, Cavitación, Electroporación, Lipoláser.
4. **EVIDENCE PRO IN DEPTH** (modo Richard Mille teardown) — scroll-driven, la carcasa del producto se desvanece progresivamente revelando interior. Macro shots laterales. Specs en JetBrains Mono.
5. **MANUFACTORY** (modo Patek/Lange) — fotos de planta, técnicos, banco de prueba. Cero stock photo. Frase corta en serif italic insinuando "fabricamos, no revendemos".
6. **TIMELINE EDITORIAL** (modo Rolex History) — 5 hitos. Cada uno: año en Inter Tight grande + objeto/imagen + frase corta. Cero párrafos.
7. **RESPALDO** — materialización del verbo PROTEGER. Cuatro promesas concretas, medibles, en mono. Nada abstracto.
8. **CONTACTO** — formulario breve. Máximo 4 campos. Cero "déjanos tus datos y te contactaremos".
9. **FOOTER** — wordmark "evidence" lowercase + dos columnas máximo.

---

## V. Cuatro prompts ejecutables

### Prompt 1 — Copywriter AI

```
Eres un copywriter senior de marca premium. Estás escribiendo el copy completo para el rebrand digital de Evidence, fabricante colombiano legacy de equipos para medicina estética.

BRIEF NO-NEGOCIABLE:

Sensación: "El equipo que el fabricante mismo usaría — autoridad silenciosa de quien lo hace, no de quien lo revende."

Audiencia: Médica estética de 38–50 años, dueña de su propia clínica de 2–4 cabinas, 10+ años en el mercado. Ya se quemó con un equipo importado que se dañó en 18 meses y nadie le contestó el correo. No busca lo último — busca lo que funciona.

Anti-audiencia: la clínica que ahorra comprando equipos chinos sin respaldo tecnológico ni garantías reales.

Verbo del sitio: PROTEGER. El sitio no vende, no impresiona, no convence — protege. Le baja la ansiedad a una compradora que ya fue traicionada por un proveedor anterior.

Objeto héroe: Evidence Pro (flagship), tratado como instrumento clínico.

Memoria de 3 segundos: Evidence Pro como instrumento + "10 programas" + "esta marca sabe lo que hace."

PALABRAS PROHIBIDAS (cero excepciones): moderno, limpio, minimalista, profesional, sleek, premium, hermoso, elegante, innovador, líder en, tecnología de punta, vanguardia, excelencia, calidad superior, transformamos, revolucionario, único en el mercado, los mejores.

PALABRAS PROHIBIDAS DE FRASEOLOGÍA: "más de X años en el mercado", "ganadores de X premio", "comprometidos con", "nuestro equipo está aquí para", "te ayudamos a", "contáctanos hoy".

REGLAS DE TONO:
- Frases cortas. Punto, punto, punto. No comas que prolongan.
- Cero adjetivos abstractos. Si pones un adjetivo, tiene que ser medible o sensorial.
- Cero hedging. No "ayuda a mejorar" — sí "reduce" o "elimina".
- Habla a la médica como par, no como prospecto. Ella sabe más que tú de su clínica.
- Cuando hables de protección post-venta, sé concreto: "técnicos en Bogotá, Medellín y Cali. Repuestos en bodega local. Respuesta dentro de 48 horas." No "estamos aquí para ti."

DELIVERABLES (devuelve JSON con cada uno):

1. hero_headline (max 4 palabras, puede ser solo un número o solo el nombre de producto)
2. hero_subheadline (max 12 palabras, una sola frase)
3. seccion_lineas_headline (max 6 palabras — introduce las 3–4 líneas/colecciones que agrupan las 12 tecnologías)
4. lineas_descriptors (3–4 líneas, cada una con nombre + frase de máximo 10 palabras)
5. evidence_pro_detail_intro (1 párrafo de máximo 40 palabras introduciendo el teardown del producto)
6. manufactory_headline (max 5 palabras)
7. manufactory_subhead (1 frase de máximo 14 palabras — debe insinuar que Evidence fabrica, no importa)
8. timeline_milestones (5 hitos, cada uno: año + objeto + frase de máximo 8 palabras. Año + verbo + cosa concreta.)
9. respaldo_headline (max 5 palabras — esta sección es la materialización del verbo PROTEGER)
10. respaldo_concrete_promises (4 promesas concretas, máximo 8 palabras cada una. NO promesas abstractas — métricas verificables.)
11. cta_primary (max 2 palabras)
12. cta_secondary (max 3 palabras)
13. footer_line (1 frase de máximo 12 palabras, tono atelier — no corporativo)

IDIOMA: Español neutro de Colombia. Usted, no tú, en CTAs principales. Tú en secciones editoriales.

Devuelve solo el JSON, sin explicaciones.
```

### Prompt 2 — 3D / Imagen AI

```
Genera el visual hero principal para evidence.com.co, fabricante colombiano de equipos para medicina estética. El equipo a representar es Evidence Pro — una máquina flagship con display de 10 programas.

OBJETO ÚNICO: Evidence Pro. Una sola unidad. Sin manos, sin doctora, sin paciente, sin clínica, sin showroom, sin habitación. Solo el equipo en atmósfera.

COMPOSICIÓN:
- El equipo ocupa 60–70% del frame, dead center vertical y horizontal.
- Slight tilt — ángulo de 5–8 grados hacia el visor, no frontal plano.
- Plano cerrado pero completo (se ve toda la máquina, no cropeo).
- Sin sombra plana en piso. El equipo flota o descansa sobre superficie reflectante sutil.

ILUMINACIÓN:
- Una sola fuente principal de luz, cenital o lateral alta.
- Luz CÁLIDA (3200–3800K). NO luz blanca de hospital. NO luz fría azul.
- Rim light suave en el borde opuesto.
- Display del equipo retroiluminado, único elemento que emite luz propia. Color de display: ámbar/blanco cálido (#FFB68A o #F5E6D3).
- Sombras largas y suaves, no duras.

FONDO:
- Negro grafito profundo (#0A0A0B, no #000 puro).
- Gradiente radial muy sutil: el centro 5% más claro que las esquinas, simulando que el producto "emerge de la oscuridad".
- Un toque cálido subliminal en las sombras profundas (2–3% de rojo undertone). Nunca azul.
- Cero textura visible, cero ruido, cero polvo atmosférico.

ESTILO DE REFERENCIA:
- Leica M11 product shot (leica-camera.com)
- Bang & Olufsen Beolab 50 hero
- Richard Mille collection pages (richardmille.com)
- Apple Mac Studio launch (apple.com/mac-studio)
- Hodinkee top-down product photography

LO QUE EVITAR (cero excepciones):
- Luz azul de "tecnología".
- Halos cyan o glows neon.
- Pacientes, doctores, manos.
- Backgrounds blancos.
- Sombras planas de catálogo.
- Renders con sensación "stock photo médico".
- Cualquier elemento decorativo (partículas, lens flares dramáticos, lightning).

ESPECIFICACIÓN TÉCNICA:
- 4K (3840×2160) mínimo.
- Versión transparente PNG para integrarse a página.
- Si es modelo 3D: entregar .glb optimizado con Draco compression (target <5MB) más turntable de 360° en .mp4 H.264 (5 segundos loop, 60fps).
- Generar también 4 macro detail shots:
  (a) display retroiluminado en plano cerrado mostrando "10 programas"
  (b) detalle del manípulo / aplicador
  (c) panel de control con perillas y botones físicos
  (d) sticker/placa de manufactura con número de serie visible
- Frames de teardown: 6 frames donde la carcasa progresivamente se desvanece revelando interior (transductor, placa, sistema de programas).

HERRAMIENTAS SUGERIDAS:
- Hero principal: render en Blender o KeyShot (no Midjourney — un equipo médico necesita precisión, no interpretación).
- Si el equipo ya existe físicamente: photogrammetry desde fotos reales (RealityCapture, Polycam) → reconstrucción 3D → re-rendering con la iluminación arriba.
- Macro shots: fotografía real en estudio con setup de Hodinkee/Leica. Si no es posible, KeyShot.
- Compresión final: Squoosh → WebP <2MB para hero, <800KB para macros.
```

### Prompt 3 — Design AI (handoff a `ui-ux-pro-max`)

```
Diseña la landing principal de evidence.com.co — rebrand digital completo de un fabricante colombiano legacy de equipos para medicina estética.

DECISIONES DE BRIEF (no negociables):

- Sensación: autoridad silenciosa de quien fabrica, no de quien revende.
- Audiencia única: médica estética de 38–50 años, dueña de clínica con 10+ años de operación, quemada antes por equipo importado sin soporte.
- Verbo del sitio: PROTEGER.
- Hero object: Evidence Pro (flagship), dead-center oversized, tratado como instrumento.
- 3-second memory: Evidence Pro + "10 programas" + "esta marca sabe lo que hace".

LÓGICAS DE ESTILO:

Color — Dos mundos cinematográficos hermanados.
* Heroes nocturnos (~20% del sitio): fondo negro #0A0A0B con gradiente radial cálido, producto emergiendo de la oscuridad, display del equipo único punto de luz cálida.
* Contenido atelier (~80% del sitio): crema-papel #FBF9F7 → #F5EFE8 con sombras suaves dirigidas, sensación de taller diurno con luz lateral.
* Acento azul Evidence existe pero acotado a estados activos (#1B3A7A o #0D2D6E preferido sobre #2A6DF4) — nunca como background, nunca como icono grande, nunca como divider.
* Texto: #1A1410 (negro cálido con red undertone) sobre crema; #FFFFFF sobre noir.
* Cero cyan. Cero cold-medical-blue. Cero verdes wellness.

Tipografía — Tres voces sin contaminación.
* Inter Tight para toda funcionalidad (nav, body, headlines, CTAs, specs). Escala hasta 160px en hero.
* PP Editorial New italic SOLO para frases-momento y citas. Nunca en body, nunca en UI.
* JetBrains Mono SOLO para readouts numéricos del producto y specs técnicas (11–14px uppercase track +0.12em).
* Wordmark "evidence" siempre lowercase con tracking +0.24em.
* Title Case prohibido en todo el sistema.

Espacial — Dos modos hermanados.
* Modo Hero/Cinematic: Evidence Pro fijo en centro absoluto, scroll mueve el contexto a su alrededor (copy, specs, background), no el producto.
* Modo Atelier/Editorial: crema, max-width texto 720–840px, márgenes laterales mínimo 12% desktop, asimetría controlada (nunca grid de columnas iguales), un elemento dominante por bloque.
* Transiciones dark→cream y cream→dark dramatizadas con un beat (pausa visual), nunca corte seco.
* Nunca tres bloques seguidos con mismo ritmo en modo Atelier — romper con cita en serif italic, macro shot a sangrado, o dato en mono.

SECCIONES (en orden, sobreviven al corte):

1. HERO NOCTURNO — Evidence Pro centrado oversized, "10 programas" en Inter Tight 160px + JetBrains Mono al lado del producto como display. Nav top, transparente. CTA primary en esquina inferior derecha. Scroll indicator sutil.

2. TRANSICIÓN — frase editorial en PP Editorial New italic, fondo negro fundiéndose a crema. Beat.

3. LÍNEAS DE EQUIPOS (modo Audemars Piguet) — las 12 tecnologías agrupadas en 3–4 líneas/colecciones. NUNCA grid de 12. Una línea por bloque, con foto del flagship de esa línea + nombre + descriptor corto + lista de tecnologías que incluye.

4. EVIDENCE PRO IN DEPTH (modo Richard Mille teardown) — scroll-driven en la sección, la carcasa del producto se desvanece progresivamente revelando interior. Macro shots laterales. Specs en JetBrains Mono.

5. MANUFACTORY (modo Patek/Lange) — fotos de planta, técnicos, banco de prueba. Cero stock photo. Frase corta en serif italic insinuando el "fabricamos, no revendemos".

6. TIMELINE EDITORIAL (modo Rolex History) — 5 hitos. Cada uno: año en Inter Tight grande + objeto/imagen + frase corta. Cero párrafos. Cero "fundamos en X y nos enorgullece...".

7. RESPALDO — sección que materializa el verbo PROTEGER. Cuatro promesas concretas, medibles, en mono. Nada abstracto.

8. CONTACTO / SOLICITUD — formulario breve. Cero "déjanos tus datos y te contactaremos". Máximo 4 campos.

9. FOOTER — wordmark "evidence" lowercase + dos columnas máximo. Cero footer-de-8-columnas.

LO QUE NO EXISTE EN ESTE SITIO:
- Quiénes somos / Visión / Misión.
- "Más de X años" en copy.
- Carruseles de testimonios.
- Logo wall de clínicas.
- Banners de descuento.
- Grid plano de 12 productos.
- Iconos genéricos con check marks.
- Stock photo de doctores sonriendo con bata.

DELIVERABLE:
Frames de Figma o spec de layout cubriendo: hero, sección de líneas, evidence pro in depth, manufactory, timeline, respaldo. Desktop primary (1440px), tablet (768px), mobile (375px).

RESPONSIVE:
- Mobile: el modo Hero/Cinematic colapsa el centro absoluto a un viewport vertical más compacto. El producto sigue siendo ancla pero el contexto orbital se reduce a 1 elemento por scroll-state en vez de 3–4.
- En modo Atelier mobile: max-width 100% con padding lateral de 24px. Asimetría se conserva pero a escala mobile.
- Reduced motion: en mobile el scroll-driven 3D se reemplaza por secuencia WebP de 8–12 frames pre-renderizada.

Inicia con wireframes de baja fidelidad antes de aplicar visual.
```

### Prompt 4 — Developer AI (handoff a `frontend-design` + Framer Motion)

````
Construye la landing de evidence.com.co. Stack: Next.js 15 App Router + Tailwind + Framer Motion + React Three Fiber. Deploy en Vercel.

PRINCIPIOS NO-NEGOCIABLES:
- El Evidence Pro es ancla visual en heroes y NO se desplaza con el scroll dentro de la "primera película".
- Animaciones SLOW (600–900ms), SUBTLE (cero confetti, cero rotación frenética), CINEMATIC (easing out-expo, stagger 60–120ms).
- Performance budget: Lighthouse Performance 90+, LCP <2.5s, CLS <0.05.
- Mobile-first + respect prefers-reduced-motion.

ASSETS QUE RECIBES:
- /public/models/evidence-pro.glb (Draco compressed, <5MB)
- /public/video/evidence-pro-turntable.mp4 (loop 5s, fallback si 3D no carga)
- /public/frames/teardown/[01–08].webp (secuencia de teardown pre-renderizada, fallback mobile)
- /public/img/macro-[display|manipulo|panel|placa].webp
- /public/img/manufactory/[01–06].webp
- /public/img/timeline/[year]-[object].webp
- /content/copy.json (output del Copywriter AI)

DESIGN TOKENS (CSS variables):

```css
:root {
  /* Crema (80%) */
  --crema-canvas: #FBF9F7;
  --crema-surface: #F5EFE8;
  --crema-muted: #EDE5DA;
  --crema-border: #D4C9BB;
  --crema-fg: #1A1410;
  --crema-fg-2: #5A4A3A;
  --crema-fg-3: #8A7A6A;

  /* Noir (20%) */
  --noir-bg: #000000;
  --noir-bg-2: #0A0A0B;
  --noir-fg: #FFFFFF;
  --noir-fg-2: #C8C8C8;
  --noir-hairline: #262626;

  /* Accent — Evidence Blue (acotado a active states) */
  --ev-blue: #1B3A7A;
  --ev-blue-deep: #0D2D6E;
  --ev-blue-ice: #9CC4FF;

  /* Warm metallic */
  --warm: #8B7355;

  /* Semantic */
  --alert: #C41E3A;
  --success: #5FB86A;

  /* Easings */
  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-soft: cubic-bezier(0.32, 0.72, 0, 1);

  /* Durations */
  --dur-slow: 900ms;
  --dur-medium: 600ms;
  --dur-fast: 320ms;
}
```

FUENTES vía next/font:
- Inter Tight (Google) pesos 300, 400, 500, 600, 700
- PP Editorial New (self-hosted woff2) pesos 400 italic, 500 italic
- JetBrains Mono (Google) pesos 400, 500

ESTRUCTURA DE ARCHIVOS:
```
app/
  layout.tsx
  page.tsx                    // landing principal
  globals.css
components/
  hero/
    HeroNoir.tsx              // sección hero negra con Evidence Pro 3D anclado
    EvidenceProModel.tsx      // R3F component del modelo .glb
    HeroTeardownScroll.tsx    // scroll-driven teardown reveal
    HeroCopyLayers.tsx        // copy que orbita al producto
  lineas/
    LineasSection.tsx         // modo Audemars — 3–4 líneas con flagship por cada
  evidence-pro-detail/
    TeardownSequence.tsx      // 3D + fallback a WebP sequence en mobile
    SpecsMono.tsx             // specs en JetBrains Mono
  manufactory/
    ManufactorySection.tsx    // foto editorial + frase serif italic
  timeline/
    TimelineEditorial.tsx     // 5 hitos formato Rolex history
  respaldo/
    RespaldoSection.tsx       // 4 promesas concretas en mono
  contact/
    ContactForm.tsx
  ui/
    Nav.tsx
    Footer.tsx
    SerifQuote.tsx            // bloque cita editorial italic
    MonoReadout.tsx           // dato técnico en mono uppercase
    SectionBeat.tsx           // transición dramatizada noir↔crema
```

FRAMER MOTION — PATRONES OBLIGATORIOS:

1. **Hero anchor** — `<EvidenceProModel>` está dentro de un contenedor con `position: fixed` durante todo el bloque hero (uso `useScroll` + condicional `position` que cambia a `relative` cuando se sale del bloque). El modelo NO se desplaza durante este span. Solo el contexto a su alrededor se anima en scroll.

2. **Scroll-driven teardown** — uso `useScroll` + `useTransform` para mapear progreso de scroll a opacity de capas del modelo .glb (carcasa, placa, transductor). Mobile fallback: `useTransform` controla qué frame de la secuencia WebP se muestra (image swap).

3. **Stagger reveal de copy** — todas las secciones de copy usan:
```js
const variants = {
  hidden: { opacity: 0, y: 20 },
  show: i => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  })
};
```

4. **Hero number "10 programas"** — entrada con blur + escala. El "10" aparece blur 8px → blur 0px en 900ms. Inter Tight, peso 600, tamaño clamp(96px, 14vw, 160px).

5. **Latido del display** — un solo elemento del producto (LED indicador) late con `repeat: Infinity, repeatType: "loop", duration: 1.6, ease: "easeInOut"` con scale [1, 1.05, 1] + opacity [0.9, 1, 0.9]. Inspiración: segundero Rolex Land-Dweller.

6. **Beat de transición noir↔crema** — `<SectionBeat>` es un viewport-height bloque que va de noir-bg a crema-canvas con `useTransform` linear sobre scroll. Durante el beat: nada de copy. Solo el color cambiando, 100vh de respiración.

7. **Magnetic CTA** — el botón principal sigue al cursor dentro de un radio de 40px en hover, con spring suave (stiffness 200, damping 25).

8. **Respect prefers-reduced-motion**:
```js
const shouldReduceMotion = useReducedMotion();
const animConfig = shouldReduceMotion
  ? { duration: 0 }
  : { duration: 0.9, ease: [0.16, 1, 0.3, 1] };
```

R3F (React Three Fiber) — REGLAS:
- Modelo cargado con `useGLTF` + suspense fallback (skeleton oscuro con shimmer).
- Una sola directional light cálida (color #FFB68A, intensity 1.2) + un ambient light bajo (intensity 0.15).
- Cero post-processing pesado en mobile.
- `Preload all` para el modelo del hero.
- Lazy load de modelos detallados (Suspense + dynamic import).

HANDOFF:
Antes de empezar:
1. Invoca skill `vercel:bootstrap` para preparar el proyecto.
2. Invoca skill `vercel:shadcn` para inicializar la base de UI (nav, button, form).
3. Invoca skill `frontend-design` durante la implementación de cada sección — éste es un sitio de muy alta calidad visual y no se acepta default-template-look.
4. Para componentes complejos (hero 3D, teardown), invoca skill `ui-ux-pro-max` con context del brief.

VERIFICACIÓN ANTES DE TERMINAR:
- Lighthouse Performance 90+, A11y 95+, AA contrast en todo el texto.
- Funciona sin JS (server-rendered baseline, animaciones progresivas).
- Cero CLS en hero.
- Prefers-reduced-motion respetado (verificar con devtools).
- Mobile (375px) navegable sin scroll horizontal.
- LCP < 2.5s en 4G simulado.

DEPLOY:
Usar skill `vercel:deploy` después de smoke test local.
````

---

## VI. Launch — GitHub + Vercel

```
LAUNCH GUIDE — Evidence

1. INICIALIZAR GIT (terminal en la carpeta del proyecto)
   - git init
   - git add .
   - git commit -m "Initial commit — Evidence rebrand"

2. CREAR REPO EN GITHUB (usando gh CLI, ya autenticado)
   - gh repo create evidence-rebrand --private --source=. --remote=origin
   - git push -u origin main

3. DEPLOY A VERCEL (usando skill vercel:deploy)
   - Invoca skill: vercel:deploy
   - El primer deploy enlaza el proyecto a tu cuenta dux14
   - URL preview: evidence-rebrand-[hash].vercel.app

4. ENV VARS si aplica (skill vercel:env)
   - Cualquier API key de formulario de contacto (Resend, SendGrid)
   - vercel env add para cada una

5. CUSTOM DOMAIN
   - vercel domains add evidence.com.co (si es nuevo) o
   - vercel domains add www.evidence.com.co
   - Configurar DNS en el registrador colombiano
   - Records: A record → 76.76.21.21 / CNAME www → cname.vercel-dns.com

6. PUSH DE ACTUALIZACIONES
   - git add . && git commit -m "..." && git push
   - Vercel auto-deploy en cada push a main
   - Preview deployments en cada PR

7. PRODUCTION DEPLOY
   - vercel deploy --prod

EL SITIO ESTÁ EN VIVO.
```

---

## VII. Próximos pasos

1. **Copy** → pasa el Prompt 1 a Claude/GPT-4. Devuelve JSON. Guárdalo en `/content/copy.json`.
2. **3D/Visual** → pasa el Prompt 2 a tu pipeline 3D (Blender/KeyShot) o a fotografía real. Output: modelo .glb, frames teardown, macros, video turntable.
3. **Design** → pasa el Prompt 3 a un diseñador o invoca skill `ui-ux-pro-max` con ese contenido. Output: frames de Figma o specs de layout.
4. **Build** → en sesión nueva de Claude Code o Cursor dentro del repo del proyecto, pega el Prompt 4 como mensaje inicial. Invocará `frontend-design`, `ui-ux-pro-max`, `vercel:bootstrap` y `vercel:shadcn` según corresponda.
5. **Launch** → sigue la Sección VI.

---

> Brief generado con el método Decision Maker.
> Última actualización: 2026-05-28.
