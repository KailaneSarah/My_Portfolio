'use client'

import { useEffect } from 'react'
import Loader from '@/components/ui/Loader'
import Cursor from '@/components/ui/Cursor'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import SmoothScroll from '@/components/ui/SmoothScroll'
import Transition from '@/components/sections/Transition'
import TechLoop from '@/components/sections/TechLoop'
import CurvedLoop from '@/components/ui/CurvedLoop'

function ErudaDebug() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    import('eruda').then(({ default: eruda }) => eruda.init())
  }, [])

  return null
}

export default function Home() {
  return (
    <>
      {process.env.NODE_ENV === 'development' && <ErudaDebug />}
      <Loader />
      <Cursor />
      <SmoothScroll>
        <Navbar />
        <main>
          <section id="home">
            <Hero />
          </section>

          <section id="tech">
            <TechLoop />
          </section>

          <section id="work">
            <Work />
          </section>

          <CurvedLoop speed={3.0} curveAmount={380} direction="left" interactive visibleOn="mobile" />

          <section id="transition" className="transition-wrapper">
            <Transition />
          </section>

          <section id="about">
            <About />
          </section>

          <CurvedLoop speed={3.0} curveAmount={400} direction="left" interactive visibleOn="desktop" />

          <section id="contact">
            <Contact />
          </section>
        </main>
      </SmoothScroll>
    </>
  )
}