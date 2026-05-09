import type { ReactNode } from 'react';
import type { Project } from '../types';

const icons: Record<string, ReactNode> = {
  brain: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 .9-.2 1.7-.6 2.5a5 5 0 0 1 1.6 6 5 5 0 0 1-3.2 2.3A5 5 0 0 1 12 22a5 5 0 0 1-2.8-4.2A5 5 0 0 1 6 15.5a5 5 0 0 1 1.6-6A5 5 0 0 1 7 7a5 5 0 0 1 5-5z"/><path d="M12 2v20"/><path d="M7 7c2.8 0 5 2.2 5 5"/><path d="M17 7c-2.8 0-5 2.2-5 5"/></svg>,
  signal: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>,
  zap: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  bot: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
};

function ComingSoonCard({ num }: { num: string }) {
  return (
    <div className="project-card coming-soon-card">
      <div className="project-num">{num}</div>
      <div className="cs-overlay">
        <div className="cs-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div className="cs-label">COMING SOON</div>
        <div className="cs-sub">Something new is being crafted</div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  if (project.coming_soon) return <ComingSoonCard num={project.num} />;

  const isExternal = project.link !== '#';
  return (
    <div className={`project-card${project.featured ? ' featured' : ''}`}>
      <div className="project-num">{project.num}</div>
      <div className="project-icon">{icons[project.icon]}</div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}
      </div>
      <a
        href={project.link}
        className="project-link"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        View Project →
      </a>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects">
      <canvas className="section-bg" id="projects-bg" />
      <div className="projects-header reveal">
        <div className="section-tag">Featured Work</div>
        <h2>Projects</h2>
      </div>
      <div className="projects-grid reveal">
        {projects.map((p) => <ProjectCard project={p} key={p.num} />)}
      </div>
    </section>
  );
}
