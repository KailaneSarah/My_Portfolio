'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const blob0 = useRef<HTMLDivElement>(null)
  const blob1 = useRef<HTMLDivElement>(null)
  const blob2 = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const blobs = [blob0.current!, blob1.current!, blob2.current!]

    const onMove = (e: MouseEvent) => {
      gsap.to(blobs[0], { x: e.clientX, y: e.clientY, duration: 0.1,  ease: 'power3.out' })
      gsap.to(blobs[1], { x: e.clientX, y: e.clientY, duration: 0.5,  ease: 'power1.out' })
      gsap.to(blobs[2], { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power1.out' })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <svg style={{ position: 'fixed', width: 0, height: 0 }}>
        <filter id="blob-filter">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="14" />
          <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10" />
        </filter>
      </svg>

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden', filter: 'url(#blob-filter)' }}>
        <div ref={blob0} style={{ position: 'absolute', width: 30,  height: 30,  borderRadius: '50%', background: 'var(--c-purple)', opacity: 0.6, transform: 'translate(-50%,-50%)' }} />
        <div ref={blob1} style={{ position: 'absolute', width: 65,  height: 65,  borderRadius: '50%', background: 'var(--c-purple)', opacity: 0.6, transform: 'translate(-50%,-50%)' }} />
        <div ref={blob2} style={{ position: 'absolute', width: 40,  height: 40,  borderRadius: '50%', background: 'var(--c-purple)', opacity: 0.6, transform: 'translate(-50%,-50%)' }} />
      </div>
    </>
  )
}