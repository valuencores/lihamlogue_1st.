'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const dotRef     = useRef<HTMLDivElement>(null)
  const pos        = useRef({ x: -200, y: -200 })
  const raf        = useRef<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 터치 디바이스 제외
    if (window.matchMedia('(hover: none)').matches) return

    setMounted(true)

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const loop = () => {
      const { x, y } = pos.current
      const t = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      if (cursorRef.current) cursorRef.current.style.transform = t
      if (dotRef.current)    dotRef.current.style.transform    = t
      raf.current = requestAnimationFrame(loop)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const isHover = !!el.closest('a, button, [role="button"], input, textarea, select')
      if (cursorRef.current) {
        cursorRef.current.style.width   = isHover ? '40px' : '12px'
        cursorRef.current.style.height  = isHover ? '40px' : '12px'
        cursorRef.current.style.opacity = isHover ? '0.5' : '1'
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = isHover ? '0' : '1'
      }
    }

    // 커서가 창 밖으로 나가면 숨김
    const onLeaveDoc = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
      if (dotRef.current)    dotRef.current.style.opacity    = '0'
    }
    const onEnterDoc = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
      if (dotRef.current)    dotRef.current.style.opacity    = '1'
    }

    window.addEventListener('mousemove',  move,       { passive: true })
    window.addEventListener('mouseover',  onOver,     { passive: true })
    document.addEventListener('mouseleave', onLeaveDoc)
    document.addEventListener('mouseenter', onEnterDoc)
    raf.current = requestAnimationFrame(loop)

    // 기본 커서 숨김
    document.documentElement.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove',  move)
      window.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseleave', onLeaveDoc)
      document.removeEventListener('mouseenter', onEnterDoc)
      cancelAnimationFrame(raf.current)
      document.documentElement.style.cursor = ''
    }
  }, []) // ← 의존성 배열 비움: 마운트 시 한 번만 실행

  if (!mounted) return null

  return (
    <>
      {/* 링 */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '12px', height: '12px',
          borderRadius: '50%',
          background: 'white',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        }}
      />
      {/* 중심 점 */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '4px', height: '4px',
          borderRadius: '50%',
          background: 'white',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
    </>
  )
}
