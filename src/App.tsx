import { useState, useCallback, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import portfolio from './data/portfolio';
import { useScrollReveal } from './hooks';
import { useSectionBg } from './hooks/useSectionBg';

import Loader      from './components/Loader';
import BgCanvas    from './components/BgCanvas';
import Cursor      from './components/Cursor';
import Nav         from './components/Nav';
import Hero        from './components/Hero';
import About       from './components/About';
import Projects    from './components/Projects';
import Skills      from './components/Skills';
import Contact     from './components/Contact';
import Footer      from './components/Footer';

export default function App() {
  const [, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [loaderMounted, setLoaderMounted] = useState(true);

  useScrollReveal();
  useSectionBg();

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    // Reveal content — the loader JT. is still visible at nav position
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRevealed(true);
      });
    });
  }, []);

  // Remove loader from DOM after content is revealed and nav JT. is visible
  useEffect(() => {
    if (revealed) {
      const timer = setTimeout(() => setLoaderMounted(false), 900);
      return () => clearTimeout(timer);
    }
  }, [revealed]);

  return (
    <>
      {/* Loading animation — stays mounted until real nav is visible */}
      {loaderMounted && <Loader onComplete={handleLoaderComplete} />}

      {/* Fixed background canvas */}
      <BgCanvas />

      {/* Custom cursor */}
      <Cursor />

      {/* Main content — hidden during load, revealed after */}
      <div className={`app-content${revealed ? ' revealed' : ''}`}>
        {/* Navigation */}
        <Nav initials={portfolio.name.initials} />

        {/* Sections */}
        <Hero
          name={portfolio.name}
          title={portfolio.title}
          tagline={portfolio.tagline}
          stats={portfolio.stats}
        />
        <About
          about={portfolio.about}
          card={portfolio.card}
          name={portfolio.name}
        />
        <Projects projects={portfolio.projects} />
        <Skills   skills={portfolio.skills} />
        <Contact  contact={portfolio.contact} />

        {/* Footer */}
        <Footer footer={portfolio.footer} />
      </div>

      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
