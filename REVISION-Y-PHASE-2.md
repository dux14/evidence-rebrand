# Evidence — Revisión, datos a reemplazar y Phase 2

Estado a 2026-06-03. Producción: **https://evidence-rebrand.vercel.app** · Repo: `dux14/evidence-rebrand`.

---

## 1. Estado actual (qué está live)

- ✅ Hero noir con **video loop** del Evidence Pro real.
- ✅ Líneas (4) con fotos editoriales reales, **fondo crema uniforme** que coincide con la sección.
- ✅ Teardown con **video scrubbeado por scroll**.
- ✅ Taller (1 wide + 3 macros, grid corregido a una fila).
- ✅ Timeline (5: 4 sepia + 2024 nítido).
- ✅ Logo regenerado (wordmark azul/blanco transparente) en Nav + Footer · favicon/apple/OG (icono onda).
- ✅ Build estático, deploy en Vercel con CI por push a `main`.

---

## 2. Mobile-first / Responsive — validar

La base responsive existe (Tailwind `md:` everywhere, `grid-cols-1` por defecto → stack en móvil). **Pendientes reales detectados:**

| # | Tema | Detalle / acción |
|---|------|------------------|
| R1 | **No hay menú móvil** ⚠️ | `components/ui/Nav.tsx`: la lista de links es `hidden md:flex`. En móvil **no existe navegación** (ni hamburguesa). Agregar menú móvil (drawer/hamburger). |
| R2 | Teardown en touch | Sección 400vh con scroll-scrub del video (`currentTime` por scroll). Validar en iOS/Android real (Safari a veces no permite seek fluido del `<video>`); considerar fallback a póster/secuencia en móvil. |
| R3 | Autoplay de video iOS | Hero usa `muted + playsInline` (ok), pero modo bajo consumo de iOS puede no auto-reproducir → el `poster` cubre ese caso (ya está). |
| R4 | Tipos grandes en móvil | Tras subir tamaños, revisar overflow del hero (`clamp(96px,14vw,160px)`) y headlines en 360–375px. |
| R5 | Imágenes líneas full-bleed | En móvil ocupan 100vw (ok). Verificar alto en pantallas cortas. |
| R6 | Tap targets | Links del nav y CTAs ≥44px en móvil. |

> Acción sugerida: probar en Chrome DevTools 375/390/768/1024/1440 + un dispositivo real iOS y Android.

---

## 3. Performance — observaciones

| # | Tema | Acción |
|---|------|--------|
| P1 | **Video teardown `preload="auto"`** (2.85MB) | Carga ansiosa. Cambiar a `preload="metadata"` o lazy-load al entrar al viewport; servir fallback estático en móvil para ahorrar datos. |
| P2 | Video hero (1.27MB) autoplay loop | Aceptable; considerar `preload="metadata"` + poster (ya hay poster). |
| P3 | Imágenes | Servidas vía `next/image` → webp/avif automático ✓. Originales 2k transcodeadas a webp 1280px ✓. |
| P4 | 3D (`three`, `@react-three/*`) | Solo se cargan si `hero_3d=true` (dynamic import, ssr:false). Hoy `false` → no entran al bundle inicial ✓. Si nunca se usa 3D, **eliminar las deps** para aligerar `node_modules`/install. |
| P5 | Fuentes | `next/font` (Inter Tight + JetBrains) ✓. La serif `PP Editorial New` está en CSS pero **no se carga** (cae a Cormorant/Times). Decidir: cargar la fuente o cambiar el fallback. |
| P6 | Lighthouse | Correr Lighthouse/PageSpeed en prod y registrar LCP/CLS/INP. El LCP probablemente sea el video/hero. |

---

## 4. ⚠️ Copys y DATOS INVENTADOS → reemplazar por reales

**Crítico:** muchos números y specs son *placeholder inventados* y hoy son públicos. Hay que reemplazarlos con datos verificados del cliente antes de difundir.

### 4.1 `content/copy.json`

| Campo | Valor actual (inventado/placeholder) | Reemplazar por |
|-------|--------------------------------------|----------------|
| `hero_headline` | "Evidence Pro. 10 programas." | ¿10 programas es real? confirmar nº |
| `seccion_lineas_headline` | "Cuatro líneas. Doce instrumentos." | nº real de equipos (catálogo real = 20) |
| `lineas_descriptors[facial].tecnologias` | "Microcorrientes, HIFU facial, Mesoterapia virtual" | confirmar: ¿Evidence hace HIFU? real = alta frecuencia, ionización, US (Atalanta) |
| `lineas_descriptors[laser].tecnologias` | "Diodo 808, Nd:YAG 1064, IPL multibanda" | real = **Lipoláser 650/808nm**; ¿Nd:YAG/IPL existen? probablemente NO |
| `lineas_descriptors[soporte].tecnologias` | "Hidrolimpieza, Oxígeno-presoterapia, UV-C" | real = Carboskin (carboxiterapia), Ozono; confirmar |
| `evidence_pro_detail_intro` | "…seis meses de pruebas internas…" | claim inventado, confirmar |
| `evidence_pro_specs` | FREQ 0.5–5 MHz · POWER 60W · MODES 4 · PROGRAMS 10 | **specs de ULTRASONIDO — el Evidence Pro es electroestimulador multicanal.** Reemplazar por specs reales (canales, Hz, formas de onda, programas) |
| `timeline_milestones[1998]` | año **1998** | **real = 1995** (fundación 15 feb 1995) → renombrar archivo `1998.webp→1995.webp` también |
| `timeline_milestones[*].frase` | "Cuatro técnicos", "Veintidós clínicas en cinco ciudades", etc. | cifras/hitos reales de la historia |
| `respaldo_concrete_promises` | 14 técnicos · 3 ciudades · 220+ SKUs · 72h stock · **SLA 48h** · **garantía 36m** | **TODAS inventadas.** Datos reales de postventa (son promesas públicas) |
| `footer_line`, `manufactory_*`, `cta_*` | voz de marca | aprobar tono |

