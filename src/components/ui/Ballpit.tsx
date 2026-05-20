'use client'

import { useEffect, useRef } from 'react'
import {
  ACESFilmicToneMapping, AmbientLight, Clock, Color, InstancedMesh,
  MathUtils, MeshPhysicalMaterial, Object3D, PerspectiveCamera, Plane,
  PMREMGenerator, PointLight, Raycaster, Scene, ShaderChunk, SphereGeometry,
  SRGBColorSpace, Vector2, Vector3, WebGLRenderer,
  type MeshPhysicalMaterialParameters, type WebGLRendererParameters
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

interface BallpitProps {
  count?        : number
  colors?       : number[]
  ambientColor? : number
  ambientIntensity?: number
  lightIntensity?: number
  materialParams?: MeshPhysicalMaterialParameters & {
    metalness?: number; roughness?: number
    clearcoat?: number; clearcoatRoughness?: number
  }
  minSize?      : number
  maxSize?      : number
  size0?        : number
  gravity?      : number
  friction?     : number
  wallBounce?   : number
  maxVelocity?  : number
  maxX?         : number
  maxY?         : number
  maxZ?         : number
  followCursor? : boolean
  controlSphere0?: boolean
  className?    : string
}

class Physics {
  config: Required<Omit<BallpitProps, 'colors' | 'ambientColor' | 'ambientIntensity' | 'lightIntensity' | 'materialParams' | 'className'>>
  positionData: Float32Array
  velocityData: Float32Array
  sizeData:     Float32Array
  center = new Vector3()

  constructor(config: typeof this.config) {
    this.config = config
    this.positionData = new Float32Array(3 * config.count).fill(0)
    this.velocityData = new Float32Array(3 * config.count).fill(0)
    this.sizeData     = new Float32Array(config.count).fill(1)
    this.center.toArray(this.positionData, 0)
    for (let i = 1; i < config.count; i++) {
      const b = 3 * i
      this.positionData[b]   = MathUtils.randFloatSpread(2 * config.maxX)
      this.positionData[b+1] = MathUtils.randFloatSpread(2 * config.maxY)
      this.positionData[b+2] = MathUtils.randFloatSpread(2 * config.maxZ)
    }
    this.sizeData[0] = config.size0
    for (let i = 1; i < config.count; i++)
      this.sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize)
  }

  update(delta: number) {
    const { config, positionData: pd, velocityData: vd, sizeData: sd, center } = this
    const start = config.controlSphere0 ? 1 : 0

    if (config.controlSphere0) {
      new Vector3().fromArray(pd, 0).lerp(center, 0.1).toArray(pd, 0)
      new Vector3().toArray(vd, 0)
    }

    for (let i = start; i < config.count; i++) {
      const b = 3 * i
      const pos = new Vector3().fromArray(pd, b)
      const vel = new Vector3().fromArray(vd, b)
      vel.y -= delta * config.gravity * sd[i]
      vel.multiplyScalar(config.friction)
      vel.clampLength(0, config.maxVelocity)
      pos.add(vel)
      pos.toArray(pd, b); vel.toArray(vd, b)
    }

    for (let i = start; i < config.count; i++) {
      const b = 3 * i
      const pos = new Vector3().fromArray(pd, b)
      const vel = new Vector3().fromArray(vd, b)
      const r   = sd[i]

      for (let j = i + 1; j < config.count; j++) {
        const ob = 3 * j
        const op = new Vector3().fromArray(pd, ob)
        const ov = new Vector3().fromArray(vd, ob)
        const diff = new Vector3().copy(op).sub(pos)
        const dist = diff.length()
        const sum  = r + sd[j]
        if (dist < sum) {
          const overlap = sum - dist
          const corr    = diff.normalize().multiplyScalar(0.5 * overlap)
          const vc      = corr.clone().multiplyScalar(Math.max(vel.length(), 1))
          pos.sub(corr); vel.sub(vc)
          pos.toArray(pd, b); vel.toArray(vd, b)
          op.add(corr); ov.add(corr.clone().multiplyScalar(Math.max(ov.length(), 1)))
          op.toArray(pd, ob); ov.toArray(vd, ob)
        }
      }

      if (config.controlSphere0) {
        const diff = new Vector3().fromArray(pd, 0).sub(pos)
        const d    = diff.length()
        const sum0 = r + sd[0]
        if (d < sum0) {
          const corr = diff.normalize().multiplyScalar(sum0 - d)
          pos.sub(corr); vel.sub(corr.clone().multiplyScalar(Math.max(vel.length(), 2)))
        }
      }

      if (Math.abs(pos.x) + r > config.maxX) { pos.x = Math.sign(pos.x) * (config.maxX - r); vel.x = -vel.x * config.wallBounce }
      if (config.gravity === 0) {
        if (Math.abs(pos.y) + r > config.maxY) { pos.y = Math.sign(pos.y) * (config.maxY - r); vel.y = -vel.y * config.wallBounce }
      } else if (pos.y - r < -config.maxY) { pos.y = -config.maxY + r; vel.y = -vel.y * config.wallBounce }
      const maxB = Math.max(config.maxZ, config.maxSize)
      if (Math.abs(pos.z) + r > maxB) { pos.z = Math.sign(pos.z) * (config.maxZ - r); vel.z = -vel.z * config.wallBounce }

      pos.toArray(pd, b); vel.toArray(vd, b)
    }
  }
}


