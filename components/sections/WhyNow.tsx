'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const TRENDS = [
  {
    number: '01',
    title: 'Publishing → IP industry shift',
    body: '출판은 종이책 제조에서 IP 생애주기 운영으로 재편 중. OSMU가 산업 표준이 됐다.',
  },
  {
    number: '02',
    title: 'AI speed, human trust',
    body: '대중의 AI 신뢰는 여전히 낮다. 시장은 자동 생성이 아닌 AI+Human 검증 구조를 요구한다.',
  },
  {
    number: '03',
    title: 'Creator economy needs operating tools',
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
          <motion.div variants={staggerItem} className="mb-12 sm:mb-16">
            <SectionLabel animate={false}>02 — WHY NOW</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="whynow-heading"
            variants={staggerItem}
            className="text-h2 font-bold text-[var(--text-primary)] mb-16 sm:mb-20 max-w-2xl"
            lang="ko"
          >
            3가지 흐름이 동시에 같은 방향을 가리킨다.
          </motion.h2>

          {/* 3 columns */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-px border border-[var(--border-subtle)] rounded-[24px] overflow-hidden mb-20 sm:mb-28"
          >
            {TRENDS.map((trend, idx) => (
              <motion.div
                key={trend.number}
                variants={staggerItem}
                className="relative p-8 sm:p-10 bg-[var(--bg-elevated)]"
              >
                {/* Vertical divider between columns */}
                {idx < TRENDS.length - 1 && (
                  <div
                    className="hidden md:block absolute right-0 top-8 bottom-8 w-px bg-[var(--border-subtle)]"
                    aria-hidden="true"
                  />
                )}

                {/* Number annotation */}
                <span className="font-mono-label block mb-6 text-[var(--accent-blue)]">
                  {trend.number}
                </span>

                {/* English category label */}
                <h3
                  className="font-bold text-[var(--text-primary)] mb-4"
                  style={{ fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: '1.3' }}
                >
                  {trend.title}
                </h3>

                {/* Korean body */}
                <p
                  className="text-body text-[var(--text-secondary)]"
                  lang="ko"
                >
                  {trend.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Punchline */}
          <motion.div variants={staggerItem} className="max-w-2xl">
            <blockquote
              className="font-bold text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', lineHeight: '1.4' }}
              lang="ko"
            >
              &ldquo;기술과 시장과 창작자의 니즈가 동시에 만나는,{' '}
              <span className="text-[var(--text-secondary)] font-normal">
                단 한 번의 타이밍.
              </span>
              &rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
