import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current!;
    const ring   = ringRef.current!;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    };
    document.addEventListener('mousemove', onMove);

    const moveRing = () => {
      rx += (mx - rx) * 0.35;
      ry += (my - ry) * 0.35;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(moveRing);
    };
    const rafId = requestAnimationFrame(moveRing);

    const enlarge = () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = 'rgba(0,245,255,0.8)'; };
    const shrink  = () => { ring.style.width = '40px'; ring.style.height = '40px'; ring.style.borderColor = 'rgba(0,245,255,0.5)'; };

    const targets = document.querySelectorAll('a, button, .chip, .project-card');
    targets.forEach(el => { el.addEventListener('mouseenter', enlarge); el.addEventListener('mouseleave', shrink); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
