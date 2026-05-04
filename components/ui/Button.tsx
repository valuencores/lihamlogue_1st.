'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { easeOutCubic } from '@/lib/motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  href?: string
  className?: string
  arrow?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-9 px-5 text-[13px]',
  md: 'h-11 px-7 text-[14px]',
  lg: 'h-14 px-10 text-[15px]',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  arrow = false,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const base =
    'relative inline-flex items-center gap-2 font-semibold rounded-[14px] transition-colors duration-150 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500/60 select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'

  const variants: Record<ButtonVariant, string> = {
    primary: `
      bg-[#4F8CFF] text-white
      hover:bg-[#3d79f0]
      shadow-[0_0_24px_rgba(79,140,255,0.25)]
      hover:shadow-[0_0_32px_rgba(79,140,255,0.4)]
      btn-sheen
    `,
    secondary: `
      bg-transparent text-[#F5F7FA] border border-[#1F2430]
      hover:border-[#4F8CFF] hover:text-[#4F8CFF]
    `,
    ghost: `
      bg-transparent text-[#A4ADBE]
      hover:text-[#4F8CFF]
    `,
  }

  const classes = `${base} ${sizeMap[size]} ${variants[variant]} ${className}`

  const inner = (
    <>
      {variant === 'primary' && (
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-15deg] transition-transform duration-[1200ms] ease-in-out group-hover:translate-x-full"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {arrow && (
          <motion.span
            className="inline-flex"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2, ease: easeOutCubic }}
          >
            <ArrowRight size={16} />
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
        transition={{ duration: 0.15 }}
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
      transition={{ duration: 0.15 }}
    >
      {inner}
    </motion.button>
  )
}
