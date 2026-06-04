"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCopy, useLocale, type Locale } from "@/lib/i18n";

type Mode = "noir" | "crema";

export function Nav() {
  const [mode, setMode] = useState<Mode>("noir");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const copy = useCopy();
  const { locale, setLocale } = useLocale();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const m = entry.target.getAttribute("data-mode") as Mode | null;
            if (m) setMode(m);
            if (entry.target.id) setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    document.querySelectorAll<HTMLElement>("[data-mode]").forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Menú abierto = diálogo modal: Escape cierra (devolviendo el foco al
  // botón) y Tab cicla dentro del header/overlay sin escapar al contenido
  // de atrás (P1-2, WCAG 2.1.2).
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        ) ?? []
      ).filter((el) => el.getClientRects().length > 0);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      // Si el foco quedó fuera del header (p. ej. recién abierto), entrar al trap.
      if (!active || !headerRef.current?.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isNoir = mode === "noir";
  // Con el menú abierto el header se funde al noir del overlay — una sola
  // superficie continua (sin clash crema/negro).
  const showNoir = isNoir || menuOpen;
  const links = copy.ui.nav_links;

  return (
    <motion.header
      ref={headerRef}
      initial={false}
      animate={{
        backgroundColor: menuOpen
          ? "rgba(0,0,0,1)"
          : isNoir
            ? scrolled
              ? "rgba(0,0,0,0.72)"
              : "rgba(0,0,0,0)"
            : scrolled
              ? "rgba(244,234,218,0.85)" // tinte crema-ivory: se funde con las bandas claras
              : "rgba(244,234,218,0)",
        color: showNoir ? "#FFFFFF" : "#1A1410",
        borderBottomColor: showNoir
          ? scrolled || menuOpen
            ? "rgba(38,38,38,1)"
            : "rgba(38,38,38,0)"
          : scrolled
            ? "rgba(26,20,16,0.08)"
            : "rgba(26,20,16,0)",
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      // transition CSS: framer anima el resto de props pero backdropFilter
      // vive en style y saltaba de golpe al cruzar scroll>24 (N6).
      style={{
        backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
        transition: "backdrop-filter 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <nav className="section-frame flex h-[72px] items-center justify-between">
        <a href="#top" aria-label="evidence — inicio" className="flex items-center">
          <Image
            src={showNoir ? "/img/brand/evidence-wordmark-white.png" : "/img/brand/evidence-wordmark.png"}
            alt="evidence"
            width={107}
            height={36}
            priority
            className="h-[34px] w-auto md:h-[44px]"
          />
        </a>

        {/* Desktop — microcaps editoriales */}
        <ul className="hidden items-center md:flex">
          {links.map((l, i) => (
            <li key={l.href} className="flex items-center">
              {i > 0 ? (
                <span aria-hidden className="mx-4 opacity-40">
                  ·
                </span>
              ) : null}
              <a
                href={l.href}
                aria-current={l.href === `#${activeSection}` ? "true" : undefined}
                className={`text-[10px] font-medium uppercase tracking-[0.22em] transition-opacity ${
                  l.href === `#${activeSection}` ? "opacity-100" : "opacity-55 hover:opacity-100"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <LocaleToggle locale={locale} setLocale={setLocale} />

          {/* Mobile hamburger */}
          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? copy.ui.nav_menu_close : copy.ui.nav_menu_open}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-[10px] w-[22px]">
              <span
                className="absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300"
                style={{ transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }}
              />
              <span
                className="absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-300"
                style={{ transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu — noir editorial */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            // h-[calc] en vez de inset-0: el backdrop-filter del header lo vuelve
            // containing block de este fixed, y bottom:0 colapsaba el overlay.
            className="fixed inset-x-0 top-[72px] z-40 flex h-[calc(100dvh-72px)] flex-col justify-between overflow-y-auto bg-black px-6 pb-8 pt-10 text-white md:hidden"
          >
            <ul className="flex flex-col gap-7">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-3 font-display text-[34px] font-light leading-none"
                  >
                    <sup className="font-mono-readout text-[10px] text-[color:var(--ev-blue-ice)]">
                      {String(i + 1).padStart(2, "0")}
                    </sup>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="font-mono-readout flex items-center justify-between border-t border-white/15 pt-5 text-[10px] text-white/65">
              <LocaleToggle locale={locale} setLocale={setLocale} />
              <a href={`tel:${copy.ui.contact_phone.replace(/\s/g, "")}`}>
                {copy.ui.contact_phone} · BOGOTÁ
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function LocaleToggle({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  return (
    <div className="font-mono-readout flex items-center gap-1 text-[11px]">
      {(["es", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 ? <span className="opacity-40">/</span> : null}
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={`flex min-h-11 min-w-11 items-center justify-center uppercase transition-opacity ${
              locale === l ? "font-bold opacity-100" : "opacity-50 hover:opacity-80"
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
