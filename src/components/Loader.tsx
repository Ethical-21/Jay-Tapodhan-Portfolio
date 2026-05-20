import { useEffect, useRef, useCallback } from 'react';

/* ── Particle ─────────────────────────────────────────────── */
interface P {
  x: number; y: number;
  size: number;
  bSize: number;
  cyan: boolean;
  alpha: number;
  angle: number;
  oSpeed: number;
  oRadius: number;
  evx: number; evy: number;
}

const BG = '#050810';

/* ── Timing (ms) ──────────────────────────────────────────── */
const T_SPIRAL   = 1800;
const T_SETTLE   = 2800;
const T_EXPLODE  = 3200;
const T_JT_HOLD  = 3900;
const T_JT_FLY   = 4600;
const T_DONE     = 5000;

/* ── Pre-computed colors (avoid string creation every frame) ── */
const C_CYAN = 'rgba(0,245,255,';
const C_AMBER = 'rgba(255,184,0,';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLDivElement>(null);
  const jtRef       = useRef<HTMLDivElement>(null);
  const doneRef     = useRef(false);

  const handleComplete = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const counterEl = counterRef.current;
    const jtEl      = jtRef.current;
    const overlayEl = overlayRef.current;
    if (!canvas || !counterEl || !jtEl || !overlayEl) return;

    const ctx = canvas.getContext('2d', { alpha: false })!;
    doneRef.current = false;

    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    addEventListener('resize', resize);

    const mob = innerWidth <= 768;
    const N   = mob ? 80 : 150;

    const W  = () => canvas.width;
    const H  = () => canvas.height;
    const CX = () => W() / 2;
    const CY = () => H() / 2;
    const R  = () => Math.min(W(), H()) * (mob ? 0.17 : 0.13);

    /* ── Particles ── */
    const ps: P[] = [];
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = 200 + Math.random() * Math.max(W(), H()) * 0.5;
      ps.push({
        x: CX() + Math.cos(a) * d,
        y: CY() + Math.sin(a) * d,
        size: 1 + Math.random() * 2.2,
        bSize: 1 + Math.random() * 2.2,
        cyan: Math.random() > 0.1,
        alpha: 0,
        angle: a,
        oSpeed: (0.5 + Math.random() * 1.0) * (Math.random() > 0.5 ? 1 : -1),
        oRadius: d,
        evx: 0, evy: 0,
      });
    }

    let lastPct  = -1;
    let exploded = false;
    let jtVisible  = false;
    let jtFlying   = false;
    let fading     = false;

    const t0 = performance.now();
    let raf  = 0;

    /* ── Frame ── */
    function frame(now: number) {
      if (doneRef.current) return;

      const t  = Math.max(0, now - t0);
      const w  = W(), h = H();
      const cx = CX(), cy = CY(), r = R();

      /* ── Smart clear: smooth crossfade from motion blur → full clear ── */
      const blurEnd = T_SPIRAL + 500; // 500ms crossfade window
      if (t < T_SPIRAL) {
        ctx.fillStyle = 'rgba(5,8,16,0.14)';
        ctx.fillRect(0, 0, w, h);
      } else if (t < blurEnd) {
        // Gradually increase clear opacity from 0.14 → 1.0
        const fade = (t - T_SPIRAL) / 500;
        const clearAlpha = 0.14 + fade * 0.86;
        ctx.fillStyle = `rgba(5,8,16,${clearAlpha})`;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, w, h);
      }

      /* ── Counter ── */
      const pct = Math.max(0, Math.min(100, Math.floor((t / T_SETTLE) * 100)));
      if (pct !== lastPct) { counterEl!.textContent = pct + '%'; lastPct = pct; }

      /* ── Update particles ── */
      for (let i = 0; i < N; i++) {
        const p = ps[i];

        if (t < T_SPIRAL) {
          const pr = t / T_SPIRAL;
          const sf = 1 - pr * pr;
          p.angle += p.oSpeed * 0.025;
          const tr = r + (p.oRadius - r) * sf;
          p.x = cx + Math.cos(p.angle) * tr;
          p.y = cy + Math.sin(p.angle) * tr;
          p.alpha = Math.min(1, pr * 1.3);
          p.size  = p.bSize * (0.5 + pr * 0.5);

        } else if (t < T_SETTLE) {
          const pr = (t - T_SPIRAL) / (T_SETTLE - T_SPIRAL);
          const ez = 1 - (1 - pr) * (1 - pr) * (1 - pr);
          // Smooth speed transition: lerp from spiral speed to settle speed
          const speed = 0.025 * (1 - ez) + 0.006 * ez;
          p.angle += p.oSpeed * speed * (1 - ez * 0.6);
          const cr = r + (p.oRadius - r) * (1 - ez) * 0.08;
          p.x = cx + Math.cos(p.angle) * cr;
          p.y = cy + Math.sin(p.angle) * cr;
          p.alpha = 0.7 + Math.sin(t * 0.007 + p.angle * 3) * 0.3;
          p.size  = p.bSize * (1 + Math.sin(t * 0.005 + p.angle * 5) * 0.3);

        } else if (t < T_EXPLODE) {
          p.angle += p.oSpeed * 0.003;
          p.x = cx + Math.cos(p.angle) * r;
          p.y = cy + Math.sin(p.angle) * r;
          p.alpha = 0.85 + Math.sin(t * 0.009 + p.angle * 4) * 0.15;
          p.size  = p.bSize * (1.1 + Math.sin(t * 0.007 + p.angle * 6) * 0.2);

        } else {
          if (!exploded) {
            exploded = true;
            for (const pp of ps) {
              const a2 = Math.atan2(pp.y - cy, pp.x - cx);
              const f  = 5 + Math.random() * 12;
              pp.evx = Math.cos(a2) * f + (Math.random() - 0.5) * 3;
              pp.evy = Math.sin(a2) * f + (Math.random() - 0.5) * 3;
            }
          }
          p.x += p.evx;
          p.y += p.evy;
          p.evx *= 0.965;
          p.evy *= 0.965;
          const ft = Math.min(1, (t - T_EXPLODE) / (T_DONE - T_EXPLODE));
          p.alpha = Math.max(0, 1 - ft * ft);
          p.size  = p.bSize * (1 + ft * 1.5);
        }
      }

      /* ── Draw particles (minimal draw calls) ── */
      ctx.globalCompositeOperation = 'lighter';

      // Single pass: glow + core combined
      for (let i = 0; i < N; i++) {
        const p = ps[i];
        if (p.alpha <= 0.01) continue;
        const col = p.cyan ? C_CYAN : C_AMBER;

        // Soft glow (larger, dimmer)
        ctx.globalAlpha = p.alpha * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, 6.283);
        ctx.fillStyle = col + '1)';
        ctx.fill();

        // Bright core
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 6.283);
        ctx.fillStyle = col + '1)';
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      /* ── Ring halo ── */
      if (t >= T_SPIRAL * 0.6 && t < T_EXPLODE) {
        const rp = Math.min(1, (t - T_SPIRAL * 0.6) / (T_SETTLE - T_SPIRAL * 0.6));
        const pa = rp * (0.1 + Math.sin(t * 0.004) * 0.05);

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 6.283);
        ctx.strokeStyle = C_CYAN + (pa * 2.5) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();

        const h1 = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.3);
        h1.addColorStop(0, 'rgba(0,245,255,0)');
        h1.addColorStop(0.5, C_CYAN + (pa * 0.7) + ')');
        h1.addColorStop(1, 'rgba(0,245,255,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, r * 1.3, 0, 6.283);
        ctx.fillStyle = h1;
        ctx.fill();

        const h2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.3);
        h2.addColorStop(0, C_AMBER + (pa * 0.7) + ')');
        h2.addColorStop(1, 'rgba(255,184,0,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.3, 0, 6.283);
        ctx.fillStyle = h2;
        ctx.fill();
      }

      /* ── Explosion flash ── */
      if (t >= T_EXPLODE && t < T_EXPLODE + 350) {
        const ft = (t - T_EXPLODE) / 350;
        const fa = Math.max(0, (1 - ft * ft) * 0.4);
        const fr = r * (1 + ft * 7);

        const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, fr);
        fg.addColorStop(0, `rgba(255,255,255,${fa * 0.6})`);
        fg.addColorStop(0.15, C_CYAN + (fa * 0.4) + ')');
        fg.addColorStop(0.5, C_CYAN + (fa * 0.1) + ')');
        fg.addColorStop(1, 'rgba(0,245,255,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, fr, 0, 6.283);
        ctx.fillStyle = fg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, fr * 0.85, 0, 6.283);
        ctx.strokeStyle = C_CYAN + (fa * 0.7) + ')';
        ctx.lineWidth = 1.5 * (1 - ft);
        ctx.stroke();
      }

      /* ── JT. phases ── */
      // JT. appears during spiral — center of the universe
      if (t >= T_SPIRAL * 0.3 && !jtVisible) {
        jtVisible = true;
        jtEl!.classList.add('loader-initials-show');
      }
      if (t >= T_EXPLODE) {
        counterEl!.style.opacity = '0';
        counterEl!.style.transform = 'translateX(-50%) scale(2)';
      }
      // JT. flies to nav position
      if (t >= T_JT_HOLD && !jtFlying) {
        jtFlying = true;
        jtEl!.classList.add('loader-initials-fly');
      }
      if (t >= T_JT_FLY && !fading) {
        fading = true;
        overlayEl!.classList.add('loader-fadeout');
      }

      if (t >= T_DONE) { handleComplete(); return; }
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); };
  }, [handleComplete]);

  return (
    <div ref={overlayRef} className="loader-overlay">
      <canvas ref={canvasRef} className="loader-canvas" />
      <div ref={counterRef} className="loader-counter">0%</div>
      <div ref={jtRef} className="loader-initials">
        JT<span className="loader-dot">.</span>
      </div>
    </div>
  );
}
