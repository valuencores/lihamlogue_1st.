'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const TIERS = [
  {
    number: 'Tier 01',
    label: 'Survival',
    color: 'var(--accent-blue)',
    colorBg: 'rgba(79,140,255,0.08)',
    colorBorder: 'rgba(79,140,255,0.2)',
    items: [
      'SaaS subscription',
      'Premium editing',
      'Format packages',
      'B2B licensing',
    ],
  },
  {
    number: 'Tier 02',
    label: 'Growth',
    color: 'rgba(120, 110, 250, 1)',
    colorBg: 'rgba(120,110,250,0.08)',
    colorBorder: 'rgba(120,110,250,0.2)',
    items: [
      'D2C sales fee',
      'Subscription / early access / bundles',
      'Audiobook distribution',
      'IP reports',
    ],
  },
  {
    number: 'Tier 03',
    label: 'Leap',
    color: 'var(--accent-violet)',
    colorBg: 'rgba(139,92,246,0.08)',
    colorBorder: 'rgba(139,92,246,0.2)',
    items: [
      'Secondary rights brokerage',
      'Screen-adaptation options',
      'Localization',
      'Enterprise solution',
    ],
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
          <motion.div variants={staggerItem} className="mb-12 sm:mb-16">
            <SectionLabel animate={false}>06 — MODEL</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="model-heading"
            variants={staggerItem}
            className="text-h2 font-bold text-[var(--text-primary)] mb-16 sm:mb-20 max-w-3xl"
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
                className="relative rounded-[24px] p-8 sm:p-10 border transition-all duration-200 hover:-translate-y-px"
                style={{
                  background: tier.colorBg,
                  borderColor: tier.colorBorder,
                  marginLeft: `${idx * 24}px`,
                }}
                aria-label={`${tier.number} · ${tier.label}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12">
                  {/* Left: tier label */}
                  <div className="flex-shrink-0" style={{ minWidth: '160px' }}>
                    <span
                      className="font-mono-label block mb-2"
                      style={{ color: tier.color }}
                    >
                      {tier.number}
                    </span>
                    <h3
                      className="font-bold text-[var(--text-primary)]"
                      style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
                    >
                      {tier.label}
                    </h3>
                  </div>

                  {/* Right: items */}
                  <ul className="flex flex-wrap gap-2" aria-label={`${tier.label} revenue streams`}>
                    {tier.items.map((item) => (
                      <li
                        key={item}
                        className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[var(--text-secondary)] border"
                        style={{ borderColor: tier.colorBorder, background: 'rgba(255,255,255,0.03)' }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ascending visual indicator */}
                <div
                  className="absolute right-8 top-1/2 -translate-y-1/2 font-black opacity-10 select-none"
                  style={{ fontSize: '64px', color: tier.color }}
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
              style={{ fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: '1.5' }}
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
