import type { Footer as FooterType } from '../types';

export default function Footer({ footer }: { footer: FooterType }) {
  return (
    <footer>
      <span style={{ color: 'var(--cyan)' }}>{footer.name}</span>
      &nbsp;·&nbsp; {footer.role}
    </footer>
  );
}
