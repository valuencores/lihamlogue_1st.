'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { wordRevealContainer, wordReveal, easeOutCubic } from '@/lib/motion'
import Button from '@/components/ui/Button'
import GlowOrb from '@/components/ui/GlowOrb'
import { analytics } from '@/lib/analytics'

interface HeroProps {
  onWaitlistClick: () => void
}

// Split text into word spans with mask containers
function WordReveal({ text, className }: { text: string; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (prefersReducedMotion) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
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
        <span key={i} className="word-mask">
          <motion.span
            className="inline-block"
            variants={wordReveal}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  )
}

export default function Hero({ onWaitlistClick }: HeroProps) {
  const handleWaitlist = () => {
    analytics('cta_waitlist_clicked', { location: 'hero' })
    onWaitlistClick()
  }

  return (
    <section
      id="hero"
      aria-label="Hero – SMART P&B"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg"
      style={{ paddingTop: '80px' }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Glow orb (blue→violet, drifting) */}
      <GlowOrb
        size="lg"
        blue
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%]"
      />

      {/* Main content */}
      <div className="container-grid relative z-10 py-24 sm:py-32">
        <div className="max-w-5xl">

          {/* Eyebrow */}
          <motion.p
            className="font-mono-label mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOutCubic }}
            aria-label="An operating system for text IP"
          >
            AN OPERATING SYSTEM FOR TEXT IP
          </motion.p>

          {/* H1 — Korean, 2 lines, word-mask reveal */}
          <h1
            className="text-h1 font-black text-[var(--text-primary)] mb-6 sm:mb-8 glow-headline"
            style={{ letterSpacing: '-0.02em' }}
            lang="ko"
          >
            <span className="block">
              <WordReveal text="한 편의 원고를," />
            </span>
            <span className="block">
              <WordReveal text="하나의 산업형 IP로." />
            </span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            className="text-body-l text-[var(--text-secondary)] mb-10 sm:mb-14 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: easeOutCubic }}
            lang="ko"
          >
            AI와 인간이 함께 텍스트를 신뢰 가능한 IP로 전환하는 운영체제.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: easeOutCubic }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleWaitlist}
              arrow
              aria-label="Join the waitlist for SMART P&B"
            >
              Join the Waitlist
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="#manifesto"
              aria-label="Read the manifesto"
              onClick={() => analytics('manifesto_read')}
            >
              Read the Manifesto
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-mono-label" style={{ fontSize: '10px' }}>SCROLL</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[var(--accent-blue)] to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
        />
      </motion.div>

      {/* Bottom section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" aria-hidden="true" />
    </section>
  )
}
