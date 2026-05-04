'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const BODY = [
  `디지털 전환이 가속되는 시대에도, 모든 콘텐츠의 출발점은 여전히 텍스트다. 그러나 오늘날 텍스트는 더 이상 종이책 한 권에 머무르지 않는다. 하나의 원고는 책이 되고, 전자책이 되고, 오디오북이 되고, 웹소설이 되며, 웹툰과 영상으로 확장 가능한 원천 IP가 된다.`,
]

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-label"
      className="section-padding relative overflow-hidden"
    >
      <div className="container-grid">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem} className="mb-14 sm:mb-18">
            <SectionLabel animate={false}>00 — MANIFESTO</SectionLabel>
          </motion.div>

          <div id="manifesto-label" className="flex flex-col gap-10" lang="ko">
            {/* Body paragraph */}
            {BODY.map((para, i) => (
              <motion.p
                key={i}
                variants={staggerItem}
                className="text-body-l text-[var(--text-secondary)] leading-[1.8]"
              >
                {para}
              </motion.p>
            ))}

            {/* Thesis statement */}
            <motion.p
              variants={staggerItem}
              className="font-bold text-[var(--text-primary)] whitespace-pre-line"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.3, letterSpacing: '-0.015em' }}
            >
              {'출판은 이미 IP 산업으로 바뀌었다.\n그러나 작가는 여전히 혼자다.'}
            </motion.p>

            {/* Mission line */}
            <motion.p
              variants={staggerItem}
              className="font-semibold text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(17px, 1.5vw, 21px)', lineHeight: 1.5 }}
            >
              SMART P&amp;B는 그 간극을 메우기 위해 존재한다.
            </motion.p>
          </div>

          {/* Accent rule */}
          <motion.div
            variants={staggerItem}
            className="mt-16 h-px w-16 rounded-full"
            style={{ background: 'var(--accent-blue)' }}
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <div className="section-divider mt-0" aria-hidden="true" />
    </section>
  )
}
