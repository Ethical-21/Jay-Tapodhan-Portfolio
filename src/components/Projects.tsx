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

  /* ── Featured card — expanded layout ── */
  if (project.featured) {
    const featureIcons = [
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    ];

    return (
      <div className="project-card featured">
        <div className="project-num">{project.num}</div>
        <div className="project-icon">{icons[project.icon]}</div>
        <div className="featured-title-row">
          <h3>{project.title}</h3>
          {project.liveUrl && (
            <span className="live-badge">
              <span className="live-dot" />
              LIVE
            </span>
          )}
        </div>
        <p>{project.description}</p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="featured-features-grid">
            {project.highlights.map((h, i) => (
              <div className="feature-chip" key={h}>
                <span className="feature-chip-icon">{featureIcons[i % featureIcons.length]}</span>
                <span className="feature-chip-text">{h}</span>
              </div>
            ))}
          </div>
        )}

        <div className="project-tags">
          {project.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}
        </div>
        <div className="featured-actions">
          <a
            href={project.link}
            className="project-link"
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            GitHub →
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="project-link live-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo →
            </a>
          )}
        </div>
      </div>
    );
  }

  /* ── Standard card ── */
  return (
    <div className="project-card">
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
