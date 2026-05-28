/** Shared Framer Motion variants — cinematic ease, slow-subtle pacing. */

export const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;
export const SOFT_EASE = [0.32, 0.72, 0, 1] as const;

export const staggerReveal = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: CINEMATIC_EASE },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: CINEMATIC_EASE } },
};

export const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.1, ease: CINEMATIC_EASE } },
};

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 1.04 },
  show: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.9, ease: CINEMATIC_EASE } },
};
