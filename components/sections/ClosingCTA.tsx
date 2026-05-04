'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import GlowOrb from '@/components/ui/GlowOrb'
import { analytics } from '@/lib/analytics'

const TILES = [
  {
    audience: 'For Writers',
    cta:      'Join the Waitlist',
    role:     'writer'   as const,
    event:    'cta_waitlist_clicked'  as const,
    color:    'rgba(79,140,255,1)',
    bg:       'rgba(79,140,255,0.06)',
    border:   'rgba(79,140,255,0.22)',
  },
  {
    audience: 'For Investors',
    cta:      'Request Investor Deck',
    role:     'investor' as const,
    event:    'cta_investor_clicked' as const,
    color:    'rgba(120,110,250,1)',
    bg:       'rgba(120,110,250,0.06)',
    border:   'rgba(120,110,250,0.22)',
  },
  {
    audience: 'For Partners',
    cta:      'Talk to the Team',
    role:     'partner'  as const,
    event:    'cta_partner_clicked'  as const,
    color:    'rgba(139,92,246,1)',
    bg:       'rgba(139,92,246,0.06)',
    border:   'rgba(139,92,246,0.22)',
  },
]

interface Props {
  onOpenModal: (role: 'writer' | 'investor' | 'partner') => void
}

export default function ClosingCTA({ onOpenModal }: Props) {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden"
      style={{ paddingTop: '160px', paddingBottom: '160px' }}
    >
      {/* Second (and final) glow orb */}
      <GlowOrb
        size="lg"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75"
      />

      <div className="container-grid relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          {/* Mega headline */}
          <motion.div variants={staggerItem} className="mb-10 sm:mb-14">
            <h2
              id="cta-heading"
              className="text-display font-black text-[var(--text-primary)] glow-headline relative inline-block"
              lang="ko"
            >
              텍스트는 산업이 됐다.
              <br />
              <span className="text-gradient glow-pulse">우리는 그 산업의</span>
              <br />
              운영체제가 된다.
            </h2>
          </motion.div>

          {/* Sub-line */}
          <motion.p
            variants={staggerItem}
            className="text-body-l text-[var(--text-secondary)] mb-16 sm:mb-20 max-w-md mx-auto leading-[1.7]"
            lang="ko"
          >
            SMART P&amp;B와 함께, 다음 10년의 IP 인프라를 만든다.
          </motion.p>

          {/* 3 CTA tiles */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {TILES.map((tile) => (
              <motion.div
                key={tile.audience}
                variants={staggerItem}
                className="group relative rounded-[24px] p-7 border text-center cursor-pointer transition-all duration-200 hover:-translate-y-1"
                style={{ background: tile.bg, borderColor: tile.border }}
                onClick={() => {
                  analytics(tile.event, { location: 'closing_cta' })
                  onOpenModal(tile.role)
                }}
                role="button"
                tabIndex={0}
                aria-label={`${tile.audience}: ${tile.cta}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    analytics(tile.event, { location: 'closing_cta' })
                    onOpenModal(tile.role)
                  }
                }}
              >
                <p
                  className="font-mono-label mb-4"
                  style={{ color: tile.color }}
                >
                  {tile.audience}
                </p>
                <p
                  className="font-bold text-[var(--text-primary)] transition-colors duration-150 group-hover:text-[var(--accent-blue)]"
                  style={{ fontSize: 'clamp(14px, 1.3vw, 17px)' }}
                >
                  {tile.cta} →
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
