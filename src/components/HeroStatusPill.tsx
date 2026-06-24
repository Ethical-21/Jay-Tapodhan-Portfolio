import type { JSX } from 'react';

export default function HeroStatusPill(): JSX.Element {
  return (
    <div className="hero-status-pill fade-in-up" style={{ animationDelay: '0.6s' }}>
      <div className="pulse-dot"></div>
      <span className="status-text">Available for new opportunities</span>
      <div className="status-badge">2026</div>
    </div>
  );
}
