import type { PortfolioData } from '../types';
import { useSkillBars } from '../hooks';

export default function Skills({ skills }: Pick<PortfolioData, 'skills'>) {
  useSkillBars();

  return (
    <section id="skills">
      <canvas className="section-bg" id="skills-bg" />
      <div className="skills-inner">
        <div className="section-tag reveal">Capabilities</div>
        <h2 className="reveal">Technical <span style={{ color: 'var(--cyan)' }}>Arsenal</span></h2>
        <div className="skills-categories reveal">
          {skills.categories.map((cat) => (
            <div className="skill-cat" key={cat.name}>
              <h4>{cat.name}</h4>
              {cat.skill_list.map((skill) => (
                <div className="skill-item" key={skill.name} data-pct={skill.pct / 100}>
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.pct}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
