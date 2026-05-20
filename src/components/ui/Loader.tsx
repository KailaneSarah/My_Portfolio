'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const letsRef   = useRef<HTMLSpanElement>(null)
  const devRef    = useRef<HTMLSpanElement>(null)
  const barRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        window.dispatchEvent(new CustomEvent('loaderDone'))
      }
    })

    tl.set([letsRef.current, devRef.current], { opacity: 0, y: 30 })
      .set(barRef.current, { width: '0%' })
      .to([letsRef.current, devRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      })
      .to(barRef.current, {
        width: '100%',
        duration: 2.2,
        ease: 'power4.inOut',
      }, '-=0.4')
      .to(letsRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.6,
        ease: 'power2.in',
      }, '-=1.0')
      .to(devRef.current, {
        scale: 150,
        duration: 1.2,
        ease: 'power4.in',
        transformOrigin: 'center center',
        force3D: false,
      }, '-=0.9')
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2')

    .to(loaderRef.current, {
      display: 'none',
      duration: 0,
    })

    return () => { tl.kill() }
  }, [])

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader__container">
        <h1 className="loader__title">
          <span ref={letsRef} className="loader__lets">Let's </span>
          <span ref={devRef} className="loader__dev">dev</span>
        </h1>
      </div>

      <div className="loader__bar-wrap">
        <div ref={barRef} className="loader__bar" />
      </div>
    </div>
  )
}