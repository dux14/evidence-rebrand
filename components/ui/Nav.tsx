"use client";

import { useEffect, useState } from "react";
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

  const isNoir = mode === "noir";
  const links = copy.ui.nav_links;

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isNoir
          ? scrolled
            ? "rgba(0,0,0,0.72)"
            : "rgba(0,0,0,0)"
          : scrolled
            ? "rgba(251,249,247,0.82)"
            : "rgba(251,249,247,0)",
        color: isNoir ? "#FFFFFF" : "#1A1410",
        borderBottomColor: isNoir
          ? scrolled
            ? "rgba(38,38,38,1)"
            : "rgba(38,38,38,0)"
          : scrolled
            ? "rgba(26,20,16,0.08)"
            : "rgba(26,20,16,0)",
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ backdropFilter: scrolled ? "blur(18px)" : "blur(0px)" }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <nav className="section-frame flex h-[72px] items-center justify-between">
        <a href="#top" aria-label="evidence — inicio" className="flex items-center">
          <Image
            src={isNoir ? "/img/brand/evidence-wordmark-white.png" : "/img/brand/evidence-wordmark.png"}
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
