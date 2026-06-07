"use client";

import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const int = parseInt(hex, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

const VERT = /* glsl */`
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vRandom = random;
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const FRAG = /* glsl */`
  precision highp float;
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if (uAlphaParticles < 0.5) {
      if (d > 0.5) discard;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

export interface ParticlesBgProps {
  particleCount?:        number;
  particleSpread?:       number;
  speed?:                number;
  particleColors?:       string[];
  alphaParticles?:       boolean;
  particleBaseSize?:     number;
  sizeRandomness?:       number;
  cameraDistance?:       number;
  disableRotation?:      boolean;
  moveParticlesOnHover?: boolean;
  particleHoverFactor?:  number;
  mouseLerpEase?:        number;
}

export default function ParticlesBg({
  particleCount        = 200,
  particleSpread       = 10,
  speed                = 0.1,
  particleColors       = ["#ffffff"],
  alphaParticles       = false,
  particleBaseSize     = 100,
  sizeRandomness       = 1,
  cameraDistance       = 20,
  disableRotation      = true,
  moveParticlesOnHover = true,
  particleHoverFactor  = 1,
  mouseLerpEase        = 0.06,
}: ParticlesBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    Object.assign(gl.canvas.style, {
      position: "absolute", top: "0", left: "0",
      width: "100%", height: "100%", display: "block",
    });

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const w = container.offsetWidth  || window.innerWidth;
      const h = container.offsetHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.perspective({ aspect: w / h });
    };
    window.addEventListener("resize", resize);
    resize();

    const mouse   = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    };

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    const positions = new Float32Array(particleCount * 3);
    const randoms   = new Float32Array(particleCount * 4);
    const colors    = new Float32Array(particleCount * 3);
    const palette   = particleColors.length ? particleColors : ["#ffffff"];

    for (let i = 0; i < particleCount; i++) {
      let x: number, y: number, z: number, len: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      colors.set(hexToRgb(palette[Math.floor(Math.random() * palette.length)]), i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random:   { size: 4, data: randoms   },
      color:    { size: 3, data: colors    },
    });

    const program = new Program(gl, {
      vertex: VERT, fragment: FRAG,
      uniforms: {
        uTime:           { value: 0 },
        uSpread:         { value: particleSpread   },
        uBaseSize:       { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness   },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true, depthTest: false,
    });

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let raf: number;
    let lastTime = performance.now();
    let elapsed  = 0;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      elapsed += (t - lastTime) * speed;
      lastTime = t;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        current.x += (mouse.x - current.x) * mouseLerpEase;
        current.y += (mouse.y - current.y) * mouseLerpEase;

        mesh.position.x = -current.x * particleHoverFactor;
        mesh.position.y = -current.y * particleHoverFactor;
      } else {
        mesh.position.x = 0;
        mesh.position.y = 0;
      }

      if (!disableRotation) {
        mesh.rotation.x  = Math.sin(elapsed * 0.0002) * 0.1;
        mesh.rotation.y  = Math.cos(elapsed * 0.0005) * 0.15;
        mesh.rotation.z += 0.01 * speed;
      }

      renderer.render({ scene: mesh, camera });
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };

  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
