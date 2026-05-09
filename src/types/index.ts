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

export interface About {
  heading_lines: string[];
  paragraphs: string[];
  chips: string[];
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
