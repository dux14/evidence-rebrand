"use client";

/**
 * Sepia-tinted editorial-photo placeholder for each milestone.
 * Variant determines what silhouette is drawn (cavitation, line, certification, etc.)
 */

type Variant = "1998" | "2005" | "2012" | "2018" | "2024";

export function MilestoneVisual({ variant }: { variant: Variant }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE5DA]">
      {/* sepia warm wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 30% 30%, rgba(255,212,170,0.45) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #F0E4D2 0%, #D8C5AC 100%)",
        }}
      />
      <svg
        viewBox="0 0 320 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {variant === "1998" ? (
          <>
            {/* Original cavitation device */}
            <rect x="80" y="120" width="160" height="200" rx="3" fill="#3B2C20" />
            <rect x="96" y="138" width="128" height="60" fill="#0A0606" />
            <circle cx="160" cy="240" r="28" fill="#1A1410" />
            <circle cx="160" cy="240" r="22" fill="none" stroke="#5A4A3A" strokeWidth="0.6" />
            {Array.from({ length: 4 }).map((_, i) => (
              <rect key={i} x={92 + i * 36} y="290" width="22" height="10" fill="#1A1410" />
            ))}
            {/* analog gauge */}
            <circle cx="120" cy="166" r="14" fill="#FBF9F7" stroke="#1A1410" />
            <line x1="120" y1="166" x2="128" y2="158" stroke="#1A1410" strokeWidth="1" />
            <circle cx="200" cy="166" r="14" fill="#FBF9F7" stroke="#1A1410" />
            <line x1="200" y1="166" x2="194" y2="158" stroke="#1A1410" strokeWidth="1" />
          </>
        ) : variant === "2005" ? (
          <>
            {/* Three devices lined up */}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={40 + i * 96} y={100} width="64" height="220" rx="3" fill="#2B1F15" />
                <rect x={48 + i * 96} y={114} width="48" height="40" fill="#0A0606" />
                <circle cx={72 + i * 96} cy={210} r="14" fill="#1A1410" />
              </g>
            ))}
          </>
        ) : variant === "2012" ? (
          <>
            {/* Document / certificate */}
            <rect x="80" y="80" width="180" height="240" fill="#FBF9F7" stroke="#5A4A3A" strokeWidth="0.6" />
            <rect x="80" y="80" width="180" height="6" fill="#1B3A7A" />
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={i}
                x1="98"
                y1={120 + i * 14}
                x2={98 + (i % 3 === 0 ? 140 : i % 2 === 0 ? 110 : 90)}
                y2={120 + i * 14}
                stroke="#1A1410"
                strokeWidth="0.4"
              />
            ))}
            {/* INVIMA seal */}
            <circle cx="220" cy="290" r="22" fill="none" stroke="#1A1410" strokeWidth="0.6" />
            <circle cx="220" cy="290" r="14" fill="none" stroke="#1A1410" strokeWidth="0.4" />
            <text
              x="220"
              y="294"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains, monospace)"
              fontSize="7"
              fill="#1A1410"
              letterSpacing="0.8"
            >
              INVIMA
            </text>
          </>
        ) : variant === "2018" ? (
          <>
            {/* Map of Colombia stylized */}
            <path
              d="M 130 80 Q 110 120 105 160 Q 100 200 130 240 Q 160 300 180 320 Q 200 300 210 270 Q 220 230 215 190 Q 210 150 185 110 Q 160 80 130 80 Z"
              fill="#5A4A3A"
              stroke="#1A1410"
              strokeWidth="0.6"
            />
            {/* City dots */}
            <circle cx="150" cy="120" r="4" fill="#1B3A7A" />
            <circle cx="170" cy="170" r="4" fill="#1B3A7A" />
            <circle cx="140" cy="220" r="4" fill="#1B3A7A" />
            <circle cx="190" cy="270" r="4" fill="#1B3A7A" />
            {/* labels */}
            <text x="158" y="124" fontFamily="var(--font-jetbrains, monospace)" fontSize="6" fill="#1A1410" letterSpacing="0.6">BAQ</text>
            <text x="178" y="174" fontFamily="var(--font-jetbrains, monospace)" fontSize="6" fill="#1A1410" letterSpacing="0.6">MDE</text>
            <text x="148" y="224" fontFamily="var(--font-jetbrains, monospace)" fontSize="6" fill="#1A1410" letterSpacing="0.6">BOG</text>
            <text x="198" y="274" fontFamily="var(--font-jetbrains, monospace)" fontSize="6" fill="#1A1410" letterSpacing="0.6">CAL</text>
          </>
        ) : (
          <>
            {/* Evidence Pro launch — minimal modern silhouette */}
            <rect x="100" y="80" width="120" height="240" rx="6" fill="#0E0E11" />
            <rect x="116" y="100" width="88" height="56" rx="1" fill="#070708" />
            <text
              x="160"
              y="138"
              textAnchor="middle"
              fontFamily="var(--font-inter-tight, sans-serif)"
              fontSize="22"
              fontWeight="500"
              fill="#FFFFFF"
            >
              10
            </text>
            <circle cx="160" cy="220" r="28" fill="#1A1714" />
            <circle cx="160" cy="220" r="2" fill="#FFB68A" />
            <text
              x="160"
              y="298"
              textAnchor="middle"
              fontFamily="var(--font-inter-tight, sans-serif)"
              fontSize="6"
              fill="#5A4A3A"
              letterSpacing="2.4"
            >
              evidence
            </text>
          </>
        )}
        {/* sepia grain overlay */}
        <rect x="0" y="0" width="320" height="400" fill="#3B2C20" opacity="0.06" />
      </svg>
    </div>
  );
}
