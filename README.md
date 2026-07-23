# Tamanna Singh — Portfolio

Personal portfolio website built with **React 18** and **Vite**, featuring an interactive terminal, live GitHub stats, animated skill radar, hero 3D cyber presentation, and a client-side contact form.

## Tech Stack

| Layer | Technology |
|---|---|
| Build Tool | Vite 5 |
| Framework | React 18 (SPA) |
| Language | TypeScript 5 |
| Styling | CSS (custom design system, dark/light theme) |
| Deployment | Vercel (Static SPA) |

## Features

- **Animated hero** — typewriter titles, WebGL-style canvas orb, floating particles, cyber card frame
- **Skills radar** — SVG radar chart across AI, backend, frontend, DevOps
- **Journey timeline** — alternating left/right education + work history
- **Project cards** — expandable deep-dive with architecture & engineering details
- **Live GitHub stats** — fetched dynamically from GitHub API
- **Interactive terminal** — try `help`, `about`, `skills`, `projects`, `contact`, `leetcode`, `clear`
- **Client-side contact form** — seamless contact workflow preparing direct email communication
- **Dark / light theme** — toggled via nav, persisted to `localStorage`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (Vite default port).

### Production Build

```bash
npm run build
```

The output bundle will be generated in `dist/`. You can preview the production build locally with:

```bash
npm run preview
```

## Project Structure

```
index.html              Root HTML entry point
vite.config.ts          Vite configuration & path aliases (@ -> ./src)
src/
  main.tsx              React 18 application entry point
  App.tsx               Root App wrapper
  index.css             Design system (CSS variables, animations)
  components/
    Portfolio.tsx       Main portfolio page (wires all sections together)
    Hero3DImage.tsx     Hero section cyber card & developer image
    OrbCanvas.tsx       Animated canvas orb (hero background)
    SkillsRadar.tsx     SVG radar chart
    Terminal.tsx        Interactive terminal easter egg
    GitHubStats.tsx     Live GitHub API stats widget
    ProjectCard.tsx     Project card with expandable deep-dive
    ContactForm.tsx     Client-side contact form
  lib/
    data.ts             All content — skills, projects, journey, achievements
```

## Customizing Content

All site content lives in **`src/lib/data.ts`** — edit skills, projects, journey entries, and stats there without touching any component.

Design tokens (colors, fonts, spacing) are CSS variables in `src/index.css` under `:root`.

## Deployment

See [DEPLOY.md](./DEPLOY.md) for full Vercel deployment instructions for Vite SPAs.
