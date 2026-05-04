'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Sections
import Nav          from '@/components/Nav'
import Hero         from '@/components/sections/Hero'
import Manifesto    from '@/components/sections/Manifesto'
import Problem      from '@/components/sections/Problem'
import WhyNow       from '@/components/sections/WhyNow'
import OS           from '@/components/sections/OS'
import Flow         from '@/components/sections/Flow'
import Market       from '@/components/sections/Market'
import BusinessModel from '@/components/sections/BusinessModel'
import Roadmap      from '@/components/sections/Roadmap'
import Team         from '@/components/sections/Team'
import ClosingCTA   from '@/components/sections/ClosingCTA'
import Footer       from '@/components/sections/Footer'

// UI
import Modal        from '@/components/ui/Modal'
import LeadForm     from '@/components/ui/LeadForm'

// Custom cursor (client-only, no SSR)
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })

type ModalRole = 'writer' | 'investor' | 'partner'

const MODAL_TITLES: Record<ModalRole, string> = {
  writer:   'Join the Waitlist',
  investor: 'Request Investor Deck',
  partner:  'Talk to the Team',
}

export default function Home() {
  const [modalOpen, setModalOpen]   = useState(false)
  const [modalRole, setModalRole]   = useState<ModalRole>('writer')

  // Lenis smooth scroll (loaded client-side only)
  useEffect(() => {
    let lenis: import('lenis').default | null = null
    let rafId: number

    async function initLenis() {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
          wrapper: document.documentElement,
          content: document.documentElement,
        })

        function raf(time: number) {
          lenis?.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      } catch {
        // Lenis failed to load; native scroll will be used
      }
    }

    initLenis()
    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  const openModal = (role: ModalRole = 'writer') => {
    setModalRole(role)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Skip to main content */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent-blue)] focus:text-white focus:rounded-[8px] focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Nav onWaitlistClick={() => openModal('writer')} />

      {/* Main content */}
      <main id="main" tabIndex={-1}>
        <Hero         onWaitlistClick={() => openModal('writer')} />
        <Manifesto />
        <Problem />
        <WhyNow />
        <OS />
        <Flow />
        <Market />
        <BusinessModel />
        <Roadmap />
        <Team />
        <ClosingCTA   onOpenModal={openModal} />
      </main>

      <Footer />

      {/* Lead capture modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={MODAL_TITLES[modalRole]}
        aria-labelledby="modal-title"
      >
        <LeadForm defaultRole={modalRole} onSuccess={() => {
          // Keep modal open to show success state; user can close
        }} />
      </Modal>
    </>
  )
}
