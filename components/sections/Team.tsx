'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const TEAM = [
  { role: 'CEO / Strategy',        initials: 'CS', color: 'var(--accent-blue)'   },
  { role: 'Head of Product',       initials: 'HP', color: 'var(--accent-violet)' },
  { role: 'Head of AI & Backend',  initials: 'AB', color: 'var(--accent-blue)'   },
  { role: 'Head of Frontend',      initials: 'FE', color: 'var(--accent-violet)' },
  { role: 'Senior Editorial PM',   initials: 'EP', color: 'var(--accent-blue)'   },
  { role: 'Senior Editor Network', initials: 'SE', color: 'var(--text-muted)',   sub: 'part-time pool' },
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
          <motion.div variants={staggerItem} className="mb-14">
            <SectionLabel animate={false}>08 — COMPANY</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="team-heading"
            variants={staggerItem}
            className="text-h2 text-[var(--text-primary)] max-w-3xl mb-6"
            lang="ko"
          >
            우리는 작가를{' '}
            <span className="text-gradient">&lsquo;끝까지 데려가는 팀&rsquo;</span>으로 시작한다.
          </motion.h2>

          {/* Sub copy */}
          <motion.p
            variants={staggerItem}
            className="text-body-l text-[var(--text-secondary)] max-w-xl mb-16 sm:mb-20 leading-[1.7]"
            lang="ko"
          >
            출판 현장 경험, AI 제품 설계, 편집 신뢰 시스템을 한 조직에 통합한 보기 드문 구성.
          </motion.p>

          {/* Team grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16 sm:mb-20"
            role="list"
            aria-label="Founding team"
          >
            {TEAM.map((member) => (
              <motion.div
                key={member.role}
                variants={staggerItem}
                role="listitem"
                className="group relative rounded-[20px] p-6 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-all duration-200 hover:border-[var(--border-hover)] hover:-translate-y-px"
                aria-label={member.role + (member.sub ? ` (${member.sub})` : '')}
              >
                {/* Geometric avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4 font-bold text-[13px]"
                  style={{
                    background: member.color,
                    color: 'var(--bg-base)',
                  }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>

                {/* Role */}
                <h3
                  className="font-semibold text-[var(--text-primary)] leading-[1.3]"
                  style={{ fontSize: 'clamp(12px, 1.1vw, 15px)' }}
                >
                  {member.role}
                </h3>

                {/* Sub label */}
                {member.sub && (
                  <p className="font-mono-label mt-1" style={{ fontSize: '10px' }}>
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
            <p className="font-mono-label mb-6">회사 정보 / Company</p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-black text-[var(--text-primary)] mb-1" style={{ fontSize: '22px' }}>
                  Reehamlog Inc.
                </h3>
                <p className="text-[var(--text-secondary)]" style={{ fontSize: '15px' }} lang="ko">
                  리함로그 주식회사
                </p>
              </div>

              <dl className="flex flex-col gap-2.5">
                {[
                  { key: 'Founded', value: '2026' },
                  { key: 'HQ',      value: 'Seoul, Republic of Korea' },
                  { key: 'Contact', value: 'contact@reehamlog.com', isEmail: true },
                ].map(({ key, value, isEmail }) => (
                  <div key={key} className="flex items-baseline gap-3">
                    <dt
                      className="font-mono-label flex-shrink-0"
                      style={{ color: 'var(--accent-blue)', fontSize: '10px', minWidth: '62px' }}
                    >
                      {key}
                    </dt>
                    <dd className="text-[var(--text-secondary)]" style={{ fontSize: '14px' }}>
                      {isEmail ? (
                        <a
                          href={`mailto:${value}`}
                          className="hover:text-[var(--accent-blue)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-blue)] rounded-sm"
                        >
                          {value}
                        </a>
                      ) : value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-20 sm:mt-28" aria-hidden="true" />
    </section>
  )
}
