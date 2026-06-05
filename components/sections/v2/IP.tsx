'use client'

import { motion } from 'framer-motion'

const CARDS = [
  {
    icon: '✦',
    accent: '#4F8CFF',
    accentBg: 'rgba(79,140,255,0.12)',
    border: 'rgba(79,140,255,0.18)',
    label: '출판 · ISBN · 유통',
    title: '쓰는 순간부터\n당신의 것입니다.',
    body: '리함로그가 ISBN을 발급하고 리디북스, 교보문고, 밀리의서재에 유통합니다. 한 편의 이야기가 다섯 번의 매출 기회로 자랍니다.',
    tags: [],
    bottom: '',
  },
  {
    icon: '◈',
    accent: '#7B6CF6',
    accentBg: 'rgba(123,108,246,0.12)',
    border: 'rgba(123,108,246,0.18)',
    label: '미디어 확장',
    title: '당신의 이야기가\n또 다른 세계로.',
    body: '텍스트에서 시작한 이야기가 산업을 넘나듭니다.',
    tags: ['드라마', '웹툰', '오디오북', '게임', '그 너머'],
    bottom: '',
  },
  {
    icon: '⬡',
    accent: '#8B5CF6',
    accentBg: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.18)',
    label: '저작권 · IP 보호',
    title: '쓰는 순간부터\n기록됩니다.',
    body: '창작 시점이 보존되고, 당신의 IP가 보호됩니다. 판권 협상의 자산이 됩니다.',
    tags: [],
    bottom: '',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function IP() {
  return (
    <section id="ip" className="relative py-28 sm:py-36 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(79,140,255,0.07) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)',
      }} aria-hidden="true" />

      <div className="container-grid px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

          {/* 레이블 */}
          <motion.p variants={item} className="font-mono-label text-[var(--accent-blue)] mb-5 uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            06 — YOUR IP
          </motion.p>

          {/* 헤드라인 */}
          <motion.h2 variants={item} className="font-black text-[var(--text-primary)] mb-16 sm:mb-20"
            style={{ fontSize: 'clamp(26px, 4vw, 56px)', lineHeight: 1.15, letterSpacing: '-0.025em' }} lang="ko">
            당신의 이야기는<br />
            <span style={{
              background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>사라지지 않습니다.</span>
          </motion.h2>

          {/* 카드 3개 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14 sm:mb-16">
            {CARDS.map((card) => (
              <motion.div
                key={card.label}
                variants={item}
                className="rounded-2xl flex flex-col"
                style={{
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${card.border}`,
                  padding: 'clamp(28px, 3vw, 36px)',
                }}
              >
                {/* 아이콘 + 레이블 */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                    style={{ background: card.accentBg, color: card.accent }}>
                    {card.icon}
                  </div>
                  <span className="font-bold" style={{ fontSize: '11px', letterSpacing: '0.1em', color: card.accent }}>
                    {card.label}
                  </span>
                </div>

                {/* 제목 */}
                <h3 className="font-bold text-white mb-6"
                  style={{ fontSize: 'clamp(20px, 1.9vw, 26px)', lineHeight: 1.3, fontWeight: 700, whiteSpace: 'pre-line' }} lang="ko">
                  {card.title}
                </h3>

                {/* 본문 */}
                <p style={{ fontSize: 'clamp(13px, 1.15vw, 15px)', lineHeight: 1.8, color: '#B8BFD0' }} lang="ko">
                  {card.body}
                </p>

                {/* 태그 (미디어 확장 카드) */}
                {card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {card.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-full font-medium"
                        style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'rgba(123,108,246,0.09)', border: '1px solid rgba(123,108,246,0.22)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* 인용구 */}
          <motion.div variants={item} className="text-center">
            <blockquote className="font-bold inline-block"
              style={{ fontSize: 'clamp(15px, 1.6vw, 22px)', letterSpacing: '-0.01em', color: 'var(--text-secondary)' }} lang="ko">
              &ldquo;그것이 IP입니다. 그것이 당신의 자산입니다.&rdquo;
            </blockquote>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
