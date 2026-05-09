import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import portfolio from './data/portfolio';
import { useScrollReveal } from './hooks';
import { useSectionBg } from './hooks/useSectionBg';

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
  useScrollReveal();
  useSectionBg();

  return (
    <>
      {/* Fixed background canvas */}
      <BgCanvas />

      {/* Custom cursor */}
      <Cursor />

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

      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
