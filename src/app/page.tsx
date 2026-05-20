'use client'

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

export default function Home() {
  return (
    <>
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
          <section id="transition">
            <Transition />
          </section>
          
          <section id="about">
            <About />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
      </SmoothScroll>
    </>
  )
}
