'use client'

import { motion } from 'framer-motion'

const CARDS = [
  {
    num: '01',
    title: '책',
    body: '이야기는 종이 위에서 시작됩니다. 수백 년간 인류가 지식과 감정을 전달해온 방식. 텍스트는 가장 오래된 미디어입니다.',
    color: '#4F8CFF',
  },
  {
    num: '02',
    title: '미디어',
    body: '하나의 이야기가 드라마가 되고, 영화가 되고, 웹툰이 됩니다. 텍스트는 모든 콘텐츠 산업의 원천입니다.',
    color: '#7B6CF6',
  },
  {
    num: '03',
    title: 'IP',
    body: '이야기는 자산입니다. 하나의 텍스트가 수십 년간 가치를 만들어냅니다. 당신의 이야기도 그렇게 될 수 있습니다.',
    color: '#8B5CF6',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function TextSection() {
  return (
    <section id="text" className="relative py-28 sm:py-36" style={{ background: 'var(--bg-soft)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.2), transparent)',
      }} aria-hidden="true" />

      <div className="container-grid px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

          {/* 레이블 */}
          <motion.p variants={item} className="font-mono-label text-[var(--accent-blue)] mb-5 uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            02 — TEXT
          </motion.p>

          {/* 헤드라인 */}
          <motion.h2 variants={item} className="font-black text-[var(--text-primary)] mb-16 sm:mb-20"
            style={{ fontSize: 'clamp(26px, 4vw, 56px)', lineHeight: 1.15, letterSpacing: '-0.025em' }} lang="ko">
            모든 콘텐츠의 출발점은<br />여전히 텍스트입니다.
          </motion.h2>

          {/* 카드 3개 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16 sm:mb-20">
            {CARDS.map((card) => (
              <motion.article
                key={card.num}
                variants={item}
                className="relative rounded-2xl flex flex-col gap-0 group"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: 'clamp(28px, 3vw, 36px)',
                }}
                whileHover={{ y: -4, borderColor: `${card.color}35`, transition: { duration: 0.2 } }}
              >
                <span className="font-mono-label font-bold mb-4"
                  style={{ fontSize: '11px', color: card.color, letterSpacing: '0.1em' }}>
                  {card.num}
                </span>
                <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: card.color }} aria-hidden="true" />
                <h3 className="font-bold text-white mb-6"
                  style={{ fontSize: 'clamp(20px, 1.9vw, 26px)', lineHeight: 1.3, fontWeight: 700 }} lang="ko">
                  {card.title}
                </h3>
                <p style={{ fontSize: 'clamp(13px, 1.15vw, 15px)', lineHeight: 1.8, color: '#B8BFD0' }} lang="ko">
                  {card.body}
                </p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${card.color}10, transparent 70%)` }} aria-hidden="true" />
              </motion.article>
            ))}
          </div>

          {/* 인용구 */}
          <motion.div variants={item} className="text-center">
            <blockquote className="font-bold inline-block"
              style={{ fontSize: 'clamp(16px, 1.8vw, 24px)', letterSpacing: '-0.01em', color: 'var(--text-secondary)' }} lang="ko">
              &ldquo;텍스트는 산업이 됐다.&rdquo;
            </blockquote>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
