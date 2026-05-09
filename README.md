# 🚀 Jay Tapodhan — Portfolio

A cinematic, high-performance developer portfolio built with **React + TypeScript + Vite**. Features smooth scroll animations, interactive canvas backgrounds, and a fully responsive design.

🔗 **Live:** [jay-tapodhan-portfolio.vercel.app](https://jay-tapodhan-portfolio.vercel.app)

---

## ✨ Features

- **Cinematic Scroll Animations** — Scroll-driven parallax effects with smooth lerp-based motion
- **Interactive Canvas Backgrounds** — Diagonal lattice grid, hex grid with data packets, matrix rain, and pulsing network nodes
- **Custom Cursor** — Concentric dot + ring cursor with hover scaling effects
- **Seamless Section Transitions** — No visible seams between sections; gradient-based blending
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Resume Modal** — Inline PDF viewer with download option
- **Fully Data-Driven** — All content managed from a single `portfolio.ts` file

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Vanilla CSS** | Custom styling, animations, gradients |
| **HTML Canvas** | Interactive background effects |
| **Vercel** | Deployment & hosting |

---

## 📁 Project Structure

```
portfolio-react/
├── public/
│   ├── Jay_Tapodhan_Resume.pdf
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── About.tsx          # About section with 3D card
│   │   ├── BgCanvas.tsx       # Canvas background manager
│   │   ├── Contact.tsx        # Contact section with links
│   │   ├── Cursor.tsx         # Custom cursor component
│   │   ├── Footer.tsx         # Footer
│   │   ├── Hero.tsx           # Hero section with stats
│   │   ├── Nav.tsx            # Navigation bar
│   │   ├── Projects.tsx       # Project cards grid
│   │   ├── ResumeModal.tsx    # PDF resume viewer
│   │   └── Skills.tsx         # Skills with animated bars
│   ├── data/
│   │   └── portfolio.ts       # ⭐ All portfolio content here
│   ├── hooks/
│   │   ├── index.ts           # Scroll, counter & skill animations
│   │   └── useSectionBg.ts    # Canvas background effects
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # All styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **npm** v9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Ethical-21/Jay-Tapodhan-Portfolio.git
cd Jay-Tapodhan-Portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## ✏️ Customization

Almost everything is controlled from **one file**: `src/data/portfolio.ts`

| Section | What to Edit |
|---------|-------------|
| Name & Title | `name`, `title`, `tagline` |
| Stats | `stats` array |
| About | `about.paragraphs`, `about.chips` |
| ID Card | `card.role`, `card.info` |
| Projects | `projects` array |
| Skills | `skills.categories` |
| Contact Links | `contact.links` |
| Footer | `footer` object |

For styling changes, edit `src/index.css`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Connect

- **Email:** jaytapodhan21@gmail.com
- **GitHub:** [@Ethical-21](https://github.com/Ethical-21)
- **LinkedIn:** [Jay Tapodhan](https://www.linkedin.com/in/jaytapodhan/)

---

Built with ❤️ by **Jay Tapodhan**
