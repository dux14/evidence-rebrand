# Spec — Mejoras del landing Evidence (8 features + critique final)

Fecha: 2026-06-03 · Estado: aprobado en brainstorming · Producción: https://evidence-rebrand.vercel.app

## Objetivo

Resolver en una sola pasada, en orden de dependencias, los 8 problemas detectados del landing (SEO, responsive/perf, favicon, i18n, CTAs, coherencia visual assets-fondo, overflow mobile, header) y cerrar con una re-revisión crítica de nivel agencia.

## Decisiones de alcance (cerradas con el usuario)

| Tema | Decisión |
|------|----------|
| i18n | **ES/EN real**: copy bilingüe + contexto React + toggle funcional. Sin next-intl (overkill para one-page). La traducción EN hereda los datos placeholder existentes; se corrigen juntos cuando lleguen datos reales del cliente. |
| Formulario | **Server Action → email vía Resend** a servicioalcliente@evidence.com.co. `RESEND_API_KEY` como env var (el usuario crea la cuenta; nunca en repo). |
| Links legales | **Quitar** `#legal`/`#privacidad` del footer hasta tener textos legales reales (Ley 1581). |
| Indexación | **noindex** mientras existan specs placeholder públicas y no haya dominio real. Infraestructura SEO completa lista para activar (un flag). |
| SEO scope | Completo: metadata, OG, sitemap.ts, robots.ts, JSON-LD Organization, alt texts, jerarquía headings. |
| Header desktop | **Opción C — microcaps editoriales**: mayúsculas pequeñas, tracking amplio, separadores de punto medio. Mantiene adaptación noir↔crema. |
| Menú móvil | Hamburguesa → overlay noir a pantalla completa, tipografía editorial grande con índice mono, contacto + toggle ES/EN abajo. (Hoy NO existe navegación móvil.) |
| Favicon | Primero ImageMagick sobre `public/img/brand/icon-onda.png` (trim + escalar a ~95% del canvas). Higgsfield **solo** si a 16px no es legible, con OK previo. |
| Coherencia visual | CSS primero (blend modes, máscaras de gradiente, vignettes); regeneración Higgsfield una por una con OK previo y hex exacto del fondo en el prompt. Secciones noir funden a negro, crema a `#E9D8C0`. |

## Fases (orden de dependencias)

### Fase 1 — Auditoría (solo lectura)

- Playwright MCP contra `pnpm dev`: snapshot + screenshot de cada sección en 375/768/1440 px; consola; requests (peso, videos). Verifica R1–R6 / P1–P6 de `REVISION-Y-PHASE-2.md` y caza overflows nuevos.
- Muestreo de color: `browser_evaluate` (fondo computado por sección) + ImageMagick (pixel-sampling de assets en `public/`). Salida: tabla sección → asset → ΔE → veredicto (CSS / regenerar).
- SEO: WebFetch a https://www.tododeia.com/community/claude-seo-ai + estado actual de metadata/headings/alts.
- Tabla de CTAs muertos confirmada (form sin backend, tel placeholder, links footer).
- Entregable: informe corto en conversación. Sin cambios de código.

### Fase 2 — Fundación i18n

- Copy hardcodeado (HeroNoir, TeardownSequence beats, TimelineEditorial, Footer, ContactForm, Nav, SectionBeat whispers) → migra a JSON. Era deuda del backlog (§4.2 REVISION doc).
- `content/copy.es.json` + `content/copy.en.json` con el mismo schema tipado de `lib/copy.ts`.
- `lib/i18n.tsx`: `LocaleProvider` (client) con `useLocale()`/`useCopy()`; persiste en localStorage; actualiza `<html lang>`; default `es`.
- Toggle ES/EN del Nav funcional, idioma activo resaltado.

### Fase 3 — Fixes

- **Header**: nav links → microcaps editoriales (opción C); menú móvil overlay noir.
- **Overflow mobile**: corregir cada caso detectado en Fase 1 (clamp/break-words/ajustes por componente); re-verificar a 375px.
- **CTAs**: Server Action + Resend con validación y estados de error; tel real `+57 310 3247091` con `href="tel:"`; quitar links legales; verificar todos los anchors contra sus `id`.
- **Perf** (de P1–P2 del REVISION doc): `preload="metadata"` en video teardown + lazy al viewport.
- **SEO**: noindex flag, metadata corregida, OG, sitemap.ts, robots.ts, JSON-LD Organization (fundación 1995, Carrera 72B #49A-70, ISO 9001/13485), alt texts, headings.

### Fase 4 — Assets

- Favicon edge-to-edge (ImageMagick → fallback Higgsfield con aprobación). Regenerar `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`.
- Coherencia visual por sección según tabla ΔE de Fase 1: CSS primero; regeneración Higgsfield solo con OK por asset.

### Fase 5 — Re-revisión de agencia experta

Con todo corregido (preview deploy): re-crawl Playwright (3 viewports, todas las secciones) y critique como agencia premium usando criterios de ui-ux-pro-max + frontend-design:

- Estético: jerarquía visual, ritmo de scroll, consistencia tipográfica, color, microinteracciones, calidad percibida vs. referentes premium.
- Estructural: secciones faltantes o sin profundidad — social proof (clínicas/testimonios), certificaciones como badges visibles, FAQ/objeciones, "por qué Evidence", protocolos/casos de uso.
- Entregable: informe crítico priorizado. Quick wins se implementan con OK del usuario; lo grande queda como backlog accionable.

## Criterios de aceptación

- [ ] Informe de auditoría Fase 1 entregado (tablas: responsive, perf, ΔE assets, CTAs, SEO)
- [ ] Toggle ES/EN cambia todos los textos visibles, persiste al recargar, verificado con Playwright
- [ ] Cero strings de UI hardcodeados en componentes (todo en copy.es/en.json)
- [ ] Navegación móvil funcional a 375px (abrir, navegar, cerrar)
- [ ] Header desktop con tratamiento C aplicado en modos noir y crema
- [ ] Formulario envía email real vía Resend con validación y estado de error
- [ ] Cero CTAs muertos; cero links rotos
- [ ] Cero overflow horizontal a 375px (screenshots de verificación)
- [ ] `noindex` activo + sitemap/robots/JSON-LD/OG listos; alt texts en todas las imágenes
- [ ] Favicon: la onda ocupa ~95% del canvas, legible a 16px
- [ ] Tabla ΔE post-fix: todos los assets fundidos con su sección (antes/después)
- [ ] Informe de critique de agencia entregado con backlog priorizado
- [ ] `pnpm build` pasa sin errores tras cada fase

## Restricciones y condiciones de parada

- Solo pnpm. Sin dependencias nuevas salvo `resend` (aprobada).
- Alcance: `app/`, `components/`, `lib/`, `content/`, `public/`. NO tocar `next.config.ts` ni `.env*`; `package.json`/`pnpm-lock.yaml` solo cambian por la adición de `resend`.
- Preguntar antes de: cualquier generación Higgsfield (créditos), eliminar/reemplazar assets de `public/`, commit/deploy, salir del alcance.
- Karpathy guidelines en todo cambio: quirúrgico, sin sobre-ingeniería.
- Datos placeholder (specs, métricas) NO se inventan de nuevo; quedan tal cual hasta tener datos reales del cliente (fuera de alcance de este spec, salvo teléfono y datos ya confirmados de evidence.com.co §4.3 del REVISION doc).
