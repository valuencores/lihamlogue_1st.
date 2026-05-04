'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const TIERS = [
  {
    number: 'Tier 01',
    label: 'Survival',
    headline: 'SaaS',
    color: 'var(--accent-blue)',
    bg: 'rgba(79,140,255,0.06)',
    border: 'rgba(79,140,255,0.18)',
    items: ['SaaS subscription', 'Premium editing', 'Format packages', 'B2B licensing'],
  },
  {
    number: 'Tier 02',
    label: 'Growth',
    headline: 'D2C',
    color: 'rgba(120,110,250,1)',
    bg: 'rgba(120,110,250,0.06)',
    border: 'rgba(120,110,250,0.18)',
    items: ['D2C sales fee', 'Subscription / early access / bundles', 'Audiobook distribution', 'IP reports'],
  },
  {
    number: 'Tier 03',
    label: 'Leap',
    headline: 'Rights',
    color: 'var(--accent-violet)',
    bg: 'rgba(139,92,246,0.06)',
    border: 'rgba(139,92,246,0.18)',
    items: ['Secondary rights brokerage', 'Screen-adaptation options', 'Localization', 'Enterprise solution'],
  },
]

export default function BusinessModel() {
  return (
    <section
      id="model"
      aria-labelledby="model-heading"
      className="section-padding relative overflow-hidden"
    >
      <div className="container-grid">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Label */}
          <motion.div variants={staggerItem} className="mb-14">
            <SectionLabel animate={false}>06 — MODEL</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="model-heading"
            variants={staggerItem}
            className="text-h2 text-[var(--text-primary)] max-w-3xl mb-16 sm:mb-20"
            lang="ko"
          >
            생존은 SaaS로, 성장은 D2C로,{' '}
            <span className="text-gradient">도약은 IP로.</span>
          </motion.h2>

          {/* Ascending tier stack */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col gap-4 mb-20 sm:mb-28"
          >
            {TIERS.map((tier, idx) => (
              <motion.article
                key={tier.number}
                variants={staggerItem}
                className="relative rounded-[24px] p-8 sm:p-10 border transition-all duration-200 hover:-translate-y-px overflow-hidden"
                style={{
                  background: tier.bg,
                  borderColor: tier.border,
                  marginLeft: `${idx * 28}px`,
                }}
                aria-label={`${tier.number} · ${tier.label}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-14">
                  {/* Left: tier identity */}
                  <div className="flex-shrink-0" style={{ minWidth: '140px' }}>
                    <span
                      className="font-mono-label block mb-2"
                      style={{ color: tier.color }}
                    >
                      {tier.number}
                    </span>
                    <h3
                      className="font-black text-[var(--text-primary)] leading-none"
                      style={{ fontSize: 'clamp(22px, 2.2vw, 30px)' }}
                    >
                      {tier.label}
                    </h3>
                    <p
                      className="font-mono-label mt-1"
                      style={{ color: tier.color, opacity: 0.7 }}
                    >
                      {tier.headline}
                    </p>
                  </div>

                  {/* Right: item tags */}
                  <ul
                    className="flex flex-wrap gap-2 items-start"
                    aria-label={`${tier.label} revenue streams`}
                  >
                    {tier.items.map((item) => (
                      <li
                        key={item}
                        className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[var(--text-secondary)] border"
                        style={{ borderColor: tier.border, background: 'rgba(255,255,255,0.03)' }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Large watermark number */}
                <div
                  className="absolute right-8 top-1/2 -translate-y-1/2 font-black opacity-[0.07] select-none pointer-events-none"
                  style={{ fontSize: '80px', color: tier.color, lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Punchline */}
          <motion.div variants={staggerItem}>
            <blockquote
              className="font-bold text-[var(--text-primary)] max-w-2xl"
              style={{ fontSize: 'clamp(20px, 2.4vw, 32px)', lineHeight: 1.35, letterSpacing: '-0.015em' }}
              lang="ko"
            >
              &ldquo;한 고객에서{' '}
              <span className="text-gradient">1배가 아니라 3~5배로</span>{' '}
              자라는 수익 구조.&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-28" aria-hidden="true" />
    </section>
  )
}
