"use client";

import { motion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";
import { type TimelineMilestone } from "@/lib/copy";
import { useCopy } from "@/lib/i18n";
import { SerifQuote } from "@/components/ui/SerifQuote";
import { MilestoneVisual } from "./MilestoneVisual";

export function TimelineEditorial() {
  const copy = useCopy();
  return (
    <section
      id="archivo"
      data-mode="crema"
      className="relative isolate overflow-hidden py-28 md:py-40"
      style={{ background: "var(--crema-surface)", color: "var(--crema-fg)" }}
    >
      <div className="crema-grain pointer-events-none absolute inset-0" />

      <div className="section-frame relative">
        <div className="flex items-center justify-between">
          <span className="font-mono-readout text-[11px] opacity-60 md:text-[12px]">
            {copy.ui.timeline_eyebrow}
          </span>
          <span className="font-mono-readout text-[11px] opacity-60 md:text-[12px]">
            {copy.ui.timeline_counter}
          </span>
        </div>
        <div className="mt-3 h-px bg-[rgba(26,20,16,0.12)]" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
          className="mt-12 max-w-[18ch] font-display text-[44px] font-light leading-[0.96] md:text-[72px]"
        >
          {copy.ui.timeline_headline}
        </motion.h2>
      </div>

      <div className="section-frame mt-24 flex flex-col gap-32 md:mt-32 md:gap-40">
        {copy.timeline_milestones.map((m, i) => (
          <MilestoneRow key={m.anio} m={m} invert={i % 2 === 1} index={i} />
        ))}
      </div>

      {/* mid-timeline italic break, slipped between blocks 3 and 4 via order */}
      <div className="section-frame relative mt-28 md:mt-36">
        <SerifQuote align="center" size="lg" tone="crema">
          {copy.ui.timeline_quote}
        </SerifQuote>
      </div>
    </section>
  );
}

function MilestoneRow({
  m,
  invert,
  index,
}: {
  m: TimelineMilestone;
  invert: boolean;
  index: number;
}) {
  const copy = useCopy();
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16"
    >
      {/* Image */}
      <motion.div
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)" },
          show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.1, ease: CINEMATIC_EASE, delay: 0.2 } },
        }}
        className={`md:col-span-5 ${invert ? "md:order-2 md:col-start-7" : "md:order-1 md:col-start-1"}`}
      >
        <MilestoneVisual variant={m.anio as "1998" | "2005" | "2012" | "2018" | "2024"} />
      </motion.div>

      {/* Year + text */}
      <div
        className={`md:col-span-6 ${invert ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7"}`}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: CINEMATIC_EASE } },
          }}
          className="font-display text-[88px] font-extralight leading-[0.9] md:text-[128px]"
          aria-label={`${copy.ui.timeline_year_aria} ${m.anio}`}
        >
          {m.anio}
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: CINEMATIC_EASE, delay: 0.3 } },
          }}
          className="mt-8"
        >
          <h3 className="max-w-[24ch] font-display text-[24px] font-medium md:text-[28px]">
            {m.objeto}
          </h3>
          <p className="mt-4 max-w-[28ch] text-[16px] leading-[1.5] text-[color:var(--crema-fg)]/70 md:text-[18px]">
            {m.frase}
          </p>
        </motion.div>

        <span className="font-mono-readout mt-6 inline-block text-[10px] opacity-40">
          {copy.ui.timeline_hito_label} {String(index + 1).padStart(2, "0")} / 05
        </span>
      </div>
    </motion.article>
  );
}
