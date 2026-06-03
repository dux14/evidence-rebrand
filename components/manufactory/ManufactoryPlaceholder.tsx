"use client";

/**
 * Editorial workshop visual. When FEATURES.manufactory_images is on, renders the
 * real film-still photo from /public/img/manufactory; otherwise a code-drawn,
 * side-lit workbench placeholder.
 */

import Image from "next/image";
import { FEATURES } from "@/lib/config";

type Variant = "wide" | "macro-solder" | "macro-calibration" | "macro-pack";

const IMAGES: Record<Variant, { src: string; alt: string }> = {
  wide: { src: "/img/manufactory/wide.webp", alt: "Taller Evidence en Bogotá" },
  "macro-solder": { src: "/img/manufactory/solder.webp", alt: "Soldadura SMD" },
  "macro-calibration": { src: "/img/manufactory/calibration.webp", alt: "Banco de calibración" },
  "macro-pack": { src: "/img/manufactory/pack.webp", alt: "Embalaje y despacho" },
};

export function ManufactoryPlaceholder({
  variant,
  caption,
}: {
  variant: Variant;
  caption?: string;
}) {
  const aspect = variant === "wide" ? "aspect-[16/9]" : "aspect-[4/5]";

  if (FEATURES.manufactory_images) {
    const img = IMAGES[variant];
    return (
      <figure className="relative w-full">
        <div className={`relative w-full overflow-hidden bg-[#1A1714] ${aspect}`}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={variant === "wide" ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover"
          />
        </div>
        {caption ? (
          <figcaption className="font-mono-readout mt-3 text-[10px] text-[color:var(--crema-fg)]/55 md:text-[11px]">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="relative w-full">
      <div className={`relative w-full overflow-hidden bg-[#1A1714] ${aspect}`}>
        {/* base warm gradient */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 60% at 20% 35%, rgba(255,182,138,0.28) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #2A1F18 0%, #0E0A07 100%)",
          }}
        />

        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id={`bench-${variant}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B2C20" />
              <stop offset="100%" stopColor="#150E08" />
            </linearGradient>
          </defs>

          {variant === "wide" ? (
            <>
              {/* Bench */}
              <rect x="0" y="280" width="800" height="170" fill={`url(#bench-${variant})`} />
              {/* Tool silhouettes */}
              <rect x="60" y="240" width="80" height="40" fill="#0A0606" />
              <rect x="160" y="220" width="40" height="60" fill="#0A0606" />
              <rect x="220" y="200" width="120" height="80" fill="#0A0606" />
              {/* Worker silhouette (back-turned) */}
              <ellipse cx="400" cy="180" rx="48" ry="56" fill="#0F0A06" />
              <rect x="350" y="220" width="100" height="120" fill="#0F0A06" />
              {/* Hands shape over bench */}
              <rect x="340" y="260" width="120" height="24" fill="#1A1410" />
              {/* Equipment under test */}
              <rect x="500" y="180" width="160" height="120" fill="#1B1B1F" />
              <rect x="516" y="196" width="128" height="44" fill="#070708" />
              <circle cx="540" cy="270" r="12" fill="#3C3833" />
              <circle cx="580" cy="270" r="12" fill="#3C3833" />
              <circle cx="620" cy="270" r="12" fill="#3C3833" />
              {/* Pendant light */}
              <line x1="120" y1="0" x2="120" y2="40" stroke="#5A4A3A" strokeWidth="2" />
              <ellipse cx="120" cy="48" rx="22" ry="10" fill="#5A4A3A" />
              <ellipse cx="120" cy="58" rx="40" ry="16" fill="#FFB68A" opacity="0.18" />
              {/* Background grid lines */}
              <line x1="0" y1="120" x2="800" y2="120" stroke="#3B2C20" strokeWidth="0.5" opacity="0.4" />
              <line x1="0" y1="160" x2="800" y2="160" stroke="#3B2C20" strokeWidth="0.5" opacity="0.4" />
            </>
          ) : variant === "macro-solder" ? (
            <>
              <rect x="0" y="0" width="800" height="450" fill="#0E0A07" />
              <rect x="0" y="280" width="800" height="170" fill="#1A1410" />
              {/* PCB */}
              <rect x="120" y="160" width="560" height="200" fill="#1B3A2C" />
              <rect x="150" y="180" width="500" height="160" fill="#0F2418" />
              {/* Components */}
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x={170 + i * 38}
                  y={210}
                  width="22"
                  height="14"
                  fill={i % 3 === 0 ? "#1A1714" : "#3C3833"}
                />
              ))}
              {/* Solder iron */}
              <rect x="260" y="80" width="200" height="14" fill="#5A4A3A" transform="rotate(-30 260 94)" />
              <rect x="220" y="160" width="40" height="12" fill="#8B7355" />
              {/* Solder glow */}
              <circle cx="260" cy="180" r="14" fill="#FFB68A" opacity="0.6" />
              <circle cx="260" cy="180" r="3" fill="#FFE0CC" />
            </>
          ) : variant === "macro-calibration" ? (
            <>
              <rect x="0" y="0" width="800" height="450" fill="#0E0A07" />
              {/* Calibration rig */}
              <rect x="100" y="120" width="600" height="240" fill="#1B1B1F" />
              <rect x="140" y="160" width="520" height="160" fill="#070708" />
              {/* Oscilloscope wave */}
              <polyline
                points="160,260 200,200 240,300 280,180 320,300 360,200 400,260 440,220 480,300 520,200 560,260 600,180 640,300"
                fill="none"
                stroke="#FFB68A"
                strokeWidth="1.5"
              />
              <line x1="140" y1="260" x2="660" y2="260" stroke="#3C3833" strokeWidth="0.5" />
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={i}
                  x1={140 + i * 52}
                  y1="160"
                  x2={140 + i * 52}
                  y2="320"
                  stroke="#3C3833"
                  strokeWidth="0.4"
                  opacity="0.6"
                />
              ))}
            </>
          ) : (
            <>
              <rect x="0" y="0" width="800" height="450" fill="#0E0A07" />
              {/* Cardboard box */}
              <rect x="180" y="160" width="440" height="220" fill="#5A4A3A" />
              <line x1="180" y1="200" x2="620" y2="200" stroke="#3B2C20" strokeWidth="0.5" />
              {/* Tape */}
              <rect x="380" y="160" width="40" height="220" fill="#3B2C20" opacity="0.7" />
              {/* Label */}
              <rect x="220" y="220" width="160" height="60" fill="#FBF9F7" />
              <line x1="230" y1="234" x2="370" y2="234" stroke="#1A1410" strokeWidth="0.6" />
              <line x1="230" y1="246" x2="350" y2="246" stroke="#1A1410" strokeWidth="0.4" />
              <line x1="230" y1="258" x2="330" y2="258" stroke="#1A1410" strokeWidth="0.4" />
              <line x1="230" y1="270" x2="370" y2="270" stroke="#1A1410" strokeWidth="0.4" />
            </>
          )}

          {/* Grain overlay */}
          <rect x="0" y="0" width="800" height="450" fill="#000" opacity="0.18" />
        </svg>
      </div>
      {caption ? (
        <figcaption className="font-mono-readout mt-3 text-[10px] text-[color:var(--crema-fg)]/55 md:text-[11px]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
