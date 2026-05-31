'use client';

import { Renderer } from 'ogl';

let sharedRenderer: Renderer | null = null;
let refCount = 0;

export function acquireRenderer(): Renderer | null {
  if (typeof window === 'undefined') return null;

  if (!sharedRenderer) {
    try {
      sharedRenderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: false, 
      });
      const gl = sharedRenderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    } catch (e) {
      console.warn('[WebGLContext] Falha ao criar renderer:', e);
      sharedRenderer = null;
      return null;
    }
  }

  refCount++;
  return sharedRenderer;
}

export function releaseRenderer() {
  refCount--;
  if (refCount <= 0 && sharedRenderer) {
    sharedRenderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
    sharedRenderer = null;
    refCount = 0;
  }
}