# Tamanna Singh — Portfolio

Personal portfolio website built with **Next.js 15**, featuring an interactive terminal, live GitHub stats, animated skill radar, and a contact form backed by **Neon Postgres**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | CSS (custom design system, dark/light theme) |
| Database | Neon Postgres (serverless) via `@neondatabase/serverless` |
| Deployment | Vercel |

## Features

- **Animated hero** — typewriter titles, WebGL-style canvas orb, floating particles
- **Skills radar** — SVG radar chart across AI, backend, frontend, DevOps
- **Journey timeline** — alternating left/right education + work history
- **Project cards** — expandable deep-dive with architecture & engineering details
- **Live GitHub stats** — fetched from GitHub API at runtime
- **Interactive terminal** — try `help`, `about`, `skills`, `projects`, `contact`, `leetcode`, `clear`
- **Contact form** — persists messages to Neon Postgres, auto-creates table on first run
- **Dark / light theme** — toggled via nav, persisted to `localStorage`

## Getting Started

```bash
npm install
cp .env.example .env.local   # add your DATABASE_URL (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |

The contact form works without a database in local dev — it will simply fail gracefully. To enable it, create a free database at [neon.tech](https://neon.tech) and paste the connection string.

## Project Structure

```
app/
  layout.tsx              Root layout + metadata
  page.tsx                Entry point → <Portfolio />
  globals.css             Design system (CSS variables, animations)
  api/contact/route.ts    POST /api/contact — saves message to Postgres
components/
  Portfolio.tsx           Main page (all sections wired together)
  OrbCanvas.tsx           Animated canvas orb (hero background)
  SkillsRadar.tsx         SVG radar chart
  Terminal.tsx            Interactive terminal easter egg
  GitHubStats.tsx         Live GitHub API stats widget
  ProjectCard.tsx         Project card with expandable deep-dive
  ContactForm.tsx         Contact form with Postgres persistence
lib/
  data.ts                 All content — skills, projects, journey, achievements
```

## Customizing Content

All site content lives in **`lib/data.ts`** — edit skills, projects, journey entries, and stats there without touching any component.

Design tokens (colors, fonts, spacing) are CSS variables in `app/globals.css` under `:root`.

## Deployment

See [DEPLOY.md](./DEPLOY.md) for full Vercel deployment instructions including Neon Postgres setup.
