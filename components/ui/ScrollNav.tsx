'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react'

// 페이지의 모든 섹션 ID (순서대로)
const SECTION_IDS = [
  'hero',
  'manifesto',
  'problem',
  'whynow',
  'os',
  'flow',
  'market',
  'model',
  'roadmap',
  'company',
  'cta',
]

export default function ScrollNav() {
  const [visible,      setVisible]      = useState(false)
  const [currentIdx,   setCurrentIdx]   = useState(0)
  const [isTop,        setIsTop]        = useState(true)
  const [isBottom,     setIsBottom]     = useState(false)

  // 현재 뷰포트에 가장 많이 보이는 섹션 인덱스 추적
  const updateCurrent = useCallback(() => {
    const scrollY  = window.scrollY
    const winH     = window.innerHeight
    const docH     = document.documentElement.scrollHeight

    setIsTop(scrollY < 80)
    setIsBottom(scrollY + winH >= docH - 80)
    setVisible(scrollY > 120)

    let bestIdx = 0
    let bestRatio = -1

    SECTION_IDS.forEach((id, idx) => {
      const el = document.getElementById(id)
      if (!el) return
      const rect   = el.getBoundingClientRect()
      const visible = Math.min(rect.bottom, winH) - Math.max(rect.top, 0)
      const ratio  = visible / winH
      if (ratio > bestRatio) {
        bestRatio = ratio
        bestIdx   = idx
      }
    })
    setCurrentIdx(bestIdx)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateCurrent, { passive: true })
    updateCurrent()
    return () => window.removeEventListener('scroll', updateCurrent)
  }, [updateCurrent])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goPrev = () => {
    const idx = Math.max(0, currentIdx - 1)
    scrollTo(SECTION_IDS[idx])
  }

  const goNext = () => {
    const idx = Math.min(SECTION_IDS.length - 1, currentIdx + 1)
    scrollTo(SECTION_IDS[idx])
  }

  const goTop    = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const goBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })

  const btnBase =
    'flex items-center justify-center rounded-full border border-[var(--border-subtle)] ' +
    'bg-[rgba(17,20,24,0.88)] backdrop-blur-md text-[var(--text-muted)] ' +
    'transition-all duration-200 hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-blue)] ' +
    'disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-[var(--border-subtle)] disabled:hover:text-[var(--text-muted)]'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-5 bottom-6 z-50 flex flex-col items-center gap-2"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Page navigation"
          role="navigation"
        >
          {/* TOP */}
          <motion.button
            className={`${btnBase} w-9 h-9`}
            onClick={goTop}
            disabled={isTop}
            aria-label="Scroll to top"
            whileHover={{ scale: isTop ? 1 : 1.1 }}
            whileTap={{ scale: 0.92 }}
            title="TOP"
          >
            <ArrowUp size={14} strokeWidth={2.2} />
          </motion.button>

          {/* Divider */}
          <div
            className="w-px h-3 rounded-full"
            style={{ background: 'var(--border-subtle)' }}
            aria-hidden="true"
          />

          {/* PREV section */}
          <motion.button
            className={`${btnBase} w-10 h-10`}
            onClick={goPrev}
            disabled={currentIdx === 0}
            aria-label="Previous section"
            whileHover={{ scale: currentIdx === 0 ? 1 : 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronUp size={16} strokeWidth={2.2} />
          </motion.button>

          {/* Section dot indicator */}
          <div
            className="flex flex-col items-center gap-1 py-1"
            aria-hidden="true"
          >
            {SECTION_IDS.map((_, idx) => (
              <motion.div
                key={idx}
                className="rounded-full cursor-pointer"
                style={{
                  width:      idx === currentIdx ? '4px'  : '3px',
                  height:     idx === currentIdx ? '12px' : '3px',
                  background: idx === currentIdx
                    ? 'var(--accent-blue)'
                    : 'var(--border-subtle)',
                }}
                animate={{
                  height: idx === currentIdx ? '12px' : '3px',
                  background: idx === currentIdx
                    ? 'var(--accent-blue)'
                    : 'rgba(255,255,255,0.1)',
                }}
                transition={{ duration: 0.25 }}
                onClick={() => scrollTo(SECTION_IDS[idx])}
              />
            ))}
          </div>

          {/* NEXT section */}
          <motion.button
            className={`${btnBase} w-10 h-10`}
            onClick={goNext}
            disabled={currentIdx === SECTION_IDS.length - 1}
            aria-label="Next section"
            whileHover={{ scale: currentIdx === SECTION_IDS.length - 1 ? 1 : 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronDown size={16} strokeWidth={2.2} />
          </motion.button>

          {/* Divider */}
          <div
            className="w-px h-3 rounded-full"
            style={{ background: 'var(--border-subtle)' }}
            aria-hidden="true"
          />

          {/* BOTTOM */}
          <motion.button
            className={`${btnBase} w-9 h-9`}
            onClick={goBottom}
            disabled={isBottom}
            aria-label="Scroll to bottom"
            whileHover={{ scale: isBottom ? 1 : 1.1 }}
            whileTap={{ scale: 0.92 }}
            title="BOTTOM"
          >
            <ArrowDown size={14} strokeWidth={2.2} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
