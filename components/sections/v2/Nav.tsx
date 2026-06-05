'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: '소개',   href: '#problem'  },
  { label: '플랫폼', href: '#platform' },
  { label: '회사',   href: '#waitlist' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(10,14,26,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div className="container-grid">
          <div className="flex items-center justify-between h-16">

            {/* 좌: 로고 */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-black text-[var(--text-primary)] tracking-tight focus-visible:outline-none"
              style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', letterSpacing: '-0.025em' }}
              aria-label="LIHAM LOGUE 홈으로"
            >
              LIHAM LOGUE
            </button>

            {/* 우: 메뉴 + 버튼 */}
            <div className="hidden sm:flex items-center gap-7">
              <nav className="flex items-center gap-7" aria-label="주 내비게이션">
                {LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium"
                    style={{ fontSize: '14px' }}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* 아웃라인 버튼 */}
              <button
                onClick={() => scrollTo('#waitlist')}
                className="flex items-center h-9 px-5 rounded-full font-semibold transition-all duration-200 hover:bg-white/5"
                style={{
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                지금 시작하기
              </button>
            </div>

            {/* 모바일 햄버거 */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="sm:hidden p-2 rounded-lg text-[var(--text-secondary)]"
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* 모바일 풀스크린 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 sm:hidden flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="font-black text-[var(--text-primary)]"
                style={{ fontSize: 'clamp(28px, 8vw, 40px)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollTo('#waitlist')}
              className="mt-2 h-12 px-8 rounded-full font-semibold text-white"
              style={{
                fontSize: '15px',
                background: 'linear-gradient(135deg, #4F8CFF, #8B5CF6)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              지금 시작하기
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
