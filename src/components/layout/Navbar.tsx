'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ThemeToggle from '../ui/static/ThemeToggle'

const NAV_LINKS = [
  { label: 'Home',    href: '#home'    },
  { label: 'Work',    href: '#work'    },
  { label: 'About',   href: '#about'   },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemsRef   = useRef<HTMLAnchorElement[]>([])
  const bar1Ref    = useRef<HTMLSpanElement>(null)
  const bar2Ref    = useRef<HTMLSpanElement>(null)
  const bar3Ref    = useRef<HTMLSpanElement>(null)
  const navRef     = useRef<HTMLElement>(null)
  const btnRef     = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!btnRef.current) return

    const rect = btnRef.current.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top  + rect.height / 2

    if (overlayRef.current) {
      overlayRef.current.style.setProperty('--origin-x', `${x}px`)
      overlayRef.current.style.setProperty('--origin-y', `${y}px`)
    }

    if (open) {
      gsap.to(bar1Ref.current, { rotate: 45,  y: 6.5,  duration: 0.4, ease: 'power3.inOut' })
      gsap.to(bar2Ref.current, { opacity: 0,  scaleX: 0, duration: 0.2 })
      gsap.to(bar3Ref.current, { rotate: -45, y: -6.5, duration: 0.4, ease: 'power3.inOut' })

      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      )
    } else {
      gsap.to(bar1Ref.current, { rotate: 0, y: 0, duration: 0.4, ease: 'power3.inOut' })
      gsap.to(bar2Ref.current, { opacity: 1, scaleX: 1, duration: 0.3, delay: 0.1 })
      gsap.to(bar3Ref.current, { rotate: 0, y: 0, duration: 0.4, ease: 'power3.inOut' })

      gsap.to(itemsRef.current, { opacity: 0, y: 30, duration: 0.3, stagger: 0.04 })
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav ref={navRef} className="nav">
        <a href="/" className="nav__logo">
          @SarahDev
        </a>

        <div className="nav__right">
          <ThemeToggle />
          <button
            ref={btnRef}
            className="nav__menu-btn"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            <span ref={bar1Ref} />
            <span ref={bar2Ref} />
            <span ref={bar3Ref} />
          </button>
        </div>
      </nav>

      <div ref={overlayRef} className={`menu-overlay ${open ? 'open' : ''}`}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="menu-overlay__item"
            ref={el => { if (el) itemsRef.current[i] = el }}
            onClick={close}
          >
            {link.label}
            <span className="arrow">↗</span>
          </a>
        ))}

        <div className="menu-overlay__socials">
          <a href="https://www.instagram.com/kailane.sarah/" target="_blank" rel="noopener noreferrer">↗ Instagram</a>
          <a href="https://www.linkedin.com/in/kailane-sarah/" target="_blank" rel="noopener noreferrer">↗ LinkedIn</a>
          <a href="https://github.com/KailaneSarah" target="_blank" rel="noopener noreferrer">↗ GitHub</a>
        </div>
      </div>
    </>
  )
}