'use client'

interface SectionLabelProps {
  children: string
  className?: string
  animate?: boolean
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`font-mono-label inline-block ${className}`}
      aria-label={children}
    >
      {children}
    </span>
  )
}
