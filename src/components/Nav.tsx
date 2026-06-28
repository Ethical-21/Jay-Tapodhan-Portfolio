import { useState, useEffect } from "react";


const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ initials }: { initials: string }) {
  const [open, setOpen] = useState(false);
  const [showFixed, setShowFixed] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowFixed(window.scrollY > 300);

      const sections = ["about", "projects", "skills", "contact"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Consider active if section crosses the middle of the viewport
          if (
            rect.top <= window.innerHeight / 3 &&
            rect.bottom >= window.innerHeight / 3
          ) {
            current = `#${section}`;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const close = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };
  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    close();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="nav-container">
      <nav className={`nav-dynamic-pill ${showFixed ? "scrolled" : ""}`}>
        <div
          className="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {initials}
          <span>.</span>
        </div>

        <button
          className={`nav-toggle${open ? " open" : ""}`}
          aria-label="Toggle navigation"
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links${open ? " open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={activeSection === l.href ? "active" : ""}
                onClick={(e) => handleNavClick(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
