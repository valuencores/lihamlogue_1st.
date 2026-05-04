'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from './ui/Button'
import { analytics } from '@/lib/analytics'

const NAV_LINKS = [
  { label: 'Vision',   href: '#manifesto' },
  { label: 'Product',  href: '#os' },
  { label: 'Market',   href: '#market' },
  { label: 'Roadmap',  href: '#roadmap' },
  { label: 'Company',  href: '#company' },
]

interface NavProps {
  onWaitlistClick: () => void
}

export default function Nav({ onWaitlistClick }: NavProps) {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route/hash change
  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  const handleWaitlist = () => {
    analytics('nav_waitlist_clicked')
    setMobileOpen(false)
    onWaitlistClick()
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        role="banner"
      >
        <nav
          className="container-grid flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Wordmark */}
          <a
            href="#hero"
            className="font-bold tracking-tight text-[var(--text-primary)] text-[16px] sm:text-[18px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-blue)] rounded-sm"
            aria-label="SMART P&B – home"
          >
            SMART P&amp;B
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-mono-label text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-blue)] rounded-sm py-1"
                  style={{ fontSize: '12px', letterSpacing: '0.08em' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              variant="primary"
              size="sm"
              onClick={handleWaitlist}
              arrow
              aria-label="Join the waitlist"
            >
              Join Waitlist
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-blue)] rounded-sm"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-30 pt-16"
          style={{ background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <nav className="container-grid flex flex-col gap-6 pt-12">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[28px] font-bold text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors duration-150"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button variant="primary" size="lg" onClick={handleWaitlist} arrow>
                Join the Waitlist
              </Button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </>
  )
}
