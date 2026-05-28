"use client";

/**
 * Crema-toned product placeholder for each línea — until /public/img/lineas
 * webp assets land. Renders a clinical instrument silhouette adapted to the
 * type of line (warm tones for corporal, cool for láser, etc).
 */

type Variant = "corporal" | "facial" | "laser" | "soporte";

const PALETTES: Record<Variant, { body: string; accent: string; bg: string }> = {
  corporal: { body: "#1B1B1F", accent: "#FFB68A", bg: "#EDE5DA" },
  facial: { body: "#1A1A1F", accent: "#E8D9C7", bg: "#F5EFE8" },
  laser: { body: "#0E0E12", accent: "#9CC4FF", bg: "#E8E5E0" },
  soporte: { body: "#1A1714", accent: "#5FB86A", bg: "#EDE9E2" },
};

export function LineaPlaceholder({ variant }: { variant: Variant }) {
  const p = PALETTES[variant];
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden"
      style={{ background: p.bg }}
    >
      {/* dramatic side light */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 28% 50%, rgba(255,255,255,0.55) 0%, rgba(0,0,0,0) 60%)`,
        }}
      />
      <svg viewBox="0 0 320 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`b-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.body} stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0A0A0B" />
          </linearGradient>
        </defs>
        {/* Body, slightly tilted */}
        <g transform="translate(60 40) rotate(-2 100 160)">
          <rect width="200" height="320" rx="6" fill={`url(#b-${variant})`} />
          {/* screen */}
          <rect x="18" y="24" width="164" height="86" rx="2" fill="#070708" />
          <text
            x="28"
            y="58"
            fontFamily="var(--font-jetbrains, monospace)"
            fontSize="8"
            fill="#C8C8C8"
            letterSpacing="1.2"
          >
            EVIDENCE / {variant.toUpperCase()}
          </text>
          <text
            x="28"
            y="92"
            fontFamily="var(--font-inter-tight, sans-serif)"
            fontSize="34"
            fontWeight="500"
            fill="#FFFFFF"
          >
            {variant === "corporal" ? "04" : variant === "facial" ? "03" : variant === "laser" ? "03" : "03"}
          </text>
          {/* circular control */}
          <circle cx="100" cy="190" r="32" fill="#1A1714" />
          <circle cx="100" cy="190" r="28" stroke="#3C3833" fill="none" />
          <circle cx="100" cy="190" r="2" fill={p.accent} />
          {/* buttons */}
          {Array.from({ length: 4 }).map((_, i) => (
            <rect key={i} x={18 + i * 42} y={260} width="28" height="14" rx="1" fill="#1A1714" stroke="#2A2622" strokeWidth="0.5" />
          ))}
          {/* brand */}
          <text
            x="100"
            y="304"
            textAnchor="middle"
            fontFamily="var(--font-inter-tight, sans-serif)"
            fontSize="7"
            fill="#5A4A3A"
            letterSpacing="2.4"
          >
            evidence
          </text>
        </g>
        {/* ground shadow */}
        <ellipse cx="160" cy="386" rx="100" ry="4" fill="#000" opacity="0.18" />
      </svg>
    </div>
  );
}
