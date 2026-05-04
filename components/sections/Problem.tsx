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
          <motion.div variants={staggerItem} className="mb-14">
            <SectionLabel animate={false}>01 — THE PROBLEM</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="problem-heading"
            variants={staggerItem}
            className="text-h2 text-[var(--text-primary)] max-w-3xl mb-16 sm:mb-20"
            lang="ko"
          >
            출판은 이미 IP 산업으로 바뀌었지만,{' '}
            <span className="text-[var(--text-secondary)] font-normal">
              창작자에겐 그 전환을 감당할 시스템이 없다.
            </span>
          </motion.h2>

          {/* Problem cards — 3-col grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-subtle)] rounded-[24px] overflow-hidden mb-20 sm:mb-28"
          >
            {PROBLEMS.map((p) => (
              <motion.article
                key={p.number}
                variants={staggerItem}
                className="group relative flex flex-col gap-5 p-8 sm:p-10 bg-[var(--bg-elevated)] transition-colors duration-200 hover:bg-[#13171f]"
                aria-label={p.title}
              >
                {/* Number */}
                <span className="font-mono-label text-[var(--accent-blue)]">
                  {p.number}
                </span>

                {/* Title */}
                <h3
                  className="font-bold text-[var(--text-primary)] leading-[1.3]"
                  style={{ fontSize: 'clamp(17px, 1.6vw, 22px)' }}
                  lang="ko"
                >
                  {p.title}
                </h3>

                {/* Body */}
                <p
                  className="text-[var(--text-secondary)] leading-[1.75]"
                  style={{ fontSize: 'clamp(14px, 1vw, 16px)' }}
                  lang="ko"
                >
                  {p.body}
                </p>

                {/* Bottom accent — slides in on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent-blue)] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </motion.article>
            ))}
          </motion.div>

          {/* Punchline quote */}
          <motion.div variants={staggerItem} className="relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.09) 0%, transparent 70%)',
                filter: 'blur(48px)',
              }}
              aria-hidden="true"
            />
            <blockquote
              className="relative font-bold text-[var(--text-primary)] max-w-2xl"
              style={{ fontSize: 'clamp(22px, 2.8vw, 40px)', lineHeight: 1.2, letterSpacing: '-0.015em' }}
              lang="ko"
            >
              &ldquo;텍스트는 산업이 됐는데,
              <br />
              <span className="text-[var(--text-secondary)] font-normal">작가는 여전히 혼자다.</span>
              &rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-28" aria-hidden="true" />
    </section>
  )
}
