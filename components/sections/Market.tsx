'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const MARKETS = [
  {
    id: 'M1',
    label: 'Publishing',
    sub: 'IP-lifecycle shift',
    color: 'var(--accent-blue)',
    bg: 'rgba(79,140,255,0.07)',
    border: 'rgba(79,140,255,0.22)',
    stat: 'OSMU',
    statDesc: '산업 표준화',
  },
  {
    id: 'M2',
    label: 'Audiobook',
    sub: 'fastest-growing format',
    color: 'var(--accent-violet)',
    bg: 'rgba(139,92,246,0.07)',
    border: 'rgba(139,92,246,0.22)',
    stat: '두 자릿수',
    statDesc: 'YoY 성장률',
  },
  {
    id: 'M3',
    label: 'Webtoon · Web Novel',
    sub: 'proven IP efficiency',
    color: 'var(--accent-blue)',
    bg: 'rgba(79,140,255,0.07)',
    border: 'rgba(79,140,255,0.22)',
    stat: '검증된',
    statDesc: '비용·속도 효율',
  },
  {
    id: 'M4',
    label: 'Creator Economy',
    sub: 'operating-tool gap',
    color: 'var(--accent-violet)',
    bg: 'rgba(139,92,246,0.07)',
    border: 'rgba(139,92,246,0.22)',
    stat: '도구의 공백',
    statDesc: '다음 시장의 문',
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
          <motion.div variants={staggerItem} className="mb-14">
            <SectionLabel animate={false}>05 — MARKET</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="market-heading"
            variants={staggerItem}
            className="text-h2 text-[var(--text-primary)] max-w-3xl mb-16 sm:mb-20"
            lang="ko"
          >
            우리는 출판 시장이 아니라,{' '}
            <span className="text-gradient">4개 시장의 교차점</span>에 있다.
          </motion.h2>

          {/* 2×2 Venn-style grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20 sm:mb-24 relative"
          >
            {/* Center intersection badge (desktop) */}
            <div
              className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center justify-center rounded-full"
              style={{
                width: '108px',
                height: '108px',
                background: 'radial-gradient(ellipse, rgba(79,140,255,0.2) 0%, rgba(139,92,246,0.15) 55%, transparent 100%)',
                border: '1px solid rgba(79,140,255,0.28)',
                backdropFilter: 'blur(8px)',
              }}
              aria-hidden="true"
            >
              <span
                className="font-bold text-[var(--text-primary)] text-center leading-tight"
                style={{ fontSize: '11px' }}
              >
                SMART<br />P&amp;B
              </span>
            </div>

            {MARKETS.map((m) => (
              <motion.article
                key={m.id}
                variants={staggerItem}
                className="relative rounded-[24px] p-8 border transition-all duration-200 hover:-translate-y-px"
                style={{ background: m.bg, borderColor: m.border }}
                aria-label={`${m.label}: ${m.sub}`}
              >
                <h3
                  className="font-bold text-[var(--text-primary)] mb-2 leading-[1.2]"
                  style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}
                >
                  {m.label}
                </h3>

                <p className="font-mono-label mb-7" style={{ color: m.color }}>
                  {m.sub}
                </p>

                <div className="flex items-end gap-2">
                  <span
                    className="font-black leading-none"
                    style={{ fontSize: 'clamp(20px, 2vw, 28px)', color: m.color }}
                    lang="ko"
                  >
                    {m.stat}
                  </span>
                  <span
                    className="text-[var(--text-muted)] pb-0.5"
                    style={{ fontSize: '13px' }}
                    lang="ko"
                  >
                    {m.statDesc}
                  </span>
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
              &ldquo;4개 시장이 만나는 단 하나의 빈자리에,{' '}
              <span className="text-gradient">우리가 들어간다.</span>&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
