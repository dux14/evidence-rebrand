"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Mode = "noir" | "crema";

export function Nav() {
  const [mode, setMode] = useState<Mode>("noir");
  const [scrolled, setScrolled] = useState(false);

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

  const isNoir = mode === "noir";
  const links = [
    { href: "#lineas", label: "líneas" },
    { href: "#pro", label: "pro" },
    { href: "#taller", label: "taller" },
    { href: "#archivo", label: "archivo" },
    { href: "#respaldo", label: "respaldo" },
  ];

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
      <nav className="section-frame flex h-[72px] items-center justify-between md:h-[72px]">
        <a href="#top" aria-label="evidence — inicio" className="flex items-center">
          <Image
            src={isNoir ? "/img/brand/evidence-wordmark-white.png" : "/img/brand/evidence-wordmark.png"}
            alt="evidence"
            width={74}
            height={25}
            priority
            className="h-[22px] w-auto md:h-[24px]"
          />
        </a>

        <ul className="hidden items-center gap-9 text-[13px] md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative font-medium tracking-wide transition-opacity hover:opacity-60"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-[11px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={mode}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3 }}
              className="font-mono-readout hidden sm:inline-block"
            >
              ES / EN
            </motion.span>
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
}
