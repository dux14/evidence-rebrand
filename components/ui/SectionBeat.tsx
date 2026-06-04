"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCopy } from "@/lib/i18n";

type Props = {
  /** "noir-to-crema" or "crema-to-noir" */
  direction: "noir-to-crema" | "crema-to-noir";
  /** Clave del whisper en copy.ui — cada beat susurra algo distinto (N5). */
  whisperKey?: "beat_whisper" | "beat_whisper_pro" | "beat_whisper_archivo";
  /** Hex del lado crema — debe coincidir con el fondo de la banda vecina
      (ivory #F4EADA por defecto; canvas #E9D8C0 para el archivo). */
  cremaHex?: string;
};

/**
 * SectionBeat — a 44–56vh viewport block that dramatizes the transition
 * between Noir and Crema worlds. The whisper appears around scroll
 * progress 0.4–0.7.
 */
export function SectionBeat({ direction, whisperKey = "beat_whisper", cremaHex = "#F4EADA" }: Props) {
  const whisper = useCopy().ui[whisperKey];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Hex literales (no var()): useTransform interpola strings de color concretos.
  const fromColor = direction === "noir-to-crema" ? "#0A0A0B" : cremaHex;
  const toColor = direction === "noir-to-crema" ? cremaHex : "#0A0A0B";
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
