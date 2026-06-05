'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t"
      style={{ background: 'var(--bg-elevated)', borderColor: 'rgba(255,255,255,0.06)' }}
      aria-label="Site footer">
      <div className="container-grid px-6 py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="font-black text-[var(--text-primary)] mb-2"
              style={{ fontSize: '16px', letterSpacing: '-0.025em' }}>
              LIHAM LOGUE
            </p>
            <p className="text-[var(--text-muted)]" style={{ fontSize: '13px', lineHeight: 1.85 }}>
              Liham Logue Inc.&nbsp;·&nbsp;
              <a href="mailto:contact@lihamlogue.com"
                className="hover:text-[var(--accent-blue)] transition-colors duration-150">
                contact@lihamlogue.com
              </a>
              &nbsp;·&nbsp;Seoul, KR
            </p>
            <p className="text-[var(--text-muted)] mt-1" style={{ fontSize: '12px' }}>
              © 2026 Liham Logue Inc. All rights reserved.
            </p>
          </div>
          <p className="font-mono-label text-[var(--text-muted)] tracking-widest" style={{ fontSize: '10px' }}>
            ILHAM · LANGUE · LOGUE
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
