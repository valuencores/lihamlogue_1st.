'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: '배경',
    question: '어떤 세계를 만들고 싶으세요?',
    body: '소설, 시나리오, 에세이, 시 — 장르와 형식에 상관없이 당신이 설정하면 그 세계에 필요한 역사, 언어, 배경이 펼쳐집니다. 유사한 작품도 함께 제시됩니다.',
    color: '#4F8CFF',
  },
  {
    num: '02',
    title: '인물',
    question: '누가 그 세계를 살아가나요?',
    body: '이름을 붙이는 순간 캐릭터가 저장됩니다. 외모, 성격, 말투, 관계 — 이야기 내내 그 인물이 당신 곁에 있어요.',
    color: '#6B7CF6',
  },
  {
    num: '03',
    title: '흐름',
    question: '어떤 이야기를 하고 싶으세요?',
    body: '큰 그림을 먼저 그립니다. 기승전결, 감정선, 사건의 순서 — 디테일한 씬은 그 다음이에요.',
    color: '#8B6CF6',
  },
  {
    num: '04',
    title: '씬',
    question: '이제 쓰세요.',
    body: '형식은 이미 갖춰져 있습니다. 막히는 순간 필요한 정보가 나타납니다. 당신의 이야기가 한 씬씩 완성됩니다.',
    color: '#8B5CF6',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function Platform() {
  return (
    <section id="platform" className="relative py-28 sm:py-36" style={{ background: 'var(--bg-base)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.2), transparent)',
      }} aria-hidden="true" />

      <div className="container-grid px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

          {/* 레이블 */}
          <motion.p variants={item} className="font-mono-label text-[var(--accent-blue)] mb-5 uppercase" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            05 — PLATFORM
          </motion.p>

          {/* 헤드라인 — 동일 크기 두 줄 */}
          <motion.h2 variants={item} className="font-black text-[var(--text-primary)] mb-5"
            style={{ fontSize: 'clamp(26px, 4vw, 56px)', lineHeight: 1.15, letterSpacing: '-0.025em' }} lang="ko">
            당신이 이끕니다.<br />필요한 것이 따라옵니다.
          </motion.h2>

          {/* 서브 */}
          <motion.p variants={item} className="text-[var(--text-secondary)] mb-14 sm:mb-16"
            style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', lineHeight: 1.7, maxWidth: '520px' }} lang="ko">
            아이디어에서 IP까지, 한 플랫폼에서 끝납니다.<br />빈 페이지의 공포는 없습니다.
          </motion.p>

          {/* 카드 4개 — 동일 높이 고정 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((step) => (
              <motion.article
                key={step.num}
                variants={item}
                className="relative rounded-2xl flex flex-col group"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  minHeight: '260px',
                  padding: 'clamp(28px,3vw,36px)',
                }}
                whileHover={{ y: -4, borderColor: `${step.color}40`, transition: { duration: 0.2 } }}
              >
                {/* 번호 + 타이틀 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-label font-bold" style={{ fontSize: '11px', color: step.color, letterSpacing: '0.1em' }}>
                    {step.num}
                  </span>
                  <span className="font-bold text-[var(--text-muted)]" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                    {step.title}
                  </span>
                </div>

                {/* 액센트 라인 */}
                <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: step.color }} aria-hidden="true" />

                {/* 질문 */}
                <h3 className="font-bold text-white"
                  style={{ fontSize: 'clamp(20px,1.9vw,26px)', lineHeight: 1.3 }} lang="ko">
                  {step.question}
                </h3>

                {/* 본문 — 하단 고정 */}
                <p className="mt-6 mt-auto"
                  style={{ fontSize: 'clamp(12px, 1vw, 14px)', lineHeight: 1.75, color: '#B8BFD0' }} lang="ko">
                  {step.body}
                </p>

                {/* 호버 글로우 */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${step.color}0d, transparent 70%)` }} aria-hidden="true" />
              </motion.article>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
