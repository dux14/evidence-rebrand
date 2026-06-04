"use client";

import { motion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";
import type { EvidenceSpec } from "@/lib/copy";

export function SpecsMono({ specs }: { specs: EvidenceSpec[] }) {
  return (
    <motion.dl
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 0.2 }}
      className="font-mono-readout text-[12px] text-white md:text-[14px]"
    >
      {specs.map((s, i) => (
        <div
          key={s.label}
          className={`flex items-baseline justify-between gap-8 border-b border-white/12 pb-3 ${i === 0 ? "pt-0" : "pt-3"}`}
        >
          <dt className="text-white/55">{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </motion.dl>
  );
}
