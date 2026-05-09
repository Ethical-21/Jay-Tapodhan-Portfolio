import { useState } from 'react';

const links = [
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills',   label: 'Skills' },
  { href: '#contact',  label: 'Contact' },
];

export default function Nav({ initials }: { initials: string }) {
  const [open, setOpen] = useState(false);
  const close = () => { setOpen(false); document.body.style.overflow = ''; };
  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <nav>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{initials}<span>.</span></div>

      <button
        className={`nav-toggle${open ? ' open' : ''}`}
        id="navToggle"
        aria-label="Toggle navigation"
        onClick={toggle}
      >
        <span /><span /><span />
      </button>

      <ul className={`nav-links${open ? ' open' : ''}`} id="navLinks">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={close}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
