import { motion } from "framer-motion";
import type { PortfolioData } from "../types";

type Props = Pick<PortfolioData, "about" | "card" | "name">;

/* ── Framer Motion ── */
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const fadeScale = {
  hidden: { opacity: 0, scale: 0.93 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease } },
};

/* ── SVG Icon Map ── */
const icons: Record<string, React.ReactNode> = {
  trophy: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  medal: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2h-.5" />
    </svg>
  ),
  target: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  star: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  ),
  clipboard: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  ),
  palette: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  users: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

export default function About({ about, card, name }: Props) {
  return (
    <section id="about">
      <canvas className="section-bg" id="about-bg" />

      <motion.div
        className="about-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
      >
        {/* ── 1. ID Card — photo + name + role ── */}
        <motion.div className="about-card about-id" variants={fadeScale}>
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
        </motion.div>

        {/* ── 2. Profile — heading + intro + facts ── */}
        <motion.div className="about-card about-profile" variants={fadeUp}>
          <div className="section-tag">About Me</div>
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
          <p className="about-intro">{about.intro}</p>
          <div className="about-facts">
            {card.info.map((item) => (
              <div className="about-fact" key={item.label}>
                <label>{item.label}</label>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 3-6. Achievement Badges ── */}
        {about.badges.map((b, i) => (
          <motion.div
            className="about-card about-badge"
            key={i}
            variants={fadeUp}
          >
            <div className="badge-icon-wrapper">
              <svg className="badge-ring" viewBox="0 0 60 60">
                <circle className="ring-bg" cx="30" cy="30" r="28" />
                <motion.circle 
                  className="ring-progress" 
                  cx="30" cy="30" r="28" 
                  initial={{ strokeDashoffset: 176 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                />
              </svg>
              <Icon name={b.icon} className="badge-icon" />
            </div>
            <div className="badge-title">{b.title}</div>
            <div className="badge-detail">{b.detail}</div>
          </motion.div>
        ))}

        {/* ── 7. Experience Timeline ── */}
        <motion.div className="about-card about-experience" variants={fadeUp}>
          <div className="card-label">Experience</div>
          <div className="exp-list">
            {about.experience.map((e, i) => (
              <div className="exp-item" key={i}>
                <div className="exp-dot" />
                <div className="exp-content">
                  <div className="exp-company">{e.company}</div>
                  <div className="exp-role">{e.role}</div>
                  <div className="exp-progress-bar">
                    <motion.div 
                      className="exp-progress-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <div className="exp-period">{e.period}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 8. Leadership & Community ── */}
        <motion.div className="about-card about-leadership" variants={fadeUp}>
          <div className="card-label">Leadership & Community</div>
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
