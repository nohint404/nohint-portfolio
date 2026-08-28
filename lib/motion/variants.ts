"use client";

export const easePremium = [0.16, 1, 0.3, 1] as const;

export const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const item = {
  hidden: { y: 16 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
};

export const fadeUp = {
  hidden: { y: 20 },
  visible: { y: 0, transition: { duration: 0.6, ease: easePremium } },
};
