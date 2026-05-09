import { useEffect, useRef } from 'react';

export default function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;
    const particles: Particle[] = [];

    class Particle {
      x = 0; y = 0; vx = 0; vy = 0;
      life = 0; maxLife = 0; size = 0;
      type: 'cross' | 'dot' = 'dot';
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.life = Math.random();
        this.maxLife = 0.4 + Math.random() * 0.6;
        this.size = Math.random() * 1.5 + 0.5;
        this.type = Math.random() > 0.8 ? 'cross' : 'dot';
      }
      update() { this.x += this.vx; this.y += this.vy; this.life -= 0.002; if (this.life <= 0) this.reset(); }
      draw() {
        ctx.save();
        ctx.globalAlpha = (this.life / this.maxLife) * 0.7;
        if (this.type === 'cross') {
          ctx.strokeStyle = 'rgba(0,245,255,0.6)'; ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(this.x - 4, this.y); ctx.lineTo(this.x + 4, this.y);
          ctx.moveTo(this.x, this.y - 4); ctx.lineTo(this.x, this.y + 4);
          ctx.stroke();
        } else {
          ctx.fillStyle = 'rgba(0,245,255,0.8)';
          ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
    }

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 120; i++) particles.push(new Particle());

    let raf: number;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(0,245,255,0.03)'; ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(0,245,255,0.06)'; ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) { ctx.globalAlpha = (1 - d / 120) * 0.4; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
        }
      }
      ctx.globalAlpha = 1;
      particles.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" />;
}
