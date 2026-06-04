import Image from "next/image";
import Link from "next/link";

/**
 * 404 de marca (N4, auditoría 2026-06-04). Server component estático en ES
 * (el locale toggle es client y vive en la landing); replica el lenguaje
 * noir del hero: vignette, mono readout, display grande y CTA de regreso.
 */
export default function NotFound() {
  return (
    <main className="noir-vignette relative flex min-h-dvh flex-col text-white">
      <div className="section-frame mt-10 flex items-center justify-between">
        <Link href="/" aria-label="evidence — inicio" className="inline-block">
          <Image
            src="/img/brand/evidence-wordmark-white.png"
            alt="evidence"
            width={107}
            height={36}
            priority
            className="h-[34px] w-auto"
          />
        </Link>
        <span className="font-mono-readout text-[11px] text-white/55">
          ERROR · 404
        </span>
      </div>

      <div className="section-frame flex flex-1 flex-col justify-center pb-24">
        <h1 className="hero-number">404</h1>
        <p className="font-serif-italic mt-6 max-w-[30ch] text-[20px] leading-[1.25] text-white/85 md:text-[28px]">
          Esta página no existe — pero el taller sí, desde 1995.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex h-[52px] w-fit items-center gap-3 bg-white px-7 text-[14px] font-medium tracking-tight text-[color:var(--noir-bg)] transition-[background-color,transform] duration-200 hover:bg-white/90 active:scale-[0.98]"
        >
          Volver al inicio
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
