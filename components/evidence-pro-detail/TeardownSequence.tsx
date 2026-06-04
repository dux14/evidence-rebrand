"use client";

import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import { CINEMATIC_EASE } from "@/lib/motion";
import { FEATURES } from "@/lib/config";
import { useCopy } from "@/lib/i18n";
import { SpecsMono } from "./SpecsMono";
import { EvidenceProArtifact } from "@/components/hero/EvidenceProArtifact";

/**
 * 4-state scroll-driven teardown over 400vh of scroll.
 * The product is sticky-pinned at the viewport center; copy and overlays
 * crossfade between four narrative beats.
 */
export function TeardownSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const reduce = useReducedMotion();
  const copy = useCopy();

  // Four crossfade copy beats — each window of 0.25
  const beats = copy.ui.teardown_beats;

  const beatRange = (i: number) => {
    const w = 1 / beats.length;
    const start = i * w;
    return [start, start + 0.08, start + w - 0.08, start + w] as const;
  };

  return (
    <section
      ref={ref}
      id="pro"
      data-mode="noir"
      className="relative bg-[color:var(--noir-bg)] text-white"
      style={{ height: reduce ? "auto" : "400vh" }}
    >
      <div
        className={`${reduce ? "" : "sticky top-0"} flex h-screen w-full items-center overflow-hidden`}
      >
        {/* dual ambient ground */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(139,115,85,0.10) 0%, rgba(0,0,0,0) 60%), radial-gradient(ellipse 100% 100% at 50% 50%, #1A1410 0%, #0A0A0B 50%, #000 100%)",
          }}
        />

        {/* meta-eyebrow row — anclada al viewport pineado, no al grid centrado,
            para que el indicador SCROLL no pise el titular del primer beat */}
        <div className="absolute inset-x-0 top-8">
          <div className="section-frame flex items-center justify-between">
            <span className="font-mono-readout text-[11px] text-white/55 md:text-[12px]">
              {copy.ui.teardown_eyebrow}
            </span>
            <ProgressIndicator
              progress={scrollYProgress}
              count={beats.length}
              label={copy.ui.teardown_scroll_label}
            />
          </div>
        </div>

        <div className="section-frame relative grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-6">
          {/* product anchor centered */}
          <div className="relative mx-auto h-[60vh] w-full max-w-[520px] md:col-span-6 md:col-start-2">
            {FEATURES.teardown_video ? (
              <TeardownScrubVideo progress={scrollYProgress} />
            ) : (
              <ProductWithFade progress={scrollYProgress} />
            )}
          </div>

          {/* crossfade copy */}
          <div className="md:col-span-5 md:col-start-8">
            {/* Los beats son absolute (crossfade); este wrapper reserva su altura
                en el flujo para que SpecsMono no se solape con el título. */}
            <div className="relative min-h-[280px] md:min-h-[400px]">
              {beats.map((b, i) => (
                <CrossfadeBeat key={i} beat={b} range={beatRange(i)} progress={scrollYProgress} />
              ))}
            </div>

            <div className="relative mt-12">
              <SpecsMono specs={copy.evidence_pro_specs} />
            </div>
          </div>
        </div>
      </div>

      {/* Static (reduced motion) — render intro paragraph instead */}
      {reduce ? (
        <div className="section-frame relative pb-24">
          <p className="mx-auto max-w-[60ch] text-[18px] leading-[1.5] text-white/85">
            {copy.evidence_pro_detail_intro}
          </p>
        </div>
      ) : null}
    </section>
  );
}

