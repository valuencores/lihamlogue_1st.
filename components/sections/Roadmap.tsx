'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const PHASES = [
  {
    number: 'Phase 0',
    range:  '0–3M',
    title:  'Validate',
    items:  ['Customer discovery', 'MVP scope'],
    color:  'var(--text-muted)',
    accent: 'rgba(79,140,255,0.15)',
  },
  {
    number: 'Phase 1',
    range:  '3–9M',
    title:  'MVP',
    items:  ['AI Copilot', 'Human Editorial'],
    color:  'var(--accent-blue)',
    accent: 'rgba(79,140,255,0.20)',
  },
  {
    number: 'Phase 2',
    range:  '9–18M',
    title:  'Expand',
    items:  ['Multi-format IP engine'],
    color:  'rgba(120,110,250,1)',
    accent: 'rgba(120,110,250,0.18)',
  },
  {
    number: 'Phase 3',
    range:  '18–27M',
    title:  'Operate',
    items:  ['D2C', 'Audience dashboard'],
    color:  'rgba(155,100,250,1)',
    accent: 'rgba(155,100,250,0.16)',
  },
  {
    number: 'Phase 4',
    range:  '27–36M',
    title:  'Leap',
    items:  ['Rights', 'Partnerships', 'Enterprise'],
    color:  'var(--accent-violet)',
    accent: 'rgba(139,92,246,0.20)',
  },
]

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
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
            <SectionLabel animate={false}>07 — ROADMAP</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="roadmap-heading"
            variants={staggerItem}
            className="text-h2 font-bold text-[var(--text-primary)] mb-16 sm:mb-20 max-w-3xl"
          >
            0–36 Months
          </motion.h2>

          {/* Timeline — horizontal scroll on mobile */}
          <motion.div
            variants={staggerItem}
            className="relative overflow-x-auto pb-4 -mx-5 px-5 sm:mx-0 sm:px-0"
          >
            {/* Continuous progress track line */}
            <div
              className="absolute top-[44px] left-0 right-0 h-px hidden sm:block"
              style={{ background: 'var(--border-subtle)' }}
              aria-hidden="true"
            />

            <div
              className="flex gap-4 sm:gap-0 sm:grid"
              style={{ gridTemplateColumns: `repeat(${PHASES.length}, 1fr)`, minWidth: '640px' }}
              role="list"
              aria-label="36-month roadmap"
            >
              {PHASES.map((phase, idx) => (
                <motion.div
                  key={phase.number}
                  variants={staggerItem}
                  className="relative flex flex-col"
                  role="listitem"
                  aria-label={`${phase.number} (${phase.range}): ${phase.title}`}
                >
                  {/* Phase dot on timeline */}
                  <div className="flex items-center mb-4 sm:pr-4" aria-hidden="true">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 z-10 relative border-2"
                      style={{
                        background: phase.color,
                        borderColor: phase.color,
                        boxShadow: idx > 0
                          ? `0 0 12px ${phase.accent}`
                          : 'none',
                      }}
                    />
                    {/* Filled line segment (blue→violet gradient progressing) */}
                    {idx < PHASES.length - 1 && (
                      <div
                        className="flex-1 h-px ml-0 hidden sm:block"
                        style={{
                          background: `linear-gradient(90deg, ${phase.color}, ${PHASES[idx + 1].color})`,
                        }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-[14px] p-5 border flex-1 sm:mr-3"
                    style={{
                      background: phase.accent,
                      borderColor: 'var(--border-subtle)',
                      minWidth: '140px',
                    }}
                  >
                    <span
                      className="font-mono-label block mb-1"
                      style={{ color: phase.color }}
                    >
                      {phase.range}
                    </span>
                    <h3
                      className="font-bold text-[var(--text-primary)] mb-3"
                      style={{ fontSize: '18px' }}
                    >
                      {phase.title}
                    </h3>
                    <ul className="flex flex-col gap-1" aria-label={`${phase.title} milestones`}>
                      {phase.items.map(item => (
                        <li
                          key={item}
                          className="text-[var(--text-secondary)]"
                          style={{ fontSize: '13px' }}
                        >
                          · {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Punchline */}
          <motion.div variants={staggerItem} className="mt-16 sm:mt-20">
            <blockquote
              className="font-bold text-[var(--text-primary)] max-w-2xl"
              style={{ fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: '1.5' }}
              lang="ko"
            >
              &ldquo;&lsquo;언젠가 큰 회사&rsquo;가 아니라,{' '}
              <span className="text-gradient">&lsquo;지금 매출이 나는 회사&rsquo;</span>로 시작한다.&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
