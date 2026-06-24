import type { PortfolioData } from "../types";

const portfolio: PortfolioData = {
  name: {
    first: "JAY",
    last: "TAPODHAN",
    initials: "JT",
    full: "Jay Tapodhan",
  },
  title: "Computer Engineering Student",
  tagline:
    "Building full-stack platforms and AI-powered systems — from enterprise monitoring to LLM chatbots. Three internships, multiple hackathon wins, always shipping.",
  stats: [
    { value: 5, suffix: "+", decimals: 0, label: "Projects" },
    { value: 15, suffix: "+", decimals: 0, label: "Technologies" },
    { value: 8.58, suffix: "", decimals: 2, label: "CGPA / 10" },
  ],
  about: {
    heading_lines: ["Engineer.", "Builder.", "Innovator."],
    intro:
      "Passionate about turning ideas into shipped products. From enterprise monitoring systems to AI chatbots, I thrive at the intersection of engineering and creativity. When I'm not coding, you'll find me organizing tech workshops, designing event creatives, or leading community projects through NSS.",
    badges: [
      {
        icon: "trophy",
        title: "DevSummit 2026",
        detail: "2nd Runner-Up · ₹10K Prize",
      },
      {
        icon: "star",
        title: "IBM Recognition",
        detail: "Selected for GIFT City Visit",
      },
      {
        icon: "target",
        title: "Unleash LLM",
        detail: "Direct Finalist · Flaunch Excellence",
      },
      {
        icon: "medal",
        title: "Google Arcade",
        detail: "Program Completed · Swag Earned",
      },
    ],
    experience: [
      { company: "Hi Lab Solution", role: "Full Stack Intern", period: "2026" },
      { company: "IBM", role: "Full Stack Dev Trainee", period: "2025" },
      { company: "Flaunch", role: "AI Technology Intern", period: "2024–25" },
    ],
    leadership: [
      { icon: "clipboard", role: "Secretary", org: "ISTE Student Branch" },
      { icon: "palette", role: "Design Coordinator", org: "MBIT" },
      {
        icon: "users",
        role: "NSS Coordinator",
        org: "National Service Scheme",
      },
    ],
  },
  card: {
    role: "Full Stack Developer",
    description:
      "Specializing in full-stack web development, AI/ML integration, and building production-ready applications with modern JavaScript and Python ecosystems.",
    info: [
      { label: "University", value: "MBIT, CVMU" },
      { label: "Graduation", value: "2027" },
      { label: "CGPA", value: "8.58 / 10" },
      { label: "Location", value: "Anand, India" },
    ],
  },
  projects: [
    {
      num: "01",
      icon: "signal",
      featured: true,
      title: "InfraEye — Enterprise LAN Monitor",
      description:
        "Enterprise infrastructure monitoring platform for centralized endpoint management across a LAN. Provides live device monitoring, hardware/software inventory, license tracking, remote deployment, and automated reporting.",
      tags: ["FastAPI", "React.js", "MongoDB", "Python"],
      link: "#",
      reportUrl: "/InfraEye_Report.pdf",
      videoUrl: "#",
      highlights: [
        "Live device monitoring & alerts",
        "HW/SW inventory & license tracking",
        "Remote deployment & OTA updates",
        "Automated Excel reporting",
      ],
    },
    {
      num: "02",
      icon: "brain",
      featured: false,
      title: "Flavour with Fusion — Recipe AI",
      description:
        "AI-powered recipe generator and meal planner with smart ingredient suggestions, built during Flaunch internship using GROQ API and Firebase authentication.",
      tags: ["MealDB API", "Firebase Auth", "GROQ API", "React.js"],
      link: "https://github.com/Ethical-21",
      deployingSoon: true,
      highlights: [
        "AI recipe generation",
        "Smart meal planning",
        "Ingredient suggestions",
        "Firebase auth & sync",
      ],
    },
    {
      num: "03",
      icon: "bot",
      featured: false,
      title: "MuseMate — AI Museum Chatbot",
      description:
        "Real-time chatbot for museum visitors handling exhibit queries and ticket booking via WebSocket. Built with Flask and a custom JSON knowledge base.",
      tags: ["Flask", "Flask-SocketIO", "JSON KB", "Python"],
      link: "#",
      reportUrl: "/MuseMate_Report.pdf",
      videoUrl: "#",
      highlights: [
        "Real-time WebSocket chat",
        "Exhibit info & ticket booking",
        "Custom JSON knowledge base",
        "Context-aware responses",
      ],
    },
    {
      num: "04",
      icon: "zap",
      featured: true,
      title: "TaskFlow — Team Task Manager",
      description:
        "Team-based task management platform with project tracking, role-based assignment, real-time collaboration dashboard, and responsive UI. Built as IBM SkillsBuild capstone project.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      link: "https://github.com/Ethical-21/taskflow-app",
      liveUrl: "https://taskflow-ctm.vercel.app/",
      highlights: [
        "Role-based task assignment",
        "Real-time collaboration dashboard",
        "Project tracking & analytics",
        "Responsive modern UI",
      ],
    },
  ],
  skills: {
    categories: [
      {
        name: "Languages & Frontend",
        skill_list: [
          { name: "Python / C / C++", pct: 90 },
          { name: "React.js / Next.js / Tailwind", pct: 85 },
          { name: "HTML5 / CSS3 / JavaScript", pct: 88 },
        ],
      },
      {
        name: "Backend & Databases",
        skill_list: [
          { name: "Node.js / Express.js / FastAPI", pct: 85 },
          { name: "MongoDB / Firebase / SQL", pct: 82 },
          { name: "REST APIs / Flask", pct: 84 },
        ],
      },
      {
        name: "AI/ML & DevTools",
        skill_list: [
          { name: "LLMs / GROQ API / Integration", pct: 80 },
          { name: "Git / GitHub", pct: 92 },
          { name: "Networking / TCP/IP / LAN", pct: 75 },
        ],
      },
    ],
  },
  contact: {
    heading: "Got an idea?<br/>Let's build it.",
    description:
      "Open to internships, collaborations, and projects at the edge of web and AI. I respond fast.",
    links: [
      { icon: "mail", text: "Email Me", url: "mailto:jaytapodhan21@gmail.com" },
      { icon: "github", text: "GitHub", url: "https://github.com/Ethical-21" },
      {
        icon: "linkedin",
        text: "LinkedIn",
        url: "https://www.linkedin.com/in/jaytapodhan/",
      },
      {
        icon: "download",
        text: "Resume",
        url: "/Jay_Tapodhan_Resume.pdf",
        modal: true,
      },
    ],
  },
  footer: { name: "JAY TAPODHAN", role: "FULL-STACK ENGINEER", year: "2026" },
};

export default portfolio;
