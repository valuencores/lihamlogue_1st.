'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { easeOutCubic } from '@/lib/motion'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  onClick?: () => void
  href?: string
  className?: string
  arrow?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

const sizes: Record<Size, string> = {
  sm: 'h-9  px-5  text-[13px]',
  md: 'h-11 px-7  text-[14px]',
  lg: 'h-14 px-10 text-[15px]',
}

const base =
  'relative inline-flex items-center gap-2 font-semibold rounded-[14px] overflow-hidden ' +
  'transition-colors duration-150 select-none cursor-pointer ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(79,140,255,0.65)] ' +
  'disabled:opacity-40 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: [
    'bg-[#4F8CFF] text-white',
    'hover:bg-[#3a7bf2]',
    'shadow-[0_0_22px_rgba(79,140,255,0.22)]',
    'hover:shadow-[0_0_32px_rgba(79,140,255,0.38)]',
    'btn-sheen',
  ].join(' '),

  secondary: [
    'bg-transparent text-[var(--text-primary)] border border-[var(--border-subtle)]',
    'hover:border-[var(--border-hover)] hover:text-[var(--accent-blue)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--text-secondary)]',
    'hover:text-[var(--text-primary)]',
  ].join(' '),
}

export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  onClick,
  href,
  className = '',
  arrow     = false,
  type      = 'button',
  disabled  = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  const inner = (
    <>
      {/* Sheen overlay — handled by CSS .btn-sheen */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {arrow && (
          <motion.span
            className="inline-flex"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.18, ease: easeOutCubic }}
          >
            <ArrowRight size={15} strokeWidth={2.2} />
          </motion.span>
        )}
      </span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={`group ${classes}`}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.12 }}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${classes}`}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.985 }}
      transition={{ duration: 0.12 }}
    >
      {inner}
    </motion.button>
  )
}
