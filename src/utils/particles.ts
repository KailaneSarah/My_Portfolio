export function createParticleElement(
  x: number,
  y: number,
  color: string
): HTMLDivElement {
  const el = document.createElement('div');
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
}

export function createRippleElement(
  x: number,
  y: number,
  maxDistance: number,
  color: string
): HTMLDivElement {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    width: ${maxDistance * 2}px;
    height: ${maxDistance * 2}px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(${color}, 0.35) 0%,
      rgba(${color}, 0.15) 30%,
      transparent 70%
    );
    left: ${x - maxDistance}px;
    top: ${y - maxDistance}px;
    pointer-events: none;
    z-index: 50;
  `;
  return ripple;
}

export function getMaxDistanceFromCorners(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  return Math.max(
    Math.hypot(x, y),
    Math.hypot(x - width, y),
    Math.hypot(x, y - height),
    Math.hypot(x - width, y - height)
  );
}