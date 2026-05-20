'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type ParticleShape = 'capsule' | 'sphere' | 'box' | 'tetrahedron'

interface AntigravityProps {
  count?          : number
  magnetRadius?   : number
  ringRadius?     : number
  waveSpeed?      : number
  waveAmplitude?  : number
  particleSize?   : number
  lerpSpeed?      : number
  color?          : string
  autoAnimate?    : boolean
  particleVariance?: number
  rotationSpeed?  : number
  depthFactor?    : number
  pulseSpeed?     : number
  particleShape?  : ParticleShape
  fieldStrength?  : number
}

function createGeometry(shape: ParticleShape): THREE.BufferGeometry {
  switch (shape) {
    case 'sphere':      return new THREE.SphereGeometry(0.2, 16, 16)
    case 'box':         return new THREE.BoxGeometry(0.3, 0.3, 0.3)
    case 'tetrahedron': return new THREE.TetrahedronGeometry(0.3)
    case 'capsule':
    default:            return new THREE.CapsuleGeometry(0.1, 0.4, 4, 8)
  }
}

export default function Antigravity({
  count           = 300,
  magnetRadius    = 10,
  ringRadius      = 10,
  waveSpeed       = 0.4,
  waveAmplitude   = 1,
  particleSize    = 2,
  lerpSpeed       = 0.1,
  color           = '#FF9FFC',
  autoAnimate     = false,
  particleVariance = 1,
  rotationSpeed   = 0,
  depthFactor     = 1,
  pulseSpeed      = 3,
  particleShape   = 'capsule',
  fieldStrength   = 10,
}: AntigravityProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const { clientWidth: W, clientHeight: H } = container

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 1000)
    camera.position.z = 50

    const getViewport = () => {
      const fov = (camera.fov * Math.PI) / 180
      const h   = 2 * Math.tan(fov / 2) * camera.position.z
      return { width: h * camera.aspect, height: h }
    }

    const vp = getViewport()

    const particles = Array.from({ length: count }, () => {
      const x = (Math.random() - 0.5) * vp.width
      const y = (Math.random() - 0.5) * vp.height
      const z = (Math.random() - 0.5) * 20
      return {
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        mx: x, my: y, mz: z,
        cx: x, cy: y, cz: z,
        randomRadiusOffset: (Math.random() - 0.5) * 2,
      }
    })

    const geometry = createGeometry(particleShape)
    const material = new THREE.MeshBasicMaterial({ color })
    const mesh     = new THREE.InstancedMesh(geometry, material, count)
    scene.add(mesh)

    const dummy = new THREE.Object3D()
    const clock = new THREE.Clock()

    const pointer        = { x: 0, y: 0 }
    const virtualMouse   = { x: 0, y: 0 }
    let lastMousePos     = { x: 0, y: 0 }
    let lastMouseMoveTime = 0

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.x  =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
      pointer.y  = -((e.clientY - rect.top)  / rect.height) * 2 + 1
    }

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    container.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', onResize)

    let rafId: number

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const vp      = getViewport()
      const elapsed = clock.getElapsedTime()

      const dist = Math.hypot(pointer.x - lastMousePos.x, pointer.y - lastMousePos.y)
      if (dist > 0.001) { lastMouseMoveTime = Date.now(); lastMousePos = { ...pointer } }

      let destX = (pointer.x * vp.width)  / 2
      let destY = (pointer.y * vp.height) / 2

      if (autoAnimate && Date.now() - lastMouseMoveTime > 2000) {
        destX = Math.sin(elapsed * 0.5) * (vp.width  / 4)
        destY = Math.cos(elapsed * 1.0) * (vp.height / 4)
      }

      virtualMouse.x += (destX - virtualMouse.x) * 0.05
      virtualMouse.y += (destY - virtualMouse.y) * 0.05

      const globalRotation = elapsed * rotationSpeed

      particles.forEach((p, i) => {
        p.t += p.speed / 2

        const proj  = 1 - p.cz / 50
        const tx    = virtualMouse.x * proj
        const ty    = virtualMouse.y * proj
        const dx    = p.mx - tx
        const dy    = p.my - ty
        const d     = Math.hypot(dx, dy)

        let tpx = p.mx, tpy = p.my, tpz = p.mz * depthFactor

        if (d < magnetRadius) {
          const angle    = Math.atan2(dy, dx) + globalRotation
          const wave     = Math.sin(p.t * waveSpeed + angle) * 0.5 * waveAmplitude
          const deviation = p.randomRadiusOffset * (5 / (fieldStrength + 0.1))
          const r        = ringRadius + wave + deviation
          tpx = tx + r * Math.cos(angle)
          tpy = ty + r * Math.sin(angle)
          tpz = p.mz * depthFactor + Math.sin(p.t) * waveAmplitude * depthFactor
        }

        p.cx += (tpx - p.cx) * lerpSpeed
        p.cy += (tpy - p.cy) * lerpSpeed
        p.cz += (tpz - p.cz) * lerpSpeed

        dummy.position.set(p.cx, p.cy, p.cz)
        dummy.lookAt(tx, ty, p.cz)
        dummy.rotateX(Math.PI / 2)

        const distToMouse  = Math.hypot(p.cx - tx, p.cy - ty)
        const distFromRing = Math.abs(distToMouse - ringRadius)
        const scale = Math.max(0, Math.min(1, 1 - distFromRing / 10)) *
                      (0.8 + Math.sin(p.t * pulseSpeed) * 0.2 * particleVariance) *
                      particleSize

        dummy.scale.setScalar(scale)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      })

      mesh.instanceMatrix.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      container.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
}