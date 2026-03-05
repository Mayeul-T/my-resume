import type { Variants, Transition } from "framer-motion";

// Shared spring configs
export const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 15,
};

// Basic variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: spring },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: spring },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

export const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: springBouncy },
};

// Dramatic variants — blur + scale for real wow factor
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 30 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const blurScale: Variants = {
  hidden: { opacity: 0, filter: "blur(16px)", scale: 0.92 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const slideReveal: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Stagger container factory
export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

// Default viewport trigger config
export const viewportOnce = { once: true, margin: "-80px" } as const;
