import { useEffect } from 'react';

/** Adds `.visible` to elements with `.reveal` class when they enter viewport */
export function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 100);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Animates skill bars when .skills-categories enters viewport */
export function useSkillBars() {
  useEffect(() => {
    const grid = document.querySelector<HTMLElement>('.skills-categories');
    if (!grid) return;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired) {
            fired = true;
            io.disconnect();
            setTimeout(() => {
              document.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach((bar, i) => {
                const item = bar.closest<HTMLElement>('.skill-item');
                const pct = item ? parseFloat(item.dataset.pct ?? '0') : 0;
                if (isNaN(pct) || pct <= 0) return;
                setTimeout(() => { bar.style.transform = `scaleX(${pct})`; }, i * 80);
              });
            }, 150);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);
}

/** Animates counter from 0 to target */
export function useCounters() {
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
    const animate = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.counterTarget ?? '0');
      const suffix = el.dataset.counterSuffix ?? '';
      const decimals = parseInt(el.dataset.counterDecimals ?? '0');
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1800, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = (ease * target).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const delay = setTimeout(() => counters.forEach(animate), 1200);
    return () => clearTimeout(delay);
  }, []);
}

/** About section animations are now handled by Framer Motion in About.tsx */
export function useAboutScroll() {
  // No-op — kept for backward compatibility. Framer Motion handles reveal animations.
}

