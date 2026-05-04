'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useReducedMotion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import SectionLabel from '@/components/ui/SectionLabel'

const STEPS = [
  {
    number: '01',
    title: 'Idea',
    desc: '주제·독자·목표 정의',
  },
  {
    number: '02',
    title: 'Draft',
    desc: '목차·초안·자료 인용 자동화',
  },
  {
    number: '03',
    title: 'Verify',
    desc: '인간 편집자 리뷰 + 출처/기여도 기록',
  },
  {
    number: '04',
    title: 'Repurpose',
    desc: '멀티포맷 IP 변환',
  },
  {
    number: '05',
    title: 'Operate',
    desc: '독자 반응·D2C·판권 확장 분석',
  },
]

// Desktop pinned scroll version
function DesktopFlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const clamped = Math.max(0, Math.min(1, v))
      setProgress(clamped)
      const step = Math.min(STEPS.length - 1, Math.floor(clamped * STEPS.length))
      setActiveStep(step)
    })
    return unsub
  }, [scrollYProgress])

  return (
    // Tall scroll container — 500vh gives the pinned section room to scroll through
    <div ref={containerRef} style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container-grid py-16">
          {/* Label + headline */}
          <div className="mb-12">
            <SectionLabel animate={false}>04 — FLOW</SectionLabel>
            <h2
              className="text-h2 font-bold text-[var(--text-primary)] mt-6 max-w-2xl"
              lang="ko"
            >
              아이디어에서 IP까지,{' '}
              <span className="text-[var(--text-secondary)] font-normal">한 플랫폼에서 끝난다.</span>
            </h2>
          </div>

          {/* Progress line track */}
          <div className="relative mb-10" aria-hidden="true">
            <div
              className="h-px w-full"
              style={{ background: 'var(--border-subtle)' }}
            />
            <motion.div
              className="absolute top-0 left-0 h-px progress-line-glow"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-violet))',
              }}
            />
          </div>

          {/* Steps row */}
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`, gap: '16px' }}
            role="list"
            aria-label="5-step IP flow"
          >
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStep
              const isPast   = idx < activeStep

              return (
                <div
                  key={step.number}
                  role="listitem"
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${step.number}: ${step.title} — ${step.desc}`}
                >
                  {/* Step number */}
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

                  {/* Step title */}
                  <motion.h3
                    animate={{
                      color: isActive || isPast
                        ? 'var(--text-primary)'
                        : 'var(--text-muted)',
                      scale: isActive ? 1.04 : 1,
                      originX: 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className="font-bold mb-2"
                    style={{ fontSize: 'clamp(18px, 1.8vw, 26px)', lineHeight: '1.2' }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Step description */}
                  <motion.p
                    animate={{
                      opacity: isActive ? 1 : isPast ? 0.5 : 0.3,
                    }}
                    transition={{ duration: 0.35 }}
                    className="text-[var(--text-secondary)] leading-[1.6]"
                    style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}
                    lang="ko"
                  >
                    {step.desc}
                  </motion.p>
                </div>
              )
            })}
          </div>

          {/* Closing line */}
          <motion.p
            className="mt-14 font-bold text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}
            animate={{ opacity: progress > 0.85 ? 1 : 0, y: progress > 0.85 ? 0 : 12 }}
            transition={{ duration: 0.5 }}
            lang="ko"
            aria-live="polite"
          >
            &ldquo;한 번 쓴 원고가, 다섯 번의 매출 기회로 자라난다.&rdquo;
          </motion.p>
        </div>
      </div>
    </div>
  )
}

// Mobile vertical stepper (auto-progresses on intersection)
function MobileFlow() {
  const [activeStep, setActiveStep] = useState(-1)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = stepRefs.current.map((el, idx) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(idx)
        },
        { threshold: 0.6 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <div className="container-grid py-0">
      {/* Label + headline */}
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
          className="text-h2 font-bold text-[var(--text-primary)] mt-6"
          lang="ko"
        >
          아이디어에서 IP까지,{' '}
          <span className="text-[var(--text-secondary)] font-normal">한 플랫폼에서 끝난다.</span>
        </motion.h2>
      </motion.div>

      {/* Vertical steps */}
      <div className="flex flex-col" role="list" aria-label="5-step IP flow">
        {STEPS.map((step, idx) => {
          const isActive = idx <= activeStep

          return (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[idx] = el }}
              role="listitem"
              className="flex gap-6 pb-12 last:pb-0"
            >
              {/* Left: line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className="w-3 h-3 rounded-full border-2 flex-shrink-0 transition-all duration-400"
                  style={{
                    borderColor: isActive ? 'var(--accent-blue)' : 'var(--border-subtle)',
                    background: isActive ? 'var(--accent-blue)' : 'transparent',
                  }}
                  aria-hidden="true"
                />
                {idx < STEPS.length - 1 && (
                  <div
                    className="w-px flex-1 mt-2 transition-all duration-500"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to bottom, var(--accent-blue), var(--border-subtle))'
                        : 'var(--border-subtle)',
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Right: content */}
              <div className="pb-2">
                <span className="font-mono-label block mb-2 text-[var(--accent-blue)]">
                  {step.number}
                </span>
                <h3
                  className="font-bold mb-2 transition-colors duration-300"
                  style={{
                    fontSize: '22px',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-body text-[var(--text-secondary)] transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0.4 }}
                  lang="ko"
                >
                  {step.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Closing line */}
      <motion.p
        className="mt-14 font-bold text-[var(--text-primary)]"
        style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6 }}
        lang="ko"
      >
        &ldquo;한 번 쓴 원고가, 다섯 번의 매출 기회로 자라난다.&rdquo;
      </motion.p>
    </div>
  )
}

export default function Flow() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="flow"
      aria-labelledby="flow-heading"
      className="relative overflow-hidden"
    >
      {/* Hidden heading for accessibility */}
      <h2 id="flow-heading" className="sr-only">
        04 — FLOW: How It Works
      </h2>

      <div className="section-divider" aria-hidden="true" />

      {/* Desktop: pinned scroll */}
      <div className="hidden lg:block">
        <DesktopFlow />
      </div>

      {/* Mobile/tablet: vertical stepper */}
      <div className="lg:hidden section-padding">
        <MobileFlow />
      </div>

      <div className="section-divider" aria-hidden="true" />
    </section>
  )
}
