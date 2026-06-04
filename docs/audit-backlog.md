# Auditoría de agencia — backlog P1/P2

**Fecha:** 2026-06-04 · **Branch:** `feat/visual-depth-pack` · **Viewports:** 1440×900 y 375×812
**Método:** Playwright (programático + visual), build de producción, consola limpia.

## P0 — corregidos en esta sesión

| # | Hallazgo | Fix |
|---|---|---|
| P0-1 | `favicon.ico` regenerado en RGB rompía el decoder ICO de Next (500 en dev, error de compilación) | `f29e283` — PNGs internos RGBA |
| P0-2 | `<button>` anidado en `<a>` en el CTA del hero (HTML inválido, doble tab-stop) — `components/ui/MagneticButton.tsx` | `3f92f0b` — `motion.a` real con href |

## P1 — requieren decisión o contenido del cliente (NO tocados)

| # | Hallazgo | Anchor | Por qué importa |
|---|---|---|---|
| P1-1 | NIT placeholder `800.XXX.XXX-X` visible en el footer | `content/copy.es.json` / `copy.en.json` → `footer_copyright` | Señal de confianza rota en B2B médico: un dato fiscal falso a la vista. Necesita el NIT real. |
| P1-2 | Menú móvil sin `Escape` ni focus-trap: el foco puede tabular al contenido detrás del overlay | `components/ui/Nav.tsx:44-49` (efecto scroll-lock) y `:138-179` (overlay) | WCAG 2.1.2 / patrón dialog. Añadir keydown Escape + trap con `inert` en `<main>` o foco cíclico. |
| P1-3 | Formulario de contacto sin anti-spam (honeypot / rate-limit) | `app/actions/contact.ts` (zona protegida — no tocar sin aprobación) | Leads basura en cuanto haya tráfico. Honeypot CSS es 0-fricción. Nota: claves Resend aún pendientes (memoria de proyecto). |
| P1-4 | Sin enlace "saltar al contenido" | `app/layout.tsx` | Usuarios de teclado atraviesan todo el nav en cada visita. Costo: 5 líneas. |
| P1-5 | El form no pide email — único canal de respuesta es teléfono | `components/contact/ContactForm.tsx:71-102` + claves i18n + action | En B2B el comprador suele preferir email para la primera respuesta. Requiere decisión de negocio (más fricción vs más canal). |
| P1-6 | Fotos del taller (Manufactory) siguen forzando banda noir — RMSE ~82% vs crema documentado | `components/manufactory/ManufactorySection.tsx:13-19` | Decisión pendiente de la sesión anterior: regenerar fotos con fondo crema (Higgsfield) o mantener taller noir como ancla intencional. Con P2-bookends el taller noir ahora encaja MEJOR (es el tercer ancla oscura) — recomendación: cerrar este pendiente como "intencional". |

## P2 — pulido (NO tocados)

| # | Hallazgo | Anchor |
|---|---|---|
| P2-1 | `components/ui/SectionHeader.tsx` sin imports en el código (dead code candidato) | `SectionHeader.tsx:1` |
| P2-2 | Sin prueba social (clientes, testimonios, certificaciones visuales más allá del hito INVIMA del timeline) — gap de lead-readiness | nueva sección o cards en `respaldo` |
| P2-3 | Copyright sin año (`© Evidence S.A.S · NIT…`) | `content/copy.*.json` → `footer_copyright` |
| P2-4 | Halo cálido sutil de las fotos de líneas sobre la banda ivory (backdrops de las fotos matcheados a canvas `#E9D8C0`) — hoy lee como viñeta intencional; regenerar con backdrop `#F4EADA` si molesta | `components/lineas/LineaPlaceholder.tsx:32-40` + assets |
| P2-5 | Verificar que `app/opengraph-image.png` refleje el branding actual (no auditado en esta sesión) | `app/opengraph-image.png` |
| P2-6 | Medir LCP/CLS reales en producción tras el deploy (dev-only auditado) | evidence-rebrand.vercel.app |

## Auditoría 2026-06-04 (lentes redesign + emil) — segunda pasada

### Corregidos en `fix/audit-quick-wins`

