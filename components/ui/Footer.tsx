"use client";

import Image from "next/image";
import { useCopy } from "@/lib/i18n";

export function Footer() {
  const copy = useCopy();
  return (
    <footer
      data-mode="noir"
      className="section-frame border-t border-white/10 py-16 md:py-24"
      style={{ background: "var(--crema-fg)", color: "var(--crema-canvas)" }}
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/img/brand/evidence-wordmark-white.png"
            alt="evidence"
            width={118}
            height={40}
            className="h-[34px] w-auto md:h-[42px]"
          />
          <p className="mt-6 max-w-[28ch] text-[14px] leading-relaxed md:text-[17px]">
            {copy.footer_line}
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-9">
          <p className="font-mono-readout text-[11px] opacity-60 md:text-[13px]">{copy.ui.footer_sedes_label}</p>
          <ul className="mt-4 space-y-1.5 text-[14px] md:text-[17px]">
            {copy.ui.footer_cities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] md:flex-row md:items-center md:justify-between md:text-[12px]">
        <span className="font-mono-readout opacity-60">{copy.ui.footer_copyright}</span>
      </div>
    </footer>
  );
}
