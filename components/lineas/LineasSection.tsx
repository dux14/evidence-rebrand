"use client";

import { motion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";
import { type LineaDescriptor } from "@/lib/copy";
import { useCopy } from "@/lib/i18n";
import { SerifQuote } from "@/components/ui/SerifQuote";
import { LineaPlaceholder } from "./LineaPlaceholder";

const VARIANTS = ["corporal", "facial", "laser", "soporte"] as const;
type Variant = (typeof VARIANTS)[number];

export function LineasSection() {
  const copy = useCopy();
  return (
    <section
      id="lineas"
      data-mode="crema"
      className="relative isolate overflow-hidden py-20 md:py-28"
      style={{ background: "var(--crema-canvas)", color: "var(--crema-fg)" }}
    >
      <div className="crema-grain pointer-events-none absolute inset-0" />

      {/* eyebrow row */}
      <div className="section-frame relative">
        <div className="flex items-center justify-between">
          <span className="font-mono-readout text-[11px] opacity-60 md:text-[12px]">
            {copy.ui.lineas_eyebrow}
          </span>
          <span className="font-mono-readout text-[11px] opacity-60 md:text-[12px]">
            {String(copy.lineas_descriptors.length).padStart(2, "0")} /{" "}
            {String(copy.lineas_descriptors.length).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-3 h-px bg-[rgba(26,20,16,0.12)]" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
          className="mt-10 max-w-[16ch] font-display text-[46px] font-light leading-[0.96] md:text-[84px]"
        >
          {copy.seccion_lineas_headline}
        </motion.h2>
      </div>

      {/* línea blocks */}
      <div className="section-frame mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
        {copy.lineas_descriptors.map((linea, i) => (
          <LineaBlock
            key={linea.nombre}
            linea={linea}
            index={i}
            variant={VARIANTS[i] ?? "corporal"}
            invert={i % 2 === 1}
          />
        ))}
      </div>

      {/* Editorial break after line 2 — overlapping using absolute placement
          would conflict with column flow; do a divider block between 2 and 3. */}
      <div className="relative my-16 md:my-24">
        <div className="section-frame">
          <SerifQuote align="center" size="lg">
            {copy.ui.lineas_quote}
          </SerifQuote>
        </div>
      </div>
    </section>
  );
}

function LineaBlock({
  linea,
  index,
  variant,
  invert,
}: {
  linea: LineaDescriptor;
  index: number;
  variant: Variant;
  invert: boolean;
}) {
  const copy = useCopy();
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16"
    >
      {/* Image side */}
      <motion.div
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: CINEMATIC_EASE } },
        }}
        className={`md:col-span-6 ${invert ? "md:order-2 md:col-start-7" : "md:order-1 md:col-start-1"}`}
      >
        <LineaPlaceholder variant={variant} />
      </motion.div>

      {/* Text side */}
      <div
        className={`md:col-span-5 ${invert ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-8"}`}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: CINEMATIC_EASE, delay: 0.15 } },
          }}
        >
          <div className="font-mono-readout text-[11px] opacity-60 md:text-[12px]">
            {String(index + 1).padStart(2, "0")} /{" "}
            {linea.nombre.replace(/Línea\s|\s?Line/g, "").trim().toUpperCase()}
          </div>

          <h3 className="mt-6 font-display text-[40px] font-normal leading-[1.05] md:text-[56px]">
            {linea.nombre}
          </h3>

          <p className="mt-5 max-w-[28ch] text-[20px] leading-[1.45] text-[color:var(--crema-fg)]/80 md:text-[26px]">
            {linea.descriptor}
          </p>

          <ul className="mt-10 space-y-2 text-[14px]">
            <li className="font-mono-readout text-[10px] opacity-50">{copy.ui.lineas_tech_label}</li>
            {linea.tecnologias.map((t) => (
              <li key={t} className="flex items-baseline gap-3">
                <span className="font-mono-readout text-[10px] opacity-40">·</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            className="mt-10 inline-flex items-center gap-2 text-[13px] underline decoration-[color:var(--ev-blue)] decoration-2 underline-offset-[6px] transition-opacity hover:opacity-70"
            style={{ color: "var(--ev-blue-deep)" }}
          >
            {copy.ui.lineas_cta_prefix} {linea.nombre.toLowerCase()}
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}
