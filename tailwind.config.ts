import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':      '#0A0E1A',
        'bg-elevated':  '#111418',
        'bg-soft':      '#161A23',
        'border-subtle':'#1F2430',
        'text-primary': '#F5F7FA',
        'text-secondary':'#A4ADBE',
        'text-muted':   '#6B7280',
        'accent-blue':  '#4F8CFF',
        'accent-violet':'#8B5CF6',
      },
      fontFamily: {
        sans:  ['Pretendard Variable', 'Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Geist Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        'content': '1280px',
      },
      borderRadius: {
        'sm-token': '8px',
        'md-token': '14px',
        'lg-token': '24px',
      },
      animation: {
        'orb-drift': 'orbDrift 18s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'sheen': 'sheen 1.2s ease-in-out',
      },
      keyframes: {
        orbDrift: {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '25%':  { transform: 'translate(40px, -30px) scale(1.05)' },
          '50%':  { transform: 'translate(-20px, 40px) scale(0.97)' },
          '75%':  { transform: 'translate(30px, 20px) scale(1.03)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        sheen: {
          '0%':   { left: '-100%' },
          '100%': { left: '200%' },
        },
      },
      transitionTimingFunction: {
        'out-cubic': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
