'use client'

import { motion } from 'framer-motion'

const CARDS = [
  {
    num: '01',
    title: '출판이 바뀌었다',
    body: '종이책 한 권으로 끝나던 시대는 지났습니다. 하나의 이야기가 드라마, 웹툰, 오디오북, 게임으로 확장되는 것이 산업의 표준이 됐습니다.',
    color: '#4F8CFF',
  },
  {
    num: '02',
    title: 'AI가 창작의 방식을 바꿨다',
    body: 'AI가 대신 쓰는 시대가 아닙니다. 방대한 정보와 구조를 창작자의 언어로 꺼내주는 시대입니다. 당신이 이끌고, AI가 따라옵니다.',
    color: '#7B6CF6',
  },
  {
    num: '03',
    title: '창작자에게 도구가 없었다',
    body: '재능은 있었습니다. 시스템이 없었습니다. 아이디어에서 IP까지, 창작자 혼자 감당하기엔 너무 먼 거리였습니다.',
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

const G: React.CSSProperties = {
  background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function WhyNow() {
  return (
    <section id="whynow" className="relative py-28 sm:py-36" style={{ background: 'var(--bg-soft)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)',
      }} aria-hidden="true" />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(79,140,255,0.07) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />
      </div>

      <div className="container-grid px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

          {/* 레이블 */}
          <motion.p variants={item} className="font-mono-label text-[var(--accent-violet)] mb-5 uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            04 — WHY NOW
          </motion.p>

          {/* 헤드라인 */}
          <motion.h2 variants={item} className="font-black text-[var(--text-primary)] mb-5"
            style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', lineHeight: 1.12, letterSpacing: '-0.03em' }} lang="ko">
            <span style={G}>지금이 바로 그 타이밍입니다.</span>
          </motion.h2>

          {/* 서브 */}
          <motion.p variants={item} className="text-[var(--text-secondary)] mb-16 sm:mb-20"
            style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', lineHeight: 1.75, maxWidth: '500px' }} lang="ko">
            기술과 시장과 창작자의 니즈가 동시에 만나고 있습니다.<br />
            출판이 IP 산업으로 재편되는 지금, 리함로그가 그 교차점에 있습니다.
          </motion.p>

          {/* 카드 3개 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16 sm:mb-20">
            {CARDS.map((card) => (
              <motion.article
                key={card.num}
                variants={item}
                className="relative rounded-2xl flex flex-col group"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: 'clamp(28px, 3vw, 36px)',
                }}
                whileHover={{ y: -4, borderColor: `${card.color}35`, transition: { duration: 0.2 } }}
              >
                <span className="font-mono-label font-bold mb-4 block"
                  style={{ fontSize: '11px', color: card.color, letterSpacing: '0.1em' }}>
                  {card.num}
                </span>
                <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: card.color }} aria-hidden="true" />
                <h3 className="font-bold text-white mb-6"
                  style={{ fontSize: 'clamp(20px, 1.9vw, 26px)', lineHeight: 1.3 }} lang="ko">
                  {card.title}
                </h3>
                <p style={{ fontSize: 'clamp(14px, 1.15vw, 15px)', lineHeight: 1.8, color: '#B8BFD0' }} lang="ko">
                  {card.body}
                </p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${card.color}10, transparent 70%)` }} aria-hidden="true" />
              </motion.article>
            ))}
          </div>

          {/* 시장 데이터 */}
          <motion.div variants={item} className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { num: '1.2조', label: '국내 전자유통 시장' },
              { num: '8,000억', label: '웹소설 연간 시장' },
              { num: '+15%', label: 'IP 파생 시장 연성장률' },
            ].map((stat) => (
              <div key={stat.num} className="flex items-baseline gap-2">
                <span className="font-black" style={{ fontSize: 'clamp(22px,2.5vw,32px)', letterSpacing: '-0.02em', ...G }}>
                  {stat.num}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }} lang="ko">{stat.label}</span>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
