"use client";

import { motion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";

type Props = {
  eyebrow: string;
  index?: string;
  tone?: "noir" | "crema";
};

export function SectionHeader({ eyebrow, index, tone = "crema" }: Props) {
  const text = tone === "noir" ? "text-white/70" : "text-[color:var(--crema-fg)]/70";
  const line = tone === "noir" ? "bg-white/12" : "bg-[color:var(--crema-fg)]/12";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: CINEMATIC_EASE }}
      className="flex items-center justify-between"
    >
      <span className={`font-mono-readout text-[11px] md:text-[12px] ${text}`}>{eyebrow}</span>
      {index ? (
        <span className={`font-mono-readout text-[11px] md:text-[12px] ${text}`}>{index}</span>
      ) : null}
      <div className={`absolute left-0 right-0 mt-12 h-px ${line}`} />
    </motion.div>
  );
}
