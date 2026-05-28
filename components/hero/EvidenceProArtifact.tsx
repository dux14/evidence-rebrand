"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CINEMATIC_EASE } from "@/lib/motion";

/**
 * EvidenceProArtifact — CSS/SVG-rendered placeholder for the hero product
 * until /public/models/evidence-pro.glb lands. Treats the device like a
 * clinical instrument silhouette: tower body, tilted 4° on Y, warm rim light,
 * a single living LED that breathes.
 *
 * Designed to render identically server-side and client-side (no CLS).
 */
export function EvidenceProArtifact() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: CINEMATIC_EASE, delay: 0.2 }}
      className="relative isolate"
      style={{
        transform: "perspective(1800px) rotateY(-4deg)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Warm rim light behind product */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-20 -inset-y-12 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(255, 182, 138, 0.18) 0%, rgba(0,0,0,0) 60%)",
          filter: "blur(20px)",
        }}
      />

      <svg
        viewBox="0 0 360 540"
        className="relative h-[58vh] max-h-[640px] w-auto drop-shadow-[0_80px_120px_rgba(0,0,0,0.65)]"
        role="img"
        aria-label="Evidence Pro — clinical aesthetic device"
      >
        <defs>
          {/* Body gradient — cool graphite with warm bottom kiss */}
          <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B1B1F" />
            <stop offset="55%" stopColor="#0E0E11" />
            <stop offset="100%" stopColor="#1A1410" />
          </linearGradient>
          <linearGradient id="bodyRim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,182,138,0)" />
            <stop offset="50%" stopColor="rgba(255,182,138,0.35)" />
            <stop offset="100%" stopColor="rgba(255,182,138,0)" />
          </linearGradient>
          <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070708" />
            <stop offset="100%" stopColor="#0E0E12" />
          </linearGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3C3833" />
            <stop offset="100%" stopColor="#1A1714" />
          </linearGradient>
        </defs>

        {/* Body */}
        <rect x="60" y="40" width="240" height="460" rx="10" fill="url(#body)" />
        {/* Vertical seam */}
        <line x1="180" y1="48" x2="180" y2="492" stroke="#000" strokeWidth="0.5" opacity="0.6" />
        {/* Top warm rim */}
        <rect x="60" y="40" width="240" height="2" fill="url(#bodyRim)" />
        {/* Screen */}
        <rect x="84" y="84" width="192" height="118" rx="3" fill="url(#screen)" stroke="#262626" />
        {/* Screen content */}
        <text
          x="100"
          y="108"
          fontFamily="var(--font-jetbrains, monospace)"
          fontSize="9"
          fill="#C8C8C8"
          letterSpacing="1.2"
        >
          EVIDENCE PRO
        </text>
        <text
          x="100"
          y="160"
          fontFamily="var(--font-inter-tight, sans-serif)"
          fontSize="44"
          fontWeight="500"
          fill="#FFFFFF"
        >
          10
        </text>
        <text
          x="148"
          y="160"
          fontFamily="var(--font-jetbrains, monospace)"
          fontSize="10"
          fill="#8A7A6A"
          letterSpacing="1.2"
        >
          PROGRAMAS
        </text>
        {/* Progress bar */}
        <rect x="100" y="178" width="160" height="2" fill="#262626" />
        <rect x="100" y="178" width="120" height="2" fill="#FFB68A" />

        {/* Display LED — breathing */}
        <motion.circle
          cx="270"
          cy="216"
          r="3"
          fill="#FFB68A"
          animate={
            reduce
              ? { opacity: 1 }
              : { opacity: [0.85, 1, 0.85], scale: [1, 1.15, 1] }
          }
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x="92"
          y="218"
          fontFamily="var(--font-jetbrains, monospace)"
          fontSize="8"
          fill="#8A7A6A"
          letterSpacing="1"
        >
          STAND·BY
        </text>

        {/* Knob */}
        <circle cx="180" cy="270" r="40" fill="url(#metal)" stroke="#000" strokeWidth="0.5" />
        <circle cx="180" cy="270" r="36" fill="none" stroke="#3C3833" strokeWidth="0.5" />
        <circle cx="180" cy="270" r="2" fill="#FFB68A" />
        {/* Knob ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r1 = 32;
          const r2 = 35;
          return (
            <line
              key={i}
              x1={180 + Math.cos(a) * r1}
              y1={270 + Math.sin(a) * r1}
              x2={180 + Math.cos(a) * r2}
              y2={270 + Math.sin(a) * r2}
              stroke="#6E6760"
              strokeWidth="0.6"
            />
          );
        })}

        {/* Side buttons */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="84" y={350 + i * 28} width="34" height="20" rx="2" fill="#1A1714" />
            <rect
              x="84"
              y={350 + i * 28}
              width="34"
              height="20"
              rx="2"
              fill="none"
              stroke="#2A2622"
              strokeWidth="0.5"
            />
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <g key={`r${i}`}>
            <rect x="242" y={350 + i * 28} width="34" height="20" rx="2" fill="#1A1714" />
            <rect
              x="242"
              y={350 + i * 28}
              width="34"
              height="20"
              rx="2"
              fill="none"
              stroke="#2A2622"
              strokeWidth="0.5"
            />
          </g>
        ))}

        {/* Center status row */}
        <rect x="140" y="354" width="80" height="14" rx="1" fill="#070708" stroke="#262626" strokeWidth="0.4" />
        <circle cx="148" cy="361" r="1.5" fill="#5FB86A" />
        <text
          x="156"
          y="364"
          fontFamily="var(--font-jetbrains, monospace)"
          fontSize="6"
          fill="#C8C8C8"
          letterSpacing="0.8"
        >
          READY · 0.5–5 MHz
        </text>

        {/* Brand */}
        <text
          x="180"
          y="468"
          textAnchor="middle"
          fontFamily="var(--font-inter-tight, sans-serif)"
          fontSize="9"
          fill="#5A4A3A"
          letterSpacing="3.2"
        >
          evidence
        </text>

        {/* Base shadow */}
        <ellipse cx="180" cy="510" rx="120" ry="6" fill="#000" opacity="0.6" />
      </svg>
    </motion.div>
  );
}
