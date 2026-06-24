import { useEffect } from 'react';
import type { Project } from '../types';
import './ProjectDrawer.css';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: Props) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const isExternal = project.link !== '#';

  return (
    <div className={`drawer-overlay ${project ? 'open' : ''}`} onClick={onClose}>
      <div className={`drawer-content ${project ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="drawer-close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="drawer-scroll">
          {project.image && (
            <div className="drawer-hero-img">
              <img src={project.image} alt={project.title} />
            </div>
          )}

          <div className="drawer-header">
            <div className="drawer-num">{project.num}</div>
            <h2>{project.title}</h2>
          </div>

          <div className="drawer-section">
            <h3>Overview</h3>
            <p>{project.description}</p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="drawer-section">
              <h3>Key Features</h3>
              <ul className="drawer-features">
                {project.highlights.map(h => (
                  <li key={h}>
                    <span className="bullet"></span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="drawer-section">
            <h3>Tech Stack</h3>
            <div className="drawer-tags">
              {project.tags.map(tag => (
                <span className="drawer-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="drawer-actions">
            {isExternal && (
              <a href={project.link} className="drawer-btn" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Source Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} className="drawer-btn primary" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            )}
            {project.reportUrl && (
              <a href={project.reportUrl} className="drawer-btn" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                View Report
              </a>
            )}
            {project.videoUrl && (
              <a href={project.videoUrl} className="drawer-btn" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch Video
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
