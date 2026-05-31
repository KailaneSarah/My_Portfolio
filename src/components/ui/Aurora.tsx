'use client';

import { useEffect, useRef } from 'react';
import { Program, Mesh, Color, Triangle } from 'ogl';
import { acquireRenderer, releaseRenderer } from '@/hooks/webGLContext';

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  intensity?: number;
  className?: string;
}

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uIntensity;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
    0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );
  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ), 0.0
  );
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                             \
  for (int i = 0; i < 2; i++) {                              \
    ColorStop currentColor = colors[i];                      \
    bool isInBetween = currentColor.position <= factor;      \
    index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                          \
  ColorStop currentColor = colors[index];                    \
  ColorStop nextColor = colors[index + 1];                   \
  float range = nextColor.position - currentColor.position;  \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = rampColor;
  float finalAlpha = auroraAlpha * smoothstep(0.0, 0.5, intensity) * uIntensity;

  fragColor = vec4(auroraColor * finalAlpha, finalAlpha);
}`;

export default function Aurora({
  colorStops = ['#7cff67', '#171D22', '#7cff67'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
  intensity = 1.0,
  className = '',
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── renderer compartilhado ────────────────────────────────────────────────
    const renderer = acquireRenderer();
    if (!renderer) return;

    const gl = renderer.gl;

    // canvas próprio para exibir o output deste componente
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
      position: 'absolute',
      top: '0', left: '0',
      width: '100%', height: '100%',
    });
    container.appendChild(canvas);

    // ── geometria e programa ──────────────────────────────────────────────────
    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const colorStopsArray = colorStops.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime:       { value: 0 },
        uAmplitude:  { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uBlend:      { value: blend },
        uIntensity:  { value: intensity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    // ── resize ────────────────────────────────────────────────────────────────
    const handleResize = () => {
      const w = container.offsetWidth || window.innerWidth;
      const h = container.offsetHeight || window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      program.uniforms.uResolution.value = [w, h];
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // ── render loop ───────────────────────────────────────────────────────────
    let animId: number;

    const update = (t: number) => {
      animId = requestAnimationFrame(update);

      const w = canvas.width;
      const h = canvas.height;

      // renderiza no contexto compartilhado
      renderer.setSize(w, h);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      program.uniforms.uTime.value = t * 0.001 * speed * 0.1;
      renderer.render({ scene: mesh });

      // copia o resultado para o canvas visível
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(gl.canvas, 0, 0, w, h);
      }
    };
    animId = requestAnimationFrame(update);

    // ── context lost / restored ───────────────────────────────────────────────
    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animId);
    };
    const onContextRestored = () => {
      handleResize();
      animId = requestAnimationFrame(update);
    };
    gl.canvas.addEventListener('webglcontextlost',     onContextLost,     false);
    gl.canvas.addEventListener('webglcontextrestored', onContextRestored, false);

    // ── visibility ────────────────────────────────────────────────────────────
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        setTimeout(() => { animId = requestAnimationFrame(update); }, 100);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // ── cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      gl.canvas.removeEventListener('webglcontextlost',     onContextLost);
      gl.canvas.removeEventListener('webglcontextrestored', onContextRestored);
      if (canvas.parentNode === container) container.removeChild(canvas);
      releaseRenderer();
    };
  }, [amplitude, blend, speed, intensity, colorStops]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0 }}
    />
  );
}