'use client'

import { motion } from 'framer-motion'

const CARDS = [
  {
    num: '01',
    title: '좋은 아이디어는 작품이 되지 못한다',
    body: '자료조사, 구조화, 집필, 편집 — 출간 의지가 강한 저자조차 원고를 끝내지 못하는 이유입니다.',
    color: '#4F8CFF',
  },
  {
    num: '02',
    title: '완성된 작품도 IP가 되지 못한다',
    body: '같은 이야기가 드라마, 웹툰, 오디오북으로 확장될 수 있는데 — 한 권으로 사라집니다.',
    color: '#7B6CF6',
  },
  {
    num: '03',
    title: '작가는 자신의 독자를 소유하지 못한다',
    body: '플랫폼 알고리즘에 종속된 채, 팬덤과 데이터를 자기 자산으로 쌓지 못합니다.',
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

export default function Problem() {
  return (
    <section id="problem" className="relative py-28 sm:py-36" style={{ background: 'var(--bg-base)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.2), transparent)',
      }} aria-hidden="true" />

      <div className="container-grid px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

          {/* 레이블 */}
          <motion.p variants={item} className="font-mono-label text-[var(--accent-blue)] mb-5 uppercase" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            03 — THE PROBLEM
          </motion.p>

          {/* 헤드라인 */}
          <motion.h2 variants={item} className="font-black text-[var(--text-primary)] mb-16 sm:mb-20"
            style={{ fontSize: 'clamp(26px, 4vw, 56px)', lineHeight: 1.15, letterSpacing: '-0.025em' }} lang="ko">
            출판은 이미 IP 산업으로 바뀌었습니다.<br />
            그러나 작가는 여전히 혼자입니다.
          </motion.h2>

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
                  padding: 'clamp(28px,3vw,36px)',
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span className="font-mono-label font-bold" style={{ fontSize: '11px', color: card.color, letterSpacing: '0.1em' }}>
                  {card.num}
                </span>
                <div className="w-8 h-0.5 rounded-full" style={{ background: card.color }} aria-hidden="true" />
                <h3 className="font-bold text-white"
                  style={{ fontSize: 'clamp(20px,1.9vw,26px)', lineHeight: 1.3 }} lang="ko">
                  {card.title}
                </h3>
                <p className="mt-6 leading-relaxed"
                  style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.75, color: '#B8BFD0' }} lang="ko">
                  {card.body}
                </p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${card.color}10, transparent 70%)` }} aria-hidden="true" />
              </motion.article>
            ))}
          </div>

          {/* 인용구 */}
          <motion.div variants={item} className="text-center">
            <blockquote
              className="font-bold text-[var(--text-secondary)] inline-block"
              style={{ fontSize: 'clamp(16px, 1.8vw, 24px)', letterSpacing: '-0.01em' }}
              lang="ko"
            >
              &ldquo;텍스트는 산업이 됐는데, 작가는 여전히 혼자다.&rdquo;
            </blockquote>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