function TeardownScrubVideo({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const vref = useRef<HTMLVideoElement>(null);

  // Drive the video's playhead from scroll progress → scrubbable teardown.
  useMotionValueEvent(progress, "change", (v) => {
    const vid = vref.current;
    if (!vid) return;
    const dur = vid.duration;
    if (!dur || Number.isNaN(dur)) return;
    vid.currentTime = Math.min(dur - 0.05, Math.max(0, v) * dur);
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <video
        ref={vref}
        muted
        playsInline
        preload="metadata"
        aria-label="Despiece del Evidence Pro"
        poster="/video/evidence-pro-poster.jpg"
        className="h-full w-full object-contain mix-blend-screen"
      >
        <source src="/video/evidence-pro-teardown.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

function ProductWithFade({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  // Carcasa visible 0–0.25, fades on 0.25–0.5, ghost interior emerges 0.5+
  const carcasaOpacity = useTransform(progress, [0.2, 0.5, 0.85, 1], [1, 0.35, 0.35, 1]);
  const scale = useTransform(progress, [0, 0.5, 1], [1, 0.96, 1]);
  const interiorOpacity = useTransform(progress, [0.4, 0.6, 0.85], [0, 1, 0]);

  return (
    <>
      <motion.div style={{ opacity: carcasaOpacity, scale }} className="absolute inset-0 flex items-center justify-center">
        <EvidenceProArtifact />
      </motion.div>

      {/* Interior wireframe overlay — appears mid-teardown */}
      <motion.div
        style={{ opacity: interiorOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <InteriorWireframe />
      </motion.div>
    </>
  );
}

function InteriorWireframe() {
  return (
    <svg viewBox="0 0 360 540" className="h-[58vh] max-h-[640px] w-auto opacity-90">
      <g stroke="#FFB68A" strokeWidth="0.7" fill="none">
        <rect x="60" y="40" width="240" height="460" rx="10" />
        <rect x="78" y="78" width="204" height="220" rx="2" />
        <rect x="98" y="100" width="60" height="36" rx="1" />
        <rect x="170" y="100" width="92" height="36" rx="1" />
        <rect x="98" y="148" width="164" height="14" rx="1" />
        <rect x="98" y="170" width="100" height="14" rx="1" />
        <rect x="98" y="194" width="140" height="14" rx="1" />
        <rect x="98" y="218" width="80" height="14" rx="1" />
        <line x1="80" y1="312" x2="280" y2="312" />
        <circle cx="180" cy="370" r="42" />
        <circle cx="180" cy="370" r="30" />
        <circle cx="180" cy="370" r="18" />
        <line x1="80" y1="450" x2="280" y2="450" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={92 + i * 26} y1="460" x2={92 + i * 26} y2="478" />
        ))}
      </g>
      <g fontFamily="var(--font-jetbrains, monospace)" fontSize="6" fill="#FFB68A" letterSpacing="0.8">
        <text x="305" y="106">DISPLAY</text>
        <text x="305" y="170">PCB · A</text>
        <text x="305" y="226">PCB · B</text>
        <text x="240" y="370">XDCR</text>
        <text x="305" y="470">CTRL ROW</text>
      </g>
    </svg>
  );
}

function CrossfadeBeat({
  beat,
  range,
  progress,
}: {
  beat: { eyebrow: string; title: string; body: string };
  range: readonly [number, number, number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, [...range], [0, 1, 1, 0]);
  const y = useTransform(progress, [...range], [16, 0, 0, -12]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0">
      <div className="font-mono-readout text-[11px] text-white/55 md:text-[12px]">{beat.eyebrow}</div>
      <h3 className="mt-6 max-w-[14ch] font-display text-[32px] font-light leading-[1.05] md:text-[56px]">
        {beat.title}
      </h3>
      <p className="mt-5 max-w-[34ch] text-[16px] leading-[1.55] text-white/65 md:text-[18px]">
        {beat.body}
      </p>
    </motion.div>
  );
}

function ProgressIndicator({
  progress,
  count,
  label,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  count: number;
  label: string;
}) {
  // Hooks must run at the top level; we always create 4 segments and ignore extras.
  const seg1 = useTransform(progress, [0, 0.001, 0.25], [0.18, 1, 0.18]);
  const seg2 = useTransform(progress, [0.25, 0.251, 0.5], [0.18, 1, 0.18]);
  const seg3 = useTransform(progress, [0.5, 0.501, 0.75], [0.18, 1, 0.18]);
  const seg4 = useTransform(progress, [0.75, 0.751, 1], [0.18, 1, 0.18]);
  const segs = [seg1, seg2, seg3, seg4].slice(0, count);

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono-readout text-[11px] text-white/55 md:text-[12px]">
        {label}
      </span>
      <div className="flex gap-1.5">
        {segs.map((opacity, i) => (
          <motion.span key={i} style={{ opacity }} className="block h-px w-6 bg-white" />
        ))}
      </div>
    </div>
  );
}
