'use client'

import { motion } from 'framer-motion'

const STATS = [
  {
    num: '3%',
    label: '원고를 끝까지 완성하는 작가',
    sub: '아이디어는 있다. 끝이 없을 뿐이다.',
    color: '#4F8CFF',
  },
  {
    num: '2년',
    label: '출판사 계약까지 걸리는 평균 시간',
    sub: '완성해도 세상에 나오기까지 멀다.',
    color: '#7B6CF6',
  },
  {
    num: '1%',
    label: '출간된 책이 IP로 확장되는 비율',
    sub: '대부분의 이야기는 책 한 권으로 끝난다.',
    color: '#8B5CF6',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function Reality() {
  return (
    <section id="reality" className="relative py-28 sm:py-36" style={{ background: 'var(--bg-soft)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.2), transparent)',
      }} aria-hidden="true" />

      <div className="container-grid px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

          {/* 레이블 */}
          <motion.p variants={item} className="font-mono-label text-[var(--accent-blue)] mb-5 uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            02 — REALITY
          </motion.p>

          {/* 헤드라인 */}
          <motion.h2 variants={item} className="font-black text-[var(--text-primary)] mb-5"
            style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', lineHeight: 1.12, letterSpacing: '-0.03em' }} lang="ko">
            하지만, 이야기를 완성하는 것만으로는<br />
            충분하지 않습니다.
          </motion.h2>

          {/* 서브 */}
          <motion.p variants={item} className="text-[var(--text-secondary)] mb-16 sm:mb-20"
            style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', lineHeight: 1.75, maxWidth: '480px' }} lang="ko">
            집필, 편집, 출판, 유통, IP화 —<br />
            재능만으로는 넘기 어려운 현실이 있습니다.
          </motion.p>

          {/* 숫자 3개 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {STATS.map((stat) => (
              <motion.div
                key={stat.num}
                variants={item}
                className="rounded-2xl flex flex-col"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: 'clamp(28px, 3vw, 36px)',
                }}
              >
                {/* 숫자 */}
                <span className="font-black mb-4 block"
                  style={{
                    fontSize: 'clamp(48px, 6vw, 72px)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    background: `linear-gradient(135deg, ${stat.color} 0%, #8B5CF6 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {stat.num}
                </span>

                {/* 레이블 */}
                <p className="font-bold text-white mb-3"
                  style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.4 }} lang="ko">
                  {stat.label}
                </p>

                {/* 서브텍스트 */}
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#B8BFD0' }} lang="ko">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
