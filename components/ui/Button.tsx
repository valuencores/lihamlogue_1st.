'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { easeOutCubic } from '@/lib/motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?:    ButtonVariant
  size?:       ButtonSize
  onClick?:    () => void
  href?:       string
  className?:  string
  arrow?:      boolean
  type?:       'button' | 'submit' | 'reset'
  disabled?:   boolean
  'aria-label'?: string
}

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-9  px-5  text-[12px] rounded-[12px]',
  md: 'h-11 px-7  text-[13px] rounded-[14px]',
  lg: 'h-14 px-10 text-[14px] rounded-[16px]',
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: `
    bg-[#4F8CFF] text-white font-semibold
    shadow-[0_0_24px_rgba(79,140,255,0.22)]
    hover:bg-[#3d79f0]
    hover:shadow-[0_0_36px_rgba(79,140,255,0.36)]
    btn-sheen
  `,
  secondary: `
    bg-transparent text-[var(--text-primary)] font-semibold
    border border-[var(--border-subtle)]
    hover:border-[var(--border-hover)] hover:text-[var(--accent-blue)]
  `,
  ghost: `
    bg-transparent text-[var(--text-secondary)] font-medium
    hover:text-[var(--text-primary)]
  `,
}

export default function Button({
  children,
  variant   = 'primary',
  size      = 'md',
  onClick,
  href,
  className = '',
  arrow     = false,
  type      = 'button',
  disabled  = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const base =
    'relative inline-flex items-center gap-2 transition-colors duration-150 overflow-hidden ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
    'focus-visible:outline-blue-500/60 select-none disabled:opacity-40 disabled:cursor-not-allowed'

  const classes = `${base} ${SIZE[size]} ${VARIANT[variant]} ${className}`

  const inner = (
    <>
      {variant === 'primary' && (
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-16deg] transition-transform duration-[1200ms] ease-in-out group-hover:translate-x-full"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {arrow && (
          <motion.span
            className="inline-flex"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.18, ease: easeOutCubic }}
          >
            <ArrowRight size={14} />
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
        transition={{ duration: 0.13 }}
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
      transition={{ duration: 0.13 }}
    >
      {inner}
    </motion.button>
  )
}
