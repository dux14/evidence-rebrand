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

## Verificación de cierre de sesión

- Build: ✅ verde (`next build`)
- Consola en load: ✅ 0 errores (1440 y 375)
- Contraste: ✅ 0 fallos AA en secciones refactorizadas (ambos viewports, opacidad acumulada incluida)
- CTAs: ✅ 0 hrefs vacíos; anclas todas resuelven
- Interactivos anidados: ✅ 0
- Overflow horizontal móvil: ✅ no
- Tap targets <44px: ✅ 0
