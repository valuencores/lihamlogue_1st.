'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Manifesto() {
  const paragraphs = [
    `디지털 전환이 가속되는 시대에도, 모든 콘텐츠의 출발점은 여전히 텍스트다. 그러나 오늘날 텍스트는 더 이상 종이책 한 권에 머무르지 않는다. 하나의 원고는 책이 되고, 전자책이 되고, 오디오북이 되고, 웹소설이 되며, 웹툰과 영상으로 확장 가능한 원천 IP가 된다.`,
    `출판은 이미 IP 산업으로 바뀌었다.\n그러나 작가는 여전히 혼자다.`,
    `SMART P&B는 그 간극을 메우기 위해 존재한다.`,
  ]

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      className="section-padding relative overflow-hidden"
    >
      {/* Subtle top divider */}
      <div className="section-divider mb-0" aria-hidden="true" />

      <div className="container-grid">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Section label */}
          <motion.div variants={staggerItem} className="mb-12 sm:mb-16">
            <SectionLabel animate={false}>00 — MANIFESTO</SectionLabel>
          </motion.div>

          {/* Editorial body text */}
          <div
            id="manifesto-heading"
            className="flex flex-col gap-8"
            lang="ko"
            aria-label="SMART P&B Manifesto"
          >
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={staggerItem}
                className={`text-body-l leading-[1.75] text-[var(--text-secondary)] whitespace-pre-line ${
                  i === 1
                    ? 'text-[var(--text-primary)] font-semibold text-h3 leading-[1.4]'
                    : ''
                } ${
                  i === 2
                    ? 'text-[var(--text-primary)] font-bold'
                    : ''
                }`}
                style={
                  i === 1
                    ? { fontSize: 'clamp(22px, 2.5vw, 30px)' }
                    : i === 2
                    ? { fontSize: 'clamp(18px, 1.5vw, 22px)' }
                    : {}
                }
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Thin accent line at bottom */}
          <motion.div
            variants={staggerItem}
            className="mt-16 h-px w-16"
            style={{ background: 'var(--accent-blue)' }}
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <div className="section-divider mt-0" aria-hidden="true" />
    </section>
  )
}
