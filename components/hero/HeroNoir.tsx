"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";
import { FEATURES } from "@/lib/config";
import { useCopy } from "@/lib/i18n";
import { EvidenceProArtifact } from "./EvidenceProArtifact";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EvidenceProModel = dynamic(() => import("./EvidenceProModel"), {
  ssr: false,
  loading: () => <EvidenceProArtifact />,
});

export function HeroNoir() {
  const reduce = useReducedMotion();
  const copy = useCopy();

  return (
    <section
      id="top"
      data-mode="noir"
      className="relative isolate flex min-h-screen flex-col overflow-hidden"
    >
      {/* atmospheric ground */}
      <div aria-hidden className="noir-vignette absolute inset-0 -z-10" />

      {/* top hairline grid for atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 0%, transparent 80%)",
        }}
      />

      {/* meta row top — sits below nav */}
      <div className="section-frame mt-[88px] flex items-center justify-between text-white/55">
        <span className="font-mono-readout text-[11px] md:text-[12px]">
          {copy.ui.hero_meta_location}
        </span>
        <span className="font-mono-readout text-[11px] md:text-[12px]">
          {copy.ui.hero_meta_film}
        </span>
      </div>

      {/* central composition */}
      <div className="section-frame relative grid flex-1 grid-cols-1 items-center gap-12 py-12 md:grid-cols-12 md:gap-6 md:py-10">
        {/* Headline — left */}
        <div className="md:col-span-5">
          <HeadlineWithBlur text={copy.hero_headline} />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: CINEMATIC_EASE, delay: 1.0 }}
            className="font-serif-italic mt-6 max-w-[26ch] text-[20px] leading-[1.25] text-white/85 md:text-[28px]"
          >
            {copy.hero_subheadline}
          </motion.p>

          {/* CTA primario en la columna del titular: visible sin scroll en
              1440×900 y 375×812 (auditoría 2026-06-04 — antes vivía en la fila
              inferior, siempre bajo el fold). */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 1.2 }}
            className="mt-8"
          >
            <MagneticButton tone="noir" href="#contacto">
              {copy.cta_primary}
            </MagneticButton>
          </motion.div>
        </div>

        {/* Product anchor — center / right */}
        <div className="relative mx-auto flex h-[60vh] w-full max-w-[640px] items-center justify-center md:col-span-5 md:col-start-7 md:h-[72vh]">
          {FEATURES.hero_3d ? (
            <EvidenceProModel />
          ) : FEATURES.hero_video_fallback ? (
            reduce ? (
              <img
                src="/video/evidence-pro-poster.jpg"
                alt="Evidence Pro — electroestimulador multicanal"
                className="h-full w-full object-contain mix-blend-screen"
              />
            ) : (
              <video
                className="h-full w-full object-contain mix-blend-screen"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Evidence Pro girando"
                poster="/video/evidence-pro-poster.jpg"
              >
                <source src="/video/evidence-pro-turntable.mp4" type="video/mp4" />
              </video>
            )
          ) : (
            <EvidenceProArtifact />
          )}
        </div>
      </div>

      {/* bottom row: display panel meta */}
      <div className="section-frame relative flex flex-col gap-8 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
        {/* mono display panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 1.4 }}
          className="font-mono-readout flex flex-col gap-1.5 text-[11px] text-white/60 md:text-[12px]"
        >
          {copy.ui.hero_readout_lines.map((line, i) => (
            <span key={i} className={i === 2 ? "text-white/35" : undefined}>
              {line}
            </span>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      {!reduce ? (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="font-mono-readout text-[10px] text-white/55">
              {copy.ui.hero_scroll_cue}
            </span>
            <span className="block h-7 w-px bg-white/30" />
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  );
}

function HeadlineWithBlur({ text }: { text: string }) {
  // Tokenize so "10" can get the dramatic blur-in. La puntuación queda pegada
  // a su palabra ("Pro.", "programas.") para que el punto no salte de línea solo.
  // Sin spans de espacio: un espacio entre inline-blocks no colapsa al inicio
  // de línea e indentaba la palabra tras el salto (auditoría 2026-06-04);
  // el margen derecho hace de espacio y desaparece en el quiebre de línea.
  const tokens = text.split(/(\s+|10)/).filter((t) => !/^\s+$/.test(t));

  return (
    <h1 className="hero-number text-white">
      {tokens.map((tok, i) => {
        if (tok === "10") {
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(8px)", scale: 1.06 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.9, ease: CINEMATIC_EASE, delay: 0.9 }}
              className="mr-[0.24em] inline-block"
              style={{ color: "#FFFFFF" }}
            >
              {tok}
            </motion.span>
          );
        }
        const wordDelay = 0.2 + i * 0.1;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE, delay: wordDelay }}
            className="mr-[0.24em] inline-block"
          >
            {tok}
          </motion.span>
        );
      })}
    </h1>
  );
}
