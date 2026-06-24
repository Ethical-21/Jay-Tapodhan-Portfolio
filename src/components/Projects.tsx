import { useState, type ReactNode } from 'react';
import type { Project } from '../types';

const icons: Record<string, ReactNode> = {
  brain: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 .9-.2 1.7-.6 2.5a5 5 0 0 1 1.6 6 5 5 0 0 1-3.2 2.3A5 5 0 0 1 12 22a5 5 0 0 1-2.8-4.2A5 5 0 0 1 6 15.5a5 5 0 0 1 1.6-6A5 5 0 0 1 7 7a5 5 0 0 1 5-5z"/><path d="M12 2v20"/><path d="M7 7c2.8 0 5 2.2 5 5"/><path d="M17 7c-2.8 0-5 2.2-5 5"/></svg>,
  signal: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>,
  zap: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  bot: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
};

const actionIcons = {
  github: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>,
  live: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  report: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
};

function isRealLink(url?: string) {
  return Boolean(url && url !== '#');
}

function projectKind(project: Project) {
  const title = project.title.toLowerCase();
  if (title.includes('infra')) return 'infra';
  if (title.includes('flavour')) return 'recipe';
  if (title.includes('muse')) return 'chat';
  if (title.includes('task')) return 'task';
  return 'product';
}

function ProjectPreview({ project }: { project: Project }) {
  const kind = projectKind(project);

  return (
    <div className={`project-preview project-preview-${kind}`} aria-hidden="true">
      <div className="preview-topbar">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-stage">
        {kind === 'infra' && (
          <>
            <div className="preview-side-list">
              <i /><i /><i />
            </div>
            <div className="preview-monitor-grid">
              <b />
              <b />
              <b />
              <b />
            </div>
            <div className="preview-chart">
              <i style={{ height: '35%' }} />
              <i style={{ height: '58%' }} />
              <i style={{ height: '45%' }} />
              <i style={{ height: '78%' }} />
              <i style={{ height: '64%' }} />
            </div>
          </>
        )}
        {kind === 'recipe' && (
          <>
            <div className="preview-recipe-card primary" />
            <div className="preview-recipe-card" />
            <div className="preview-pill-row">
              <i />
              <i />
              <i />
            </div>
            <div className="preview-ai-panel" />
          </>
        )}
        {kind === 'chat' && (
          <>
            <div className="preview-chat-bubble left" />
            <div className="preview-chat-bubble right" />
            <div className="preview-chat-bubble left short" />
            <div className="preview-input" />
          </>
        )}
        {kind === 'task' && (
          <>
            <div className="preview-kanban-col"><i /><i /><i /></div>
            <div className="preview-kanban-col"><i /><i /></div>
            <div className="preview-kanban-col"><i /><i /><i /></div>
          </>
        )}
      </div>
    </div>
  );
}

function ProjectActions({ project }: { project: Project }) {
  const actions = [
    isRealLink(project.link) && { href: project.link, label: 'GitHub', icon: actionIcons.github, className: '' },
    isRealLink(project.liveUrl) && { href: project.liveUrl, label: 'Live Demo', icon: actionIcons.live, className: 'live-link' },
    isRealLink(project.reportUrl) && { href: project.reportUrl, label: 'Report', icon: actionIcons.report, className: 'report-link' },
  ].filter(Boolean) as Array<{ href: string; label: string; icon: ReactNode; className: string }>;

  if (!actions.length) return null;

  return (
    <div className="featured-actions">
      {actions.map((action) => (
        <a
          href={action.href}
          className={`project-link ${action.className}`}
          target="_blank"
          rel="noopener noreferrer"
          key={action.label}
          onClick={(event) => event.stopPropagation()}
        >
          {action.icon}
          {action.label}
        </a>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  active,
  onToggle,
}: {
  project: Project;
  active: boolean;
  onToggle: () => void;
}) {
  const featureItems = project.highlights?.slice(0, 4) || [];

  return (
    <article
      className={`project-card ${project.featured ? 'featured' : ''}${active ? ' project-card-active' : ''}`}
      onClick={onToggle}
      tabIndex={0}
      role="button"
      aria-expanded={active}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="project-num">{project.num}</div>

      <div className="project-content-wrapper">
        <div className="project-media-column">
          <ProjectPreview project={project} />
          <ProjectActions project={project} />
        </div>
        <div className="project-detail-column">

          <div className="project-icon">{icons[project.icon]}</div>
          <div className="featured-title-row">
            <h3>{project.title}</h3>
            {isRealLink(project.liveUrl) && (
              <span className="live-badge">
                <span className="live-dot" />
                LIVE
              </span>
            )}
          </div>
          <p>{project.description}</p>

          {featureItems.length > 0 && (
            <div className="featured-features-grid">
              {featureItems.map((highlight) => (
                <span className="feature-chip" key={highlight}>
                  <span className="feature-chip-icon">{icons[project.icon]}</span>
                  <span className="feature-chip-text">{highlight}</span>
                </span>
              ))}
            </div>
          )}

          <div className="project-tags">
            {project.tags.map((tag) => (
              <span className="project-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <button className="project-expand-hint" type="button" onClick={(event) => { event.stopPropagation(); onToggle(); }}>
        {active ? 'Collapse' : 'View Details'} <span>→</span>
      </button>
    </article>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<string>('');

  const rows = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  return (
    <section id="projects">
      <canvas className="section-bg" id="projects-bg" />
      <div className="projects-header reveal">
        <div className="section-tag">Featured Work</div>
        <h2>Projects</h2>
      </div>
      <div className="projects-grid reveal">
        {rows.map((row, rowIndex) => {
          const isRowActive = row.some((p) => p.num === activeProject);
          return (
            <div className={`project-row ${isRowActive ? 'row-active' : ''}`} key={rowIndex}>
              {row.map((project) => (
                <ProjectCard
                  project={project}
                  key={project.num}
                  active={activeProject === project.num}
                  onToggle={() => setActiveProject((current) => current === project.num ? '' : project.num)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
