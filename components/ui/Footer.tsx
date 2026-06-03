import Image from "next/image";
import { copy } from "@/lib/copy";

export function Footer() {
  return (
    <footer
      data-mode="crema"
      className="section-frame border-t border-[rgba(26,20,16,0.08)] py-16 md:py-24"
      style={{ background: "var(--crema-canvas)", color: "var(--crema-fg)" }}
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/img/brand/evidence-wordmark.png"
            alt="evidence"
            width={118}
            height={40}
            className="h-[34px] w-auto md:h-[42px]"
          />
          <p className="mt-6 max-w-[28ch] text-[14px] leading-relaxed">
            {copy.footer_line}
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-9">
          <p className="font-mono-readout text-[11px] opacity-60">Sedes</p>
          <ul className="mt-4 space-y-1.5 text-[14px]">
            <li>Bogotá</li>
            <li>Medellín</li>
            <li>Cali</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-[rgba(26,20,16,0.08)] pt-6 text-[11px] md:flex-row md:items-center md:justify-between">
        <span className="font-mono-readout opacity-60">
          © Evidence S.A.S · NIT 800.XXX.XXX-X
        </span>
        <div className="flex gap-6 font-mono-readout opacity-60">
          <a href="#legal" className="hover:opacity-100">
            Aviso legal
          </a>
          <a href="#privacidad" className="hover:opacity-100">
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
