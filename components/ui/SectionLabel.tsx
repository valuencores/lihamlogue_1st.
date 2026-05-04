'use client'

import { motion } from 'framer-motion'
import { sectionEnter, viewportOnce } from '@/lib/motion'

interface SectionLabelProps {
  children: string
  className?: string
  animate?: boolean
}

export default function SectionLabel({
  children,
  className = '',
  animate = true,
}: SectionLabelProps) {
  if (!animate) {
    return (
      <span
        className={`font-mono-label inline-block ${className}`}
        aria-label={children}
      >
        {children}
      </span>
    )
  }

  return (
    <motion.span
      className={`font-mono-label inline-block ${className}`}
      variants={sectionEnter}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      aria-label={children}
    >
      {children}
    </motion.span>
  )
}
