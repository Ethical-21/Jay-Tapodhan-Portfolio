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

/* ── Typewriter Hook ── */
function useTypewriter(text: string, shouldStart: boolean, speed = 20, delay = 0) {
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

/* ── OS Window Chrome ── */
function WindowBar({ title, variant = "default" }: { title: string; variant?: string }) {
  return (
    <div className={`os-window-bar ${variant}`}>
      <div className="os-window-dots">
        <span className="dot-close" />
        <span className="dot-min" />
        <span className="dot-max" />
      </div>
      <span className="os-window-title">{title}</span>
      <div className="os-window-dots-spacer" />
    </div>
  );
}

export default function About({ about, card, name }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });
  const typedIntro = useTypewriter(about.intro, inView, 12, 600);

  /* Mouse parallax for subtle depth */
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section id="about">
      <canvas className="section-bg" id="about-bg" />

      {/* ── CRT Scanline Overlay ── */}
      <div className="os-scanlines" aria-hidden="true" />
      {/* ── Grid background ── */}
      <div className="os-grid-bg" aria-hidden="true" />

      <motion.div
        className="about-grid os-desktop"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        ref={sectionRef}
      >
        {/* ── 1. user_profile.exe ── */}
        <motion.div
          className="about-card about-id os-window"
          variants={fadeScale}
          style={{ transform: `translate(${mouse.x * 3}px, ${mouse.y * 2}px)` }}
        >
          <WindowBar title="user_profile.exe" />
          <div className="os-window-body">
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
            </div>
            <h3 className="id-name">{name.full}</h3>
            <div className="id-role">{card.role}</div>
            <div className="os-status-bar">
              <span className="os-status-dot" /> Online
            </div>
          </div>
        </motion.div>

        {/* ── 2. terminal.sh — intro types out ── */}
        <motion.div
          className="about-card about-profile os-window os-terminal"
          variants={fadeUp}
          style={{ transform: `translate(${mouse.x * -2}px, ${mouse.y * -1.5}px)` }}
        >
          <WindowBar title="terminal.sh" variant="terminal" />
          <div className="os-window-body os-terminal-body">
            <div className="section-tag">
              <span className="os-prompt">$</span> cat about_me.txt
            </div>
            <h2 className="about-heading">
              {about.heading_lines.map((line, i) =>
                i === about.heading_lines.length - 1 ? (
                  <span key={i} className="heading-accent">{line}</span>
                ) : (
                  <span key={i}>{line}<br /></span>
                ),
              )}
            </h2>
            <p className="about-intro os-typed-text">
              {typedIntro}
              <span className="os-cursor">█</span>
            </p>
            <div className="about-facts os-facts-grid">
              {card.info.map((item) => (
                <div className="about-fact" key={item.label}>
                  <label><span className="os-prompt">→</span> {item.label}</label>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 3-6. Achievement Notifications ── */}
        {about.badges.map((b, i) => (
          <motion.div
            className="about-card about-badge os-window os-notification"
            key={i}
            variants={fadeUp}
            style={{ transform: `translate(${mouse.x * (1 + i * 0.5)}px, ${mouse.y * (1 + i * 0.3)}px)` }}
          >
            <WindowBar title={`achievement_${String(i + 1).padStart(2, "0")}.log`} />
            <div className="os-window-body os-notif-body">
              <div className="os-notif-header">
                <Icon name={b.icon} className="badge-icon" />
                <span className="os-notif-tag">★ UNLOCKED</span>
              </div>
              <div className="badge-title">{b.title}</div>
              <div className="badge-detail">{b.detail}</div>
            </div>
          </motion.div>
        ))}

        {/* ── 7. career_log.db ── */}
        <motion.div
          className="about-card about-experience os-window"
          variants={fadeUp}
          style={{ transform: `translate(${mouse.x * -1.5}px, ${mouse.y * 1}px)` }}
        >
          <WindowBar title="career_log.db" />
          <div className="os-window-body">
            <div className="os-db-header">
              <span className="os-db-col">ENTITY</span>
              <span className="os-db-col">ROLE</span>
              <span className="os-db-col">PERIOD</span>
            </div>
            <div className="exp-list">
              {about.experience.map((e, i) => (
                <div className="exp-item os-db-row" key={i}>
                  <div className="exp-content">
                    <div className="exp-company">{e.company}</div>
                    <div className="exp-role">{e.role}</div>
                  </div>
                  <div className="exp-period">{e.period}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 8. network.sys ── */}
        <motion.div
          className="about-card about-leadership os-window"
          variants={fadeUp}
          style={{ transform: `translate(${mouse.x * 2}px, ${mouse.y * -1}px)` }}
        >
          <WindowBar title="network.sys" />
          <div className="os-window-body">
            <div className="card-label">Connections & Leadership</div>
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
          </div>
        </motion.div>
      </motion.div>

      {/* ── Taskbar ── */}
      <div className="os-taskbar">
        <div className="os-taskbar-start">
          <span className="os-taskbar-logo">JT://OS</span>
        </div>
        <div className="os-taskbar-apps">
          <span className="os-taskbar-app active">user_profile</span>
          <span className="os-taskbar-app active">terminal</span>
          <span className="os-taskbar-app">career_log</span>
          <span className="os-taskbar-app">network</span>
        </div>
        <div className="os-taskbar-clock">
          {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </section>
  );
}
