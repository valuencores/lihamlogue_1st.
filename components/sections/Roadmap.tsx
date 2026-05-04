'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const PHASES = [
  {
    number: 'Phase 0',
    range:  '0 – 3M',
    title:  'Validate',
    items:  ['Customer discovery', 'MVP scope definition'],
    color:  'var(--text-muted)',
    glow:   'rgba(107,114,128,0.15)',
    border: 'rgba(107,114,128,0.2)',
  },
  {
    number: 'Phase 1',
    range:  '3 – 9M',
    title:  'MVP',
    items:  ['AI Author Copilot', 'Human Editorial Layer'],
    color:  'var(--accent-blue)',
    glow:   'rgba(79,140,255,0.18)',
    border: 'rgba(79,140,255,0.22)',
  },
  {
    number: 'Phase 2',
    range:  '9 – 18M',
    title:  'Expand',
    items:  ['Multi-format IP engine', 'B2B onboarding'],
    color:  'rgba(120,110,250,1)',
    glow:   'rgba(120,110,250,0.18)',
    border: 'rgba(120,110,250,0.22)',
  },
  {
    number: 'Phase 3',
    range:  '18 – 27M',
    title:  'Operate',
    items:  ['D2C marketplace', 'Audience dashboard'],
    color:  'rgba(155,100,250,1)',
    glow:   'rgba(155,100,250,0.16)',
    border: 'rgba(155,100,250,0.22)',
  },
  {
    number: 'Phase 4',
    range:  '27 – 36M',
    title:  'Leap',
    items:  ['Rights brokerage', 'Partnerships', 'Enterprise'],
    color:  'var(--accent-violet)',
    glow:   'rgba(139,92,246,0.18)',
    border: 'rgba(139,92,246,0.22)',
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
          <motion.div variants={staggerItem} className="mb-14">
            <SectionLabel animate={false}>07 — ROADMAP</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="roadmap-heading"
            variants={staggerItem}
            className="text-h2 text-[var(--text-primary)] mb-16 sm:mb-20"
          >
            0 – 36 Months
          </motion.h2>

          {/* Timeline — horizontal scroll on narrow screens */}
          <motion.div
            variants={staggerItem}
            className="relative overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0 pb-4"
          >
            {/* Track line */}
            <div
              className="absolute top-[22px] left-5 right-5 sm:left-0 sm:right-0 h-px"
              style={{ background: 'var(--border-subtle)' }}
              aria-hidden="true"
            />

            <div
              className="relative grid"
              style={{
                gridTemplateColumns: `repeat(${PHASES.length}, 1fr)`,
                gap: '12px',
                minWidth: '600px',
              }}
              role="list"
              aria-label="36-month roadmap"
            >
              {PHASES.map((phase, idx) => (
                <div
                  key={phase.number}
                  className="relative flex flex-col"
                  role="listitem"
                  aria-label={`${phase.number} (${phase.range}): ${phase.title}`}
                >
                  {/* Timeline dot */}
                  <div className="flex items-center mb-6 pr-3" aria-hidden="true">
                    <div
                      className="relative w-3 h-3 rounded-full flex-shrink-0 z-10"
                      style={{
                        background: phase.color,
                        boxShadow: idx > 0 ? `0 0 14px ${phase.glow}` : 'none',
                      }}
                    />
                    {/* Connector line to next dot */}
                    {idx < PHASES.length - 1 && (
                      <div
                        className="flex-1 h-px ml-1"
                        style={{
                          background: `linear-gradient(90deg, ${phase.color}, ${PHASES[idx + 1].color})`,
                        }}
                      />
                    )}
                  </div>

                  {/* Phase card */}
                  <div
                    className="rounded-[16px] p-5 border flex-1 mr-2"
                    style={{
                      background: phase.glow.replace('0.18', '0.07').replace('0.16', '0.06').replace('0.15', '0.05'),
                      borderColor: phase.border,
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
                      style={{ fontSize: '17px', letterSpacing: '-0.01em' }}
                    >
                      {phase.title}
                    </h3>
                    <ul className="flex flex-col gap-1.5" aria-label={`${phase.title} milestones`}>
                      {phase.items.map(item => (
                        <li
                          key={item}
                          className="text-[var(--text-secondary)]"
                          style={{ fontSize: '12px', lineHeight: 1.5 }}
                        >
                          · {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Punchline */}
          <motion.div variants={staggerItem} className="mt-16 sm:mt-20">
            <blockquote
              className="font-bold text-[var(--text-primary)] max-w-2xl"
              style={{ fontSize: 'clamp(20px, 2.4vw, 32px)', lineHeight: 1.35, letterSpacing: '-0.015em' }}
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
