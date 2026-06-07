'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  createParticleElement,
  createRippleElement,
  getMaxDistanceFromCorners,
} from '@/utils/particles';

interface UseMetaCardOptions {
  glowColor?: string;
  particleCount?: number;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
}

/**
 * Attaches all mouse-driven animations (tilt, magnetism, particles, ripple)
 * to the returned ref. Keeps the component JSX free of animation logic.
 */
export function useMetaCard({
  glowColor = '132, 0, 255',
  particleCount = 8,
  enableTilt = true,
  enableMagnetism = false,
  clickEffect = true,
}: UseMetaCardOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const particles: HTMLDivElement[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let hovered = false;

    // ── PARTICLES ──────────────────────────────────────────────
    function spawnParticles() {
      const { width, height } = el!.getBoundingClientRect();
      for (let i = 0; i < particleCount; i++) {
        const t = setTimeout(() => {
          if (!hovered || !el) return;
          const p = createParticleElement(
            Math.random() * width,
            Math.random() * height,
            glowColor
          );
          el.appendChild(p);
          particles.push(p);

          gsap.fromTo(
            p,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
          );
          gsap.to(p, {
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 80,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: 'none',
            repeat: -1,
            yoyo: true,
          });
          gsap.to(p, {
            opacity: 0.2,
            duration: 1.5,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
          });
        }, i * 80);
        timeouts.push(t);
      }
    }

    function clearParticles() {
      timeouts.forEach(clearTimeout);
      timeouts.length = 0;
      particles.forEach((p) => {
        gsap.to(p, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          onComplete: () => p.remove(),
        });
      });
      particles.length = 0;
    }

    // ── ENTER / LEAVE ───────────────────────────────────────────
    function onEnter() {
      hovered = true;
      spawnParticles();
      gsap.to(el, { y: -3, duration: 0.3, ease: 'power2.out' });
    }

    function onLeave() {
      hovered = false;
      clearParticles();
      gsap.to(el, {
        y: 0,
        rotateX: 0,
        rotateY: 0,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    // ── MOVE ───────────────────────────────────────────────────
    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      el!.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      el!.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      el!.style.setProperty('--glow-intensity', '1');

      const tweenProps: gsap.TweenVars = {
        duration: 0.15,
        ease: 'power2.out',
        transformPerspective: 900,
        y: -3 + (y - cy) * 0.02,
      };

      if (enableTilt) {
        tweenProps.rotateX = ((y - cy) / cy) * -6;
        tweenProps.rotateY = ((x - cx) / cx) * 6;
      }

      if (enableMagnetism) {
        tweenProps.x = (x - cx) * 0.04;
      }

      gsap.to(el, tweenProps);
    }

    // ── CLICK ──────────────────────────────────────────────────
    function onClick(e: MouseEvent) {
      if (!clickEffect) return;
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxD = getMaxDistanceFromCorners(x, y, rect.width, rect.height);
      const ripple = createRippleElement(x, y, maxD, glowColor);
      el!.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      );
    }

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('click', onClick);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('click', onClick);
      clearParticles();
    };
  }, [glowColor, particleCount, enableTilt, enableMagnetism, clickEffect]);

  return ref;
}