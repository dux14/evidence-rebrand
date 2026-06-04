# Visual Depth Pack — diseño aprobado

**Fecha:** 2026-06-04 · **Branch:** `feat/visual-depth-pack` · **Aprobado por:** Samuel (interactivo)

## Decisión

Paleta **P2 "Bookends noir"** con **cortes duros** entre bandas. La página abre y cierra oscura
(hero noir ↔ footer espresso); el mundo crema se diferencia en una escalera multi-tonal de la
misma familia papel. Cero hues nuevos, cero dependencias nuevas.

### Mapa de bandas

| Sección | Token de fondo | Hex | Cambio |
|---|---|---|---|
| hero | `noir-bg` | `#000000` | 🔒 intocable |
| beat | interpolación noir → ivory | — | destino actualizado |
| lineas | `crema-ivory` | `#F4EADA` | **nuevo token** |
| pro (teardown) | `noir-bg` | `#000000` | 🔒 intocable |
| taller (manufactory) | `noir-bg-2` | `#0A0A0B` | 🔒 intocable |
| archivo (timeline) | `crema-canvas` | `#E9D8C0` | era `crema-surface` |
| respaldo | `crema-muted` | `#D9C4A6` | era `crema-canvas` |
| contacto | `crema-ivory` | `#F4EADA` | era `crema-canvas` |
| footer | `crema-fg` (espresso) | `#1A1410` | era `crema-canvas`; texto crema, wordmark blanco, `data-mode="noir"` |

### Contraste pre-verificado (WCAG 2.1)

ink `#1A1410` ≥ 9.16:1 en toda la familia crema; ink-2 `#5A4A3A` ≥ 5.01:1 en las bandas usadas
(la banda más profunda usada es `#D9C4A6`). Footer: crema `#E9D8C0` sobre espresso `#1A1410` = 13.07:1.
F2 verifica los valores renderizados reales con Playwright.

### Reglas

1. Colores nuevos solo como custom properties en `app/globals.css` (`@theme` + re-export en `:root`).
   Excepción documentada: `SectionBeat.tsx` interpola colores con Framer Motion `useTransform`,
   que requiere strings concretos — mantiene el idioma existente (hex literal + comentario al token).
2. Transiciones entre bandas: corte duro con hairlines. `SectionBeat` conserva el monopolio de la
   transición dramática noir↔crema.
3. Footer oscuro ⇒ `data-mode="noir"` para que el Nav cambie de modo al llegar abajo.

## Investigación que sustenta la decisión

- Tendencia 2026: paletas multi-tonales de una familia + restricción en motion; alternancia
  dark/light como patrón premium (last30days 2026-06-04, raw en `~/Documents/Last30Days/`).
- Tailwind v4 `@theme` y Motion `useTransform` confirmados vigentes vía Context7.
- Mockups comparados: `/tmp/evidence-mock/variant-{a,b}-*.png` (B elegida).

## Alcance restante de la sesión (orden fijo)

F1 bandas → F2 contraste → F3 mapa CTAs → F4 header/menú móvil → F5 iconos (blanco, 4-6% margen,
desde `public/img/brand/icon-onda.png`) → F6 auditoría agencia (solo P0; P1/P2 a `docs/audit-backlog.md`).

Stop conditions: no borrar archivos, no dependencias nuevas, no tocar `app/actions/`, no tocar
hero/pro noir, no reestructurar i18n (solo añadir claves), commits convencionales por feature,
sin push/PR hasta confirmación.
