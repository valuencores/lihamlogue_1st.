'use client'

import { motion } from 'framer-motion'
import { sectionEnter, viewportOnce } from '@/lib/motion'

export default function Footer() {
  return (
    <footer
      className="relative border-t border-[var(--border-subtle)]"
      style={{ background: 'var(--bg-elevated)' }}
      aria-label="Site footer"
    >
      <div className="container-grid py-10 sm:py-12">
        <motion.div
          variants={sectionEnter}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          {/* Left: wordmark + legal */}
          <div>
            <p className="font-bold text-[var(--text-primary)] mb-1" style={{ fontSize: '15px' }}>
              SMART P&amp;B
            </p>
            <p className="text-caption text-[var(--text-muted)]">
              Liham Logue Inc.&nbsp;·&nbsp;
              <a
                href="mailto:contact@lihamlogue.com"
                className="hover:text-[var(--accent-blue)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-blue)] rounded-sm"
              >
                contact@lihamlogue.com
              </a>
              &nbsp;·&nbsp;Seoul, KR
            </p>
            <p className="text-caption text-[var(--text-muted)] mt-1">
              © 2026 Liham Logue Inc. All rights reserved.
            </p>
          </div>


        </motion.div>
      </div>
    </footer>
  )
}
