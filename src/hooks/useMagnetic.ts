import gsap from "gsap";

export function useMagnetic(el: HTMLAnchorElement | null) {
  const onMouseMove = (e: React.MouseEvent) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.02,
      y: (e.clientY - rect.top - rect.height / 2) * 0.02,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onMouseLeave = () => {
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
  };

  return { onMouseMove, onMouseLeave };
}