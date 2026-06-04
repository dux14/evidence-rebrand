# Critique de agencia — Evidence Landing (post-mejoras, 2026-06-03)

Evaluación sobre la rama `mejoras-landing` con los 8 fixes aplicados. Lentes: ui-ux-pro-max (checklist a11y/interacción/layout + patrones de landing B2B) y benchmark de marcas premium (B&O, Leica, Aesop). Screenshots de evidencia en `/tmp/ev-audit/out/`.

**Patrón objetivo para este producto:** *Trust & Authority + Conversion* — 1. Hero (credibilidad) → 2. **Proof (logos, certificaciones, stats)** → 3. Solución → 4. CTA claro. La página actual tiene 1, 3 y 4 a nivel alto; **el bloque 2 no existe**.

---

## P0 — Duele (bloquea conversión)

### 1. No hay capa de "Proof" tras el hero
ISO 9001, ISO 13485 e INVIMA son **reales y verificables** (§4.3 del REVISION doc) y hoy solo aparecen como una frase dentro del hito 2012 del timeline — enterradas a 5 scrolls del hero. Para equipos médicos, la certificación ES el argumento de venta.
**Fix propuesto:** franja de certificaciones (badges monocromos en mono-readout, estilo "ISO 9001 · ISO 13485 · INVIMA · DESDE 1995") inmediatamente bajo el hero o como cierre del SectionBeat. Esfuerzo: bajo. Archivos: `app/page.tsx` + componente nuevo pequeño.

### 2. Cero social proof en toda la página
Ninguna clínica nombrada, ningún testimonio, ningún logo de cliente. En B2B médico es el bloqueador #1: el comprador necesita saber quién más confía en Evidence. El copy de respaldo *afirma* ("22 clínicas en 5 ciudades") pero nada lo *muestra*.
**Fix propuesto:** sección de 2-3 testimonios (foto + nombre + clínica + ciudad) o fila de logos de clínicas entre `#respaldo` y `#contacto`. **Requiere material real del cliente — no inventable.** Esfuerzo: medio. Backlog hasta tener insumos.

### 3. Un solo camino de conversión
Todo desemboca en el form `#contacto` (al fondo de una página larga). En Colombia el canal B2B real es **WhatsApp** — el teléfono confirmado (+57 310 3247091) ya es móvil.
**Fix propuesto:** CTA secundario `wa.me/573103247091` con mensaje precargado ("Hola, quiero agendar una demostración…") en el Nav y/o junto al CTA del hero. Esfuerzo: bajo (solo copy + href).

## P1 — Pulir (calidad percibida)

### 4. Contraste de microlabels sobre crema
Los mono-readout a `opacity-50/55` sobre `#E9D8C0` quedan ≈3.5–4:1 en 10–11px — por debajo de WCAG AA (4.5:1 en texto pequeño). **Fix:** subir a opacity-70 o usar `--crema-fg-2` sólido. Archivos: componentes de sección (clases `opacity-50`/`/55`).

### 5. La serif editorial no está cargada
`PP Editorial New` está declarada en CSS pero nunca se carga (cae a Cormorant/Times del sistema) — los SerifQuote, la voz "premium" de la página, renderizan con una fuente no controlada. **Fix:** cargar la fuente (licencia) o cambiar el stack a una serif de Google (p.ej. Fraunces italic) vía `next/font`. (Ya estaba en P2 del backlog previo — sube a P1: afecta directamente la calidad percibida.)

### 6. El azul Evidence casi no existe en la página
La identidad real del producto es **blanco + azul** (catálogo real), pero la página lee "beige + negro": el azul `#1B3A7A` solo aparece en el wordmark, links pequeños y hovers. **Fix:** usar el azul como acento sistemático — eyebrow activo, valores de métricas en respaldo, subrayado del CTA, indicador de sección activa en nav. Esfuerzo: bajo-medio, alto impacto de marca.

### 7. No hay manejo de objeciones (FAQ)
Precio, financiación, capacitación, tiempos de entrega, qué cubre la garantía — nada respondido. Cada objeción sin responder es un correo que no llega. **Fix:** FAQ acordeón de 5-6 preguntas antes de `#contacto` (los *bloques de respuesta extraíbles* también ayudan al SEO/AI-search — referencia tododeia). Requiere respuestas reales del cliente.

### 8. Footer demasiado magro para B2B
Sin dirección física, sin teléfono, sin email — los tres son **datos reales confirmados**. Un fabricante médico sin dirección en el footer resta legitimidad. **Fix:** añadir Carrera 72B #49A-70 Bogotá · +57 310 3247091 · servicioalcliente@evidence.com.co. Esfuerzo: trivial (keys i18n + Footer.tsx).

### 9. Favicon azul oscuro en pestañas dark
La onda azul `#0D2D6E` se pierde sobre tabs oscuros. Existe `icon-onda-white.png` — **Fix:** `<link rel="icon" media="(prefers-color-scheme: dark)">` con la variante clara. Esfuerzo: trivial.

## P2 — Backlog (profundidad)

10. **"Por qué Evidence"** — comparativa fabricante local vs importado (repuestos, SLA, capacitación, INVIMA). Es EL diferenciador del negocio y hoy es implícito.
11. **Protocolos/casos de uso por línea** — cada línea lista tecnologías pero no resultados ni protocolos clínicos.
12. **Captura secundaria de leads** — quien no agenda demo hoy no deja rastro (newsletter técnica / catálogo descargable a cambio de email).
13. **Teardown en touch real** — el scrub por `currentTime` debe validarse en iOS/Android físicos (R2); fallback a póster si no es fluido.
14. **i18n con URLs** — el toggle client-side no traduce metadata ni permite indexar EN; al tener dominio real considerar rutas `/en` + hreflang.

## Lo que ya está bien (no tocar)

- Ritmo noir→crema→noir→noir→crema con el taller ahora en noir: la página tiene una cadencia cinematográfica coherente.
- Tipografía display + mono-readout: voz técnica diferenciada y consistente.
- Hero con video real del producto + teardown scrubbeado: el "show, don't tell" ya existe.
- Timeline multiply: las fotos de archivo ahora se sienten impresas en la página.
- Mobile: navegación completa, sin overflow, tap targets ≥44px.

## Resumen ejecutivo

La página ya se ve y se siente premium; lo que le falta no es estética sino **evidencia** (irónico para una marca llamada Evidence): certificaciones visibles, clínicas reales, respuestas a objeciones. Quick wins de esta semana: #1 (badges certificaciones), #3 (WhatsApp), #8 (footer completo), #9 (favicon dark) — ninguno necesita material nuevo del cliente. #2 y #7 dependen de insumos reales y son los de mayor impacto.
