'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const G: React.CSSProperties = {
  background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }))

    let raf: number
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      t += 0.01
      stars.forEach((s) => {
        const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.speed * 100 + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,210,255,${alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* 별빛 캔버스 */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* 글로우 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(79,140,255,0.13) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '20%',
          width: '400px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="relative z-10 container-grid text-center px-6">

        {/* 브랜드 태그라인 */}
        <motion.p
          className="font-mono-label text-[var(--text-muted)] mb-8 uppercase tracking-widest"
          style={{ fontSize: 'clamp(9px, 0.9vw, 11px)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          ILHAM&nbsp;·&nbsp;LANGUE&nbsp;·&nbsp;LOGUE&nbsp;&nbsp;/&nbsp;&nbsp;영감&nbsp;·&nbsp;구조&nbsp;·&nbsp;기록
        </motion.p>

        {/* H1 */}
        <motion.h1
          className="font-black mb-7"
          style={{ fontSize: 'clamp(38px, 6.5vw, 92px)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
          lang="ko"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease }}
        >
          <span style={{ color: 'var(--text-primary)' }}>당신 안에 이미<br /></span>
          <span style={G}>이야기가 있습니다.</span>
        </motion.h1>

        {/* 본문 1 */}
        <motion.p
          className="text-[var(--text-secondary)] mb-3 mx-auto"
          style={{ fontSize: 'clamp(15px, 1.7vw, 20px)', lineHeight: 1.75, maxWidth: '480px' }}
          lang="ko"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease }}
        >
          당신이 알고 있는 것, 세상도 알아야 합니다.
        </motion.p>

        {/* 본문 2 — IP 강조 */}
        <motion.p
          className="text-[var(--text-secondary)] mb-10 mx-auto"
          style={{ fontSize: 'clamp(15px, 1.7vw, 20px)', lineHeight: 1.75, maxWidth: '480px' }}
          lang="ko"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52, ease }}
        >
          당신의 이야기는 가치 창출의{' '}
          <span style={{ ...G, fontWeight: 600 }}>IP가 됩니다.</span>
        </motion.p>

        {/* 버튼 */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease }}
        >
          <button
            onClick={() => document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-9 rounded-full text-white font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              fontSize: '15px', height: '52px',
              background: 'linear-gradient(135deg, #4F8CFF, #8B5CF6)',
              boxShadow: '0 0 36px rgba(79,140,255,0.28)',
            }}
          >
            지금 시작하기
          </button>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-10 mx-auto rounded-full"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(79,140,255,0.5))' }}
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
