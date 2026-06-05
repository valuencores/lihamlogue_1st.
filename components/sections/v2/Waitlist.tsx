'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const TILES = [
  { label: '작가로 시작하고 싶다면',  cta: 'Join the Waitlist',   color: '#4F8CFF', bg: 'rgba(79,140,255,0.06)',   border: 'rgba(79,140,255,0.22)'  },
  { label: '투자에 관심 있다면',      cta: 'Investor Deck 요청',  color: '#7B6CF6', bg: 'rgba(123,108,246,0.06)', border: 'rgba(123,108,246,0.22)' },
  { label: '함께 만들고 싶다면',      cta: '팀에 연락하기',        color: '#8B5CF6', bg: 'rgba(139,92,246,0.06)',  border: 'rgba(139,92,246,0.22)'  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail]   = useState('')
  const [name, setName]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return
    setLoading(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role: 'writer', message: '웨이트리스트 신청' }),
      })
    } catch { /* silent */ }
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="waitlist" className="relative py-28 sm:py-36 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* 배경 글로우 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(79,140,255,0.09) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)',
      }} aria-hidden="true" />

      <div className="container-grid px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

          {/* 레이블 */}
          <motion.p variants={item} className="font-mono-label text-[var(--accent-violet)] mb-5 uppercase text-center"
            style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            07 — JOIN US
          </motion.p>

          {/* 헤드라인 */}
          <motion.h2 variants={item} className="font-black text-[var(--text-primary)] text-center mb-6"
            style={{ fontSize: 'clamp(28px, 4.5vw, 60px)', lineHeight: 1.12, letterSpacing: '-0.025em' }} lang="ko">
            당신의 이야기를 기다립니다.
          </motion.h2>

          {/* 본문 */}
          <motion.p variants={item} className="text-[var(--text-secondary)] text-center mx-auto mb-12 sm:mb-14"
            style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.85, maxWidth: '480px' }} lang="ko">
            리함로그는 아직 만들어지고 있습니다.<br />
            하지만 당신의 이야기는 지금 시작될 수 있습니다.<br />
            <span className="text-[var(--text-primary)] font-medium">가장 먼저 경험할 창작자를 기다립니다.</span>
          </motion.p>

          {/* 폼 */}
          <motion.div variants={item} className="max-w-md mx-auto mb-14 sm:mb-16">
            {submitted ? (
              <div className="rounded-2xl p-8 text-center"
                style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(79,140,255,0.25)' }}>
                <p className="text-2xl mb-3">✦</p>
                <p className="font-bold text-[var(--text-primary)] mb-2" style={{ fontSize: '18px' }} lang="ko">
                  이름이 올라갔습니다.
                </p>
                <p className="text-[var(--text-secondary)]" style={{ fontSize: '14px' }} lang="ko">
                  가장 먼저 연락드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
                style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full h-11 px-4 rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px' }} lang="ko" />
                <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full h-11 px-4 rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px' }} />
                <button type="submit" disabled={loading}
                  className="w-full h-12 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
                  style={{ fontSize: '15px', background: 'linear-gradient(135deg, #4F8CFF, #8B5CF6)' }}>
                  {loading ? '처리 중...' : '이름 올리기 →'}
                </button>
              </form>
            )}
          </motion.div>

          {/* CTA 타일 3개 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TILES.map((tile, i) => (
              <motion.button
                key={tile.cta}
                variants={item}
                className="rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: tile.bg, border: `1px solid ${tile.border}` }}
                onClick={() => {
                  if (i === 0) {
                    document.querySelector<HTMLInputElement>('input[placeholder="이름"]')?.focus()
                  } else {
                    window.location.href = `mailto:contact@lihamlogue.com?subject=${encodeURIComponent(tile.cta)}`
                  }
                }}
              >
                <p className="text-[var(--text-muted)] mb-3" style={{ fontSize: '12px' }} lang="ko">
                  {tile.label}
                </p>
                <p className="font-semibold" style={{ fontSize: '14px', color: tile.color }}>
                  {tile.cta} →
                </p>
              </motion.button>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
