'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const MODULES = [
  {
    id: 'M01',
    title: 'Author Copilot',
    label: 'Module 01',
    body: '주제 정의·자료조사·목차 설계·초안·교정·인용 정리. 빈 페이지의 공포를 없앤다.',
    accent: 'blue',
  },
  {
    id: 'M02',
    title: 'Human Editorial Layer',
    label: 'Module 02',
    body: '시니어 편집자가 구조·표현·논리·출간 적합성을 검증한다. AI의 속도에 인간의 신뢰를 더한다.',
    accent: 'violet',
  },
  {
    id: 'M03',
    title: 'IP Repurposing Engine',
    label: 'Module 03',
    body: '한 편의 원고를 전자책·오디오·팟캐스트·웹소설형·웹툰 기획안·시나리오 피치로 변환한다.',
    accent: 'blue',
  },
  {
    id: 'M04',
    title: 'Audience & Rights Dashboard',
    label: 'Module 04',
    body: '독자 반응·팬덤·전환율·인간 기여도·출처·버전을 통합 관리한다. 판권 협상의 자산이 된다.',
    accent: 'violet',
  },
]

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
          <motion.div variants={staggerItem} className="mb-12 sm:mb-16">
            <SectionLabel animate={false}>03 — THE OS</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="os-heading"
            variants={staggerItem}
            className="text-h2 font-bold text-[var(--text-primary)] mb-16 sm:mb-20 max-w-3xl"
            lang="ko"
          >
            SMART P&amp;B는{' '}
            <span className="text-gradient">텍스트를 IP로 바꾸는</span>{' '}
            운영체제다.
          </motion.h2>

          {/* 2×2 module grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20 sm:mb-28"
          >
            {MODULES.map((mod) => (
              <motion.article
                key={mod.id}
                variants={staggerItem}
                className="group relative rounded-[24px] p-8 sm:p-10 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-all duration-200 hover:border-[rgba(79,140,255,0.24)] hover:-translate-y-px"
                aria-label={`${mod.label}: ${mod.title}`}
              >
                {/* Module label */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="font-mono-label"
                    style={{
                      color: mod.accent === 'blue'
                        ? 'var(--accent-blue)'
                        : 'var(--accent-violet)',
                    }}
                  >
                    {mod.label}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: mod.accent === 'blue'
                        ? 'rgba(79,140,255,0.2)'
                        : 'rgba(139,92,246,0.2)',
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-[var(--text-primary)] mb-4"
                  style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', lineHeight: '1.3' }}
                >
                  {mod.title}
                </h3>

                {/* Body */}
                <p
                  className="text-body text-[var(--text-secondary)] leading-[1.7]"
                  lang="ko"
                >
                  {mod.body}
                </p>

                {/* Corner accent */}
                <div
                  className="absolute top-8 right-8 w-8 h-8 rounded-full opacity-20"
                  style={{
                    background: mod.accent === 'blue'
                      ? 'var(--accent-blue)'
                      : 'var(--accent-violet)',
                    filter: 'blur(8px)',
                  }}
                  aria-hidden="true"
                />
              </motion.article>
            ))}
          </motion.div>

          {/* Punchline */}
          <motion.div variants={staggerItem} className="relative text-center">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.08) 0%, transparent 65%)',
                filter: 'blur(50px)',
              }}
              aria-hidden="true"
            />
            <p
              className="relative font-bold text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(18px, 2vw, 28px)', lineHeight: '1.4' }}
              lang="ko"
            >
              &ldquo;AI는 속도를, 인간은 신뢰를,{' '}
              <span className="text-gradient">데이터는 다음 시장을</span> 연다.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-28" aria-hidden="true" />
    </section>
  )
}
