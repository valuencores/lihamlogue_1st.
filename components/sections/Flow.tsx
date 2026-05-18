'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const STEPS = [
  { number: '01', title: 'Idea',      desc: '주제·독자·목표 정의' },
  { number: '02', title: 'Draft',     desc: '목차·초안·자료 인용 자동화' },
  { number: '03', title: 'Verify',    desc: '인간 편집자 리뷰 + 출처/기여도 기록' },
  { number: '04', title: 'Repurpose', desc: '멀티포맷 IP 변환' },
  { number: '05', title: 'Operate',   desc: '독자 반응·D2C·판권 확장 분석' },
]

const TAGLINE = '한 번 쓴 원고가, 다섯 번의 매출 기회로 자라난다.'

// ── Desktop: 5단계를 한 화면에 가로로 표시 ──────
function DesktopFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  // 섹션이 뷰포트 안에 들어오면 순차적으로 스텝 활성화
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let step = 0
          const timer = setInterval(() => {
            setActiveStep(step)
            step++
            if (step >= STEPS.length) clearInterval(timer)
          }, 260)
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const progress = (activeStep + 1) / STEPS.length

  return (
    <div ref={sectionRef} className="container-grid py-0">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-14"
      >
        <motion.div variants={staggerItem}>
          <SectionLabel animate={false}>04 — FLOW</SectionLabel>
        </motion.div>
        <motion.h2
          variants={staggerItem}
          className="text-h2 text-[var(--text-primary)] mt-6 max-w-2xl"
          lang="ko"
        >
          아이디어에서 IP까지,{' '}
          <span className="text-[var(--text-secondary)] font-normal">한 플랫폼에서 끝난다.</span>
        </motion.h2>
      </motion.div>

      {/* Progress track */}
      <div className="relative mb-10" aria-hidden="true">
        <div className="h-px w-full" style={{ background: 'var(--border-subtle)' }} />
        <motion.div
          className="absolute top-0 left-0 h-px progress-line-glow"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-violet))' }}
        />
      </div>

      {/* Steps row */}
      <div
        className="grid mb-14"
        style={{ gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`, gap: '16px' }}
        role="list"
        aria-label="IP flow — 5 steps"
      >
        {STEPS.map((step, idx) => {
          const isActive = idx === activeStep
          const isPast   = idx <  activeStep

          return (
            <div
              key={step.number}
              role="listitem"
              aria-current={isActive ? 'step' : undefined}
            >
              <motion.div
                className="font-mono-label mb-3"
                animate={{
                  color: isActive
                    ? 'var(--accent-blue)'
                    : isPast
                    ? 'rgba(79,140,255,0.5)'
                    : 'var(--text-muted)',
                }}
                transition={{ duration: 0.3 }}
              >
                {step.number}
              </motion.div>

              <motion.h3
                className="font-bold mb-2"
                style={{ fontSize: 'clamp(17px, 1.7vw, 24px)', lineHeight: 1.2 }}
                animate={{
                  color:   isActive || isPast ? 'var(--text-primary)' : 'var(--text-muted)',
                  scale:   isActive ? 1.04 : 1,
                  originX: 0,
                }}
                transition={{ duration: 0.35 }}
              >
                {step.title}
              </motion.h3>

              <motion.p
                className="text-[var(--text-secondary)] leading-[1.65]"
                style={{ fontSize: 'clamp(12px, 0.95vw, 14px)' }}
                animate={{ opacity: isActive ? 1 : isPast ? 0.55 : 0.25 }}
                transition={{ duration: 0.35 }}
                lang="ko"
              >
                {step.desc}
              </motion.p>
            </div>
          )
        })}
      </div>

      {/* Tagline */}
      <motion.p
        className="font-bold text-[var(--text-primary)]"
        style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', letterSpacing: '-0.01em' }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.55 }}
        lang="ko"
      >
        &ldquo;{TAGLINE}&rdquo;
      </motion.p>
    </div>
  )
}

// ── Mobile: vertical stepper ───────────────────
function MobileFlow() {
  const [activeStep, setActiveStep] = useState(-1)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = stepRefs.current.map((el, idx) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(idx) },
        { threshold: 0.55 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <div className="container-grid py-0">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-14"
      >
        <motion.div variants={staggerItem}>
          <SectionLabel animate={false}>04 — FLOW</SectionLabel>
        </motion.div>
        <motion.h2
          variants={staggerItem}
          className="text-h2 text-[var(--text-primary)] mt-6"
          lang="ko"
        >
          아이디어에서 IP까지,{' '}
          <span className="text-[var(--text-secondary)] font-normal">한 플랫폼에서 끝난다.</span>
        </motion.h2>
      </motion.div>

      <div className="flex flex-col" role="list" aria-label="IP flow — 5 steps">
        {STEPS.map((step, idx) => {
          const active = idx <= activeStep
          return (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[idx] = el }}
              role="listitem"
              className="flex gap-6 pb-12 last:pb-0"
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-400"
                  style={{
                    borderColor: active ? 'var(--accent-blue)' : 'var(--border-subtle)',
                    background:  active ? 'var(--accent-blue)' : 'transparent',
                    boxShadow:   active ? '0 0 10px rgba(79,140,255,0.5)' : 'none',
                  }}
                  aria-hidden="true"
                />
                {idx < STEPS.length - 1 && (
                  <div
                    className="w-px flex-1 mt-2 transition-all duration-500"
                    style={{
                      background: active
                        ? 'linear-gradient(to bottom, var(--accent-blue), var(--border-subtle))'
                        : 'var(--border-subtle)',
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="pb-2">
                <span className="font-mono-label block mb-2 text-[var(--accent-blue)]">
                  {step.number}
                </span>
                <h3
                  className="font-bold mb-2 transition-colors duration-300"
                  style={{ fontSize: '21px', color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[var(--text-secondary)] leading-[1.65] transition-opacity duration-300"
                  style={{ fontSize: '15px', opacity: active ? 1 : 0.35 }}
                  lang="ko"
                >
                  {step.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <motion.p
        className="mt-14 font-bold text-[var(--text-primary)]"
        style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', letterSpacing: '-0.01em' }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6 }}
        lang="ko"
      >
        &ldquo;{TAGLINE}&rdquo;
      </motion.p>
    </div>
  )
}

export default function Flow() {
  const reduced = useReducedMotion()

  return (
    <section
      id="flow"
      aria-labelledby="flow-heading"
      className="section-padding relative overflow-hidden"
    >
      <h2 id="flow-heading" className="sr-only">04 — FLOW: How It Works</h2>

      <div className="section-divider" aria-hidden="true" />

      <div className="hidden lg:block">
        {reduced ? <MobileFlow /> : <DesktopFlow />}
      </div>

      <div className="lg:hidden">
        <MobileFlow />
      </div>

      <div className="section-divider mt-0" aria-hidden="true" />
    </section>
  )
}
