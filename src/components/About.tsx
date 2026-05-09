import { useEffect, useRef } from 'react';
import type { PortfolioData } from '../types';
import { useAboutScroll } from '../hooks';

type Props = Pick<PortfolioData, 'about' | 'card' | 'name'>;

export default function About({ about, card, name }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useAboutScroll();

  // 3D card tilt
  useEffect(() => {
    const wrap = wrapRef.current;
    const c    = cardRef.current;
    const glow = glowRef.current;
    if (!wrap || !c || !glow) return;

    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      const cx = e.clientX - r.left, cy = e.clientY - r.top;
      c.style.transform = `rotateX(${(cy / r.height - 0.5) * -20}deg) rotateY(${(cx / r.width - 0.5) * 20}deg)`;
      glow.style.left = cx + 'px'; glow.style.top = cy + 'px'; glow.style.opacity = '1';
    };
    const onLeave = () => { c.style.transform = 'rotateX(0) rotateY(0)'; glow.style.opacity = '0'; };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => { wrap.removeEventListener('mousemove', onMove); wrap.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <section id="about">
      <canvas className="section-bg" id="about-bg" />
      <div className="about-grid">
        <div className="about-left">
          <div className="section-tag">About Me</div>
          <h2>
            {about.heading_lines.map((line, i) =>
              i === about.heading_lines.length - 1
                ? <span key={i} style={{ color: 'var(--cyan)' }}>{line}</span>
                : <span key={i}>{line}<br /></span>
            )}
          </h2>
          {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <div className="skills-chips">
            {about.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}
          </div>
        </div>

        <div className="card-3d-wrap" id="card3dWrap" ref={wrapRef}>
          <div className="card-3d" id="card3d" ref={cardRef}>
            <div className="card-glow" id="cardGlow" ref={glowRef} />
            <div className="card-3d-inner">
              <div className="card-avatar">{name.initials}</div>
              <h3>{name.full}</h3>
              <div className="role">{card.role}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>{card.description}</p>
              <div className="card-info">
                {card.info.map((item) => (
                  <div className="info-item" key={item.label}>
                    <label>{item.label}</label>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
