"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";
import { FEATURES } from "@/lib/config";
import { copy } from "@/lib/copy";
import { EvidenceProArtifact } from "./EvidenceProArtifact";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EvidenceProModel = dynamic(() => import("./EvidenceProModel"), {
  ssr: false,
  loading: () => <EvidenceProArtifact />,
});

export function HeroNoir() {
  const reduce = useReducedMotion();

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
      <div className="section-frame mt-[88px] flex items-center justify-between text-white/55 md:mt-[104px]">
        <span className="font-mono-readout text-[11px] md:text-[12px]">
          ESTUDIO ESTÉTICO · BOGOTÁ
        </span>
        <span className="font-mono-readout text-[11px] md:text-[12px]">
          FILM 01 / 06
        </span>
      </div>

      {/* central composition */}
      <div className="section-frame relative grid flex-1 grid-cols-1 items-center gap-12 py-12 md:grid-cols-12 md:gap-6 md:py-16">
        {/* Headline — left */}
        <div className="md:col-span-5">
          <HeadlineWithBlur text={copy.hero_headline} />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: CINEMATIC_EASE, delay: 1.6 }}
            className="font-serif-italic mt-10 max-w-[26ch] text-[20px] leading-[1.25] text-white/85 md:text-[28px]"
          >
            {copy.hero_subheadline}
          </motion.p>
        </div>

        {/* Product anchor — center / right */}
        <div className="relative mx-auto flex h-[60vh] w-full max-w-[640px] items-center justify-center md:col-span-5 md:col-start-7 md:h-[72vh]">
          {FEATURES.hero_3d ? (
            <EvidenceProModel />
          ) : FEATURES.hero_video_fallback ? (
            reduce ? (
              <img
                src="/video/evidence-pro-poster.jpg"
                alt="Evidence Pro"
                className="h-full w-full object-contain"
              />
            ) : (
              <video
                className="h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
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

      {/* bottom row: display panel meta + CTA */}
      <div className="section-frame relative flex flex-col gap-8 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
        {/* mono display panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 1.8 }}
          className="font-mono-readout flex flex-col gap-1.5 text-[11px] text-white/60 md:text-[12px]"
        >
          <span>EV / PRO · S/N 0000-0001</span>
          <span>10 PROGRAMAS · 4 MODOS · 0.5–5 MHz</span>
          <span className="text-white/35">CALIBRADO EN PLANTA · BOGOTÁ</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 2.0 }}
        >
          <MagneticButton tone="noir" href="#contacto">
            {copy.cta_primary}
          </MagneticButton>
        </motion.div>
      </div>

      {/* scroll cue */}
      {!reduce ? (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="font-mono-readout text-[10px] text-white/55">
              ↓ desplazar
            </span>
            <span className="block h-7 w-px bg-white/30" />
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  );
}

function HeadlineWithBlur({ text }: { text: string }) {
  // Tokenize so "10" can get the dramatic blur-in.
  const tokens = text.split(/(\s+|\.|10)/).filter(Boolean);

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
              className="inline-block"
              style={{ color: "#FFFFFF" }}
            >
              {tok}
            </motion.span>
          );
        }
        if (/^\s+$/.test(tok)) {
          return <span key={i}>{" "}</span>;
        }
        const wordDelay = 0.2 + i * 0.06;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE, delay: wordDelay }}
            className="inline-block"
          >
            {tok}
          </motion.span>
        );
      })}
    </h1>
  );
}
