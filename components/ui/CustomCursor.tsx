'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const loop = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"], input, textarea, select')) {
        setHovering(true)
      }
    }
    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', onEnter, { passive: true })
    window.addEventListener('mouseout', onLeave, { passive: true })
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [visible])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`custom-cursor ${hovering ? 'hovering' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'width 0.2s, height 0.2s, opacity 0.3s',
      }}
    />
  )
}
