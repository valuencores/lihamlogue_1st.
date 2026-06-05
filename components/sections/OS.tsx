'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const MODULES = [
  {
    id: 'M01',
    label: 'Module 01',
    title: 'Author Copilot',
    body: '주제 정의·자료조사·목차 설계·초안·교정·인용 정리. 빈 페이지의 공포를 없앤다.',
    accent: 'blue' as const,
  },
  {
    id: 'M02',
    label: 'Module 02',
    title: 'Human Editorial Layer',
    body: '시니어 편집자가 구조·표현·논리·출간 적합성을 검증한다. AI의 속도에 인간의 신뢰를 더한다.',
    accent: 'violet' as const,
  },
  {
    id: 'M03',
    label: 'Module 03',
    title: 'IP Repurposing Engine',
    body: '한 편의 원고를 전자책·오디오·팟캐스트·웹소설·웹툰 기획안·시나리오 피치로 변환한다.',
    accent: 'blue' as const,
  },
  {
    id: 'M04',
    label: 'Module 04',
    title: 'Audience & Rights Dashboard',
    body: '독자 반응·팬덤·전환율·인간 기여도·출처·버전을 통합 관리한다. 판권 협상의 자산이 된다.',
    accent: 'violet' as const,
  },
]

const ACCENT = {
  blue:   { color: 'var(--accent-blue)',   bg: 'rgba(79,140,255,0.08)',   line: 'rgba(79,140,255,0.2)'  },
  violet: { color: 'var(--accent-violet)', bg: 'rgba(139,92,246,0.08)',  line: 'rgba(139,92,246,0.2)' },
}

export default function OS() {
  return (
    <section
      id="os"
      aria-labelledby="os-heading"
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
            <SectionLabel animate={false}>03 — THE OS</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="os-heading"
            variants={staggerItem}
            className="text-h2 text-[var(--text-primary)] max-w-3xl mb-16 sm:mb-20"
            lang="ko"
          >
            SMART P&amp;B는{' '}
            <span className="text-gradient">텍스트를 IP로 바꾸는</span>{' '}
            운영체제다.
          </motion.h2>

          {/* 2×2 module grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20 sm:mb-28"
          >
            {MODULES.map((mod) => {
              const a = ACCENT[mod.accent]
              return (
                <motion.article
                  key={mod.id}
                  variants={staggerItem}
                  className="group relative rounded-[24px] p-8 sm:p-10 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-all duration-200 hover:border-[var(--border-hover)] hover:-translate-y-px overflow-hidden"
                  aria-label={`${mod.label}: ${mod.title}`}
                >
                  {/* Corner glow dot */}
                  <div
                    className="absolute top-7 right-7 w-8 h-8 rounded-full opacity-25 transition-opacity duration-300 group-hover:opacity-40"
                    style={{ background: a.color, filter: 'blur(10px)' }}
                    aria-hidden="true"
                  />

                  {/* Module label with rule */}
                  <div className="flex items-center gap-3 mb-7">
                    <span className="font-mono-label" style={{ color: a.color }}>
                      {mod.label}
                    </span>
                    <div className="flex-1 h-px" style={{ background: a.line }} aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-[var(--text-primary)] mb-4 leading-[1.25]"
                    style={{ fontSize: 'clamp(17px, 1.5vw, 22px)' }}
                  >
                    {mod.title}
                  </h3>

                  {/* Body */}
                  <p
                    className="text-[var(--text-secondary)] leading-[1.75]"
                    style={{ fontSize: 'clamp(14px, 1vw, 16px)' }}
                    lang="ko"
                  >
                    {mod.body}
                  </p>
                </motion.article>
              )
            })}
          </motion.div>

          {/* Punchline */}
          <motion.div variants={staggerItem} className="relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.07) 0%, transparent 70%)',
                filter: 'blur(56px)',
              }}
              aria-hidden="true"
            />
            <p
              className="relative font-bold text-[var(--text-primary)] whitespace-nowrap"
              style={{ fontSize: 'clamp(16px, 2.2vw, 30px)', lineHeight: 1.35, letterSpacing: '-0.015em' }}
              lang="ko"
            >
              &ldquo;AI는 속도를, 인간은 신뢰를,{' '}
              <span className="text-gradient">데이터는 다음 시장을</span>{' '}연다.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-28" aria-hidden="true" />
    </section>
  )
}
