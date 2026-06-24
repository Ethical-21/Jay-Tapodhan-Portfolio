import type { JSX } from 'react';

const icons = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'AI/LLMs', icon: '🧠' },
];

export default function HeroTechStrip(): JSX.Element {
  return (
    <div className="hero-tech-strip fade-in-up" style={{ animationDelay: '1s' }}>
      {icons.map((tech) => (
        <div key={tech.name} className="tech-item" title={tech.name}>
          <span className="tech-icon">{tech.icon}</span>
          <span className="tech-name">{tech.name}</span>
        </div>
      ))}
    </div>
  );
}
