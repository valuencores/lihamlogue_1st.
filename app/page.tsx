'use client'

import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const Nav      = dynamic(() => import('@/components/sections/v2/Nav'),      { ssr: false })
const Hero     = dynamic(() => import('@/components/sections/v2/Hero'),     { ssr: false })
const Reality  = dynamic(() => import('@/components/sections/v2/Reality'),  { ssr: false })
const Problem  = dynamic(() => import('@/components/sections/v2/Problem'),  { ssr: false })
const WhyNow   = dynamic(() => import('@/components/sections/v2/WhyNow'),   { ssr: false })
const Platform = dynamic(() => import('@/components/sections/v2/Platform'), { ssr: false })
const IP       = dynamic(() => import('@/components/sections/v2/IP'),       { ssr: false })
const Waitlist = dynamic(() => import('@/components/sections/v2/Waitlist'), { ssr: false })
const Footer   = dynamic(() => import('@/components/sections/v2/Footer'),   { ssr: false })

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main style={{ background: 'var(--bg-base)', minHeight: '100vh', overflowX: 'hidden', maxWidth: '100vw' }}>
        <Nav />
        <Hero />
        <Reality />
        <Problem />
        <WhyNow />
        <Platform />
        <IP />
        <Waitlist />
        <Footer />
      </main>
    </>
  )
}
