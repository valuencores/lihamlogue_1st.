'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const PROBLEMS = [
  {
    number: '01',
    title: '좋은 아이디어는 책이 되지 못한다.',
    body: '자료조사·구조화·집필·편집의 병목 때문에 출간 의지가 강한 저자조차 원고를 끝내지 못한다.',
  },
  {
    number: '02',
    title: '책이 된 작품도 IP가 되지 못한다.',
    body: '같은 원고가 전자책·오디오·웹소설·웹툰·영상으로 확장되지 못한 채 한 권으로 사라진다.',
  },
  {
    number: '03',
    title: '저자는 자신의 독자를 소유하지 못한다.',
    body: '플랫폼 알고리즘에 종속된 채, 팬덤·반응·데이터를 자기 자산으로 쌓지 못한다.',
  },
]

export default function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
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
            <SectionLabel animate={false}>01 — THE PROBLEM</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="problem-heading"
            variants={staggerItem}
            className="text-h2 font-bold text-[var(--text-primary)] mb-16 sm:mb-20 max-w-3xl"
            lang="ko"
          >
            출판은 이미 IP 산업으로 바뀌었지만,{' '}
            <span className="text-[var(--text-secondary)]">
              창작자에겐 그 전환을 감당할 시스템이 없다.
            </span>
          </motion.h2>

          {/* Problem cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 sm:mb-28"
          >
            {PROBLEMS.map((p) => (
              <motion.article
                key={p.number}
                variants={staggerItem}
                className="group relative rounded-[24px] p-8 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-all duration-200 hover:border-[rgba(79,140,255,0.24)] hover:-translate-y-px"
                style={{ cursor: 'default' }}
                aria-label={p.title}
              >
                {/* Number */}
                <span
                  className="font-mono-label block mb-6 text-[var(--accent-blue)]"
                  aria-hidden="true"
                >
                  {p.number}
                </span>

                {/* Title */}
                <h3
                  className="text-h3 font-bold text-[var(--text-primary)] mb-4 leading-[1.3]"
                  lang="ko"
                  style={{ fontSize: 'clamp(18px, 1.8vw, 24px)' }}
                >
                  {p.title}
                </h3>

                {/* Body */}
                <p
                  className="text-body text-[var(--text-secondary)] leading-[1.7]"
                  lang="ko"
                >
                  {p.body}
                </p>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px bg-[var(--accent-blue)] opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"
                  aria-hidden="true"
                />
              </motion.article>
            ))}
          </motion.div>

          {/* Punchline */}
          <motion.div
            variants={staggerItem}
            className="relative text-center"
          >
            {/* Glow behind punchline */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.10) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
              aria-hidden="true"
            />
            <blockquote
              className="relative font-bold text-[var(--text-primary)] leading-[1.2]"
              style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}
              lang="ko"
            >
              &ldquo;텍스트는 산업이 됐는데, 작가는 여전히 혼자다.&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-28" aria-hidden="true" />
    </section>
  )
}