class SSMaterial extends MeshPhysicalMaterial {
  constructor(params: MeshPhysicalMaterialParameters) {
    super(params)
    this.defines = { USE_UV: '' }
    this.onBeforeCompile = shader => {
      shader.fragmentShader = `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      ` + shader.fragmentShader

      shader.fragmentShader = shader.fragmentShader.replace('void main() {', `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }
        void main() {
      `)

      const lightsChunk = ShaderChunk.lights_fragment_begin.replace(
        /RE_Direct\( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight \);/g,
        `RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
         RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);`
      )
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', lightsChunk)

      Object.assign(shader.uniforms, {
        thicknessDistortion: { value: 0.1 },
        thicknessAmbient:    { value: 0 },
        thicknessAttenuation:{ value: 0.1 },
        thicknessPower:      { value: 2 },
        thicknessScale:      { value: 10 },
      })
    }
  }
}

const dummy = new Object3D()

function getColorAt(colors: number[], ratio: number, out = new Color()) {
  const objs  = colors.map(c => new Color(c))
  const clamped = Math.max(0, Math.min(1, ratio))
  const scaled  = clamped * (colors.length - 1)
  const idx     = Math.floor(scaled)
  const start   = objs[idx]
  if (idx >= colors.length - 1) return start.clone()
  const alpha = scaled - idx
  const end   = objs[idx + 1]
  out.r = start.r + alpha * (end.r - start.r)
  out.g = start.g + alpha * (end.g - start.g)
  out.b = start.b + alpha * (end.b - start.b)
  return out
}

export default function Ballpit({
  count          = 200,
  colors         = [0x6d28d9, 0xa855f7, 0xff0090],
  ambientColor   = 0xffffff,
  ambientIntensity = 1,
  lightIntensity = 200,
  materialParams = { metalness: 0.5, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.15 },
  minSize        = 0.5,
  maxSize        = 1,
  size0          = 1,
  gravity        = 0.7,
  friction       = 0.8,
  wallBounce     = 0.95,
  maxVelocity    = 0.15,
  maxX           = 5,
  maxY           = 5,
  maxZ           = 2,
  followCursor   = true,
  controlSphere0 = false,
  className      = '',
}: BallpitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Renderer
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true } as WebGLRendererParameters)
    renderer.outputColorSpace  = SRGBColorSpace
    renderer.toneMapping       = ACESFilmicToneMapping

    // Scene + Camera
    const scene  = new Scene()
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.set(0, 0, 20)
    camera.lookAt(0, 0, 0)

    // Environment
    const pmrem     = new PMREMGenerator(renderer)
    const envTex    = pmrem.fromScene(new RoomEnvironment()).texture

    // Material + Mesh
    const geometry  = new SphereGeometry()
    const material  = new SSMaterial({ envMap: envTex, ...materialParams })
    const mesh      = new InstancedMesh(geometry, material, count)
    scene.add(mesh)

    // Lights
    const ambient = new AmbientLight(ambientColor, ambientIntensity)
    const light   = new PointLight(colors[0], lightIntensity)
    scene.add(ambient, light)

    // Colors
    if (colors.length > 1) {
      for (let i = 0; i < count; i++) {
        mesh.setColorAt(i, getColorAt(colors, i / count))
        if (i === 0) light.color.copy(getColorAt(colors, 0))
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    }

    // Physics
    const physConfig = {
      count, minSize, maxSize, size0, gravity, friction,
      wallBounce, maxVelocity, maxX, maxY, maxZ,
      followCursor, controlSphere0,
    }
    const physics = new Physics(physConfig as any)

    // Resize
    const resize = () => {
      const parent = canvas.parentElement!
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const fovRad = (camera.fov * Math.PI) / 180
      physics.config.maxX = (2 * Math.tan(fovRad / 2) * camera.position.length() * camera.aspect) / 2
      physics.config.maxY = (2 * Math.tan(fovRad / 2) * camera.position.length()) / 2
    }
    resize()
    window.addEventListener('resize', resize)

    // Pointer
    const raycaster = new Raycaster()
    const plane     = new Plane(new Vector3(0, 0, 1), 0)
    const hit       = new Vector3()
    const nPos      = new Vector2()

    const onMove = (e: PointerEvent) => {
      if (!followCursor) return
      const rect = canvas.getBoundingClientRect()
      nPos.set(
        ((e.clientX - rect.left) / rect.width)  *  2 - 1,
        ((e.clientY - rect.top)  / rect.height) * -2 + 1,
      )
      raycaster.setFromCamera(nPos, camera)
      camera.getWorldDirection(plane.normal)
      raycaster.ray.intersectPlane(plane, hit)
      physics.center.copy(hit)
      physics.config.controlSphere0 = true
    }
    const onLeave = () => { physics.config.controlSphere0 = false }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    // Loop
    const clock = new Clock()
    let rafId: number

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      physics.update(delta)
      for (let i = 0; i < count; i++) {
        dummy.position.fromArray(physics.positionData, 3 * i)
        dummy.scale.setScalar(followCursor && i === 0 ? physics.sizeData[i] : (i === 0 ? 0 : physics.sizeData[i]))
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        if (i === 0) light.position.copy(dummy.position)
      }
      mesh.instanceMatrix.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}