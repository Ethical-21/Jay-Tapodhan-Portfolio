import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function ResumeModal({ open, onClose, pdfUrl }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const loaded   = useRef(false);

  // Lazy-load PDF only once
  useEffect(() => {
    if (open && !loaded.current && frameRef.current) {
      frameRef.current.src = pdfUrl;
      loaded.current = true;
    }
  }, [open, pdfUrl]);

  // Body scroll lock + ESC key
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return createPortal(
    <div className={`resume-modal${open ? ' open' : ''}`} role="dialog" aria-modal="true">
      <div className="resume-modal-backdrop" onClick={onClose} />
      <div className="resume-modal-box">
        <div className="resume-modal-header">
          <span className="resume-modal-title">
            JAY TAPODHAN <span>— Resume</span>
          </span>
          <div className="resume-modal-actions">
            <a
              href={pdfUrl}
              download="Jay_Tapodhan_Resume.pdf"
              className="resume-dl-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download
            </a>
            <button className="resume-close-btn" onClick={onClose} title="Close">✕</button>
          </div>
        </div>
        <iframe
          ref={frameRef}
          className="resume-iframe"
          title="Jay Tapodhan Resume"
        />
      </div>
    </div>,
    document.body
  );
}