### 4.2 Hardcoded en componentes (no están en copy.json)

| Archivo | Texto actual | Acción |
|---------|--------------|--------|
| `components/hero/HeroNoir.tsx` | "EV / PRO · S/N 0000-0001" · "10 PROGRAMAS · 4 MODOS · 0.5–5 MHz" · "CALIBRADO EN PLANTA · BOGOTÁ" · "FILM 01 / 06" | S/N placeholder; specs de ultrasonido (corregir a electroestim). Mover a copy.json |
| `components/evidence-pro-detail/TeardownSequence.tsx` | Beats ESTADO 01–04; beat 3 "TRANSDUCTOR · Refrigeración líquida. Acople cerámico." | **El Pro NO es ultrasonido** → reescribir beat (canales/electrodos). Mover a copy.json |
| `components/timeline/TimelineEditorial.tsx` | "Veintiséis años, en cinco objetos." · cita "En 2012 dejamos de pedir trazabilidad…" | 1995→2026 = **31 años**; verificar cita |
| `components/manufactory/ManufactorySection.tsx` | eyebrow "BOGOTÁ · 1998" | → **1995** |
| `components/ui/Footer.tsx` | "© Evidence S.A.S · NIT 800.XXX.XXX-X" · sedes "Bogotá, Medellín, Cali" · links `#legal` `#privacidad` | **NIT real**; confirmar sedes; crear páginas legal/privacidad |
| `components/ui/Nav.tsx` | toggle "ES / EN" | hoy **no funciona** (sin i18n) |
| `components/contact/ContactForm.tsx` | formulario | **sin backend** (no envía) |

### 4.3 Datos reales confirmados (de evidence.com.co) para usar

- Fundación **15 feb 1995** · ISO 9001 + ISO 13485 · registro INVIMA · 28+ años.
- Dirección **Carrera 72B #49A-70, Bogotá** · Tel **+57 310 3247091** · **servicioalcliente@evidence.com.co**.
- Catálogo real: 20 equipos (ver `ASSETS-WALKTHROUGH.md`).

---

## 5. Phase 2 — backlog priorizado

**P0 (antes de difundir / dominio real)**
- [ ] Reemplazar **todos** los datos inventados de §4 (specs, métricas postventa, NIT, año 1995, hitos).
- [ ] **Menú móvil** (R1) — hoy no hay navegación en móvil.
- [ ] Backend del **formulario de contacto** (server action → email/CRM) + validación.
- [ ] Páginas **Aviso legal / Privacidad** (links ya existen pero rotos).
- [ ] Conectar **dominio** (¿evidence.com.co o subdominio?) en Vercel.

**P1 (calidad)**
- [ ] **i18n ES/EN** real (el toggle ya está en UI).
- [ ] Specs reales del Evidence Pro (electroestimulación) + reescribir beat "transductor".
- [ ] Confirmar/reestructurar líneas Láser y Soporte al catálogo real.
- [ ] `preload="metadata"` + lazy para video teardown; fallback móvil (P1 perf).
- [ ] Lighthouse pass (LCP/CLS/INP) + correcciones.
- [ ] Accesibilidad: contraste sobre el nuevo crema cálido, alt texts, focus states, `prefers-reduced-motion` (ya parcial).

**P2 (pulido / nice-to-have)**
- [ ] Teardown más dramático vía **Veo 3.1 Frames-to-Video** (Flow) si se quiere explode real.
- [ ] Favicon: validar legibilidad del icono onda a 16px (si no, versión badge).
- [ ] OG por sección/página; sitemap.xml + robots.txt; meta SEO.
- [ ] Analítica (Vercel Analytics / GA) + eventos de CTA.
- [ ] Cargar la serif `PP Editorial New` o ajustar fallback (P5).
- [ ] Si sirve a UE: etiquetado de imágenes IA (EU AI Act, ago-2026) + consentimiento cookies.
- [ ] Limpiar deps 3D (`three`, `@react-three/*`) si el hero 3D no se usará.

---

## 6. Tokens / dónde tocar rápido
- Colores y tipografía base: `app/globals.css` (paleta crema cálida ya aplicada).
- Flags de assets: `lib/config.ts`.
- Copys: `content/copy.json` (+ algunos hardcoded, ver §4.2).
- Secciones: `components/<seccion>/…`.
