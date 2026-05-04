'use client'

interface GlowOrbProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  blue?: boolean
}

const sizeMap = {
  sm:  'w-[400px] h-[400px]',
  md:  'w-[600px] h-[600px]',
  lg:  'w-[900px] h-[900px]',
}

export default function GlowOrb({ className = '', size = 'lg', blue = false }: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full orb-drift ${sizeMap[size]} ${className}`}
      style={{
        background: blue
          ? 'radial-gradient(ellipse at center, rgba(79,140,255,0.22) 0%, rgba(139,92,246,0.12) 45%, transparent 70%)'
          : 'radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, rgba(79,140,255,0.10) 45%, transparent 70%)',
        filter: 'blur(80px)',
      }}
    />
  )
}
