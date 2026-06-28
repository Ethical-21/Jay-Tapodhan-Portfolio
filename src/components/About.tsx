import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { PortfolioData } from "../types";

type Props = Pick<PortfolioData, "about" | "card" | "name">;

/* ── Framer Motion ── */
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const fadeScale = {
  hidden: { opacity: 0, scale: 0.93 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease } },
};

/* ── Glitch Text Hook ── */
function useGlitchText(finalText: string, shouldStart: boolean, delay = 0) {
  const [display, setDisplay] = useState(finalText);
  const chars = "█▓░▒╬╠╣▀▄■□◆◇●";

  useEffect(() => {
    if (!shouldStart) return;
    let frame = 0;
    const totalFrames = 12;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        if (frame >= totalFrames) {
          setDisplay(finalText);
          clearInterval(interval);
          return;
        }
        const progress = frame / totalFrames;
        setDisplay(
          finalText
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i / finalText.length < progress) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
      }, 50);
    }, delay);
    return () => clearTimeout(timer);
  }, [shouldStart, finalText, delay]);

  return display;
}

/* ── Typewriter Hook ── */
function useTypewriter(text: string, shouldStart: boolean, speed = 30, delay = 0) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!shouldStart) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplay(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => clearTimeout(timer);
  }, [shouldStart, text, speed, delay]);

  return display;
}

/* ── SVG Icon Map ── */
const icons: Record<string, React.ReactNode> = {
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  medal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" /><path d="m13 12 5.88-9.8" /><path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" /><path d="M12 18v-2h-.5" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`icon ${className || ""}`}>
      {icons[name] || <span className="icon-bullet" />}
    </span>
  );
}

/* ── Glitch Fact Component ── */
function GlitchFact({ label, value, inView, delay }: { label: string; value: string; inView: boolean; delay: number }) {
  const glitchedValue = useGlitchText(value, inView, delay);
  return (
    <div className="about-fact">
      <label>{label}</label>
      <span className="glitch-text">{glitchedValue}</span>
    </div>
  );
}

export default function About({ about, card, name }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });

  const typedIntro = useTypewriter(about.intro, inView, 15, 800);

  return (
    <section id="about">
      <canvas className="section-bg" id="about-bg" />

      {/* ── Floating "CLASSIFIED" watermarks ── */}
      <div className="dossier-watermarks" aria-hidden="true">
        <span className="watermark wm-1">CLASSIFIED</span>
        <span className="watermark wm-2">TOP SECRET</span>
        <span className="watermark wm-3">CONFIDENTIAL</span>
      </div>

      <motion.div
        className="about-grid dossier-theme"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        ref={sectionRef}
      >
        {/* ── 1. Holographic ID Badge ── */}
        <motion.div className="about-card about-id dossier-id" variants={fadeScale}>
          <div className="dossier-stamp">PERSONNEL FILE</div>
          <div className="id-photo-wrap">
            <img
              src="/jay.jpg"
              alt={name.full}
              className="id-photo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fb = e.currentTarget.nextElementSibling as HTMLElement;
                if (fb) fb.style.display = "flex";
              }}
            />
            <div className="id-photo-fallback" style={{ display: "none" }}>
              {name.initials}
            </div>
            {/* Scan-line sweep */}
            <div className="id-scanline" />
            {/* Fingerprint overlay on hover */}
            <div className="id-fingerprint" />
          </div>
          <h3 className="id-name">{name.full}</h3>
          <div className="id-role">{card.role}</div>
          <div className="dossier-id-code">ID: JT-{new Date().getFullYear()}-ALPHA</div>
        </motion.div>

        {/* ── 2. Dossier Profile — decrypting text ── */}
        <motion.div className="about-card about-profile dossier-profile" variants={fadeUp}>
          <div className="section-tag">
            <span className="dossier-blink">[DECRYPTED]</span> Subject Briefing
          </div>
          <h2 className="about-heading">
            {about.heading_lines.map((line, i) =>
              i === about.heading_lines.length - 1 ? (
                <span key={i} className="heading-accent">
                  {line}
                </span>
              ) : (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ),
            )}
          </h2>
          <p className="about-intro dossier-typed">
            {typedIntro}
            <span className="typing-cursor">▌</span>
          </p>
          <div className="about-facts">
            {card.info.map((item, i) => (
              <GlitchFact
                key={item.label}
                label={item.label}
                value={item.value}
                inView={inView}
                delay={1200 + i * 400}
              />
            ))}
          </div>
        </motion.div>

        {/* ── 3-6. Clearance Level Cards ── */}
        {about.badges.map((b, i) => (
          <motion.div
            className="about-card about-badge dossier-clearance"
            key={i}
            variants={fadeUp}
          >
            <div className="clearance-level">LEVEL 0{i + 1}</div>
            <Icon name={b.icon} className="badge-icon" />
            <div className="badge-title">{b.title}</div>
            <div className="badge-detail">{b.detail}</div>
            <div className="clearance-status">
              <span className="status-dot" />
              VERIFIED
            </div>
          </motion.div>
        ))}

        {/* ── 7. Mission Log ── */}
        <motion.div className="about-card about-experience dossier-missions" variants={fadeUp}>
          <div className="card-label">
            <span className="dossier-blink">[●]</span> Mission Log
          </div>
          <div className="exp-list">
            {about.experience.map((e, i) => (
              <div className="exp-item mission-entry" key={i}>
                <div className="mission-status">
                  <span className={`mission-indicator ${i === 0 ? "active" : "completed"}`} />
                </div>
                <div className="exp-content">
                  <div className="exp-company">{e.company}</div>
                  <div className="exp-role">{e.role}</div>
                </div>
                <div className="exp-period mission-date">{e.period}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 8. Leadership & Community ── */}
        <motion.div className="about-card about-leadership dossier-missions" variants={fadeUp}>
          <div className="card-label">
            <span className="dossier-blink">[●]</span> Leadership & Community
          </div>
          <div className="lead-list">
            {about.leadership.map((l, i) => (
              <div className="lead-item" key={i}>
                <Icon name={l.icon} className="lead-icon" />
                <div className="lead-content">
                  <div className="lead-role">{l.role}</div>
                  <div className="lead-org">{l.org}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
