'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const TRENDS = [
  {
    number: '01',
    title: 'Publishing → IP Lifecycle',
    body: '출판은 종이책 제조에서 IP 생애주기 운영으로 재편 중. OSMU가 산업 표준이 됐다.',
  },
  {
    number: '02',
    title: 'AI Speed + Human Trust',
    body: '대중의 AI 신뢰는 여전히 낮다. 시장은 자동 생성이 아닌 AI＋Human 검증 구조를 요구한다.',
  },
  {
    number: '03',
    title: 'Creator Economy Tool Gap',
    body: '크리에이터 시장은 측정·표준·운영 도구의 빈자리에서 멈춰 있다. 도구를 쥔 자가 다음 시장을 가져간다.',
  },
]

export default function WhyNow() {
  return (
    <section
      id="whynow"
      aria-labelledby="whynow-heading"
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
            <SectionLabel animate={false}>02 — WHY NOW</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="whynow-heading"
            variants={staggerItem}
            className="text-h2 text-[var(--text-primary)] max-w-2xl mb-16 sm:mb-20"
            lang="ko"
          >
            3가지 흐름이 동시에{' '}
            <span className="text-[var(--text-secondary)] font-normal">같은 방향을 가리킨다.</span>
          </motion.h2>

          {/* 3-column grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 mb-20 sm:mb-28"
            style={{ border: '1px solid var(--border-subtle)', borderRadius: '24px', overflow: 'hidden' }}
          >
            {TRENDS.map((t, idx) => (
              <motion.div
                key={t.number}
                variants={staggerItem}
                className="relative p-8 sm:p-10"
                style={{ background: 'var(--bg-elevated)' }}
              >
                {/* Vertical divider */}
                {idx < TRENDS.length - 1 && (
                  <div
                    className="hidden md:block absolute right-0 top-8 bottom-8 w-px"
                    style={{ background: 'var(--border-subtle)' }}
                    aria-hidden="true"
                  />
                )}
                {/* Horizontal divider on mobile */}
                {idx < TRENDS.length - 1 && (
                  <div
                    className="md:hidden absolute bottom-0 left-8 right-8 h-px"
                    style={{ background: 'var(--border-subtle)' }}
                    aria-hidden="true"
                  />
                )}

                <span className="font-mono-label block mb-6 text-[var(--accent-blue)]">
                  {t.number}
                </span>

                <h3
                  className="font-bold text-[var(--text-primary)] mb-4 leading-[1.25]"
                  style={{ fontSize: 'clamp(15px, 1.4vw, 19px)' }}
                >
                  {t.title}
                </h3>

                <p
                  className="text-[var(--text-secondary)] leading-[1.75]"
                  style={{ fontSize: 'clamp(14px, 1vw, 16px)' }}
                  lang="ko"
                >
                  {t.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Punchline */}
          <motion.div variants={staggerItem}>
            <blockquote
              className="font-bold text-[var(--text-primary)] max-w-2xl"
              style={{ fontSize: 'clamp(20px, 2.4vw, 32px)', lineHeight: 1.35, letterSpacing: '-0.015em' }}
              lang="ko"
            >
              &ldquo;기술과 시장과 창작자의 니즈가 동시에 만나는,{' '}
              <span className="text-[var(--text-secondary)] font-normal">단 한 번의 타이밍.</span>
              &rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
