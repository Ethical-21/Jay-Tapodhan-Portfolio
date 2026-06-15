export interface Stat {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
}

export interface Chip {
  label: string;
}

export interface CardInfo {
  label: string;
  value: string;
}

export interface AboutBadge {
  icon: string;
  title: string;
  detail: string;
}

export interface AboutExperience {
  company: string;
  role: string;
  period: string;
}

export interface AboutLeadership {
  icon: string;
  role: string;
  org: string;
}

export interface About {
  heading_lines: string[];
  intro: string;
  badges: AboutBadge[];
  experience: AboutExperience[];
  leadership: AboutLeadership[];
}

export interface Card {
  role: string;
  description: string;
  info: CardInfo[];
}

export interface Project {
  num: string;
  icon: 'brain' | 'signal' | 'zap' | 'bot' | 'soon';
  title: string;
  description: string;
  tags: string[];
  link: string;
  featured: boolean;
  coming_soon?: boolean;
  deployingSoon?: boolean;
  liveUrl?: string;
  highlights?: string[];
  reportUrl?: string;
  videoUrl?: string;
}

export interface SkillItem {
  name: string;
  pct: number;
}

export interface SkillCategory {
  name: string;
  skill_list: SkillItem[];
}

export interface ContactLink {
  icon: 'mail' | 'github' | 'linkedin' | 'download';
  text: string;
  url: string;
  modal?: boolean;
}

export interface Contact {
  heading: string;
  description: string;
  links: ContactLink[];
}

export interface Footer {
  name: string;
  role: string;
  year: string;
}

export interface PortfolioData {
  name: { first: string; last: string; initials: string; full: string };
  title: string;
  tagline: string;
  stats: Stat[];
  about: About;
  card: Card;
  projects: Project[];
  skills: { categories: SkillCategory[] };
  contact: Contact;
  footer: Footer;
}
