import type { PortfolioData } from '../types';

const portfolio: PortfolioData = {
  name: { first: 'JAY', last: 'TAPODHAN', initials: 'JT', full: 'Jay Tapodhan' },
  title: 'Computer Engineering Student',
  tagline:
    'Building intelligent web apps and AI systems at the intersection of full-stack development and machine learning. Passionate about LLMs, real-time systems, and shipping things that matter.',
  stats: [
    { value: 4,    suffix: '+', decimals: 0, label: 'Projects' },
    { value: 10,   suffix: '+', decimals: 0, label: 'Technologies' },
    { value: 8.51, suffix: '',  decimals: 2, label: 'CGPA / 10' },
  ],
  about: {
    heading_lines: ['Engineer.', 'Builder.', 'Innovator.'],
    paragraphs: [
      "A 4th-year Computer Engineering student at MBIT, CVM University with hands-on experience building AI-powered applications and full-stack web systems. From LLM-based chatbots to task management platforms — I ship things that work.",
      "Previously interned at Flaunch as an AI Technology Intern and trained at IBM as a Full Stack Development Trainee. When not coding, I'm anchoring college events, designing creatives, or competing in hackathons.",
    ],
    chips: [
      'Python', 'React.js', 'Node.js', 'Express.js',
      'MongoDB', 'LLaMA / Ollama', 'Flask', 'REST APIs',
      'Firebase', 'Tailwind CSS', 'Git', 'SQL',
    ],
  },
  card: {
    role: 'Computer Engineering · 4th Year',
    description:
      'Specializing in full-stack web development, AI/ML integration, and building production-ready applications with modern JavaScript and Python ecosystems.',
    info: [
      { label: 'University', value: 'MBIT, CVMU' },
      { label: 'Graduation', value: '2027' },
      { label: 'Focus',      value: 'Web + AI / ML' },
      { label: 'Location',   value: 'Anand, India' },
    ],
  },
  projects: [
    {
      num: '01', icon: 'zap', featured: true,
      title: 'TaskFlow — Team Task Manager',
      description:
        'Team task management platform with assignment workflows, collaboration dashboard, and fully responsive UI. Built as IBM Full Stack capstone project.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      link: 'https://github.com/Ethical-21',
    },
    {
      num: '02', icon: 'brain', featured: false,
      title: 'Smart Recipe Generator & Meal Planner',
      description:
        'AI-powered web app for recipe generation, smart meal planning, and ingredient suggestions powered by GROQ API and Firebase authentication.',
      tags: ['MealDB API', 'Firebase Auth', 'GROQ API', 'React.js'],
      link: 'https://github.com/Ethical-21',
    },
    {
      num: '03', icon: 'bot', featured: false,
      title: 'Personalized Reading Comprehension Assistant',
      description:
        'Local AI tool that summarizes uploaded documents and auto-generates comprehension questions using LLaMA 3.2 running via Ollama — fully offline.',
      tags: ['Python', 'LLaMA 3.2', 'Ollama', 'NLP'],
      link: 'https://github.com/Ethical-21',
    },
    {
      num: '04', icon: 'soon', featured: false, coming_soon: true,
      title: 'Coming Soon',
      description: 'Something new is being crafted. Stay tuned — next project dropping soon.',
      tags: ['???', 'In Progress', '2025'],
      link: '#',
    },
    {
      num: '05', icon: 'soon', featured: false, coming_soon: true,
      title: 'Coming Soon',
      description: 'Something new is being crafted. Stay tuned — next project dropping soon.',
      tags: ['???', 'In Progress', '2025'],
      link: '#',
    },
  ],
  skills: {
    categories: [
      {
        name: 'Languages & Web Development',
        skill_list: [
          { name: 'Python / C / C++',             pct: 88 },
          { name: 'React.js / Node.js / Express', pct: 82 },
          { name: 'HTML / Tailwind CSS',           pct: 85 },
          { name: 'SQL / MongoDB / Firebase',      pct: 78 },
        ],
      },
      {
        name: 'AI / ML & Tools',
        skill_list: [
          { name: 'LLaMA / Ollama / Prompt Eng.', pct: 80 },
          { name: 'REST APIs / Flask',             pct: 84 },
          { name: 'Git / GitHub',                  pct: 90 },
          { name: 'Firebase Auth / GROQ API',      pct: 75 },
        ],
      },
    ],
  },
  contact: {
    heading: "Got an idea?<br/>Let's build it.",
    description: 'Open to internships, collaborations, and projects at the edge of web and AI. I respond fast.',
    links: [
      { icon: 'mail',     text: 'Email Me', url: 'https://mail.google.com/mail/?view=cm&to=jaytapodhan21@gmail.com' },
      { icon: 'github',   text: 'GitHub',   url: 'https://github.com/Ethical-21' },
      { icon: 'linkedin', text: 'LinkedIn', url: 'https://www.linkedin.com/in/jaytapodhan/' },
      { icon: 'download', text: 'Resume',   url: '/Jay_Tapodhan_Resume.pdf', modal: true },
    ],
  },
  footer: { name: 'JAY TAPODHAN', role: 'COMPUTER ENGINEERING', year: '2025' },
};

export default portfolio;
