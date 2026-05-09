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

/** About section cinematic scroll animation — exact port of sections.js initAboutScrollAnim */
export function useAboutScroll() {
  useEffect(() => {
    const section = document.getElementById('about');
    if (!section) return;

    const leftEl   = section.querySelector<HTMLElement>('.about-left');
    const cardWrap = section.querySelector<HTMLElement>('.card-3d-wrap');
    const card3d   = section.querySelector<HTMLElement>('.card-3d');
    const avatar   = section.querySelector<HTMLElement>('.card-avatar');
    const heading  = section.querySelector<HTMLElement>('.about-left h2');
    const tag      = section.querySelector<HTMLElement>('.section-tag');
    const paras    = section.querySelectorAll<HTMLElement>('.about-left p');
    const chips    = section.querySelector<HTMLElement>('.skills-chips');

    // Skip on mobile/tablet — show content immediately
    if (window.innerWidth <= 1024) {
      if (leftEl)   { leftEl.style.opacity   = '1'; leftEl.style.transform   = 'none'; }
      if (cardWrap) { cardWrap.style.opacity  = '1'; cardWrap.style.transform  = 'none'; }
      return;
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutBack = (t: number) => {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    // Animation window: section.top goes from 85%vh → 20%vh
    // → fires as soon as section appears, completes while still centered in view
    function calcProgress() {
      const r  = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;  // section just entering
      const end   = vh * 0.20;  // section well centred
      return Math.max(0, Math.min(1, (start - r.top) / (start - end)));
    }

    let avatarCenterX = 0;
    function refreshAvatarCenter() {
      if (!avatar) return;
      const inner = avatar.parentElement;
      const iw = inner ? inner.clientWidth : 300;
      avatarCenterX = (iw - 120) / 2;
    }

    // Initial hidden state
    if (leftEl)   { leftEl.style.opacity   = '0'; leftEl.style.transform   = 'translateX(22%) perspective(900px) rotateY(9deg)'; }
    if (cardWrap) { cardWrap.style.opacity  = '0'; cardWrap.style.transform  = 'translateX(-22%) scale(0.88)'; }
    if (tag)      tag.style.opacity   = '0';
    if (chips)    chips.style.opacity  = '0';
    paras.forEach(p => { p.style.opacity = '0'; p.style.transform = 'translateY(24px)'; });
    if (avatar) {
      avatar.style.width = '80px'; avatar.style.height = '80px';
      avatar.style.borderRadius = '50%'; avatar.style.fontSize = '1.5rem';
      avatar.style.alignSelf = 'flex-start'; avatar.style.boxShadow = '0 0 0px rgba(0,245,255,0)';
    }

    function applyProgress(p: number) {
      // No gate — animate from first scroll into view
      const gated = p;
      const ep  = easeOut(gated);
      const epB = Math.max(0, Math.min(1, easeOutBack(Math.min(gated, 1))));

      if (leftEl) {
        leftEl.style.opacity   = String(Math.min(1, gated * 2.5));
        leftEl.style.transform = `translateX(${lerp(22,0,ep).toFixed(2)}%) perspective(900px) rotateY(${lerp(9,0,ep).toFixed(2)}deg) scale(${lerp(0.92,1,ep).toFixed(3)})`;
      }
      if (tag) tag.style.opacity = String(Math.min(1, gated * 4));
      if (heading) {
        heading.style.transform       = `scale(${lerp(0.85,1.0,ep).toFixed(3)})`;
        heading.style.transformOrigin = 'left center';
      }
      paras.forEach((el, i) => {
        const start = 0.25 + i * 0.12;
        const pp = Math.max(0, Math.min(1, (ep - start) / 0.4));
        el.style.opacity   = String(pp);
        el.style.transform = `translateY(${lerp(24,0,pp).toFixed(1)}px)`;
      });
      if (chips) chips.style.opacity = String(Math.max(0, Math.min(1, (ep - 0.65) / 0.35)));
      if (cardWrap) {
        cardWrap.style.opacity   = String(Math.min(1, gated * 2.2));
        cardWrap.style.transform = `translateX(${lerp(-22,7,epB).toFixed(2)}%) scale(${lerp(0.88,1.10,epB).toFixed(3)})`;
      }
      if (card3d) {
        card3d.style.boxShadow = `0 0 ${lerp(0,50,ep).toFixed(0)}px rgba(0,245,255,${lerp(0,0.35,ep).toFixed(3)}), 0 ${lerp(0,30,ep).toFixed(0)}px ${lerp(0,60,ep).toFixed(0)}px rgba(0,0,0,0.5)`;
      }
      if (avatar) {
        const avSize   = lerp(80,  120, ep);
        const avRadius = lerp(50,  14,  ep);
        const avFont   = lerp(1.5, 2.2, ep);
        const centP    = Math.max(0, Math.min(1, (ep - 0.4) / 0.6));
        const avX      = lerp(0, avatarCenterX, centP);
        const shAlpha  = lerp(0, 0.7, ep);
        const shBlur   = lerp(0, 30,  ep);
        avatar.style.width        = avSize.toFixed(1)   + 'px';
        avatar.style.height       = avSize.toFixed(1)   + 'px';
        avatar.style.borderRadius = avRadius.toFixed(1) + '%';
        avatar.style.fontSize     = avFont.toFixed(2)   + 'rem';
        avatar.style.transform    = `translateX(${avX.toFixed(1)}px)`;
        avatar.style.boxShadow    = `0 0 ${shBlur.toFixed(0)}px rgba(0,245,255,${shAlpha.toFixed(2)}), 0 0 ${(shBlur*1.5).toFixed(0)}px rgba(255,184,0,${(shAlpha*0.4).toFixed(2)})`;
      }
    }

    // Smooth lerp scroll follower
    let current = 0, target = 0;
    let rafId   = 0;

    function tick() {
      current += (target - current) * 0.10; // faster lerp = snappier response
      applyProgress(current);
      rafId = requestAnimationFrame(tick);
    }
    function onScroll() { target = calcProgress(); }

    refreshAvatarCenter();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { refreshAvatarCenter(); onScroll(); }, { passive: true });
    onScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}
