"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  /** "noir-to-crema" or "crema-to-noir" */
  direction: "noir-to-crema" | "crema-to-noir";
  /** Optional whisper text shown around mid-transition */
  whisper?: string;
};

/**
 * SectionBeat — a 80–100vh viewport block that dramatizes the transition
 * between Noir and Crema worlds. No copy, just background mutation.
 * The optional whisper appears around scroll progress 0.4–0.7.
 */
export function SectionBeat({ direction, whisper }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const fromColor = direction === "noir-to-crema" ? "#0A0A0B" : "#E9D8C0";
  const toColor = direction === "noir-to-crema" ? "#E9D8C0" : "#0A0A0B";
  const fromText = direction === "noir-to-crema" ? "#FFFFFF" : "#1A1410";
  const toText = direction === "noir-to-crema" ? "#1A1410" : "#FFFFFF";

  const bg = useTransform(scrollYProgress, [0.25, 0.75], [fromColor, toColor]);
  const color = useTransform(scrollYProgress, [0.25, 0.75], [fromText, toText]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.55, 0.85], [0, 1, 0]);

  return (
    <motion.section
      ref={ref}
      data-mode={direction === "noir-to-crema" ? "crema" : "noir"}
      style={{ background: bg }}
      className="relative flex h-[44vh] items-center justify-center md:h-[56vh]"
    >
      {whisper ? (
        <motion.p
          style={{ color, opacity }}
          className="font-serif-italic max-w-[20ch] text-center text-[32px] leading-[1.1] md:text-[56px]"
        >
          {whisper}
        </motion.p>
      ) : null}
    </motion.section>
  );
}
