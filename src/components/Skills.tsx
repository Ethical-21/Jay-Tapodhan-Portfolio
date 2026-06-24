import type { PortfolioData } from '../types';

const buildMap = [
  {
    stage: '01',
    title: 'Shape',
    subtitle: 'Product thinking',
    tools: ['UI composition', 'Responsive layouts', 'Interaction details'],
    result: 'Ideas become clear screens.',
  },
  {
    stage: '02',
    title: 'Build',
    subtitle: 'Frontend engineering',
    tools: ['React.js', 'Next.js', 'Tailwind', 'TypeScript'],
    result: 'Interfaces feel fast and polished.',
  },
  {
    stage: '03',
    title: 'Connect',
    subtitle: 'Backend and data',
    tools: ['Node.js', 'Express.js', 'FastAPI', 'MongoDB', 'Firebase', 'SQL'],
    result: 'Products get real logic and persistence.',
  },
  {
    stage: '04',
    title: 'Augment',
    subtitle: 'AI integrations',
    tools: ['LLM APIs', 'GROQ API', 'Chat flows', 'Automation'],
    result: 'AI supports useful product moments.',
  },
  {
    stage: '05',
    title: 'Ship',
    subtitle: 'Delivery habits',
    tools: ['Git', 'GitHub', 'Vercel', 'Reports', 'Docs'],
    result: 'Work is packaged, shared, and improved.',
  },
];

export default function Skills(_props: Pick<PortfolioData, 'skills'>) {
  return (
    <section id="skills">
      <canvas className="section-bg" id="skills-bg" />
      <div className="skills-inner">
        <div className="section-tag reveal">Capabilities</div>
        <h2 className="reveal">How I <span style={{ color: 'var(--cyan)' }}>Build</span></h2>
        <p className="skills-intro reveal">
          A readable map of how my stack turns an idea into a shipped product.
        </p>

        <div className="build-map reveal">
          {buildMap.map((item) => (
            <article className="build-stage" key={item.stage}>
              <div className="build-stage-index">{item.stage}</div>
              <div className="build-stage-core">
                <span className="build-pulse" />
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
              <div className="build-tool-cloud">
                {item.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              <div className="build-result">{item.result}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
