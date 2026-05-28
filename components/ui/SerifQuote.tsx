"use client";

import { motion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  align?: "center" | "left";
  size?: "md" | "lg";
  tone?: "crema" | "noir";
};

export function SerifQuote({ children, align = "center", size = "lg", tone = "crema" }: Props) {
  const sizes = {
    md: "text-[28px] md:text-[40px]",
    lg: "text-[40px] md:text-[56px]",
  } as const;

  const toneColor = tone === "noir" ? "text-white" : "text-[color:var(--crema-fg)]";
  const alignment = align === "center" ? "text-center mx-auto max-w-[20ch]" : "text-left max-w-[28ch]";

  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
      className={`font-serif-italic leading-[1.05] ${sizes[size]} ${toneColor} ${alignment}`}
    >
      {children}
    </motion.blockquote>
  );
}
