import type { PortfolioData } from '../types';
import { useCounters } from '../hooks';

type Props = Pick<PortfolioData, 'name' | 'title' | 'tagline' | 'stats'>;

export default function Hero({ name, title, tagline, stats }: Props) {
  useCounters();

  return (
    <section id="hero">
      <div className="deco-line" />
      <div className="hero-tag">{title}</div>
      <h1 className="hero-name">
        <div>{name.first}</div>
        <div className="line2 glitch" data-text={name.last}>{name.last}</div>
      </h1>
      <p className="hero-sub">{tagline}</p>
      <div className="hero-btns">
        <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
          View Projects
        </button>
        <button className="btn-outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Get In Touch
        </button>
      </div>

      <div className="hero-stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div
              className="stat-num"
              data-counter
              data-counter-target={s.value}
              data-counter-suffix={s.suffix}
              data-counter-decimals={s.decimals}
            >0</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        <div className="scroll-text">Scroll</div>
      </div>
    </section>
  );
}
