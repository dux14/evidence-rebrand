"use client";

import { motion, useMotionValue, useSpring, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

type Props = Omit<HTMLMotionProps<"button">, "ref" | "children"> & {
  tone?: "noir" | "crema";
  asChild?: boolean;
  href?: string;
  children?: React.ReactNode;
};

/**
 * Magnetic CTA — within 40px of cursor on hover the button drifts toward it
 * with a soft spring. Respects prefers-reduced-motion.
 */
export function MagneticButton({ tone = "noir", children, href, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduce = useReducedMotion();

  const sx = useSpring(x, { stiffness: 200, damping: 25, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 25, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.18);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    tone === "noir"
      ? "bg-white text-[color:var(--noir-bg)] hover:bg-white/90"
      : "bg-[color:var(--crema-fg)] text-[color:var(--crema-canvas)] hover:bg-[color:var(--crema-fg)]/90";

  const Inner = (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`group inline-flex h-[52px] items-center gap-3 px-7 text-[14px] font-medium tracking-tight transition-colors ${styles}`}
      {...rest}
    >
      <span>{children}</span>
      <motion.span
        aria-hidden
        className="inline-block"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        →
      </motion.span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {Inner}
      </a>
    );
  }
  return Inner;
}
