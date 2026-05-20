'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const handleAnchor = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement
      if (!anchor) return
      e.preventDefault()
      const id = anchor.getAttribute('href')!.slice(1)
      const el = document.getElementById(id)
      if (el) lenis.scrollTo(el, { offset: 0, duration: 1.4 })
    }
    document.addEventListener('click', handleAnchor)

    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchor)
    }
  }, [])

  return <>{children}</>
}
