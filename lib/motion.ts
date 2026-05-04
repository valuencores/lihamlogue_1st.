// ─────────────────────────────────────────────
// SMART P&B — Shared Motion Variants
// Framer Motion variant library
// ─────────────────────────────────────────────

import { Variants } from 'framer-motion'

// ── Ease ──────────────────────────────────────
export const easeOutCubic = [0.22, 1, 0.36, 1] as const

// ── Section enter (24px up + fade) ───────────
export const sectionEnter: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
    },
  },
}

// ── Staggered container ───────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0,
    },
  },
}

// ── Individual item in stagger list ──────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOutCubic,
    },
  },
}

// ── Word mask reveal ──────────────────────────
export const wordRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

export const wordReveal: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: easeOutCubic,
    },
  },
}

// ── Fade only (reduced-motion fallback) ───────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// ── Scale up ──────────────────────────────────
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutCubic },
  },
}

// ── Card hover ────────────────────────────────
export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -1,
    transition: { duration: 0.2, ease: easeOutCubic },
  },
}

// ── Modal ─────────────────────────────────────
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
}

export const modalPanel: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: easeOutCubic },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: { duration: 0.2 },
  },
}

// ── Viewport trigger defaults ─────────────────
export const viewportOnce = { once: true, amount: 0.2 } as const
export const viewportRepeat = { once: false, amount: 0.2 } as const

// ── Glowing pulse ─────────────────────────────
export const glowPulse: Variants = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}
