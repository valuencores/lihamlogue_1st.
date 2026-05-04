'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { wordRevealContainer, wordReveal, easeOutCubic } from '@/lib/motion'
import Button from '@/components/ui/Button'
import GlowOrb from '@/components/ui/GlowOrb'
import { analytics } from '@/lib/analytics'

interface HeroProps {
  onWaitlistClick: () => void
}

function WordMask({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <motion.span
      className={`inline ${className ?? ''}`}
      variants={wordRevealContainer}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="word-mask mr-[0.28em] last:mr-0">
          <motion.span className="inline-block" variants={wordReveal}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default function Hero({ onWaitlistClick }: HeroProps) {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg"
      style={{ paddingTop: '80px' }}
    >
      <div className="noise-overlay" aria-hidden="true" />

      {/* Single hero glow orb — centered, drifting */}
      <GlowOrb
        size="lg"
        blue
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%]"
      />

      <div className="container-grid relative z-10 py-28 sm:py-36">
        <div className="max-w-5xl">

          {/* Eyebrow */}
          <motion.p
            className="font-mono-label mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: easeOutCubic }}
          >
            AN OPERATING SYSTEM FOR TEXT IP
          </motion.p>

          {/* H1 — Korean headline, word-mask reveal */}
          <h1
            className="relative text-h1 font-black text-[var(--text-primary)] mb-8 sm:mb-10"
            lang="ko"
          >
            <span className="block">
              <WordMask text="한 편의 원고를," />
            </span>
            <span className="block">
              <WordMask text="하나의 산업형 IP로." />
            </span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            className="text-body-l text-[var(--text-secondary)] mb-12 sm:mb-16 max-w-xl leading-[1.65]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: easeOutCubic }}
            lang="ko"
          >
            AI와 인간이 함께 텍스트를 신뢰 가능한 IP로 전환하는 운영체제.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: easeOutCubic }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                analytics('cta_waitlist_clicked', { location: 'hero' })
                onWaitlistClick()
              }}
              arrow
              aria-label="Join the SMART P&B waitlist"
            >
              Join the Waitlist
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="#manifesto"
              onClick={() => analytics('manifesto_read', { location: 'hero' })}
            >
              Read the Manifesto
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-mono-label" style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
          SCROLL
        </span>
        <motion.div
          className="w-px h-9"
          style={{ background: 'linear-gradient(to bottom, var(--accent-blue), transparent)' }}
          animate={{ scaleY: [0, 1, 0], originY: '0%' }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" aria-hidden="true" />
    </section>
  )
}
