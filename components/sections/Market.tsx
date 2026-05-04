'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const MARKETS = [
  {
    id: 'M1',
    label: 'Publishing',
    sub: 'IP-lifecycle shift',
    color: 'rgba(79,140,255,0.15)',
    border: 'rgba(79,140,255,0.3)',
    accent: 'var(--accent-blue)',
    stat: 'OSMU',
    statDesc: '산업 표준화',
    x: '0%',
    y: '0%',
  },
  {
    id: 'M2',
    label: 'Audiobook',
    sub: 'fastest-growing format',
    color: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.3)',
    accent: 'var(--accent-violet)',
    stat: '두 자릿수',
    statDesc: 'YoY 성장률',
    x: '50%',
    y: '0%',
  },
  {
    id: 'M3',
    label: 'Webtoon · Web Novel IP',
    sub: 'proven cost & time efficiency',
    color: 'rgba(79,140,255,0.12)',
    border: 'rgba(79,140,255,0.25)',
    accent: 'var(--accent-blue)',
    stat: '검증된',
    statDesc: '비용·속도 효율',
    x: '0%',
    y: '50%',
  },
  {
    id: 'M4',
    label: 'Creator Economy',
    sub: 'operating-tool gap',
    color: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.25)',
    accent: 'var(--accent-violet)',
    stat: '도구의 공백',
    statDesc: '다음 시장의 문',
    x: '50%',
    y: '50%',
  },
]

export default function Market() {
  return (
    <section
      id="market"
      aria-labelledby="market-heading"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-soft)' }}
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
            <SectionLabel animate={false}>05 — MARKET</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="market-heading"
            variants={staggerItem}
            className="text-h2 font-bold text-[var(--text-primary)] mb-16 sm:mb-20 max-w-3xl"
            lang="ko"
          >
            우리는 출판 시장이 아니라,{' '}
            <span className="text-gradient">4개 시장의 교차점</span>에 있다.
          </motion.h2>

          {/* Venn-like visual grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20 sm:mb-24 relative"
          >
            {/* Center intersection label */}
            <div
              className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center justify-center text-center rounded-full"
              style={{
                width: '120px',
                height: '120px',
                background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.25) 0%, rgba(139,92,246,0.18) 60%, transparent 100%)',
                border: '1px solid rgba(79,140,255,0.3)',
                backdropFilter: 'blur(8px)',
              }}
              aria-hidden="true"
            >
              <span className="font-bold text-[var(--text-primary)] text-[11px] leading-tight">
                SMART<br />P&amp;B
              </span>
            </div>

            {MARKETS.map((market) => (
              <motion.article
                key={market.id}
                variants={staggerItem}
                className="relative rounded-[24px] p-8 border transition-all duration-200 hover:border-opacity-60 hover:-translate-y-px"
                style={{
                  background: market.color,
                  borderColor: market.border,
                }}
                aria-label={`${market.label}: ${market.sub}`}
              >
                {/* Market label */}
                <h3
                  className="font-bold text-[var(--text-primary)] mb-2"
                  style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}
                >
                  {market.label}
                </h3>

                {/* Sub-label */}
                <p
                  className="font-mono-label mb-6"
                  style={{ color: market.accent }}
                >
                  {market.sub}
                </p>

                {/* Stat */}
                <div className="flex items-end gap-2">
                  <span
                    className="font-black"
                    style={{ fontSize: 'clamp(22px, 2vw, 30px)', color: market.accent, lineHeight: 1 }}
                    lang="ko"
                  >
                    {market.stat}
                  </span>
                  <span className="text-[var(--text-muted)] text-[13px] pb-0.5" lang="ko">
                    {market.statDesc}
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Punchline */}
          <motion.div variants={staggerItem} className="relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at left, rgba(79,140,255,0.08) 0%, transparent 60%)',
                filter: 'blur(40px)',
              }}
              aria-hidden="true"
            />
            <blockquote
              className="relative font-bold text-[var(--text-primary)] max-w-2xl"
              style={{ fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: '1.4' }}
              lang="ko"
            >
              &ldquo;4개 시장이 만나는 단 하나의 빈자리에,{' '}
              <span className="text-gradient">우리가 들어간다.</span>&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
