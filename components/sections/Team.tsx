'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const TEAM = [
  { role: 'CEO / Strategy',            initials: 'CS', color: 'var(--accent-blue)' },
  { role: 'Head of Product',           initials: 'HP', color: 'var(--accent-violet)' },
  { role: 'Head of AI & Backend',      initials: 'AB', color: 'var(--accent-blue)' },
  { role: 'Head of Frontend',          initials: 'FE', color: 'var(--accent-violet)' },
  { role: 'Senior Editorial PM',       initials: 'EP', color: 'var(--accent-blue)' },
  { role: 'Senior Editor Network',     initials: 'SE', color: 'var(--text-muted)', sub: 'part-time pool' },
]

export default function Team() {
  return (
    <section
      id="company"
      aria-labelledby="team-heading"
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
            <SectionLabel animate={false}>08 — COMPANY</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="team-heading"
            variants={staggerItem}
            className="text-h2 font-bold text-[var(--text-primary)] mb-6 max-w-3xl"
            lang="ko"
          >
            우리는 작가를{' '}
            <span className="text-gradient">&lsquo;끝까지 데려가는 팀&rsquo;</span>으로 시작한다.
          </motion.h2>

          {/* Body description */}
          <motion.p
            variants={staggerItem}
            className="text-body-l text-[var(--text-secondary)] mb-16 sm:mb-20 max-w-2xl"
            lang="ko"
          >
            출판 현장 경험, AI 제품 설계, 편집 신뢰 시스템을 한 조직에 통합한 보기 드문 구성.
          </motion.p>

          {/* Team grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-20 sm:mb-24"
            role="list"
            aria-label="Founding team"
          >
            {TEAM.map((member) => (
              <motion.div
                key={member.role}
                variants={staggerItem}
                role="listitem"
                className="group relative rounded-[24px] p-6 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-all duration-200 hover:border-[rgba(79,140,255,0.24)] hover:-translate-y-px"
                aria-label={member.role}
              >
                {/* Avatar placeholder — geometric initial */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-[14px] text-[var(--bg-base)]"
                  style={{ background: member.color }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>

                {/* Role */}
                <h3
                  className="font-semibold text-[var(--text-primary)] leading-[1.3]"
                  style={{ fontSize: 'clamp(13px, 1.2vw, 15px)' }}
                >
                  {member.role}
                </h3>

                {/* Sub label (e.g., part-time pool) */}
                {member.sub && (
                  <p className="font-mono-label mt-1" style={{ fontSize: '11px' }}>
                    {member.sub}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Company info block */}
          <motion.div
            variants={staggerItem}
            className="rounded-[24px] p-8 sm:p-10 border border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
            aria-label="Company information"
          >
            <p className="font-mono-label mb-4">회사 정보 / Company</p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-[var(--text-primary)] text-[20px] mb-1">
                  Reehamlog Inc.
                </h3>
                <p className="text-[var(--text-secondary)] text-body" lang="ko">
                  리함로그 주식회사
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono-label" style={{ color: 'var(--accent-blue)', fontSize: '11px' }}>
                    FOUNDED
                  </span>
                  <span className="text-[var(--text-secondary)] text-body">2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono-label" style={{ color: 'var(--accent-blue)', fontSize: '11px' }}>
                    HQ
                  </span>
                  <span className="text-[var(--text-secondary)] text-body">Seoul, Republic of Korea</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono-label" style={{ color: 'var(--accent-blue)', fontSize: '11px' }}>
                    CONTACT
                  </span>
                  <a
                    href="mailto:contact@reehamlog.com"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors duration-150 text-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-blue)] rounded-sm"
                  >
                    contact@reehamlog.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-28" aria-hidden="true" />
    </section>
  )
}
