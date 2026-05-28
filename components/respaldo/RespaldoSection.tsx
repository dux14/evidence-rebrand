"use client";

import { motion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";
import { copy, type RespaldoPromise } from "@/lib/copy";

export function RespaldoSection() {
  return (
    <section
      id="respaldo"
      data-mode="crema"
      className="relative isolate overflow-hidden py-28 md:py-40"
      style={{ background: "var(--crema-canvas)", color: "var(--crema-fg)" }}
    >
      <div className="crema-grain pointer-events-none absolute inset-0" />

      <div className="section-frame relative">
        <div className="flex items-center justify-between">
          <span className="font-mono-readout text-[11px] opacity-60 md:text-[12px]">RESPALDO</span>
          <span className="font-mono-readout text-[11px] opacity-60 md:text-[12px]">
            04 PROMESAS
          </span>
        </div>
        <div className="mt-3 h-px bg-[rgba(26,20,16,0.12)]" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
          className="mt-12 max-w-[14ch] font-display text-[56px] font-light leading-[0.94] md:text-[96px]"
        >
          {copy.respaldo_headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 0.2 }}
          className="mt-6 max-w-[42ch] text-[18px] leading-[1.5] text-[color:var(--crema-fg)]/70 md:text-[20px]"
        >
          Cuatro promesas, medibles. Nada abstracto.
        </motion.p>
      </div>

      <div className="section-frame mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2 md:gap-8">
        {copy.respaldo_concrete_promises.map((p, i) => (
          <PromiseCard key={p.index} promise={p} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

function PromiseCard({ promise, delay }: { promise: RespaldoPromise; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay }}
      whileHover={{ y: -2 }}
      className="group relative flex flex-col gap-8 border border-[rgba(26,20,16,0.10)] bg-[color:var(--crema-surface)] p-7 transition-colors hover:border-[color:var(--ev-blue-deep)] md:p-10"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono-readout text-[11px] text-[color:var(--crema-fg)]/55 md:text-[12px]">
          {promise.index}
        </span>
        <span
          aria-hidden
          className="block h-[6px] w-[6px] rounded-none bg-[color:var(--ev-blue-deep)] opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>

      <p className="max-w-[22ch] font-display text-[22px] font-normal leading-[1.2] md:text-[28px]">
        {promise.claim}
      </p>

      <dl className="font-mono-readout flex flex-col gap-2 text-[11px] md:text-[12px]">
        {promise.metrics.map((m) => (
          <div
            key={m.label}
            className="flex items-baseline justify-between gap-6 border-t border-dashed border-[rgba(26,20,16,0.18)] pt-2"
          >
            <dt className="text-[color:var(--crema-fg)]/55">{m.label}</dt>
            <dd className="text-[color:var(--crema-fg)]">{m.value}</dd>
          </div>
        ))}
      </dl>
    </motion.article>
  );
}
