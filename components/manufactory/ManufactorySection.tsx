"use client";

import { motion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";
import { useCopy } from "@/lib/i18n";
import { SerifQuote } from "@/components/ui/SerifQuote";
import { ManufactoryPlaceholder } from "./ManufactoryPlaceholder";

export function ManufactorySection() {
  const copy = useCopy();
  return (
    <section
      id="taller"
      data-mode="crema"
      className="relative isolate overflow-hidden py-20 md:py-28"
      style={{ background: "var(--crema-canvas)", color: "var(--crema-fg)" }}
    >
      <div className="crema-grain pointer-events-none absolute inset-0" />

      <div className="section-frame relative">
        {/* eyebrow row */}
        <div className="flex items-center justify-between">
          <span className="font-mono-readout text-[11px] opacity-60 md:text-[12px]">
            {copy.ui.manufactory_eyebrow_label}
          </span>
          <span className="font-mono-readout text-[11px] opacity-60 md:text-[12px]">
            {copy.ui.manufactory_eyebrow}
          </span>
        </div>
        <div className="mt-3 h-px bg-[rgba(26,20,16,0.12)]" />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
          className="mt-12 max-w-[14ch] font-display text-[56px] font-light leading-[0.94] md:text-[96px]"
        >
          {copy.manufactory_headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 0.2 }}
          className="mt-8 max-w-[42ch] text-[18px] leading-[1.5] text-[color:var(--crema-fg)]/80 md:text-[22px]"
        >
          {copy.manufactory_subhead}
        </motion.p>
      </div>

      {/* Wide editorial photo */}
      <div className="section-frame relative mt-20 md:mt-28">
        <motion.div
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: CINEMATIC_EASE }}
        >
          <ManufactoryPlaceholder variant="wide" />
        </motion.div>
      </div>

      {/* Three macros */}
      <div className="section-frame mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: CINEMATIC_EASE }}
        >
          <ManufactoryPlaceholder variant="macro-solder" caption={copy.ui.manufactory_captions[0]} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 0.12 }}
        >
          <ManufactoryPlaceholder variant="macro-calibration" caption={copy.ui.manufactory_captions[1]} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 0.24 }}
        >
          <ManufactoryPlaceholder variant="macro-pack" caption={copy.ui.manufactory_captions[2]} />
        </motion.div>
      </div>

      {/* serif italic closer */}
      <div className="section-frame relative mt-28 md:mt-40">
        <SerifQuote align="center" size="lg" tone="crema">
          {copy.manufactory_quote}
        </SerifQuote>
      </div>
    </section>
  );
}