| # | Hallazgo | Fix |
|---|---|---|
| A1 | CTA primario bajo el fold en desktop (y=954 @1440×900) y móvil | CTA movido a la columna del titular; `hero-number` cap 160→148px; paddings ajustados. Verificado: CTA bottom 860 @900/864, 481 @812 |
| A2 | CTA invisible 2.0s por cadena de delays de entrada | Cadena recortada: subhead 1.0s, CTA 1.2s, readout 1.4s, cue 1.8s |
| B1 | " Pro." indentado 27px — span de espacio con NBSP (` `) entre inline-blocks no colapsa al inicio de línea | Spans de espacio eliminados; `mr-[0.24em]` en cada palabra |
| B2 | Contador "04 / 04" en eyebrow de líneas (length / length) | Ahora "04 / 12" (líneas / instrumentos, computado) |
| C1 | Flecha del CTA: `whileHover` en el span interno nunca disparaba (verificado) | `group-hover:translate-x-1` CSS (verificado: translate 4px) |
| C2 | Sin pressed state en MagneticButton ni submit | `whileTap scale 0.97` (gated reduced-motion) / `active:scale-[0.98]` |
| C3 | `transition-all` en submit del form | `transition-[background-color,transform,opacity]` |
| D1a | Footer sin email (existía en JSON-LD) | `contact_email` en copy ES/EN + mailto en footer |

### Corregidos en `fix/quick-wins-2` (2026-06-04, segunda tanda)

| # | Hallazgo | Fix |
|---|---|---|
| P1-2 | Menú móvil sin Escape ni focus-trap | Escape cierra + devuelve foco al toggle; Tab cicla dentro del header. Verificado: 12 tabs sin escapar, scroll desbloqueado al cerrar |
| P1-3 | Form sin anti-spam | Honeypot `sitio` (oculto, tabIndex -1) + éxito silencioso en `contact.ts` si llega lleno |
| P1-4 | Sin skip-link | "Saltar al contenido" → `#contenido`; Nav y Footer movidos fuera de `<main>` (semántica + orden de tab correcto) |
| N4 | Sin 404 personalizada | `app/not-found.tsx` noir de marca con CTA de regreso |
| N6 | `backdrop-filter` del header saltaba | `transition: backdrop-filter 400ms` |
| N7 | reduced-motion mataba fades de comprensión | opacity/color mantienen 160ms; transforms eliminados |
| N8 | Hover de PromiseCard sin gate táctil | `whileHover` → CSS `hover:-translate-y-0.5` (Tailwind v4 ya gatea con `hover:hover`) |
| P2-1 | `SectionHeader.tsx` dead code | Eliminado (0 imports verificados) |
| P2-3 | Copyright sin año | Año dinámico en Footer |

### Resueltos en `feat/audit-decisions` (2026-06-04, decisiones de Samu)

| # | Decisión | Fix |
|---|---|---|
| N1 | "Limitar el ancho" | `hero-number` cap 148→128px: "programas." termina en x=778, antes de la máquina visible; titular queda en 3 líneas compactas |
| N5 | "Beats dramatizados" | SectionBeat parametrizado (`whisperKey`, `cremaHex`) + 2 beats nuevos: líneas→pro ("Por dentro, sin secretos.") y taller→archivo ("Tres décadas en el archivo.", canvas #E9D8C0) |
| P1-5 | "Agrega el email" | Campo email requerido en el form (copy ES/EN, tipos, action con validación + `replyTo` en Resend) |

### Pendientes (decisión tomada: después / contenido del cliente)

| # | Hallazgo | Estado |
|---|---|---|
| N2 | Foto del hito 1998 dice "BOGOTÁ, 1996" | **Diferido por Samu** — regenerar asset después |
| P1-6 | Fotos del taller noir vs crema | **Diferido por Samu** — regenerar imágenes después |
| N3 | Enlaces legales (privacidad/términos) | Espera contenido real del cliente |
| P1-1 | NIT placeholder | Espera dato real del cliente |
| P2-2 | Prueba social | Espera contenido del cliente |
| — | Claves Resend en Vercel | Espera credenciales |
| — | Quitar `robots: noindex` | Al conectar dominio real |

## Verificación de cierre de sesión

- Build: ✅ verde (`next build`)
- Consola en load: ✅ 0 errores (1440 y 375)
- Contraste: ✅ 0 fallos AA en secciones refactorizadas (ambos viewports, opacidad acumulada incluida)
- CTAs: ✅ 0 hrefs vacíos; anclas todas resuelven
- Interactivos anidados: ✅ 0
- Overflow horizontal móvil: ✅ no
- Tap targets <44px: ✅ 0
